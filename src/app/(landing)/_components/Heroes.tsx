import Image from 'next/image'

export const Heroes = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-5xl'>
      <div className="flex items-center gap-x-8">
        <div className='relative size-[200px] sm:size-[250px] md:size-[300px]'>
          <Image
            src="/writing.png"
            fill
            className='object-contain dark:invert'
            alt='Writing'
          />
        </div>
        <div className='relative hidden sm:block size-[200px] sm:size-[250px] md:size-[300px]'>
          <Image
            src="/reading.png"
            fill
            className='object-contain dark:invert'
            alt='reading'
          />
        </div>
      </div>
    </div>
  )
}