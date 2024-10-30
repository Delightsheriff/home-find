import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue_gray: {
          "100": "#d9d8d6",
          "600": "#6d6f85",
          "100_alt": "#d6d6d6",
          "100_alt2": "#cfcfcf",
          "100_33": "#d1acb331",
          "100_alt3": "#cddff5",
        },
        deep_orange: {
          "50": "#fbede4",
          "300": "#f2b69d",
          "400": "#ff8d54",
          "900": "#8f3b13",
        },
        gray: {
          "50": "#f6f6f5",
          "100": "#e8e8e6",
          "200": "#dddcda",
          "300": "#c4c4c2",
          "400": "#a4a4a4",
          "500": "#828282",
          "600": "#636363",
          "700": "#515151",
          "800": "#393939",
          "900_01": "#2c2c2c",
          "50_01": "#f9f9f9",
          "50_02": "#f8f8f8",
          "600_01": "#7c7c7c",
          "600_02": "#6d6d6e",
          "700_01": "#4b4b4b33",
          "900_02": "#31313f",
        },
        orange: { A700: "#ff6d00" },
        red: { "100": "#ffcbc6", "100_01": "#ecd6c8" },
        white: { A700: "#ffffff" },
        yellow: { "50": "#ffffa0" },
        black: { "600": "#565656", A700_01: "#000000" },
        gray_shadow: "#00000029",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animate],
};
export default config;
