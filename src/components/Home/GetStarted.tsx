import Link from "next/link";
import { RLink } from "../ui/link";
import { GrSearchAdvanced } from "react-icons/gr";
import { BsHouse } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
export default function GetStarted() {
  const features = [
    { icon: GrSearchAdvanced, title: "Search your location" },
    { icon: BsHouse, title: "Get your dream house" },
    { icon: FaPeopleGroup, title: "Discover your perfect neighborhood" },
    { icon: MdOutlineFeaturedPlayList, title: "Explore nearby amenities" },
  ];
  return (
    <section className="w-full  py-6">
      <div className="grid container grid-cols-1 gap-6 md:grid-cols-2">
        <div className="h-full rounded-lg bg-red-100 p-6 ">
          <div className="p-4">
            <h2 className="text-3xl font-bold leading-10 pt-1">
              Simple & easy way to find <br /> your dream Apartment
            </h2>
            <p className="mb-5 text-muted-foreground pt-4 pb-5">
              Discover Your Perfect Match: A Stress-Free Guide to Finding Your
              Ideal Home
            </p>
            <RLink href="/signup" variant="default" className="mt-4">
              Get Started
            </RLink>
          </div>
        </div>
        {/* <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
          <div className="rounded-xl  bg-deep_orange-50 p-4 shadow-sm">
            <div className="p-2">
              <GrSearchAdvanced className="text-orange-A700 text-5xl" />
              <h3 className="mt-2 text-xl font-medium">Search your location</h3>
            </div>
          </div>
          <div className="rounded-xl  bg-deep_orange-50 p-4 shadow-sm">
            <div className="p-2">
              <BsHouse className="text-orange-A700 text-5xl" />
              <h3 className="mt-2 text-xl font-medium">Get your dream house</h3>
            </div>
          </div>
          <div className="rounded-xl  bg-deep_orange-50 p-4 shadow-sm">
            <div className="p-2">
              <FaPeopleGroup className="text-orange-A700 text-5xl" />
              <h3 className="mt-2 text-xl font-medium">
                Discover your perfect neighborhood
              </h3>
            </div>
          </div>
          <div className="rounded-xl  bg-deep_orange-50 p-4 shadow-sm">
            <div className="p-2">
              <MdOutlineFeaturedPlayList className="text-orange-A700 text-5xl" />
              <h3 className="mt-2 text-xl font-medium">
                Explore nearby amenities
              </h3>
            </div>
          </div>
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl bg-deep_orange-50 p-4 shadow-sm transition-transform hover:scale-105"
            >
              <div className="p-2 flex flex-col items-center text-center">
                <feature.icon className="text-orange-A700 text-4xl sm:text-5xl mb-3" />
                <h3 className="text-lg sm:text-xl font-medium leading-tight">
                  {feature.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
