import type { Metadata } from "next";
import "./globals.css";
import FlyingHoneyBee from "@/components/FlyingHoneyBee";
import Starfield from "@/components/Starfield";

export const metadata: Metadata = {
  title: "Moment in Time",
  description: "Discover what the universe looked like when you arrived.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Fredoka:wght@400;500;600&family=Nunito:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="magic-bg" aria-hidden="true" />
        <Starfield />
        <FlyingHoneyBee />
        {children}
      </body>
    </html>
  );
}
