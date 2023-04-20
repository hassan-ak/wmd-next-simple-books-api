// Dynamic segment
// Connects to NEON data-base
// get single book
// Returns book details
import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

// Request to delete and oRDER
export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { orderId: string };
  }
) {
  // Get DataBase URL to be used in query
  const DATABASE_URL = process.env.DATABASE_URL;
  // User id from header
  const token = request.headers.get('authorization');
  const userId = token?.split(' ')[1];
  const orderID = params.orderId;
  try {
    // Establish connection with neon db
    // @ts-ignore
    const sql = postgres(DATABASE_URL, { ssl: require });
    // get single order detail from db
    const result = await sql.unsafe(
      ` SELECT
          *
        FROM
          orders
        WHERE
        createdBy='${userId}' AND id='${orderID}'`
    );
    // respond based on response from db
    if (result.length == 0) {
      return NextResponse.json(
        { error: 'No such order Placed' },
        { status: 404 }
      );
    } else {
      return NextResponse.json(result, { status: 200 });
    }
  } catch (error) {
    // if error from db
    return NextResponse.json({ error: 'Error from db' }, { status: 500 });
  }
}

// Request to gET oRDERS
export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: { orderId: string };
  }
) {
  // Get DataBase URL to be used in query
  const DATABASE_URL = process.env.DATABASE_URL;
  // User id from header
  const token = request.headers.get('authorization');
  const userId = token?.split(' ')[1];
  const orderID = params.orderId;
  try {
    // Establish connection with neon db
    // @ts-ignore
    const sql = postgres(DATABASE_URL, { ssl: require });
    // delete single order detail from db
    const result = await sql.unsafe(
      ` DELETE
        FROM
          orders
        WHERE
        createdBy='${userId}' AND id='${orderID}'`
    );
    return NextResponse.json({ deleted: 'Order Deleted' }, { status: 200 });
  } catch (error) {
    // if error from db
    return NextResponse.json({ error: 'Error from db' }, { status: 500 });
  }
}

// Request to place Order
export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: { orderId: string };
  }
) {
  // Get DataBase URL to be used in query
  const DATABASE_URL = process.env.DATABASE_URL;
  // User id from header
  const token = request.headers.get('authorization');
  const userId = token?.split(' ')[1];
  // Generate  access token
  const orderID = params.orderId;
  // try to get cutomerName from body
  try {
    let body = await request.json();
    console.log(body)

    // When nam eand email present in request body
    if (body.customerName != null) {
      // Establish connection with neon db
      // @ts-ignore
      const sql = postgres(DATABASE_URL, { ssl: require });

      try {
        // get single order detail from db
        const result = await sql.unsafe(
          ` SELECT
          *
        FROM
          orders
        WHERE
        createdBy='${userId}' AND id='${orderID}'`
        );
        // respond based on response from db
        if (result.length == 0) {
          return NextResponse.json(
            { error: 'No such order Placed' },
            { status: 404 }
          );
        } else {
          try {
            // update single order detail from db
            const result = await sql.unsafe(
              ` UPDATE 
                  orders
                SET 
                customername = '${body.customerName}'
                WHERE 
                  createdBy='${userId}' AND id='${orderID}'`
            );
            return NextResponse.json(
              { updated: 'Order Updated' },
              { status: 200 }
            );
          } catch (error) {
            // When some error while interacting with db
            return NextResponse.json(
              { error: '*Someting Went Wrong*' },
              { status: 500 }
            );
          }
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
        { error: 'customerName missing in body' },
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
