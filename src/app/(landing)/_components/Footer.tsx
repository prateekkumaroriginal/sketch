import { Logo } from "./Logo"
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="flex items-center w-full p-6 bg-background dark:bg-[#1F1F1F] z-50">
      <Logo />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2">
        <Button variant="link" size="sm">
          Privacy Policy
        </Button>
        <Button variant="link" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  )
}