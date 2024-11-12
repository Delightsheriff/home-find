"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { nigerianStates } from "@/lib/utils";
import {
  CommercialSubType,
  IndustrialSubType,
  ResidentialSubType,
  IProperty,
} from "@/interface/property";
import Link from "next/link";
import Image from "next/image";

interface PropertySearchFormProps {
  tempvalue?: string;
  properties: IProperty[];
}

export const PropertySearchForm: React.FC<PropertySearchFormProps> = ({
  tempvalue,
  properties,
}) => {
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<IProperty[]>([]);

  const renderSelectItems = (subTypes: Record<string, string>) => {
    return Object.entries(subTypes).map(([value]) => (
      <SelectItem key={value} value={value}>
        {value}
      </SelectItem>
    ));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const results = properties.filter(
      (property) =>
        (!selectedLocation || property.stateCapital === selectedLocation) &&
        (!selectedType || property.propertyType === selectedType) &&
        (!selectedPrice ||
          property.price <=
            parseInt(selectedPrice.split("-")[1].replace("k", "000"))) &&
        property.purpose === tempvalue,
    );
    setSearchResults(results);
    setIsDialogOpen(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* {error && <div className="text-red-500">{error}</div>} */}
        <div className="grid gap-2">
          <Label htmlFor="propertyType">Property Type</Label>
          <Select name="propertyType" required onValueChange={setSelectedType}>
            <SelectTrigger className="border-gray_shadow border bg-white-A700">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent className="bg-red-100_01 capitalize">
              {renderSelectItems(ResidentialSubType)}
              {renderSelectItems(CommercialSubType)}
              {renderSelectItems(IndustrialSubType)}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="priceRange">Price Range</Label>
          <Select onValueChange={setSelectedPrice}>
            <SelectTrigger className="h-12 bg-white">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-100k">₦0 - ₦100,000</SelectItem>
              <SelectItem value="100k-200k">₦100,000 - ₦200,000</SelectItem>
              <SelectItem value="200k-300k">₦200,000 - ₦300,000</SelectItem>
              <SelectItem value="300k+">₦300,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Select name="location" required onValueChange={setSelectedLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent className="bg-red-100_01">
              {nigerianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Input type="hidden" id="purpose" name="purpose" value={tempvalue} />
        <Button
          type="submit"
          className="w-full bg-black-A700_01 text-white-A700"
        >
          {tempvalue === "rent"
            ? "Search Rentals"
            : tempvalue === "lease"
            ? "Search Lease Alternatives"
            : "Search Sell Alternatives"}
        </Button>
      </form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Search Results
            </DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>
          <ScrollArea className="h-[500px] w-full rounded-md border p-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.length > 0 ? (
                searchResults.map((property) => (
                  <Link
                    href={`/property/${property._id}`}
                    key={property._id}
                    className="block"
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={property.imagesUrl[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-white text-black">
                          {property.propertyType}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                          {property.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="line-clamp-1">
                            {property.address}
                            {property.stateCapital}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No properties found matching your criteria.
                </p>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};
