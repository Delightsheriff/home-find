import GetStarted from "@/components/Home/GetStarted";
import Hero from "@/components/Home/Hero";
import Landlords from "@/components/Home/Landlords";

export default function Page() {
  return (
    <main>
      <section className="w-full py-6 px-4 sm:px-4 lg:px-8 bg-deep_orange-50">
        <Hero />
      </section>
      <section className="w-full  py-6 px-4 sm:px-4 lg:px-8">
        <GetStarted />
      </section>
      <section className="w-full  py-6 px-4 sm:px-4 lg:px-8 bg-deep_orange-50">
        <Landlords />
      </section>
    </main>
  );
}
