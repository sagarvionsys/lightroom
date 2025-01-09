"use client";

import React from "react";
import { ImageKitProvider } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";
import axios from "axios";

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;

export default function Providers({ children }: { children: React.ReactNode }) {
  const authenticator = async () => {
    try {
      const { data } = await axios.get("/api/imagekit-auth");
      return data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data ||
        error.message ||
        "Image-Kit authentication failed";
      throw new Error(`Authentication request failed: ${errorMessage}`);
    }
  };

  return (
    <SessionProvider refetchInterval={15 * 60}>
      <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        {children}
      </ImageKitProvider>
    </SessionProvider>
  );
}
