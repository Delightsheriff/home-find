import {
  Sofa,
  Car,
  Dumbbell,
  Wifi,
  UtensilsCrossed,
  PawPrint,
  Cigarette,
  Flame,
  Tv,
  AirVent,
  Thermometer,
  ShieldCheck,
  Camera,
  Church,
  Lock,
  Droplet,
  Zap,
} from "lucide-react";
import { FaMosque, FaWheelchair } from "react-icons/fa6";
import { MdBalcony, MdElevator, MdPool } from "react-icons/md";

export interface IAmenities {
  furnished: boolean;
  parking: boolean;
  gym: boolean;
  swimmingPool: boolean;
  internet: boolean;
  balcony: boolean;
  elevator: boolean;
  wheelchair: boolean;
  dishwasher: boolean;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  fireplace: boolean;
  cableTv: boolean;
  airConditioning: boolean;
  heating: boolean;
  securitySystem: boolean;
  cctv: boolean;
  churchNearby: boolean;
  mosqueNearby: boolean;
  security: boolean;
  waterSupply: boolean;
  electricity: boolean;
}

const amenityIcons = {
  furnished: Sofa,
  parking: Car,
  gym: Dumbbell,
  swimmingPool: MdPool,
  internet: Wifi,
  balcony: MdBalcony,
  elevator: MdElevator,
  wheelchair: FaWheelchair,
  dishwasher: UtensilsCrossed,
  petsAllowed: PawPrint,
  smokingAllowed: Cigarette,
  fireplace: Flame,
  cableTv: Tv,
  airConditioning: AirVent,
  heating: Thermometer,
  securitySystem: ShieldCheck,
  cctv: Camera,
  churchNearby: Church,
  mosqueNearby: FaMosque,
  security: Lock,
  waterSupply: Droplet,
  electricity: Zap,
};

const amenityLabels = {
  furnished: "Furnished",
  parking: "Parking",
  gym: "Gym",
  swimmingPool: "Swimming Pool",
  internet: "Internet",
  balcony: "Balcony",
  elevator: "Elevator",
  wheelchair: "Wheelchair Accessible",
  dishwasher: "Dishwasher",
  petsAllowed: "Pets Allowed",
  smokingAllowed: "Smoking Allowed",
  fireplace: "Fireplace",
  cableTv: "Cable TV",
  airConditioning: "Air Conditioning",
  heating: "Heating",
  securitySystem: "Security System",
  cctv: "CCTV",
  churchNearby: "Church Nearby",
  mosqueNearby: "Mosque Nearby",
  security: "Security",
  waterSupply: "Water Supply",
  electricity: "Electricity",
};

interface AmenitiesProps {
  amenities?: Partial<IAmenities>;
}

export function AmenitiesComponent({ amenities }: AmenitiesProps) {
  if (!amenities || typeof amenities !== "object") {
    return null; // or return a placeholder component
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Object.entries(amenities).map(([key, value]) => {
        if (value) {
          const IconComponent = amenityIcons[key as keyof IAmenities];
          return IconComponent ? (
            <div key={key} className="flex items-center">
              <IconComponent className="w-6 h-6 mr-2" />
              <span>{amenityLabels[key as keyof IAmenities]}</span>
            </div>
          ) : null;
        }
        return null;
      })}
    </div>
  );
}
