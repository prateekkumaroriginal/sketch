import Image from "next/image"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"]
});

export const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <div className="size-4">
        <Image
          src="/logo.svg"
          height="16"
          width="16"
          alt="Logo"
          className="dark:invert"
        />
      </div>
      <p className={cn("font-semibold", font.className)}>
        Sketch
      </p>
    </div>
  )
}