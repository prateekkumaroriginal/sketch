import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
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

      <Button size="lg" className='group font-semibold'>
        Start Sketching <ArrowRight className='size-4 ml-2 group-hover:translate-x-2 transition' />
      </Button>
    </div>
  )
}