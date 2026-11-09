# API course source map

The source files are the supplied Downloads copies of API in detail.docx and REST.docx. Each lesson below links to its corresponding Word step or prerequisite.

The API course includes all four Word tables and three unique illustrations. The repeated restaurant and parking figure is published once. The REST document has no embedded figures or tables.

## Technical corrections

- DummyJSON login uses the documented demo credentials and `accessToken`. Protected-request checks clear cookies as well as the Bearer header. Login schema and assertions require a non-empty access token.
- Local JSON Server CRUD uses string IDs consistently. The Express shopping lab uses port 4000 for every request and explains the shared in-memory cart.
- Newman HTML reporting installs the reporter. The GitHub Actions sample checks out the collection and sets up Node.js.
- Restful Booker POST variants use the required fields and booking dates. Java serialization uses Jackson, mutations use the token cookie and a booking ID created during the workflow, and DELETE retains the documented 201.
- Local Java examples use the JSON Server fixture and deserialize object arrays as `User[]`. Scalar field extraction is shown separately.

## Lesson mapping

### API Testing Fundamentals

- API document, Step 1 → [What is an API?](../api.html#definition)
- API document, Step 2 → [API vs UI testing](../api.html#api-vs-ui)
- API document, Step 3 → [Types of APIs](../api.html#api-types)
- API document, Step 4 → [REST architecture](../api.html#rest-architecture)
- API document, Step 5 → [Client–server architecture](../api.html#client-server-architecture)
- API document, Step 6 → [HTTP requests and responses](../api.html#http-requests-and-responses)
- API document, Step 7 → [HTTP methods and idempotency](../api.html#http-methods-and-idempotency)
- API document, Step 8 → [HTTP status codes](../api.html#http-status-codes)
- API document, Step 9 → [URL structure](../api.html#url-structure)
- API document, Step 10 → [JSON fundamentals](../api.html#json-fundamentals)
- API document, Step 11 → [Set up JSON Server](../api.html#json-server)
- API document, Step 12 → [Read users with GET](../api.html#read-users-with-get)
- API document, Step 13 → [Create a user with POST](../api.html#create-a-user-with-post)
- API document, Step 14 → [Verify a POST using GET](../api.html#verify-a-post-using-get)
- API document, Step 15 → [Replace a user with PUT](../api.html#replace-a-user-with-put)
- API document, Step 16 → [Delete a user](../api.html#delete-a-user)
- API document, Step 17 → [Path and query parameters](../api.html#path-and-query-parameters)
- API document, Step 18 → [Test request headers in Postman](../api.html#test-request-headers-in-postman)
- API document, Step 19 → [Chain login and profile requests](../api.html#chain-login-and-profile-requests)
- API document, Step 20 → [Run a dependent business workflow](../api.html#run-a-dependent-business-workflow)
- API document, Step 21 → [Set up a Postman collection](../api.html#set-up-a-postman-collection)
- API document, Step 22 → [Fetch dynamic test data](../api.html#fetch-dynamic-test-data)
- API document, Step 23 → [Extract demo credentials](../api.html#extract-demo-credentials)
- API document, Step 24 → [Authenticate with extracted credentials](../api.html#authenticate-with-extracted-credentials)
- API document, Step 25 → [Capture the access token](../api.html#capture-the-access-token)
- API document, Step 26 → [Access a protected API](../api.html#access-a-protected-api)
- API document, Step 27 → [Test unauthorized access](../api.html#test-unauthorized-access)
- API document, Step 28 → [Compare public and protected endpoints](../api.html#compare-public-and-protected-endpoints)
- API document, Step 29 → [Run the request chain](../api.html#run-the-request-chain)
- API document, Step 30 → [Organize collection folders](../api.html#organize-collection-folders)
- API document, Step 31 → [Configure environment URLs](../api.html#configure-environment-urls)
- API document, Step 32 → [Generate pre-request test data](../api.html#generate-pre-request-test-data)
- API document, Step 33 → [Validate responses in Postman](../api.html#validate-responses-in-postman)
- API document, Step 34 → [Run a Postman collection](../api.html#run-a-postman-collection)
- API document, Step 35 → [Run CSV-driven tests](../api.html#run-csv-driven-tests)
- API document, Step 36 → [Execute collections with Newman](../api.html#execute-collections-with-newman)
- API document, Step 37 → [Run Newman in Jenkins and GitHub Actions](../api.html#run-newman-in-jenkins-and-github-actions)
- API document, Step 38 → [Generate Postman assertions with AI](../api.html#generate-postman-assertions-with-ai)
- API document, Step 39 → [Validate the login JSON Schema](../api.html#validate-the-login-json-schema)
- API document, Step 40 → [Run the complete authentication workflow](../api.html#run-the-complete-authentication-workflow)
- API document, Step 41 → [Prepare the shopping app project](../api.html#prepare-the-shopping-app-project)
- API document, Step 41 → [Build and run the Express API](../api.html#build-and-run-the-express-api)
- API document, Step 41 → [Test the shopping API in Postman](../api.html#test-the-shopping-api-in-postman)
- API document, Step 41 → [Connect the shopping UI to the API](../api.html#connect-the-shopping-ui-to-the-api)

### REST Assured with Java

- REST document, pre requisite → [API testing prerequisites](../rest.html#api-testing-prerequisites)
- REST document, pre requisite  2 → [Introduction to REST Assured](../rest.html#introduction-to-rest-assured)
- REST document, pre requisite 3 → [Maven and local API setup](../rest.html#setup)
- REST document, STEP 1 → [Base URI](../rest.html#base-uri)
- REST document, STEP 2 → [GET booking IDs](../rest.html#get-requests)
- REST document, STEP 3 → [GET a booking by path parameter](../rest.html#get-a-booking-by-path-parameter)
- REST document, STEP 4 → [Validate the response body](../rest.html#validate-response)
- REST document, STEP 5.1 → [Create a booking with POST](../rest.html#create-a-booking-with-post)
- REST document, STEP 5.2 → [Pass the body as a String](../rest.html#pass-the-body-as-a-string)
- REST document, STEP 5.3 → [Build a request body with a Java Map](../rest.html#build-a-request-body-with-a-java-map)
- REST document, STEP 5.4 → [Build nested JSON with Maps](../rest.html#build-nested-json-with-maps)
- REST document, STEP 5.5 → [Serialize a booking POJO](../rest.html#serialize-a-booking-pojo)
- REST document, STEP 5.6 → [Read a POST body from a JSON file](../rest.html#read-a-post-body-from-a-json-file)
- REST document, STEP 5.7 → [Build a body with StringBuilder](../rest.html#build-a-body-with-stringbuilder)
- REST document, STEP 6 → [Extract the booking ID](../rest.html#extract-the-booking-id)
- REST document, STEP 7 → [Generate an authentication token](../rest.html#generate-an-authentication-token)
- REST document, STEP 8 → [Replace a booking with PUT](../rest.html#replace-a-booking-with-put)
- REST document, STEP 9 → [Partially update a booking with PATCH](../rest.html#partially-update-a-booking-with-patch)
- REST document, STEP 10 → [Delete a booking](../rest.html#delete-a-booking)
- REST document, STEP 11 → [Verify deletion with a negative test](../rest.html#verify-deletion-with-a-negative-test)
- REST document, STEP 12 → [Filter bookings with query parameters](../rest.html#filter-bookings-with-query-parameters)
- REST document, STEP 13 → [Validate response headers](../rest.html#validate-response-headers)
- REST document, STEP 14 → [Run the end-to-end booking workflow](../rest.html#run-the-end-to-end-booking-workflow)
- REST document, STEP 15 → [Serialization and deserialization](../rest.html#serialization-and-deserialization)
- REST document, STEP 16 → [Extract a field from a JSON response](../rest.html#extract-a-field-from-a-json-response)
- REST document, STEP 17 → [Authentication and authorization](../rest.html#authentication-and-authorization)
- REST document, STEP 18 → [JSON objects](../rest.html#json-objects)
- REST document, STEP 19 → [Query a JSON response with JSONPath](../rest.html#query-a-json-response-with-jsonpath)
- REST document, STEP 20 → [Query an array with JSONPath](../rest.html#query-an-array-with-jsonpath)
- REST document, STEP 21 → [Extract a list from a JSON array](../rest.html#extract-a-list-from-a-json-array)
- REST document, STEP 22 → [Deserialize a JSON response into an array](../rest.html#deserialize-a-json-response-into-an-array)
- REST document, STEP 23 → [Read Swagger and API documentation](../rest.html#read-swagger-and-api-documentation)
- REST document, STEP 24 → [Structure a REST API automation framework](../rest.html#structure-a-rest-api-automation-framework)
- REST document, STEP 25 → [Describe an API test in Cucumber](../rest.html#describe-an-api-test-in-cucumber)
- REST document, STEP 26 → [Convert a request body to a POJO](../rest.html#convert-a-request-body-to-a-pojo)
- REST document, STEP 27 → [Deserialize a response body into a POJO](../rest.html#deserialize-a-response-body-into-a-pojo)
- REST document, STEP 28 → [Separate tests and API services](../rest.html#separate-tests-and-api-services)
- REST document, STEP 29 → [Centralize API routes](../rest.html#centralize-api-routes)
- REST document, STEP 30 → [Use generics in API helpers](../rest.html#use-generics-in-api-helpers)
- REST document, STEP 31 → [Reuse request headers](../rest.html#reuse-request-headers)
- REST document, STEP 32 → [Share test context](../rest.html#share-test-context)
- REST document, STEP 33 → [Share Cucumber scenario context](../rest.html#share-cucumber-scenario-context)
- REST document, STEP 34 → [Read the base URL from configuration](../rest.html#read-the-base-url-from-configuration)
