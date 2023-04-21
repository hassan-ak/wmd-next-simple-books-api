# Simple Books API using Next.js 13 and Neon

This REST API allows you to reserve a book. This API is fully founctional with SQL calls to Neon Database and deployed on Vercel.

It mirrors the funtionality available at [Simple Book Api](https://simple-books-api.glitch.me/).

---

## EntryPoint

[https://wmd-next-simple-books-api.vercel.app/api](https://wmd-next-simple-books-api.vercel.app/api)

---

## Endpoints

### Status

GET `/status`

Returns the status of the API.

### List of books

GET `/books`

Returns a list of books.

Optional query parameters:

- type: fiction or non-fiction
- limit: a number between 1 and 20.

### Get a single book

GET `/books/:bookId`

Retrieve detailed information about a book.

### Submit an order

POST `/orders`

Allows you to submit a new order. Requires authentication.

The request body needs to be in JSON format and include the following properties:

- bookId - Integer - Required
- customerName - String - Required

Example

```
POST /orders/
Authorization: Bearer <TOKEN>
{
    "bookId": "1",
    "customerName": "John"
}
```

The response body will contain the order Id.

### Get all orders

GET `/orders`

Allows you to view all orders. Requires authentication.

### Get an order

GET `/orders/:orderId`

Allows you to view an existing order. Requires authentication.

### Update an order

PATCH `/orders/:orderId`

Update an existing order. Requires authentication.

The request body needs to be in JSON format and allows you to update the following properties:

- customerName - String

Example

```
PATCH /orders/PF6Mfl
Authorization: Bearer <TOKEN>
{
    "customerName": "John"
}
```

### Delete an order

DELETE `/orders/:orderId`

The request body needs to be empty.

Delete an existing order. Requires authentication.

Example

```
DELETE /orders/PF6Mfl
Authorization: Bearer <TOKEN>
```

---

## API Authentication

To submit or view an order, you need to register your API client.

POST `/api-clients/`

The request body needs to be in JSON format and include the following properties:

- clientName - String
- clientEmail - String

```
Example
{
    "clientName": "user",
    "clientEmail": "test@test.com"
}
```

The response body will contain the access token. The access token is valid for 7 days.

### Possible errors

Status code 409 - `"`API client already registered.`"` Try changing the values for clientEmail and clientName to something else.
