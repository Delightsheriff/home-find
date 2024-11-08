import Link from "next/link";

export const metadata = {
  title: "About Us | NestQuest",
  description: "Learn more about NestQuest",
};

export default function Page() {
  return (
    <div className="w-full bg-deep_orange-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Dream Home Realty</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">
              Dream Home Realty has been serving our community for over 20
              years. We&apos;re committed to helping you find the perfect place
              to call home, whether you&apos;re buying, selling, or renting.
            </p>
            <p className="mb-4">
              Our team of experienced agents combines local expertise with
              cutting-edge technology to provide you with the best possible real
              estate experience.
            </p>
            <p>
              We believe in building lasting relationships with our clients, and
              our success is measured by your satisfaction.
            </p>
          </div>
          <div className="bg-white-A700 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <p>
              To guide our clients through the real estate process with expert
              advice, personalized service, and unwavering integrity, ensuring
              that every client finds their dream home or investment property.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Local market expertise</li>
            <li>Personalized service tailored to your needs</li>
            <li>Cutting-edge technology and marketing strategies</li>
            <li>Transparent and ethical practices</li>
            <li>Comprehensive support throughout your real estate journey</li>
          </ul>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="#"
            className="inline-block  btn-primary text-white px-6 py-2 rounded-lg  transition-colors"
          >
            Contact Us Today
          </Link>
        </div>
      </div>
    </div>
  );
}
