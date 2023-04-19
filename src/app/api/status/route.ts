// Status of the api
// Returns a JSON object with Api Status

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({ status: 'OK' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 'ERROR' }, { status: 500 });
  }
}
