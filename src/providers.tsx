"use client";

import React from "react";
import { ImageKitProvider } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/Navbar";

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const authenticator = async () => {
    try {
      const response = await fetch("/api/imagekit-auth");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error}`);
    }
  };

  return (
    <SessionProvider refetchInterval={15 * 60}>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" />
        <ImageKitProvider
          publicKey={publicKey}
          urlEndpoint={urlEndpoint}
          authenticator={authenticator}
        >
          <Navbar />
          {children}
        </ImageKitProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
