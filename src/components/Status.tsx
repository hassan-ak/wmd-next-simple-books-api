import React from 'react';

export const Status = () => {
  return (
    <div>
      <h3 className='mb-2 mt-4 text-lg font-medium text-gray-900'>Status</h3>
      <div className='text-gray-700'>
        <p>
          GET{' '}
          <span className='ml-2 rounded-sm bg-gray-100 p-1 text-sm'>
            /status
          </span>
        </p>
        <p>Returns the status of the API.</p>
      </div>
    </div>
  );
};
