import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import bg from "../../../public/hero.jpg";
import { PropertySearchForm } from "./PropertySearchForm";
import { nigerianStates } from "@/utils/helper";

const RealEstateForm = async () => {
  return (
    <section className="w-full py-6">
      <div className="container grid justify-between gap-6 lg:grid-cols-2 lg:gap-12">
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
                  value="sell"
                >
                  Sell
                </TabsTrigger>
              </TabsList>
              <TabsContent value="rent">
                <PropertySearchForm states={nigerianStates} tempvalue="rent" />
              </TabsContent>
              <TabsContent value="lease">
                <PropertySearchForm states={nigerianStates} tempvalue="lease" />
              </TabsContent>
              <TabsContent value="sell">
                <PropertySearchForm states={nigerianStates} tempvalue="sell" />
              </TabsContent>
            </Tabs>
          </section>
        </div>
        <div style={{ position: "relative", width: "100%", height: "70dvh" }}>
          <Image
            src={bg}
            alt="Real Estate"
            priority
            fill
            sizes="100vw"
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default RealEstateForm;
