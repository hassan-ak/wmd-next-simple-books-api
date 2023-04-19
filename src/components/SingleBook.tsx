import React from 'react';

export const SingleBook = () => {
  return (
    <div>
      <h3 className='mb-2 mt-4 text-lg font-medium text-gray-900'>
        Get a single book
      </h3>
      <div className='text-gray-700'>
        <p>
          GET{' '}
          <span className='ml-2 rounded-sm bg-gray-100 p-1 text-sm'>
            /books/:bookId
          </span>
        </p>
        <p>Retrieve detailed information about a book.</p>
      </div>
    </div>
  );
};
