"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { findProperty } from "@/lib/actions";
import {
  ResidentialSubType,
  CommercialSubType,
  IndustrialSubType,
  LandSubType,
} from "@/interface";

interface PropertySearchFormProps {
  states: string[];
  tempvalue?: string; // Add tempvalue as an optional prop
}

export const PropertySearchForm: React.FC<PropertySearchFormProps> = ({
  states,
  tempvalue,
}) => {
  const renderSelectItems = (subTypes: Record<string, string>) => {
    return Object.entries(subTypes).map(([key, value]) => (
      <SelectItem key={value} value={value}>
        {value}
      </SelectItem>
    ));
  };

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await findProperty(formData);

    if (result.success && result.url) {
      router.push(result.url);
    } else {
      setError(result.error || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid gap-2">
        <Label htmlFor="propertyType">Property Type</Label>
        <Select name="propertyType" required>
          <SelectTrigger className="border-gray_shadow border bg-white-A700">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent className="bg-red-100_01 capitalize">
            {renderSelectItems(ResidentialSubType)}
            {renderSelectItems(CommercialSubType)}
            {renderSelectItems(IndustrialSubType)}
            {renderSelectItems(LandSubType)}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="priceRange">Price Range</Label>
        <Input
          id="priceRange"
          name="priceRange"
          placeholder="₦50000 - ₦5,000,000"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="location">Location</Label>
        <Select name="location" required>
          <SelectTrigger>
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent className="bg-red-100_01">
            {states.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Input type="hidden" id="purpose" name="purpose" value={tempvalue} />
      <Button type="submit" className="w-full bg-black-A700_01 text-white-A700">
        {tempvalue === "rent"
          ? "Search Rentals"
          : tempvalue === "lease"
          ? "Search Lease Alternatives"
          : "Search Sell Alternatives"}
      </Button>
    </form>
  );
};
