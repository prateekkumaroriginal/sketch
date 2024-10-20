"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = React.useCallback(() => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [theme]);

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      className="group p-2 h-min"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-muted-foreground group-hover:text-foreground transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-muted-foreground group-hover:text-foreground transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}