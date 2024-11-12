"use client";

import * as React from "react";
import {
  Check,
  ChevronsUpDown,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { nigerianStates } from "../../lib/utils";
import {
  CommercialSubType,
  IndustrialSubType,
  IProperty,
  ResidentialSubType,
} from "@/interface/property";
import { PropertyCard } from "./PropertyCard";

const renderSelectItems = (subTypes: Record<string, string>) => {
  return Object.entries(subTypes).map(([key, value]) => (
    <SelectItem key={key} value={key}>
      {value}
    </SelectItem>
  ));
};

const ITEMS_PER_PAGE = 12;

export default function PropertyListingClient({
  initialProperties,
}: {
  initialProperties: IProperty[];
}) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedState, setSelectedState] = React.useState<string>("");
  const [openState, setOpenState] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = React.useState<{
    bedrooms?: number;
    bathrooms?: number;
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
  }>({});
  const [properties] = React.useState<IProperty[]>(initialProperties);
  const [currentPage, setCurrentPage] = React.useState(1);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesState =
      !selectedState || property.stateCapital === selectedState;
    const matchesBedrooms =
      !selectedFilters.bedrooms ||
      property.bedrooms >= selectedFilters.bedrooms;
    const matchesBathrooms =
      !selectedFilters.bathrooms ||
      property.bathrooms >= selectedFilters.bathrooms;
    const matchesPropertyType =
      !selectedFilters.propertyType ||
      property.propertyType === selectedFilters.propertyType;
    const matchesPrice =
      (!selectedFilters.minPrice ||
        property.price >= selectedFilters.minPrice) &&
      (!selectedFilters.maxPrice || property.price <= selectedFilters.maxPrice);

    return (
      matchesSearch &&
      matchesState &&
      matchesBedrooms &&
      matchesBathrooms &&
      matchesPropertyType &&
      matchesPrice
    );
  });

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedState, selectedFilters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Property</h1>

      <div className="grid gap-4 md:gap-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Popover open={openState} onOpenChange={setOpenState}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openState}
                className="justify-between min-w-[200px]"
              >
                {selectedState || "Select state..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search state..." />
                <CommandEmpty>No state found.</CommandEmpty>
                <CommandGroup>
                  {nigerianStates.map((state) => (
                    <CommandItem
                      key={state}
                      value={state}
                      onSelect={(currentValue: string) => {
                        setSelectedState(
                          currentValue === selectedState ? "" : currentValue,
                        );
                        setOpenState(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedState === state ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {state}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-wrap gap-4">
          <Select
            onValueChange={(value) =>
              setSelectedFilters((prev) => ({
                ...prev,
                bedrooms: parseInt(value),
              }))
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Bedrooms" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}+ Beds
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) =>
              setSelectedFilters((prev) => ({
                ...prev,
                bathrooms: parseInt(value),
              }))
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Bathrooms" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}+ Baths
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            name="propertyType"
            required
            onValueChange={(value) =>
              setSelectedFilters((prev) => ({
                ...prev,
                propertyType: value,
              }))
            }
          >
            <SelectTrigger className="w-[200px] border-gray_shadow border bg-white-A700">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent className="bg-red-100_01 capitalize">
              {renderSelectItems(ResidentialSubType)}
              {renderSelectItems(CommercialSubType)}
              {renderSelectItems(IndustrialSubType)}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) =>
              setSelectedFilters((prev) => ({
                ...prev,
                minPrice: parseInt(value),
              }))
            }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Min Price" />
            </SelectTrigger>
            <SelectContent>
              {[100000, 500000, 1000000, 5000000].map((price) => (
                <SelectItem key={price} value={price.toString()}>
                  ₦{price.toLocaleString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) =>
              setSelectedFilters((prev) => ({
                ...prev,
                maxPrice: parseInt(value),
              }))
            }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Max Price" />
            </SelectTrigger>
            <SelectContent>
              {[1000000, 5000000, 10000000, 50000000].map((price) => (
                <SelectItem key={price} value={price.toString()}>
                  ₦{price.toLocaleString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active filters */}
        {Object.keys(selectedFilters).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(
              ([key, value]) =>
                value && (
                  <Button
                    key={key}
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      setSelectedFilters((prev) => ({
                        ...prev,
                        [key]: undefined,
                      }))
                    }
                    className="h-7 text-xs"
                  >
                    {key}: {value}
                    <X className="ml-2 h-3 w-3" />
                  </Button>
                ),
            )}
          </div>
        )}
      </div>

      <Separator className="my-6" />

      {/* Property grid */}
      {paginatedProperties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
              // <Card key={property._id}>
              //   <CardContent className="p-4">
              //     <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
              //       <img
              //         src={property.imagesUrl[0]}
              //         alt={property.title}
              //         className="object-cover w-full h-full"
              //       />
              //     </div>
              //     <h3 className="font-semibold mb-2">{property.title}</h3>
              //     <p className="text-sm text-muted-foreground mb-2">
              //       {property.address}
              //     </p>
              //     <div className="flex justify-between items-center">
              //       <span className="font-bold">
              //         ₦{property.price.toLocaleString()}
              //       </span>
              //       <div className="text-sm text-muted-foreground">
              //         {property.bedrooms} beds • {property.bathrooms} baths
              //       </div>
              //     </div>
              //   </CardContent>
              // </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No properties found</h2>
          <p className="text-muted-foreground mb-8">
            We couldn&apos;t find any properties matching your current filters.
            Try adjusting your search criteria.
          </p>
          <Button
            onClick={() => {
              setSearchQuery("");
              setSelectedState("");
              setSelectedFilters({});
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
