"use client";

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image'
import React from 'react'
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const DocumentsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const createDocument = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = createDocument({ title: "Untitled" })
      .then((docId) => {
        router.push(`/documents/${docId}`);
      });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created",
      error: "Failed to create a new note!"
    });
  }

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

      <Button onClick={onCreate}>
        <PlusCircle className='size-4 mr-2' />
        Create a Note
      </Button>
    </div>
  )
}

export default DocumentsPage