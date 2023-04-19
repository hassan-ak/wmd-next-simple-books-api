import Link from 'next/link';
import React from 'react';

export const EntryPoint = () => {
  return (
    <div className=''>
      <h2 className=' mb-2 mt-5 text-xl font-medium'>EntryPoint</h2>
      <Link
        href={'https://wmd-next-simple-books-api.vercel.app/api'}
        className='text-blue-400'
        target='_blank'
      >
        https://wmd-next-simple-books-api.vercel.app/api
      </Link>
      <hr />
    </div>
  );
};
