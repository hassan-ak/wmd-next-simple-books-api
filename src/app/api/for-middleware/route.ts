// APi to intract with middleware
import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

export async function GET(request: NextRequest) {
  // Get DataBase URL to be used in query
  const DATABASE_URL = process.env.DATABASE_URL;
  // User id from header
  const userID = request.headers.get('authorization');

  // Establish connection with neon db
  // @ts-ignore
  const sql = postgres(DATABASE_URL, { ssl: require });
  try {
    // Get user details from users table for specified email
    const result = await sql.unsafe(
      ` SELECT 
            * 
        FROM 
            users 
        WHERE 
            accessToken='${userID}'`
    );
    // IF No record found for said id
    // return error msg for no user
    if (result.length === 0) {
      return new Response(JSON.stringify({ noUser: '***' }));
    }
    // IF record found for said id
    else {
      // Check how many days from record creation
      const differenceInDays = Math.floor(
        (new Date().getTime() - result[0].createdat.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      // if more than 7 days delete user / orders record from db
      // returns msg for no user
      if (differenceInDays >= 7) {
        const result12 = await sql.unsafe(
          ` DELETE FROM 
                users 
            WHERE 
              accessToken = '${userID}';`
        );
        return new Response(JSON.stringify({ noUser: '***' }));
      }
      // if less than 7 return message for user
      else {
        return new Response(JSON.stringify({ user: '***' }));
      }
    }
  } catch (error) {
    // if error from db
    return new Response(JSON.stringify({ dbError: '***' }));
  }
}
