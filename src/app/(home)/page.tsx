import { HydrateClient, trpc } from "@/trpc/server";
import Image from "next/image";
import { PageClient } from "./client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
export default async function Home() {
  void trpc.hello.prefetch({ text: "Sajid" });
  return (
    <HydrateClient>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallbackRender={({ error }) => <p>An error occurred: {error.message}</p>}>
          <PageClient />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
}
