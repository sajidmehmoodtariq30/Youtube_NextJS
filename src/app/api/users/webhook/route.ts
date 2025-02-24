import { headers } from "next/headers";
import { Webhook } from "svix";
import { NextResponse } from "next/server";
import { User } from "@/models/userModel";
import connectDB from "@/config/db";

const WEBHOOK_SECRET = process.env.CLERK_SIGNING_SECRET!;

export async function POST(req: Request) {
  await connectDB();

  const payload = await req.text();
  const svixHeaders = Object.fromEntries((await headers()).entries());

  try {
    const wh = new Webhook(WEBHOOK_SECRET);
    const event: any = wh.verify(payload, svixHeaders);

    const { id, email_addresses, image_url, first_name, last_name, username } =
      event.data;

    // Check if email_addresses exist before accessing it
    if (!email_addresses || email_addresses.length === 0) {
      return NextResponse.json(
        { error: "Email not provided" },
        { status: 400 }
      );
    }

    const email = email_addresses[0]?.email_address;

    switch (event.type) {
      case "user.created":
        const userToUpdate = await User.findOne({ clerkId: id });

        if (!userToUpdate) {
          const newUsername = username || email.split("@")[0];

          // Ensure username is unique
          const usernameExists = await User.findOne({ username: newUsername });

          const finalUsername = usernameExists
            ? `${newUsername}${Math.floor(Math.random() * 10000)}`
            : newUsername;

          await User.create({
            clerkId: id,
            email,
            fullName: `${first_name} ${last_name}`.trim(),
            username: finalUsername.toLowerCase(),
            avatar: image_url,
          });
        }
        break;

      case "user.updated":
        console.log("🔄 Updating User:", id);

        try {
          const userToUpdate = await User.findOneAndUpdate(
            { clerkId: id }, // Find the user by Clerk ID
            {
              email,
              fullName: `${first_name} ${last_name}`.trim(),
              username,
              avatar: image_url,
            },
            { new: true } // Return the updated user
          );

          if (!userToUpdate) {
            console.error("❌ Error: User not found for update.");
            return NextResponse.json(
              { error: "User not found" },
              { status: 404 }
            );
          }

          console.log("✅ User Updated:", userToUpdate);
        } catch (err) {
          console.error("❌ Webhook Error:", err);
          return NextResponse.json(
            { error: "Webhook processing failed" },
            { status: 400 }
          );
        }
        break;

      case "user.deleted":
        await User.findOneAndDelete({ clerkId: id });
        break;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook Error:", err);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 400 }
    );
  }
}
