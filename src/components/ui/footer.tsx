import React from "react";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Our Team", href: "#" },
      { label: "Careers", href: "#" },
      { label: "News", href: "#" },
    ],
  },
  {
    title: "Properties",
    links: [
      { label: "Residential", href: "/property" },
      { label: "Commercial", href: "/property" },
      { label: "Luxury", href: "/property" },
      { label: "New Listings", href: "/property" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Property Management", href: "#" },
      { label: "Mortgage Services", href: "#" },
      { label: "Consulting", href: "#" },
      { label: "Legal Assistance", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQs", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Customer Service", href: "#" },
      { label: "Site Map", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Refund Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

const FooterSection: React.FC<FooterSection> = ({ title, links }) => (
  <div className="grid gap-4">
    <h4 className="text-lg font-semibold">{title}</h4>
    <nav className="grid gap-2">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="text-muted-foreground hover:underline"
          prefetch={false}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  </div>
);

const Footer: React.FC = () => (
  <footer className="w-full py-6 ">
    <div className="container mx-auto">
      <div className="px-3 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {footerSections.map((section) => (
            <FooterSection key={section.title} {...section} />
          ))}
        </div>
        <div className="text-sm text-center mt-5">
          &copy; {new Date().getFullYear()} Delight Amadi-Sheriff. All rights
          reserved.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
