import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      serif: ["Montserrat", "serif"],
    },
    extend: {
      screens: {
        editor: "1200px",
      },
      fontFamily: {
        primary: ["Montserrat", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "linear-gradient":
          "(to right, linear-gradient(180deg, var(--colorThemePrimary) 0%, var(--colorThemeSecondary) 100%))",
      },
      colors: {
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        themePrimary: "var(--colorThemePrimary)",
        themeSecondary: "var(--colorThemeSecondary)",
        themeTextColor: "var(--themeText)",
        themeShadow: "var(--themethemeShadow)",
        themeSoftBg: "var(--themeLightBg)",
        inputBorder: "var(--themeBorder)",
        primary: "var(--colorThemePrimary)",
        secondary: "var(--colorThemeSecondary)",
        tertiary: "var(--colorThemeTertiary)",
        chat: {
          actions: "#D8E4F2",
          activeChat: "#D8E4F2",
          selected: "#C9DDF4",
          userbg: "#CFE2F642",
          message: "#EBF2F9",
        },
        gray: {
          "900": "var(--themeLightGray)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        chat: "8px",
      },
      borderColor: {
        sm: "rgba(0, 0, 0, 0.10)",
      },
      boxShadow: {
        cardshadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.19)",
      },
      dropShadow: {
        drop: "1px 1px 2px rgba(0, 0, 0, 0.20)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      zIndex: {
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;

export default config;
