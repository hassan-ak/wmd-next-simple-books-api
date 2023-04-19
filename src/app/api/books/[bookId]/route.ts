// Dynamic segment
// Connects to NEON data-base
// get single book
// Returns book details
import { NextResponse } from 'next/server';
import postgres from 'postgres';

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { bookId: string };
  }
) {
  // Get DataBase URL to be used in query
  const DATABASE_URL = process.env.DATABASE_URL;

  // Get book id from params
  const bookId = params.bookId;
  console.log(bookId);
  // if book id is not a valid number
  // returns an error message
  if (isNaN(Number(bookId))) {
    return NextResponse.json(
      { error: 'provide a valid bookId' },
      { status: 400 }
    );
  }
  // Establish connection with neon db
  // @ts-ignore
  const sql = postgres(DATABASE_URL, { ssl: require });
  // try for getting response
  // returns an error in case data fetching fails
  try {
    // get response from neon db
    const result = await sql.unsafe(
      ` SELECT
          *
        FROM
          books
        WHERE
          id=${parseInt(bookId)}`
    );
    console.log(result);
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
