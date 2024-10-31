// File: app/account/types.ts
import { LucideIcon } from "lucide-react";
import {
  UserIcon,
  ShieldIcon,
  HomeIcon,
  UsersIcon,
  CreditCardIcon,
  SettingsIcon,
  // LogOutIcon,
} from "lucide-react";

export type NavItemId =
  | "profile"
  | "admin"
  | "properties"
  | "tenants"
  | "rent"
  | "settings";
export type UserRole = "admin" | "landlord" | "tenant";

export interface NavItem {
  id: NavItemId;
  label: string;
  icon: LucideIcon;
  roles: UserRole[];
}
export const navItems: NavItem[] = [
  {
    id: "profile",
    label: "Profile",
    icon: UserIcon,
    roles: ["admin", "landlord", "tenant"],
  },
  { id: "admin", label: "Admin Dashboard", icon: ShieldIcon, roles: ["admin"] },
  {
    id: "properties",
    label: "Properties",
    icon: HomeIcon,
    roles: ["admin", "landlord"],
  },
  {
    id: "tenants",
    label: "Tenants",
    icon: UsersIcon,
    roles: ["admin", "landlord"],
  },
  {
    id: "rent",
    label: "Rent Payments",
    icon: CreditCardIcon,
    roles: ["tenant"],
  },
  {
    id: "settings",
    label: "Settings",
    icon: SettingsIcon,
    roles: ["admin", "landlord", "tenant"],
  },
];
