import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

export async function GET() {
  try {
    const imageKitAuthentication = imagekit.getAuthenticationParameters();
    return NextResponse.json(imageKitAuthentication);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
