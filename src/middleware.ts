// middleware.ts
// Authanticate UserToken
import postgres from 'postgres';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Get base URL to be used in query
  const MIDLEWARE_URL = process.env.MIDLEWARE_URL;

  // Get token from header
  let token = request.headers.get('authorization');

  // Function to check if token is of bearer token type
  function isBearerToken(input: string): boolean {
    const tokenRegex = /^Bearer [a-zA-Z0-9\-._~+/]+=*$/;
    return tokenRegex.test(input);
  }

  // If token present in header proceed
  if (token) {
    // If token is a bearer token
    if (isBearerToken(token)) {
      // get actual user ID
      const userId = token.split(' ')[1];
      // call for-middleware self api to authanticate user from db
      try {
        // fetch request to self api
        // send auth token in header
        let res: any = await fetch(`${MIDLEWARE_URL}/api/for-middleware`, {
          headers: {
            Authorization: userId,
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });
        // APi response
        const data = await res.json();
        // If error returns from aoi
        if (data.dbError) {
          return NextResponse.json(
            { error: 'Someting Went Wrong on db' },
            { status: 500 }
          );
        }
        // No user registered in db
        if (data.noUser) {
          return NextResponse.json(
            { error: 'No such user registered' },
            { status: 404 }
          );
        }
        // When user in db redirect to actual api
        return NextResponse.rewrite(new URL(request.url));
      } catch (error) {
        // When some error while interacting with db
        return NextResponse.json(
          { error: 'Someting Went Wrong on db' },
          { status: 500 }
        );
      }
    }
    // If token provided is not a bearer token
    else {
      return NextResponse.json(
        { error: 'Wrong Authorization header (re-check).' },
        { status: 401 }
      );
    }
  }
  // If no token in header return an error message
  else {
    return NextResponse.json(
      { error: 'Missing Authorization header.' },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: '/api/orders/:path*',
};
