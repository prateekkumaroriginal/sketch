"use client";

import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button'
import { SignUpButton } from '@clerk/nextjs';
import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react'
import { MoveRight } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

export const Heading = () => {
  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>
        Write down your ideas, documents & plans. Welcome to
        <span className='flex mt-2 items-center justify-center underline text-6xl sm:text-7xl md:text-8xl'>
          <img src="/logo.svg" alt="" className='dark:invert inline-flex mr-2 size-16 sm:size-20 md:size-24' />
          Sketch
        </span>
      </h1>

      <h3 className='text-base sm:text-lg md:text-xl font-medium'>
        Sketch is where better and faster work happens.
      </h3>

      <AuthLoading>
        <div className='flex justify-center items-center'>
          <Spinner size="lg" />
        </div>
      </AuthLoading>

      <Authenticated>
        <Button size="lg" className='group' asChild>
          <Link href="/documents" className='flex items-center justify-center'>
            Start Sketching <MoveRight className='size-4 ml-2 group-hover:translate-x-2 transition' />
          </Link>
        </Button>
      </Authenticated>

      <Unauthenticated>
        <SignUpButton mode="modal">
          <Button size="lg" className='group'>
            Get Sketch Free <MoveRight className='size-4 ml-2 group-hover:translate-x-2 transition' />
          </Button>
        </SignUpButton>
      </Unauthenticated>
    </div>
  )
}