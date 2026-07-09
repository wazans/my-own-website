# API Testing

## API testing practical steps

Simple explanation:
API testing checks whether a backend endpoint accepts the right request and returns the right response. You test status code, response body, headers, schema, and important business rules.

Do this:
1. Pick one endpoint, such as `POST /login`.
2. Send a valid request body.
3. Check the status code.
4. Check required JSON fields.
5. Send invalid data and verify the error response.
6. Repeat with missing fields, wrong data types, and boundary values.

Observe this:
A good API test proves both success and failure behavior. It does not only check that the server returned something.

Practice this:
Create test cases for `POST /users` with valid user, missing email, invalid email, and duplicate user.

Expected output:
Valid user returns a success status and user id. Invalid requests return clear error status and message.

## API automation checklist

Simple explanation:
API automation should be small, repeatable, and independent. Each test should prepare its data, call the API, assert the response, and clean up if needed.

Do this:
1. Store base URL in configuration.
2. Store request payloads as reusable fixtures.
3. Add helper functions for common headers.
4. Assert status code and response data.
5. Keep test data unique to avoid duplicate conflicts.

Observe this:
Tests become easier to run in local, QA, staging, and CI environments.

Practice this:
Build an API test suite for create user, get user, update user, and delete user.

Expected output:
The suite can run repeatedly without manual cleanup.

## API debugging

Simple explanation:
When an API test fails, debug the request first, then the response. Most failures come from wrong URL, missing token, wrong payload, or unexpected test data.

Do this:
1. Print request method and URL.
2. Print request body without secrets.
3. Check authentication headers.
4. Compare actual status with expected status.
5. Read the response error message.

Observe this:
The failure reason usually becomes visible before changing code.

Practice this:
Break one API test by removing a required field, then document the exact error response.

Expected output:
You can explain why the API rejected the request and how the test caught it.
