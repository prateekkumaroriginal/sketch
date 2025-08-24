import { Footer } from "./_components/Footer";
import { Heading } from "./_components/Heading";
import { Heroes } from "./_components/Heroes";

const LandingPage = () => {
  console.log(process.env.CLERK_JWT_ISSUER_DOMAIN);
  return (
    <div className='min-h-full flex flex-col dark:bg-[#1F1F1F]'>
      <div className='flex flex-col items-center justify-center md:justify-start text-center gap-y-16 flex-1 px-6 pb-10'>
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  )
}

export default LandingPage;