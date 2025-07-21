"use client";

import { Spinner } from '@/components/spinner';
import { useConvexAuth } from 'convex/react'
import { redirect } from 'next/navigation';
import React from 'react'
import Sidebar from './_components/Sidebar';
import { ModalProvider } from '@/components/providers/modal-provider';

const MainLayout = ({ children }: {
  children: React.ReactNode
}) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className='h-full flex items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className='h-full flex dark:bg-[#1F1F1F]'>
      <Sidebar />
      <ModalProvider />
      <main className='flex-1 h-full overflow-y-auto'>
        {children}
      </main>
    </div>
  )
}

export default MainLayout