import React from 'react';

export const ApiAuthentication = () => {
  return (
    <div className=''>
      <h2 className=' mt-5 text-xl font-medium'>API Authentication</h2>
      <hr />
      <p className='mt-4 text-gray-700'>
        To submit or view an order, you need to register your API client.
      </p>
      <div className='text-gray-700'>
        <p>
          POST{' '}
          <span className='ml-2 rounded-sm bg-gray-100 p-1 text-sm'>
            /api-clients/
          </span>
        </p>
        <p>
          The request body needs to be in JSON format and include the following
          properties:
        </p>
        <ul className='ml-10 list-disc'>
          <li>
            <span className='rounded-sm bg-gray-100 p-1 text-sm'>
              clientName
            </span>{' '}
            - String
          </li>
          <li>
            <span className='rounded-sm bg-gray-100 p-1 text-sm'>
              clientEmail
            </span>{' '}
            - String
          </li>
        </ul>
        <p>Example</p>
        <div className='mx-2 rounded-sm bg-gray-100 p-3 text-sm'>
          <p>{'{'}</p>
          <p className=''>&emsp;&quot;clientName&quot;: &quot;user&quot;,</p>
          <p className=''>
            &emsp;&quot;clientEmail&quot;: &quot;test@test.com&quot;
          </p>
          <p>{'}'}</p>
        </div>
        <p>
          The response body will contain the access token. The access token is
          valid for 7 days.
        </p>
      </div>
      <h3 className='mb-2 mt-4 text-lg font-medium text-gray-900'>
        Possible errors
      </h3>
      <div className='text-gray-700'>
        <p>
          Status code 409 - `&quot;`API client already registered.`&quot;` Try
          changing the values for{' '}
          <span className='rounded-sm bg-gray-100 p-1 text-sm'>
            clientEmail
          </span>{' '}
          and{' '}
          <span className='rounded-sm bg-gray-100 p-1 text-sm'>clientName</span>{' '}
          to something else.
        </p>
      </div>
    </div>
  );
};
