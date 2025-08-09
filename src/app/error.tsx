"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Error = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center space-y-4">
      <Image
        src="/flies_404.png"
        alt=""
        width={400}
        height={400}
        className="dark:invert"
      />

      <h2 className="text-xl font-medium">
        Something Went Wrong!
      </h2>

      <Button size={"sm"} asChild>
        <Link href="/documents">
          Go Back
        </Link>
      </Button>
    </div>
  );
}

export default Error;