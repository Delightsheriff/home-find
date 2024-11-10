"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import Image from "next/image";
import bg from "../../../public/hero.jpg";
import { PropertySearchForm } from "./PropertySearchForm";
import { IProperty } from "@/interface/property";
import { fetchProperties } from "@/lib/property";

const Hero = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);

  useEffect(() => {
    const loadProperties = async () => {
      const data = await fetchProperties();
      setProperties(data);
    };
    loadProperties();
  }, []);
  return (
    <section className="w-full py-6">
      <div className="container mx-auto px-4 grid justify-between gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="">
          <h2 className="text-center text-3xl font-bold p-2">
            Find a perfect property <br /> Where you&apos;ll love to live
          </h2>
          <p className="text-center text-xm pb-2">
            We helps businesses customize, automate and scale up their ad
            production and delivery.
          </p>
          <section className="bg-white-A700 p-5 rounded-lg min-h-[400px]">
            <Tabs defaultValue="rent" className="space-y-6 bg-white-A700">
              <TabsList className="grid grid-cols-3 gap-2 bg-white-A700">
                <TabsTrigger
                  className="text-black-A700_01 data-[state=active]:bg-black-A700_01 rounded-md data-[state=active]:text-white-A700"
                  value="rent"
                >
                  Rent
                </TabsTrigger>
                <TabsTrigger
                  className="text-black-A700_01 data-[state=active]:bg-black-A700_01 rounded-md data-[state=active]:text-white-A700"
                  value="lease"
                >
                  Lease
                </TabsTrigger>
                <TabsTrigger
                  className="text-black-A700_01 data-[state=active]:bg-black-A700_01 rounded-md data-[state=active]:text-white-A700"
                  value="buy"
                >
                  Buy
                </TabsTrigger>
              </TabsList>
              <TabsContent value="rent">
                <PropertySearchForm properties={properties} tempvalue="rent" />
              </TabsContent>
              <TabsContent value="lease">
                <div className="p-4 text-center">
                  <p className="text-lg font-semibold">Coming Soon</p>
                  <p className="text-gray-500">
                    Our lease option is currently under development.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="buy">
                <div className="p-4 text-center">
                  <p className="text-lg font-semibold">Coming Soon</p>
                  <p className="text-gray-500">
                    Our buy option is currently under development.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>
        <div className="relative w-full h-[70vh]">
          <Image
            src={bg}
            alt="Real Estate"
            priority
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
