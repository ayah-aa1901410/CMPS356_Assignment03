"use client"

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head></head>
            <body>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </body>
    </html>
  );
}
