// Connects to NEON data-base
// get list of books (optional parameters included)
// Returns list of books

import postgres from 'postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Get DataBase URL to be used in query
  const DATABASE_URL = process.env.DATABASE_URL;

  // Get search params from the request
  // Create base query
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const limit = searchParams.get('limit');
  let query: string = ` SELECT 
                          id,name,type,available 
                        FROM 
                          books`;

  // When type is in search params
  // if type other than permitted return error
  // else construct quey
  if (type) {
    if (type === 'fiction' || type === 'non-fiction') {
      query += ` WHERE type='${type}'`;
    } else {
      return NextResponse.json(
        { error: 'type should only be fiction or non-fiction' },
        { status: 400 }
      );
    }
  }

  // When limit is in search params
  // if type other than permitted return error
  // else construct quey
  if (limit) {
    if (Number(limit) >= 1 && Number(limit) <= 20) {
      query += ` LIMIT ${parseInt(limit)}`;
    } else {
      return NextResponse.json(
        { error: 'limit should be between 1 and 20' },
        { status: 400 }
      );
    }
  }
  // Establish connection with neon db
  // @ts-ignore
  const sql = postgres(DATABASE_URL, { ssl: require });
  // try for getting response
  // returns an error in case data feting fails
  try {
    // get response from neon db
    const result = await sql.unsafe(query);
    // return error when no books otherwise return response
    if (result.length === 0) {
      return NextResponse.json({ warning: 'No Books Found' }, { status: 404 });
    } else {
      return NextResponse.json(result, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Someting Went Wrong' }, { status: 500 });
  }
}
