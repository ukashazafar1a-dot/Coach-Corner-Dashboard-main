import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Site } from '@/helpers/Site'
import Image from 'next/image'
import Link from 'next/link'
import ResetPassword from '../_components/ResetPassword';

const page = () => {
  return (
    <>
    <div className="block w-full">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <div className="flex items-center justify-center mb-3 text-center">
            <Link href="/" className="text-center">
              <Image
                src={
                  "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1707556567/cc-site-assets/dashboard-assets/coach-corner-newlogo-removebg-preview_hzhbi0.png"
                }
                alt={Site?.name}
                height={40}
                width={220}
                className="object-cover"
                priority
              />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <ResetPassword />
        </CardContent>
      </Card>
    </div>
  </>
  )
}

export default page