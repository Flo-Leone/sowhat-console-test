import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        // Brand colors
        golden: {
          DEFAULT: "hsl(var(--golden-pollen))",
          50: "hsl(44 100% 97%)",
          100: "hsl(44 100% 92%)",
          200: "hsl(44 100% 82%)",
          300: "hsl(44 100% 72%)",
          400: "hsl(44 100% 67%)",
          500: "hsl(var(--golden-pollen))",
          600: "hsl(40 100% 55%)",
          700: "hsl(38 100% 45%)",
        },
        orange: {
          DEFAULT: "hsl(var(--vivid-orange))",
          vivid: "hsl(var(--vivid-orange))",
        },
        carbon: {
          DEFAULT: "hsl(var(--carbon-black))",
          light: "hsl(0 0% 25%)",
        },
        cream: {
          DEFAULT: "hsl(var(--floral-white))",
          light: "hsl(var(--porcelain))",
        },
        jungle: "hsl(var(--jungle-green))",
        coral: {
          DEFAULT: "hsl(var(--coral-glow))",
          light: "hsl(var(--coral-peach))",
        },
        bluebell: "hsl(var(--blue-bell))",
        lavender: "hsl(var(--soft-lavender))",
        
        // Semantic tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        topbar: {
          DEFAULT: "hsl(var(--topbar-background))",
          foreground: "hsl(var(--topbar-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      fontFamily: {
        sans: ["Roboto", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["Plus Jakarta Sans", "Roboto", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
      },
      spacing: {
        "4.5": "1.125rem",
        "18": "4.5rem",
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 2px 8px 0 rgba(0, 0, 0, 0.04), 0 4px 16px 0 rgba(0, 0, 0, 0.03)",
        card: "0 0 0 1px hsl(var(--border)), 0 2px 4px 0 rgba(0, 0, 0, 0.02), 0 4px 12px 0 rgba(0, 0, 0, 0.04)",
        elevated: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 20px -3px rgba(0, 0, 0, 0.08), 0 20px 40px -5px rgba(0, 0, 0, 0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(16px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out forwards",
        "slide-in": "slide-in-right 0.25s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
