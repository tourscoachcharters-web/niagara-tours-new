import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  // Upload the file to Vercel Blob
  const blob = await put(filename, request.body, {
    access: 'public', // Makes the image viewable on your website
  });

  // Return the new live URL to your dashboard
  return NextResponse.json(blob);
}