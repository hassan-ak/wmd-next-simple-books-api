// Client Authentication
// Connects to NEON data-base
// Accept user Email and name
// returns access token

import postgres from 'postgres';
import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Get DataBase URL to be used in query
  const DATABASE_URL = process.env.DATABASE_URL;

  // Generate  access token
  const userId = (uuidv4() + uuidv4()).replace(/-/g, '');

  // Function to check if email entered is valid one
  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // try to get email and name from body
  try {
    let body = await request.json();
    // When nam eand email present in request body
    if (body.clientEmail != null && body.clientName != null) {
      //  Check if email is valid
      if (isValidEmail(body.clientEmail)) {
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
                clientEmail='${body.clientEmail}'`
          );
          // IF No record found for said email
          // Create new user and return access token
          if (result.length === 0) {
            const result1 = await sql.unsafe(
              ` INSERT 
                  INTO 
                users 
                  (clientEmail,clientName,accessToken) 
                VALUES 
                  ('${body.clientEmail}','${body.clientName}','${userId}')`
            );
            return NextResponse.json({ accessToken: userId }, { status: 201 });
          }
          // IF record found for said email
          else {
            // Check how many days from record creation
            const differenceInDays = Math.floor(
              (new Date().getTime() - result[0].createdat.getTime()) /
                (1000 * 60 * 60 * 24)
            );
            // if more than 7 days update user details
            if (differenceInDays >= 7) {
              const result = await sql.unsafe(
                ` UPDATE 
                    users
                  SET 
                    accessToken = '${userId}',createdat=NOW()
                  WHERE 
                    clientEmail = '${body.clientEmail}'`
              );
              return NextResponse.json(
                { accessToken: userId },
                { status: 201 }
              );
            }
            // if less than 7 return message
            else {
              return NextResponse.json(
                {
                  error:
                    'API client already registered. Try a different email.',
                },
                { status: 409 }
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
      // When email is not valid returns a message
      else {
        return NextResponse.json(
          { error: 'Enter a valid Email' },
          { status: 400 }
        );
      }
    }
    // returns error message when name and email not present in request body
    else {
      return NextResponse.json(
        { error: 'Email or Name missing in body' },
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
