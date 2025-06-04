/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    fontFamily: {
      Poppins: "Poppins",
      Paprika: "Paprika",
      Inria: "Inria Serif",
    },
    container: {
      center: true,
      padding: "4rem",
    },
    extend: {
      colors: {
        dark_primary: "#0f172a",
        bg_light_primary: "rgba(103, 232, 249, 0.1)",
        gray: "#93c5fd",
        cyan: {
          light: "#67e8f9",
          DEFAULT: "#22d3ee",
          dark: "#0891b2"
        },
        navy: {
          light: "rgba(30, 30, 50, 0.95)",
          DEFAULT: "#0f172a",
          dark: "rgba(15, 15, 35, 0.95)"
        },
        light: {
          primary: "#f0fdff",
          secondary: "#e0f7fa",
          accent: "#00acc1",
          text: "#164e63",
          background: "#ffffff"
        },
        dark: {
          primary: "#1e293b",
          secondary: "#334155",
          accent: "#67e8f9",
          text: "#e0f2fe",
          background: "#0f172a"
        }
      },
      backgroundImage: {
        primaryLinear: "linear-gradient(135deg, #67e8f9 0%, #0891b2 100%)",
        darkGradient: "linear-gradient(165deg, rgba(30, 30, 50, 0.95) 0%, rgba(15, 15, 35, 0.95) 100%)",
        lightGradient: "linear-gradient(165deg, rgba(240, 253, 255, 0.95) 0%, rgba(224, 247, 250, 0.95) 100%)",
      },
      dropShadow: {
        primary: "0 0 20px rgba(103, 232, 249, 0.3)",
        glow: "0 0 10px rgba(103, 232, 249, 0.5)",
        'glow-light': "0 0 10px rgba(0, 172, 193, 0.3)"
      },
      animation: {
        glow: 'glow 3s linear infinite',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
};
