"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { ChevronsUpDown, LogOut } from "lucide-react";

const UserItem = () => {
  const { user } = useUser();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div role="button" className="flex items-center text-sm p-3 w-full hover:bg-primary/5">
          <div className="flex gap-x-2 items-center max-w-[150px]">
            <Avatar className="size-6">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>

            <span className="text-start line-clamp-1">
              {user?.fullName}
            </span>

            <ChevronsUpDown className="size-4 text-muted-foreground" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 dark:bg-neutral-900 shadow-sm"
        align="start"
        alignOffset={12}
        forceMount
      >
        <div className="flex flex-col px-2">
          <div className="flex justify-between items-center">
            <p className="text-xs text-center leading-none text-muted-foreground">
              {user?.emailAddresses[0].emailAddress}
            </p>
            <div>
            <ModeToggle />
            </div>
          </div>

          <DropdownMenuSeparator />

          <div className="flex items-center gap-x-2 py-2">
            <Avatar className="size-8">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>

            <div className="space-y-1">
              <p className="text-sm line-clamp-1">
                {user?.fullName}
              </p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="group flex items-center w-full cursor-pointer text-muted-foreground focus:bg-red-500 transition">
          <SignOutButton>
            <div>
              <LogOut className="size-4 mr-2 text-red-500 group-hover:text-white transition" />
              <span className="text-red-500 group-hover:text-white transition">
                Logout
              </span>
            </div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserItem