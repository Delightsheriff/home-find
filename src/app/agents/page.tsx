import Image from "next/image";
import { Mail, Phone } from "lucide-react";
export const metadata = {
  title: "Agents | NestQuest",
  description: "Meet out Agents",
};

export default function Page() {
  const agents = [
    {
      id: 1,
      name: "Jane Smith",
      title: "Senior Real Estate Agent",
      image: "/jane.jpg",
      phone: "(555) 123-4567",
      email: "jane.smith@dreamhomerealty.com",
    },
    {
      id: 2,
      name: "John Doe",
      title: "Luxury Property Specialist",
      image: "/john.jpg",
      phone: "(555) 234-5678",
      email: "john.doe@dreamhomerealty.com",
    },
    {
      id: 3,
      name: "Emily Brown",
      title: "First-Time Buyer Expert",
      image: "/emily.jpg",
      phone: "(555) 345-6789",
      email: "emily.brown@dreamhomerealty.com",
    },
  ];

  return (
    <div className="w-full bg-deep_orange-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Our Real Estate Agents</h1>
        <p className="mb-8">
          Meet our team of experienced real estate professionals. We&apos;re
          here to help you find your dream home or sell your property for the
          best possible price.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="border rounded-lg overflow-hidden shadow-md bg-white-A700"
            >
              <Image
                src={agent.image}
                alt={agent.name}
                width={300}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-1">{agent.name}</h2>
                <p className="text-gray-600 mb-4">{agent.title}</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="mr-2" size={16} />
                    <span>{agent.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-2" size={16} />
                    <span>{agent.email}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
