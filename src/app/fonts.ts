import localFont from "next/font/local";

export const FontInstrumantSans = localFont({
  src: [
    {
      path: "../assets/fonts/InstrumentSans-Bold.woff2",
      weight: "bold",
      style: "normal",
    },
    {
      path: "../assets/fonts/InstrumentSans-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
  ],
  variable: "--font-instrument-sans",
});
