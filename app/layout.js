"use client"
import { BrowserRouter } from "react-router-dom";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head></head>
          <BrowserRouter>
            <body>
                {children}
            </body>
          </BrowserRouter>
    </html>
  );
}
