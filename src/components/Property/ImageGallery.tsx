"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ImageType = string;

interface ImageGalleryProps {
  images: ImageType[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const handleThumbnailClick = (index: number) => {
    setMainImageIndex(index);
  };

  const handlePrevious = () => {
    setMainImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setMainImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const visibleThumbnails = showAll ? images.slice(1) : images.slice(1, 4);

  return (
    <div className="w-full space-y-2">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={images[mainImageIndex]}
          alt="Property image"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition-all duration-300 hover:scale-105"
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous image</span>
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md"
          onClick={handleNext}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next image</span>
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {visibleThumbnails.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-200"
            onClick={() => handleThumbnailClick(index + 1)}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 2}`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
              className="transition-all duration-300 hover:scale-105"
            />
          </div>
        ))}
        {!showAll && images.length > 4 && (
          <Button
            variant="secondary"
            className="relative aspect-square w-full"
            onClick={() => setShowAll(true)}
          >
            <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
              +{images.length - 4} more
            </span>
          </Button>
        )}
      </div>
    </div>
  );
}
