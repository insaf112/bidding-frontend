/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontSize: {
        h1: ["62px", { lineHeight: "1.2" }], // h1 font size and line-height
        h2: ["48px", { lineHeight: "1.2" }], // h2 font size and line-height
        h3: ["32px", { lineHeight: "1.2" }], // h3 font size and line-height
      },
      fontWeight: {
        heading: "700", // Default font weight for headings
      },
      fontFamily: {
        monument: ["MonumentExtended", "sans-serif"], // Assuming Monument font family
      },
    },
    colors: {
      primary: "#018DF0",
      secondary: "#CCCCF5",
      white: "#ffffff",
      black: "#000000 ",
      tertiary: "#E7F6FD",
      neutral1: "#25324B",
      neutral2: "#515B6F",
      neutral3: "#7C8493",
      neutral4: "#A8ADB7",
      neutral5: "#E4E5E7",
      neutral6: "#F9FAFC",
      neutral7: "#F8F8FD",
      button: "#4640DE",
      yellow: "#FFB836",
      green: "#56CDAD",
      red: "#FF6550",
      blue: "#26A4FF",
      purple: "#7B61FF",
    },
    fontFamily: {
      sans: ['"Inter"', "sans-serif"],
      monument: ["MonumentExtended", "sans-serif"],
      epilogue: ["Epilogue", "sans-serif"],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".maxW": {
          width: "1192px",
          maxWidth: "1192px", // Adjust the padding value as needed
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]); // Specify variants if needed
    },

    function ({ addComponents }) {
      addComponents({
        ".h1": {
          "@apply text-h1 font-monument font-normal": {}, // Applying Monument font and regular font weight
        },
        ".h2": {
          "@apply text-h2 font-monument font-normal": {}, // Applying Monument font and regular font weight
        },
        ".h3": {
          "@apply text-h3 font-monument font-normal": {}, // Applying Monument font and regular font weight
        },
        // Add more heading levels as needed
      });
    },
  ],
};
