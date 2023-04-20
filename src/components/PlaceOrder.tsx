import React from 'react';

export const PlaceOrder = () => {
  return (
    <div className=''>
      <h3 className='mb-2 mt-4 text-lg font-medium text-gray-900'>
        Submit an order
      </h3>
      <div className='text-gray-700'>
        <p>
          POST{' '}
          <span className='ml-2 rounded-sm bg-gray-100 p-1 text-sm'>
            /orders
          </span>
        </p>
        <p>Allows you to submit a new order. Requires authentication.</p>
        <p>
          The request body needs to be in JSON format and include the following
          properties:
        </p>
        <ul className='ml-10 list-disc'>
          <li>
            <span className='rounded-sm bg-gray-100 p-1 text-sm'>bookId</span> -
            Integer - Required
          </li>
          <li>
            <span className='rounded-sm bg-gray-100 p-1 text-sm'>
              customerName
            </span>{' '}
            - String - Required
          </li>
        </ul>
        <p>Example</p>
        <div className='mx-2 rounded-sm bg-gray-100 p-3 text-sm'>
          <p>POST /orders/</p>
          <p>Authorization: Bearer {'<TOKEN>'}</p>
          <p>{'{'}</p>
          <p className=''>&emsp;&quot;bookId&quot;: &quot;1&quot;,</p>
          <p className=''>&emsp;&quot;customerName&quot;: &quot;John&quot;</p>
          <p>{'}'}</p>
        </div>
        <p>The response body will contain the order Id.</p>
      </div>
    </div>
  );
};
