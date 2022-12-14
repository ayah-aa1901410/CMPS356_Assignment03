"use client"
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="eng">
        <head></head>
          <body>
            {children}
          </body>
    </html>
  );
}
