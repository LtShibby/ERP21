import Head from 'next/head';
import Image from 'next/image';

export default function Maintenance() {
  return (
    <>
      <Head>
        <title>Under Maintenance - ERP21</title>
        <meta name="description" content="ERP21 is temporarily under maintenance" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Maintenance Image */}
          <div className="mb-8">
            <Image
              src="/images/maintenance.png"
              alt="WozWize Owl Construction"
              width={400}
              height={400}
              className="mx-auto max-w-full h-auto"
              style={{
                maxWidth: '400px',
                width: '100%',
                height: 'auto'
              }}
              priority
            />
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-wide">
            WE'RE UNDER CONSTRUCTION
          </h1>
          
          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg mx-auto">
            The site is temporarily offline while we finalize project details. 
            You'll be able to review and request revisions once the contract is signed.
          </p>
          
          {/* Accent Elements */}
          <div className="mt-12 flex justify-center space-x-4">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @media (max-width: 768px) {
          .maintenance-image {
            max-width: 80% !important;
          }
        }
        
        body {
          margin: 0;
          padding: 0;
          background-color: #000;
          overflow-x: hidden;
        }
        
        html {
          background-color: #000;
        }
      `}</style>
    </>
  );
}
