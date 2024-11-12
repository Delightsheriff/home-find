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

export interface IProperty {
  _id: string;
  owner: string;
  title: string;
  purpose: string;
  amenities: IAmenities;
  slots: number;
  description: string;
  bedrooms: number;
  bathrooms: number;
  address: string;
  stateCapital: string;
  isVerified: boolean;
  size: number;
  toilets: number;
  propertyType: string;
  subType: string;
  verificationStatus: string;
  imagesUrl: string[];
  videoUrl?: string;
  ownerShipDocumentUrl: string;
  price: number;
  currency: string;
  lastUpdated: Date;
  reviewComments?: string;
  reviewedBy?: string;
  reviewedAt?: Date;
}

export enum PropertyType {
  RESIDENTIAL = "residential",
  COMMERCIAL = "commercial",
  INDUSTRIAL = "industrial",
}
export enum Purpose {
  Rent = "rent",
  // Sell = "sell",
  // Lease = "lease",
}

export enum ResidentialSubType {
  BoysQuarters = "boysQuarters",
  Bungalow = "bungalow",
  Duplex = "duplex",
  SelfContain = "selfContain",
  Penthouse = "penthouse",
  MiniFlat = "miniFlat",
}

export enum CommercialSubType {
  Hotel = "hotel",
  OfficeSpace = "officeSpace",
  Shop = "shop",
  Restaurant = "restaurant",
  EventCenter = "eventCenter",
  School = "school",
  Hospital = "hospital",
  FillingStation = "fillingStation",
  Workshop = "workshop",
  Showroom = "showroom",
  PrivateOffice = "privateOffice",
}

export enum IndustrialSubType {
  Warehouse = "warehouse",
  Factory = "factory",
}

export enum Currency {
  NGN = "NGN",
  USD = "USD",
  EUR = "EUR",
}
