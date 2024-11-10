import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GrSearchAdvanced } from "react-icons/gr";
import { BsHouse } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import Link from "next/link";

export default function GetStarted() {
  const features = [
    { icon: GrSearchAdvanced, title: "Search your location" },
    { icon: BsHouse, title: "Get your dream house" },
    { icon: FaPeopleGroup, title: "Discover your perfect neighborhood" },
    { icon: MdOutlineFeaturedPlayList, title: "Explore nearby amenities" },
  ];

  return (
    <section className="w-full py-12  bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <Card className="bg-orange-50">
            <CardHeader>
              <CardTitle className="text-3xl font-bold leading-tight lg:text-4xl">
                Simple & easy way to find your dream Apartment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg md:text-xl">
                Discover Your Perfect Match: A Stress-Free Guide to Finding Your
                Ideal Home
              </p>
            </CardContent>
            <CardFooter>
              <Button size="lg" asChild>
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-orange-50 transition-transform hover:scale-105"
              >
                <CardContent className="flex flex-col items-center text-center p-6">
                  <feature.icon className="text-orange-600 text-4xl sm:text-5xl mb-4" />
                  <h3 className="text-lg sm:text-xl font-medium">
                    {feature.title}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
