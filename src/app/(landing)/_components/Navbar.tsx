"use client";

import { useScrollTop } from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils';
import React from 'react'
import { Logo } from './Logo';
import { ModeToggle } from '@/components/mode-toggle';
import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react';
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/spinner';
import Link from 'next/link';

const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div className={cn(
      "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
      scrolled && "border-b shadow-sm"
    )}>
      <Link className='py-2 px-4' href="/">
        <Logo />
      </Link>

      <div className='md:ml-auto md:justify-end justify-between flex items-center gap-x-2'>
        <AuthLoading>
          <Spinner />
        </AuthLoading>

        <Unauthenticated>
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button size="sm">
              Get Sketch Free
            </Button>
          </SignUpButton>
        </Unauthenticated>

        <Authenticated>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/documents">
              Start Sketching
            </Link>
          </Button>
          <UserButton />
        </Authenticated>

        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar