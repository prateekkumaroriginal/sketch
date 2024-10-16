"use client";

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import { PlusCircle } from 'lucide-react';
import Image from 'next/image'
import React from 'react'

const DocumentsPage = () => {
  const { user } = useUser();

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image
        className='dark:hidden'
        src="/empty.png"
        alt="Empty Box"
        height="300"
        width="300"
      />
      <Image
        className='hidden dark:block'
        src="/empty-dark.png"
        alt="Empty Box"
        height="300"
        width="300"
      />

      <h2 className='text-2xl'>
        Welcome to {user?.firstName}&apos;s Sketch
      </h2>

      <Button>
        <PlusCircle className='size-4 mr-2' />
        Create a Note
      </Button>
    </div>
  )
}

export default DocumentsPage