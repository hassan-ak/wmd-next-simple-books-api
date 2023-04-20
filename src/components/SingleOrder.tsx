import React from 'react';

export const SingleOrder = () => {
  return (
    <div>
      <h3 className='mb-2 mt-4 text-lg font-medium text-gray-900'>
        Get an order
      </h3>
      <div className='text-gray-700'>
        <p>
          GET{' '}
          <span className='ml-2 rounded-sm bg-gray-100 p-1 text-sm'>
            /orders/:orderId
          </span>
        </p>
        <p>Allows you to view an existing order. Requires authentication.</p>
      </div>
    </div>
  );
};
