// Orders API
import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';
import { v4 as uuidv4 } from 'uuid';

// Request to place Order
export async function POST(request: NextRequest) {
  // Get DataBase URL to be used in query
  const DATABASE_URL = process.env.DATABASE_URL;
  // User id from header
  const token = request.headers.get('authorization');
  const userId = token?.split(' ')[1];
  // Generate  access token
  const orderId = uuidv4();
  // try to get bookID and cutomerName from body
  try {
    let body = await request.json();
    // When nam eand email present in request body
    if (body.bookId != null && body.customerName != null) {
      // Establish connection with neon db
      // @ts-ignore
      const sql = postgres(DATABASE_URL, { ssl: require });

      try {
        // Get book data from db
        const result = await sql.unsafe(
          ` SELECT
              id,available
            FROM
              books
            WHERE
              id=${body.bookId}`
        );
        // if no book returned against book id
        if (result.length == 0) {
          return NextResponse.json(
            { error: 'no such book in database' },
            { status: 404 }
          );
        }
        //  If book not available
        if (!result[0].available) {
          return NextResponse.json(
            { error: 'This book is not in stock. Try again later.' },
            { status: 404 }
          );
        }
        try {
          // place order in db
          const result1 = await sql.unsafe(
            ` INSERT 
                INTO 
              orders 
                (id,bookId,customerName,createdBy)
              VALUES
                ('${orderId}','${body.bookId}', '${body.customerName}', '${userId}')`
          );
          return NextResponse.json(
            {
              created: true,
              orderId: orderId,
            },
            { status: 200 }
          );
        } catch (error) {
          // When some error while placing order
          return NextResponse.json(
            { error: 'Unable to place order' },
            { status: 500 }
          );
        }
      } catch (error) {
        // When some error while interacting with db
        return NextResponse.json(
          { error: 'Someting Went Wrong' },
          { status: 500 }
        );
      }
    }
    // returns error message when bookId and customerName not present in request body
    else {
      return NextResponse.json(
        { error: 'bookId or customerName missing in body' },
        { status: 400 }
      );
    }
  } catch (error) {
    // if body not found returns error
    return NextResponse.json(
      { error: 'Missing / Invalid Body in the request' },
      { status: 400 }
    );
  }
}

// Request to gET oRDERS
export async function GET(request: NextRequest) {
  // Get DataBase URL to be used in query
  const DATABASE_URL = process.env.DATABASE_URL;
  // User id from header
  const token = request.headers.get('authorization');
  const userId = token?.split(' ')[1];
  try {
    // Establish connection with neon db
    // @ts-ignore
    const sql = postgres(DATABASE_URL, { ssl: require });
    // Get orders from db
    const result = await sql.unsafe(
      ` SELECT
          *
        FROM
          orders
        WHERE
        createdBy='${userId}'`
    );
    // Return response based on response from db
    if (result.length == 0) {
      return NextResponse.json({ error: 'No orders Placed' }, { status: 404 });
    } else {
      return NextResponse.json(result, { status: 200 });
    }
  } catch (error) {
    // if body not found returns error
    return NextResponse.json({ error: 'Error from db' }, { status: 500 });
  }
}
