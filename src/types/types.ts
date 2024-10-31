// File: app/account/types.ts
import { LucideIcon } from "lucide-react";

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
