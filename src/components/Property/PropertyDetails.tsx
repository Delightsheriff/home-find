"use client";
// import { Property } from "@/interface";
import React from "react";
import { Badge } from "../ui/badge";
import {
  BathIcon,
  BedDoubleIcon,
  CalendarIcon,
  CheckCircleIcon,
  HomeIcon,
  MapPinIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { AmenitiesComponent } from "./AmenitiesComponent";
import { Card, CardContent } from "../ui/card";
import ImageGallery from "./ImageGallery";
import LoginMessage from "./LoginMessage";
import { FaToilet } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";

import { IProperty } from "@/interface/property";
import { useSession } from "next-auth/react";

interface PropertyDetailsProps {
  property: IProperty;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  const { data: session } = useSession();
  return (
    <main className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-[#ffffff]">
      <section className="container mx-auto max-w-6xl">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="secondary" className="capitalize">
                {property.propertyType}
              </Badge>
              <Badge variant="secondary" className="capitalize">
                {property.subType}
              </Badge>
              <Badge variant="secondary" className="capitalize">
                {property.purpose === "sell"
                  ? "For Sale"
                  : property.purpose === "rent"
                  ? "For Rent"
                  : property.purpose === "lease"
                  ? "For Lease"
                  : property.purpose}
              </Badge>
              {property.isVerified && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  <CheckCircleIcon className="w-4 h-4 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPinIcon className="w-5 h-5" />
              <span>
                {property.address},{property.stateCapital}
              </span>
            </div>
          </div>

          <ImageGallery images={property.imagesUrl} />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <SlOptions className="text-gray-500" />
              <span>{property.slots} Available Slots</span>
            </div>
            <div className="flex items-center gap-2">
              <BedDoubleIcon className="text-gray-500" />
              <span>{property.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <BathIcon className="text-gray-500" />
              <span>{property.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <FaToilet className="text-gray-500" />
              <span>{property.toilets} Toilets</span>
            </div>
            <div className="flex items-center gap-2">
              <HomeIcon className="text-gray-500" />
              <span>{property.size} sqft</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="text-gray-500" />
              <span>
                Last updated:{" "}
                {new Date(property.lastUpdated).toLocaleDateString()}
              </span>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-semibold mb-3">Description</h2>
            <p className="text-gray-600">{property.description}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Amenities</h2>
            <AmenitiesComponent amenities={property.amenities} />
          </div>

          <Card className="w-full">
            <CardContent className="p-6">
              <h2 className="text-3xl font-bold mb-2">
                {property.currency} {property.price.toLocaleString()}
              </h2>
              <p className="text-gray-600 mb-6">
                {property.purpose === "sell" ? "For Sale" : "For Rent"}
              </p>
              {session ? (
                <p className="text-gray">Reserve </p>
              ) : (
                <LoginMessage />
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default PropertyDetails;
