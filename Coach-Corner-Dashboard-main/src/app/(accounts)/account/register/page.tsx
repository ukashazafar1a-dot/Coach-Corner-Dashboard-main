import React from "react";
import RegisterPage from "../_components/RegisterPage";
import Link from "next/link";
import Image from "next/image";
import { Site } from "@/helpers/Site";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const page = () => {
  return (
    <div className="basis-full h-full">
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
          <RegisterPage />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
