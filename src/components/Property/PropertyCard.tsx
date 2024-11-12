import Image from "next/image";
import Link from "next/link";
import { FaBed, FaLocationDot } from "react-icons/fa6";
import { PiShowerBold } from "react-icons/pi";
import { SlSizeActual } from "react-icons/sl";
import { MdOutlineAccountTree } from "react-icons/md";
import { IProperty } from "@/interface/property";
import { formatPrice } from "@/lib/utils";

interface PropertyCardProps {
  property: IProperty;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => (
  <div className="bg-deep_orange-50 rounded-lg border border-gray-200 shadow-md overflow-hidden flex flex-col">
    <div className="relative w-full pt-[66.67%]">
      <Image
        src={property.imagesUrl[0]}
        alt={property.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg font-bold mb-2 line-clamp-2">{property.title}</h3>
      <p className="text-muted-foreground text-sm font-semibold mb-4 flex items-center gap-2">
        <FaLocationDot className="flex-shrink-0" />
        <span className="line-clamp-1">{property.address}</span>
      </p>
      <div className="text-gray-600 text-sm grid grid-cols-2 gap-2 mb-4">
        {property.bedrooms > 0 && (
          <p className="flex items-center gap-1">
            <FaBed className="flex-shrink-0" />
            <span>
              {property.bedrooms} {property.bedrooms > 1 ? "Beds" : "Bed"}
            </span>
          </p>
        )}
        {property.bathrooms > 0 && (
          <p className="flex items-center gap-1">
            <PiShowerBold className="flex-shrink-0" />
            <span>
              {property.bathrooms} {property.bathrooms > 1 ? "Baths" : "Bath"}
            </span>
          </p>
        )}
        <p className="flex items-center gap-1">
          <SlSizeActual className="flex-shrink-0" />
          <span>{property.size} sq ft</span>
        </p>
        <p className="flex items-center gap-1">
          <MdOutlineAccountTree className="flex-shrink-0" />
          <span className="capitalize">{property.purpose}</span>
        </p>
      </div>
      <div className="mt-auto flex flex-wrap items-center justify-between">
        <Link
          href={`/property/${property._id}`}
          className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary-dark transition-colors bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90"
        >
          View Details
        </Link>
        <span className="text-primary font-semibold">
          ₦{formatPrice(property.price)}
        </span>
      </div>
    </div>
  </div>
);
