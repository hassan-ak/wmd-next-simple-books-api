import React from 'react';

export const ListBooks = () => {
  return (
    <div>
      <h3 className='mb-2 mt-4 text-lg font-medium text-gray-900'>
        List of books
      </h3>
      <div className='text-gray-700'>
        <p>
          GET{' '}
          <span className='ml-2 rounded-sm bg-gray-100 p-1 text-sm'>
            /books
          </span>
        </p>
        <p>Returns a list of books.</p>
        <p>Optional query parameters:</p>
        <ul className='ml-10 list-disc'>
          <li>type: fiction or non-fiction</li>
          <li>limit: a number between 1 and 20.</li>
        </ul>
      </div>
    </div>
  );
};
