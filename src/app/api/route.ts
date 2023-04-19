// Entry point of the api
// Returns a JSON object with welcome message

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Welcome to the Simple Books API.' });
}
