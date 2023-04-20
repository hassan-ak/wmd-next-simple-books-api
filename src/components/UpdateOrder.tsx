import React from 'react';

export const UpdateOrder = () => {
  return (
    <div className=''>
      <h3 className='mb-2 mt-4 text-lg font-medium text-gray-900'>
        Update an order
      </h3>
      <div className='text-gray-700'>
        <p>
          PATCH{' '}
          <span className='ml-2 rounded-sm bg-gray-100 p-1 text-sm'>
            /orders/:orderId
          </span>
        </p>
        <p>Update an existing order. Requires authentication.</p>
        <p>
          The request body needs to be in JSON format and allows you to update
          the following properties:
        </p>
        <ul className='ml-10 list-disc'>
          <li>
            <span className='rounded-sm bg-gray-100 p-1 text-sm'>
              customerName
            </span>{' '}
            - String
          </li>
        </ul>
        <p>Example</p>
        <div className='mx-2 rounded-sm bg-gray-100 p-3 text-sm'>
          <p>PATCH /orders/PF6Mfl</p>
          <p>Authorization: Bearer {'<TOKEN>'}</p>
          <p>{'{'}</p>
          <p className=''>&emsp;&quot;customerName&quot;: &quot;John&quot;</p>
          <p>{'}'}</p>
        </div>
      </div>
    </div>
  );
};
