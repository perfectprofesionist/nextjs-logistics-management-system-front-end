import { HomeForm } from "@/components/home-form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-svh w-full justify-center p-6">
      <div className="w-full flex justify-center h-fit">
        <HomeForm />
      </div>
    </div>
  );
}
