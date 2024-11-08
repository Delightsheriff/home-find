"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Property } from "@/interface";
import { PropertyCard } from "../Property/PropertyCard";
import { FaArrowRightLong } from "react-icons/fa6";
import MiniSpinner from "../MiniSpinner";

interface FeaturedPropertiesProps {
  properties: Property[];
}

//TODO: fix parameters
const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
}) => {
  const [activeTab, setActiveTab] = useState<string>("residential");

  // If properties array is empty or not an array, do nothing
  if (!Array.isArray(properties) || properties.length === 0) {
    return null;
  }

  const filteredProperties = properties
    .filter((property) => property.propertyType === activeTab)
    .slice(0, 4);

  return (
    <div className="w-full py-6">
      <div className="container">
        <Header />
        <PropertyTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <Suspense fallback={<MiniSpinner />} key={activeTab}>
          <PropertyGrid properties={filteredProperties} />
        </Suspense>
      </div>
    </div>
  );
};

export default FeaturedProperties;

const Header = () => (
  <header className="flex items-center justify-between  py-6">
    <h1 className="text-2xl sm:text-lg font-bold">Featured Properties</h1>
    <Link
      href="/property"
      className="text-sm font-medium text-orange-A700 flex items-center justify-between gap-1 hover:text-gray-900 underline-offset-4"
    >
      Explore All
      <FaArrowRightLong />
    </Link>
  </header>
);

interface PropertyTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const PropertyTabs: React.FC<PropertyTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabValues = ["residential", "commercial", "industrial", "land"];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <div className="relative">
        <div className="overflow-x-auto pb-2 mb-[-8px]">
          <TabsList className="inline-flex w-max min-w-full bg-white-A700 shadow-none">
            {tabValues.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className={`whitespace-nowrap w-full ${
                  tab === activeTab ? "bg-primary-700 text-primary-50" : ""
                }`}
                aria-selected={tab === activeTab} // ARIA attribute for accessibility
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Properties
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
      </div>
    </Tabs>
  );
};

interface PropertyGridProps {
  properties: Property[];
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({ properties }) => {
  if (properties.length === 0) {
    return (
      <div className="flex items-center justify-center text-gray-500 text-lg">
        No available properties at this time
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6 p-4 md:p-6">
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
};
