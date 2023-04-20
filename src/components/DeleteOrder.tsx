import React from 'react';

export const DeleteOrder = () => {
  return (
    <div>
      <h3 className='mb-2 mt-4 text-lg font-medium text-gray-900'>
        Delete an order
      </h3>
      <div className='text-gray-700'>
        <p>
          DELETE{' '}
          <span className='ml-2 rounded-sm bg-gray-100 p-1 text-sm'>
            /orders/:orderId
          </span>
        </p>
        <p>The request body needs to be empty.</p>
        <p>Delete an existing order. Requires authentication.</p>
        <p>Example</p>
        <div className='mx-2 rounded-sm bg-gray-100 p-3 text-sm'>
          <p>DELETE /orders/PF6Mfl</p>
          <p>Authorization: Bearer {'<TOKEN>'}</p>
        </div>
      </div>
    </div>
  );
};
