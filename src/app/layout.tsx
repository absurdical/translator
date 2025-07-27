import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Translator",
  description: "Everyone just wants to be understood",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: `'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
          backgroundColor: "#111",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Smiledust Logo — top-left, fixed so it stays put even if page scrolls */}
        <Link
          href="https://smiledust.com"
          style={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            textDecoration: "none",
            color: "#ec4899",
            fontSize: "1.5rem",
            fontWeight: "bold",
            fontFamily: `'Pacifico', cursive`,
            zIndex: 1000,
          }}
          className="smiledust-font"
        >
          smiledust
        </Link>

        {/* Main Content Area */}
        <main style={{ flex: 1 }}>{children}</main>

        {/* Footer */}
        <footer
  style={{
    marginLeft: "12rem", // aligns it with the content area
    backgroundColor: "#111",
    textAlign: "center",
    padding: "0.5rem",
    fontSize: "0.9rem",
    color: "#888",
  }}
>
  © {new Date().getFullYear()} smiledust
</footer>

      </body>
    </html>
  );
}
