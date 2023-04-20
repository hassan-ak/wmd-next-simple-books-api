import React from 'react';

export const AllOrders = () => {
  return (
    <div>
      <h3 className='mb-2 mt-4 text-lg font-medium text-gray-900'>
        Get all orders
      </h3>
      <div className='text-gray-700'>
        <p>
          GET{' '}
          <span className='ml-2 rounded-sm bg-gray-100 p-1 text-sm'>
            /orders
          </span>
        </p>
        <p>Allows you to view all orders. Requires authentication.</p>
      </div>
    </div>
  );
};
