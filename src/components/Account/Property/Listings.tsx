"use client";
import { PropertyCard } from "@/components/Property/PropertyCard";
import { IProperty } from "@/interface/property";
import React, { useState } from "react";

interface ListingsProps {
  properties: IProperty[];
}

const Listings: React.FC<ListingsProps> = ({ properties }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty,
  );

  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col min-h-[50dvh]">
      <div className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProperties.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No properties at the moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-auto py-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center flex-wrap">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-2 mx-1 border rounded ${
            number === currentPage
              ? "bg-black-A700_01 text-white-A700"
              : "bg-white-A700 text-black-A700_01"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Listings;
