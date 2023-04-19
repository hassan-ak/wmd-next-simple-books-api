import Link from 'next/link';
import React from 'react';

export const Intro = () => {
  return (
    <div className=''>
      <h1 className='text-2xl font-semibold'>
        Simple Books API using Next.js 13 and Neon
      </h1>
      <hr />
      <div className='text-justify text-gray-700'>
        <p className=''>
          This REST API allows you to reserve a book. This API is fully
          founctional with SQL calls to Neon Database and deployed on Vercel.{' '}
        </p>
        <p>
          It mirrors the funtionality available at{' '}
          <Link
            href={'https://simple-books-api.glitch.me'}
            className='text-blue-400'
            target='_blank'
          >
            Simple Book Api
          </Link>
          .
        </p>
      </div>
      <hr />
    </div>
  );
};
