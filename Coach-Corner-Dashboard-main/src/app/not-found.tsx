import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen p-6 flex-col">
      <h2 className='text-5xl mb-3'>Not Found</h2>
      <p className='text-lg text-gray-700 mb-2'>Could not find requested resource</p>
      <Link href="/" className='bg-primary text-white p-3 rounded'>Return Home</Link>
    </div>
  )
}