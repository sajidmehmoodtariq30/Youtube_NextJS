import Image from "next/image";
export default function Home() {
  return (
    <div className="bg-gray-500 text-white text-center">
    <div>
      <Image src="/logo.svg" alt="logo"></Image>
      <p>Hello World!</p>
    </div>
    </div>
  );
}
