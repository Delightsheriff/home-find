import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Landlords() {
  const images = [
    { src: "/1.jpg", alt: "House exterior" },
    { src: "/2.jpg", alt: "People discussing plans" },
    { src: "/3.jpg", alt: "Handing over keys" },
    { src: "/4.jpg", alt: "Kitchen interior" },
  ];

  return (
    <div className="container mx-auto px-4 py-4 md:px-6 ">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
        <Card className="flex flex-col pt-6 justify-center space-y-4">
          <CardContent className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Effortlessly List Your Properties and Find Your Ideal Tenants
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Are you a landlord looking for a hassle-free way to showcase your
              properties to potential tenants? Look no further! Our platform
              offers a simple and easy-to-use interface for uploading your
              properties, allowing you to reach a vast audience of interested
              renters.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="lg" asChild>
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>
        <div className="grid gap-4 sm:grid-cols-2">
          {images.map((img, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
