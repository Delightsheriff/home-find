import { unstable_noStore as noStore } from "next/cache";
import { fetchProperties } from "@/lib/data-service";
import FeaturedProperties from "./FeaturedProperties";
import GetStarted from "./GetStarted";
import Landlords from "./Landlords";
import RealEstateForm from "./RealEstateForm";

export default async function Hero() {
  noStore(); // Disable Next.js caching for this component
  const properties = await fetchProperties();

  return (
    <>
      <section className="w-full py-6 px-4 sm:px-4 lg:px-8 bg-deep_orange-50">
        <RealEstateForm />
      </section>
      <section className="w-full  py-6 px-4 sm:px-4 lg:px-8">
        <GetStarted />
      </section>
      {properties.length < 0 ? (
        ""
      ) : (
        <section className="w-full  py-6 px-4 sm:px-4 lg:px-8">
          <FeaturedProperties properties={properties} />
        </section>
      )}
      <section className="w-full  py-6 px-4 sm:px-4 lg:px-8 bg-deep_orange-50">
        <Landlords />
      </section>
    </>
  );
}
