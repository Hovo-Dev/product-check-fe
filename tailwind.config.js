/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
          '1xl': '0 4px 4px 0 rgba(0, 0, 0, .25)',
          '2xl': '0 5px 10px 0 rgba(169, 169, 169, 1)',
      },
      colors: {
        error100: '#ef4444',
        gray100: '#4b5563',
        gray200: '#5B5B5B',
        gray300: '#363636',
      },
      fontFamily: {
        inter: ["Inter"],
      },
      fontSize: {
        xs: [
          "16px",
          {
            lineHeight: "18px",
            fontWeight: "400",
          },
        ],
        sm: [
          "18px",
          {
            lineHeight: "22px",
            fontWeight: "400",
          },
        ],
        md: [
          "20px",
          {
            lineHeight: "26px",
            fontWeight: "400",
          },
        ],
        lg: [
          "20px",
          {
            lineHeight: "26px",
            fontWeight: "600",
          },
        ],
        xl: [
          "24px",
          {
            lineHeight: "30px",
            fontWeight: "400",
          },
        ],
      },
    },
  },
  plugins: [],
};
