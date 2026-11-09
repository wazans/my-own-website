window.TestNovaApiCourse = {
  "id": "api",
  "title": "API Testing Fundamentals",
  "storageKey": "testnova-reader-api-v1",
  "hashNavigation": true,
  "topics": [
    {
      "id": "definition",
      "title": "What is an API?",
      "module": "API and REST foundations",
      "source": "API document, Step 1",
      "blocks": [
        {
          "text": "API = Application Programming Interface"
        },
        {
          "text": "API is basically a contract/interface that allows two systems to communicate."
        },
        {
          "text": "Ride-booking analogy\nA ride app can request maps, routes, and distances through a third-party mapping API."
        },
        {
          "text": "Flow:"
        },
        {
          "text": "Uber App → Google Maps API → Google Servers → Response → Uber App"
        },
        {
          "text": "The app displays the map while the mapping service supplies the data."
        },
        {
          "image": "content/api-illustrations/figure-1.webp",
          "alt": "A restaurant analogy traces an API request and response. A parking analogy distinguishes authentication from authorization."
        },
        {
          "text": "Another example:\nWhen you login using “Login with Google”\nYour app → Google API → Google verifies → sends response"
        },
        {
          "heading": "Key understanding"
        },
        {
          "text": "API does NOT show:"
        },
        {
          "text": "how database works"
        },
        {
          "text": "how logic is written"
        },
        {
          "text": "It only exposes:"
        },
        {
          "text": "request (input)"
        },
        {
          "text": "response (output)"
        },
        {
          "text": "Real example:"
        },
        {
          "code": "GET /users/1",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "Response:"
        },
        {
          "code": "{\n  \"id\": 1,\n  \"name\": \"Wasim\"\n}",
          "language": "json",
          "title": "Example"
        },
        {
          "heading": "Interview line"
        },
        {
          "text": "API acts as a contract between client and server, enabling communication without exposing internal implementation."
        }
      ],
      "level": "Beginner",
      "learningObjective": "API = Application Programming Interface",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "api-vs-ui",
      "title": "API vs UI testing",
      "module": "API and REST foundations",
      "source": "API document, Step 2",
      "blocks": [
        {
          "text": "In any application, there are layers:"
        },
        {
          "text": "UI Layer → API Layer → Database"
        },
        {
          "text": "Real-world example:"
        },
        {
          "text": "Amazon:"
        },
        {
          "code": "UI → you Search “iPhone”\nAPI → /products?name=iphone",
          "language": "text",
          "title": "Example"
        },
        {
          "text": "DB → fetch data"
        },
        {
          "heading": "Difference"
        },
        {
          "text": "UI testing:"
        },
        {
          "text": "You click buttons"
        },
        {
          "text": "Depends on frontend"
        },
        {
          "text": "Slow"
        },
        {
          "text": "API testing:"
        },
        {
          "text": "Direct request"
        },
        {
          "text": "No UI dependency"
        },
        {
          "text": "Faster and more stable"
        },
        {
          "heading": "Critical insight"
        },
        {
          "text": "If button is broken → UI fails\nBut API may still work"
        },
        {
          "text": "Example:"
        },
        {
          "text": "Login button not clickable → UI fail\nBut API /login works perfectly"
        },
        {
          "heading": "Interview line"
        },
        {
          "text": "API testing validates business logic directly without UI dependency."
        }
      ],
      "level": "Beginner",
      "learningObjective": "API vs UI testing.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "api-types",
      "title": "Types of APIs",
      "module": "API and REST foundations",
      "source": "API document, Step 3",
      "blocks": [
        {
          "text": "REST (most used in real projects)"
        },
        {
          "text": "Uses HTTP"
        },
        {
          "text": "Uses JSON"
        },
        {
          "text": "Stateless"
        },
        {
          "text": "Example:"
        },
        {
          "code": "GET /users",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "SOAP (old enterprise systems)"
        },
        {
          "text": "Uses XML"
        },
        {
          "text": "Strict structure"
        },
        {
          "text": "Banking / legacy apps"
        },
        {
          "text": "GraphQL (modern flexible APIs)"
        },
        {
          "text": "Client decides response"
        },
        {
          "text": "Reduces extra data"
        },
        {
          "text": "Example:"
        },
        {
          "text": "Give me only name and email"
        },
        {
          "text": "Real-world mapping:"
        },
        {
          "text": "REST → retail resource APIs"
        },
        {
          "text": "SOAP → some banking and enterprise systems"
        },
        {
          "text": "GraphQL → applications that let the client select fields"
        },
        {
          "heading": "Interview line"
        },
        {
          "text": "REST is widely used for resource-oriented HTTP APIs."
        }
      ],
      "level": "Beginner",
      "learningObjective": "REST (most used in real projects)",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "rest-architecture",
      "title": "REST architecture",
      "module": "API and REST foundations",
      "source": "API document, Step 4",
      "blocks": [
        {
          "text": "REST is an architectural style."
        },
        {
          "text": "An HTTP API built in this style exposes resources through requests and responses with methods, headers, and, where appropriate, bodies."
        },
        {
          "heading": "Real-world thinking"
        },
        {
          "text": "Everything is treated as a resource"
        },
        {
          "text": "/users"
        },
        {
          "text": "/orders"
        },
        {
          "text": "/products"
        },
        {
          "heading": "Operations"
        },
        {
          "text": "GET → fetch data"
        },
        {
          "text": "POST → create data"
        },
        {
          "text": "PUT → update"
        },
        {
          "text": "DELETE → remove"
        },
        {
          "text": "Real example (Amazon):"
        },
        {
          "code": "GET /orders\nPOST /orders\nDELETE /orders/1",
          "language": "http",
          "title": "Example"
        },
        {
          "heading": "Key idea"
        },
        {
          "text": "Statelessness means each request carries the information needed to process it. The server can still store resource data."
        },
        {
          "heading": "Interview line"
        },
        {
          "text": "REST is an architectural style where resources are managed using HTTP methods."
        }
      ],
      "level": "Beginner",
      "learningObjective": "REST is an architectural style.",
      "hideReview": true,
      "legacyIds": [
        "contract"
      ]
    },
    {
      "id": "client-server-architecture",
      "title": "Client–server architecture",
      "module": "API and REST foundations",
      "source": "API document, Step 5",
      "blocks": [
        {
          "text": "Basic flow:"
        },
        {
          "text": "Client → Request → Server → Response → Client"
        },
        {
          "text": "Real-world example:"
        },
        {
          "text": "Swiggy:"
        },
        {
          "text": "Client → Mobile app"
        },
        {
          "text": "Server → Swiggy backend"
        },
        {
          "text": "DB → restaurant data"
        },
        {
          "text": "Flow:"
        },
        {
          "text": "App → API (/restaurants) → Server → DB → Response → App"
        },
        {
          "text": "Client examples:"
        },
        {
          "text": "Browser"
        },
        {
          "text": "Mobile app"
        },
        {
          "text": "Postman"
        },
        {
          "text": "Server:"
        },
        {
          "text": "API layer"
        },
        {
          "text": "Business logic"
        },
        {
          "text": "Database"
        },
        {
          "heading": "Key concept"
        },
        {
          "text": "Client and server are loosely coupled"
        },
        {
          "text": "Means:\nFrontend can change\nBackend can change\nBoth still work independently"
        },
        {
          "heading": "Interview line"
        },
        {
          "text": "Client and server are independent systems communicating through APIs using request-response model."
        },
        {
          "image": "content/api-illustrations/figure-4.webp",
          "alt": "Reference chart for API layers, REST, client–server architecture, HTTP, URLs, and JSON."
        }
      ],
      "level": "Beginner",
      "learningObjective": "Client–server architecture.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "http-requests-and-responses",
      "title": "HTTP requests and responses",
      "module": "HTTP and JSON",
      "source": "API document, Step 6",
      "blocks": [
        {
          "text": "HTTP is the communication protocol used between client and server."
        },
        {
          "text": "Real-world example:\nWhen you open Flipkart and search for a product:"
        },
        {
          "text": "App → HTTP Request → Server → HTTP Response → App"
        },
        {
          "heading": "Request contains"
        },
        {
          "text": "Method (what you want to do)"
        },
        {
          "text": "URL (where to go)"
        },
        {
          "text": "Headers (extra info like auth)"
        },
        {
          "text": "Body (data, mostly in POST/PUT)"
        },
        {
          "heading": "Response contains"
        },
        {
          "text": "Status Code (success/failure)"
        },
        {
          "text": "Headers"
        },
        {
          "text": "Body (actual data)"
        },
        {
          "text": "Example:"
        },
        {
          "text": "Request:"
        },
        {
          "code": "GET /users",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "Response:"
        },
        {
          "code": "[\n  {\"name\":\"Wasim\"}\n]",
          "language": "json",
          "title": "Example"
        },
        {
          "heading": "Interview line"
        },
        {
          "text": "HTTP defines how requests are sent and responses are received between client and server."
        }
      ],
      "level": "Beginner",
      "learningObjective": "HTTP is the communication protocol used between client and server.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "http-methods-and-idempotency",
      "title": "HTTP methods and idempotency",
      "module": "HTTP and JSON",
      "source": "API document, Step 7",
      "blocks": [
        {
          "text": "HTTP methods define what action you want to perform."
        },
        {
          "text": "Real-world example (Amazon orders):"
        },
        {
          "code": "GET /orders → fetch orders\nPOST /orders → create order\nPUT /orders/1 → update order\nDELETE /orders/1 → cancel order",
          "language": "http",
          "title": "Example"
        },
        {
          "heading": "Methods and meaning"
        },
        {
          "text": "GET → fetch data"
        },
        {
          "text": "POST → create new data"
        },
        {
          "text": "PUT → update full data"
        },
        {
          "text": "PATCH → update partial data"
        },
        {
          "text": "DELETE → remove data"
        },
        {
          "heading": "Important concept"
        },
        {
          "text": "Idempotency means repeating an identical request has the same intended effect on server state. The responses can differ."
        },
        {
          "text": "GET → safe\nPUT → same update again\nDELETE → still deleted"
        },
        {
          "text": "POST is generally not idempotent. Repeating a create request can create another resource."
        },
        {
          "heading": "Interview line"
        },
        {
          "text": "GET, PUT and DELETE are idempotent, while POST is not."
        }
      ],
      "level": "Beginner",
      "learningObjective": "HTTP methods define what action you want to perform.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "http-status-codes",
      "title": "HTTP status codes",
      "module": "HTTP and JSON",
      "source": "API document, Step 8",
      "blocks": [
        {
          "text": "Status codes tell whether API worked or failed."
        },
        {
          "text": "Real-world example:"
        },
        {
          "text": "You try to open a product:"
        },
        {
          "text": "Found → success"
        },
        {
          "text": "Wrong URL → not found"
        },
        {
          "text": "Server down → error"
        },
        {
          "heading": "Categories"
        },
        {
          "text": "2xx → Success"
        },
        {
          "text": "200 → OK"
        },
        {
          "text": "201 → Created"
        },
        {
          "text": "204 → No content"
        },
        {
          "text": "4xx → Client mistake"
        },
        {
          "text": "400 → Bad request"
        },
        {
          "text": "401 → Unauthorized"
        },
        {
          "text": "404 → Not found"
        },
        {
          "text": "5xx → Server mistake"
        },
        {
          "text": "500 → Internal server error"
        },
        {
          "heading": "Key understanding"
        },
        {
          "text": "4xx → your request wrong\n5xx → server failed"
        },
        {
          "heading": "Interview line"
        },
        {
          "text": "Status codes indicate whether the request was successful or failed due to client or server issues."
        }
      ],
      "level": "Beginner",
      "learningObjective": "Status codes tell whether API worked or failed.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "url-structure",
      "title": "URL structure",
      "module": "HTTP and JSON",
      "source": "API document, Step 9",
      "blocks": [
        {
          "text": "The Amazon and generic product URLs are illustrative. DummyJSON uses /users/1 for a single user."
        },
        {
          "text": "URL defines where API is and what data you want."
        },
        {
          "text": "Real-world example:"
        },
        {
          "code": "https://api.amazon.com/orders/123?status=delivered\nhttps://dummyjson.com/users?id=1",
          "language": "http",
          "title": "Example"
        },
        {
          "heading": "Breakdown"
        },
        {
          "text": "Base URL → https://dummyjson.com"
        },
        {
          "text": "Endpoint → /users"
        },
        {
          "text": "Path parameter → 1 in https://dummyjson.com/users/1"
        },
        {
          "text": "Query parameter → id=1 in the illustrative URL above. Use /users/1 to fetch that user in DummyJSON."
        },
        {
          "heading": "Another example"
        },
        {
          "code": "GET /products?category=mobile&price=50000",
          "language": "http",
          "title": "Example"
        },
        {
          "heading": "Key understanding"
        },
        {
          "text": "Path param → exact resource\nQuery param → filtering/search"
        },
        {
          "heading": "Interview line"
        },
        {
          "text": "URL defines resource location along with filtering and identification parameters."
        }
      ],
      "level": "Beginner",
      "learningObjective": "The Amazon and generic product URLs are illustrative. DummyJSON uses /users/1 for a single user.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "json-fundamentals",
      "title": "JSON fundamentals",
      "module": "HTTP and JSON",
      "source": "API document, Step 10",
      "blocks": [
        {
          "text": "JSON is the data format used in APIs."
        },
        {
          "text": "Real-world example:"
        },
        {
          "text": "When you open Swiggy → restaurant list comes in JSON"
        },
        {
          "text": "Object:"
        },
        {
          "code": "{\n  \"name\": \"Wasim\"\n}",
          "language": "json",
          "title": "Example"
        },
        {
          "text": "Array:"
        },
        {
          "code": "[\n  {\"name\":\"A\"},\n  {\"name\":\"B\"}\n]",
          "language": "json",
          "title": "Example"
        },
        {
          "text": "Nested:"
        },
        {
          "code": "{\n  \"user\": {\n    \"name\": \"Wasim\"\n  }\n}",
          "language": "json",
          "title": "Example"
        },
        {
          "heading": "Real API example"
        },
        {
          "code": "{\n  \"orderId\": \"123\",\n  \"items\": [\n    {\"name\": \"Pizza\"},\n    {\"name\": \"Burger\"}\n  ]\n}",
          "language": "json",
          "title": "Example"
        },
        {
          "heading": "Key understanding"
        },
        {
          "text": "JSON can represent objects with key-value pairs, arrays, and scalar values."
        },
        {
          "text": "Lightweight"
        },
        {
          "text": "Easy to read and parse"
        },
        {
          "heading": "Interview line"
        },
        {
          "text": "JSON is a lightweight data format used for data exchange in REST APIs."
        }
      ],
      "level": "Beginner",
      "learningObjective": "JSON is the data format used in APIs.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "json-server",
      "title": "Set up JSON Server",
      "module": "Local API and CRUD",
      "source": "API document, Step 11",
      "blocks": [
        {
          "text": "Goal: Create your own backend (no dependency on real APIs)"
        },
        {
          "text": "Commands:"
        },
        {
          "code": "mkdir api-practice\ncd api-practice\nnpm install --save-dev json-server@1.0.0-beta.3",
          "language": "bash",
          "title": "Example"
        },
        {
          "text": "Create db.json:"
        },
        {
          "code": "{\n  \"users\": [\n    { \"id\": \"u1\", \"name\": \"Wasim\", \"email\": \"wasim@test.com\" }\n  ],\n  \"products\": [\n    { \"id\": \"p1\", \"name\": \"Laptop\", \"price\": 50000 }\n  ],\n  \"orders\": [],\n  \"payments\": []\n}",
          "language": "json",
          "title": "Example"
        },
        {
          "text": "Run server:"
        },
        {
          "code": "npx json-server db.json --port 3000",
          "language": "bash",
          "title": "Example"
        },
        {
          "text": "API ready:"
        },
        {
          "text": "http://localhost:3000/users"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Goal: Create your own backend (no dependency on real APIs)",
      "hideReview": true,
      "legacyIds": [
        "local-docs"
      ]
    },
    {
      "id": "read-users-with-get",
      "title": "Read users with GET",
      "module": "Local API and CRUD",
      "source": "API document, Step 12",
      "blocks": [
        {
          "code": "GET http://localhost:3000/users",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "Expect:"
        },
        {
          "text": "Status → 200"
        },
        {
          "text": "Response → user list"
        },
        {
          "text": "Learning:\nHow to fetch data"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Read users with GET.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "create-a-user-with-post",
      "title": "Create a user with POST",
      "module": "Local API and CRUD",
      "source": "API document, Step 13",
      "blocks": [
        {
          "code": "POST http://localhost:3000/users",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "Body:"
        },
        {
          "code": "{\n  \"id\": \"u2\",\n  \"name\": \"Ali\",\n  \"email\": \"ali@test.com\"\n}",
          "language": "json",
          "title": "Example"
        },
        {
          "text": "Expect:"
        },
        {
          "text": "Status → 201"
        },
        {
          "text": "Learning:\nData creation"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Create a user with POST.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "verify-a-post-using-get",
      "title": "Verify a POST using GET",
      "module": "Local API and CRUD",
      "source": "API document, Step 14",
      "blocks": [
        {
          "code": "GET http://localhost:3000/users/u2",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "Expect:"
        },
        {
          "text": "Data exists"
        },
        {
          "text": "Interview Line:\n“I validate POST using GET API”"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Verify a POST using GET.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "replace-a-user-with-put",
      "title": "Replace a user with PUT",
      "module": "Local API and CRUD",
      "source": "API document, Step 15",
      "blocks": [
        {
          "code": "PUT http://localhost:3000/users/u2",
          "language": "http",
          "title": "Example"
        },
        {
          "code": "{\n  \"id\": \"u2\",\n  \"name\": \"Ali Updated\",\n  \"email\": \"ali@test.com\"\n}",
          "language": "json",
          "title": "Example"
        },
        {
          "text": "Expect:"
        },
        {
          "text": "Status → 200"
        },
        {
          "text": "Learning:\nFull update"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Replace a user with PUT.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "delete-a-user",
      "title": "Delete a user",
      "module": "Local API and CRUD",
      "source": "API document, Step 16",
      "blocks": [
        {
          "text": "Delete the u2 record created earlier. A successful delete is followed by 404 when you fetch the same ID."
        },
        {
          "code": "DELETE http://localhost:3000/users/u2",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "Expect:"
        },
        {
          "text": "Status → 200"
        },
        {
          "text": "Verify:"
        },
        {
          "code": "GET /users/u2 → 404",
          "language": "http",
          "title": "Example"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Delete the u2 record created earlier. A successful delete is followed by 404 when you fetch the same ID.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "path-and-query-parameters",
      "title": "Path and query parameters",
      "module": "Local API and CRUD",
      "source": "API document, Step 17",
      "blocks": [
        {
          "heading": "Path"
        },
        {
          "code": "GET /users/u1",
          "language": "http",
          "title": "Example"
        },
        {
          "heading": "Query"
        },
        {
          "code": "GET /users?id=u1",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "Learning:\nFiltering vs direct access"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Path and query parameters.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "test-request-headers-in-postman",
      "title": "Test request headers in Postman",
      "module": "Postman and authentication",
      "source": "API document, Step 18",
      "blocks": [
        {
          "text": "Use a new Postman collection for DummyJSON practice. These endpoints and credentials are independent of JSON Server."
        },
        {
          "heading": "Objective"
        },
        {
          "text": "Understand how request headers control API behavior and ensure proper communication between client and server."
        },
        {
          "heading": "Tool Used"
        },
        {
          "text": "Postman"
        },
        {
          "heading": "API Under Test"
        },
        {
          "code": "POST https://dummyjson.com/auth/login",
          "language": "http",
          "title": "Example"
        },
        {
          "heading": "Steps to Execute"
        },
        {
          "text": "1. Open Postman"
        },
        {
          "text": "Create a new request"
        },
        {
          "text": "Select POST method"
        },
        {
          "text": "2. Enter API Endpoint"
        },
        {
          "text": "https://dummyjson.com/auth/login"
        },
        {
          "text": "3. Add Request Header"
        },
        {
          "table": [
            [
              "Key",
              "Value"
            ],
            [
              "Content-Type",
              "application/json"
            ]
          ]
        },
        {
          "text": "4. Add Request Body (JSON)"
        },
        {
          "code": "{\n  \"username\": \"emilys\",\n  \"password\": \"emilyspass\"\n}",
          "language": "json",
          "title": "Example"
        },
        {
          "text": "5. Send Request"
        },
        {
          "heading": "Expected Result"
        },
        {
          "text": "Status Code: 200 OK"
        },
        {
          "text": "Response contains user details and token"
        },
        {
          "heading": "Negative Testing"
        },
        {
          "text": "Case 1: Remove Header"
        },
        {
          "text": "Remove Content-Type"
        },
        {
          "text": "Expected: Request may fail (400 / 415 in real APIs)"
        },
        {
          "text": "Case 2: Incorrect Header"
        },
        {
          "text": "Use Content-Type: text/plain"
        },
        {
          "text": "Expected: Server may reject or misinterpret request"
        },
        {
          "heading": "Learning Outcome"
        },
        {
          "text": "Headers define request format\nIncorrect headers lead to failures\nImportant for API validation and debugging"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Use a new Postman collection for DummyJSON practice. These endpoints and credentials are independent of JSON Server.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "chain-login-and-profile-requests",
      "title": "Chain login and profile requests",
      "module": "Postman and authentication",
      "source": "API document, Step 19",
      "blocks": [
        {
          "heading": "Objective"
        },
        {
          "text": "Perform dynamic testing by passing data from one API response to another request."
        },
        {
          "heading": "API Flow"
        },
        {
          "text": "Login → Extract Token → Use Token in Next API"
        },
        {
          "heading": "Steps to Execute"
        },
        {
          "text": "1. Execute Login API"
        },
        {
          "code": "POST https://dummyjson.com/auth/login",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "Header:"
        },
        {
          "code": "Content-Type: application/json",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "Body:"
        },
        {
          "code": "{\n  \"username\": \"emilys\",\n  \"password\": \"emilyspass\"\n}",
          "language": "json",
          "title": "Example"
        },
        {
          "text": "2. Extract Data from Response"
        },
        {
          "text": "Go to Scripts → Post-response and add:"
        },
        {
          "code": "let res = pm.response.json();\npm.environment.set(\"token\", res.accessToken);\npm.environment.set(\"userId\", res.id);",
          "language": "js",
          "title": "Example"
        },
        {
          "text": "3. Verify Stored Values"
        },
        {
          "text": "Click environment quick look"
        },
        {
          "text": "Confirm values:"
        },
        {
          "text": "token"
        },
        {
          "text": "userId"
        },
        {
          "text": "4. Use Token in Next API"
        },
        {
          "code": "GET https://dummyjson.com/auth/me",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "Header:"
        },
        {
          "code": "Authorization: Bearer {{token}}\nContent-Type: application/json",
          "language": "http",
          "title": "Example"
        },
        {
          "heading": "Expected Result"
        },
        {
          "text": "Status Code: 200 OK"
        },
        {
          "text": "User details returned"
        },
        {
          "heading": "Negative Testing"
        },
        {
          "text": "Case 1: Missing Token"
        },
        {
          "text": "Set the request to No Auth and clear DummyJSON cookies before sending."
        },
        {
          "text": "Expected: 401 Unauthorized"
        },
        {
          "text": "Case 2: Invalid Token"
        },
        {
          "text": "Use wrong token"
        },
        {
          "text": "Expected: 401 Unauthorized"
        },
        {
          "heading": "Learning Outcome"
        },
        {
          "text": "Dynamic data handling\nEnvironment variables usage\nReal authentication flow testing"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Perform dynamic testing by passing data from one API response to another request.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "run-a-dependent-business-workflow",
      "title": "Run a dependent business workflow",
      "module": "Postman and authentication",
      "source": "API document, Step 20",
      "blocks": [
        {
          "heading": "Objective"
        },
        {
          "text": "Simulate real-world API workflow using multiple dependent requests."
        },
        {
          "heading": "Business Flow"
        },
        {
          "text": "Login → Get User → Perform Action"
        },
        {
          "heading": "Steps to Execute"
        },
        {
          "text": "1. Login User"
        },
        {
          "code": "POST https://dummyjson.com/auth/login",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "Header:"
        },
        {
          "code": "Content-Type: application/json",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "Body:"
        },
        {
          "code": "{\n  \"username\": \"emilys\",\n  \"password\": \"emilyspass\"\n}",
          "language": "json",
          "title": "Example"
        },
        {
          "text": "Tests:"
        },
        {
          "code": "let res = pm.response.json();\npm.environment.set(\"token\", res.accessToken);\n\npm.environment.set(\"userId\", res.id);",
          "language": "js",
          "title": "Example"
        },
        {
          "text": "2. Fetch Authenticated User Details"
        },
        {
          "code": "GET https://dummyjson.com/auth/me",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "Headers:"
        },
        {
          "code": "Authorization: Bearer {{token}}\nContent-Type: application/json",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "3. Perform Next Action (Example: Get User Data)"
        },
        {
          "code": "GET https://dummyjson.com/users/{{userId}}",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "Header:"
        },
        {
          "code": "Content-Type: application/json",
          "language": "http",
          "title": "Example"
        },
        {
          "heading": "Expected Results"
        },
        {
          "text": "All APIs return 200 OK"
        },
        {
          "text": "Data flows correctly between requests"
        },
        {
          "heading": "Negative Scenarios"
        },
        {
          "text": "Case 1: Invalid userId"
        },
        {
          "text": "Modify {{userId}}"
        },
        {
          "text": "Expected: 404 Not Found"
        },
        {
          "text": "Case 2: Missing Token"
        },
        {
          "text": "On /auth/me, set No Auth and clear DummyJSON cookies."
        },
        {
          "text": "Expected: 401 Unauthorized from /auth/me. The public /users endpoint remains accessible."
        },
        {
          "heading": "Learning Outcome"
        },
        {
          "text": "End-to-end API validation\nMulti-step workflow testing\nReal-world backend simulation\nDependency handling between APIs"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Simulate real-world API workflow using multiple dependent requests.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "set-up-a-postman-collection",
      "title": "Set up a Postman collection",
      "module": "Postman and authentication",
      "source": "API document, Step 21",
      "blocks": [
        {
          "text": "Open Postman application.\nOn the top-left corner, click New → Collection.\nEnter collection name as API Training and click Create.\nThis collection will store all your API requests and simulate a real project structure."
        }
      ],
      "level": "Beginner",
      "learningObjective": "Open Postman application.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "fetch-dynamic-test-data",
      "title": "Fetch dynamic test data",
      "module": "Postman and authentication",
      "source": "API document, Step 22",
      "blocks": [
        {
          "text": "Use a new Postman collection for DummyJSON practice. These endpoints and credentials are independent of JSON Server."
        },
        {
          "text": "Inside the collection, click Add Request and name it Get User Data."
        },
        {
          "text": "Set:\nMethod → GET\nURL → https://dummyjson.com/users/1"
        },
        {
          "text": "Click Send."
        },
        {
          "text": "Inspect the returned username and password. DummyJSON exposes these synthetic values for practice."
        },
        {
          "code": "Example:\n\"username\": \"emilys\",\n\"password\": \"emilyspass\"",
          "language": "text",
          "title": "Example"
        },
        {
          "text": "Use public demo credentials for this exercise. Real user APIs should never expose passwords."
        }
      ],
      "level": "Beginner",
      "learningObjective": "Use a new Postman collection for DummyJSON practice. These endpoints and credentials are independent of JSON Server.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "extract-demo-credentials",
      "title": "Extract demo credentials",
      "module": "Postman and authentication",
      "source": "API document, Step 23",
      "blocks": [
        {
          "text": "Go to the Scripts → Post-response of the same request."
        },
        {
          "text": "Paste:"
        },
        {
          "code": "let res = pm.response.json();\npm.environment.set(\"username\", res.username);\npm.environment.set(\"password\", res.password);",
          "language": "js",
          "title": "Example"
        },
        {
          "text": "Now create an Environment (top-right → Environments → New):"
        },
        {
          "table": [
            [
              "Variable",
              "Value"
            ],
            [
              "username",
              "(empty)"
            ],
            [
              "password",
              "(empty)"
            ],
            [
              "token",
              "(empty)"
            ]
          ]
        },
        {
          "text": "Save and select this environment."
        },
        {
          "text": "Click Send again → values will be stored automatically."
        }
      ],
      "level": "Beginner",
      "learningObjective": "Go to the Scripts → Post-response of the same request.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "authenticate-with-extracted-credentials",
      "title": "Authenticate with extracted credentials",
      "module": "Postman and authentication",
      "source": "API document, Step 24",
      "blocks": [
        {
          "text": "Create a new request named Login API."
        },
        {
          "text": "Set:\nMethod → POST\nURL → https://dummyjson.com/auth/login"
        },
        {
          "text": "Go to Body → raw → JSON:"
        },
        {
          "code": "{\n  \"username\": \"{{username}}\",\n  \"password\": \"{{password}}\"\n}",
          "language": "json",
          "title": "Example"
        },
        {
          "text": "Click Send."
        },
        {
          "text": "This step is AUTHENTICATION\nServer verifies identity\nIf correct → token generated"
        },
        {
          "text": "Negative test (important):\nChange password → expect 400 / Invalid credentials\nMeans identity check failed"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Create a new request named Login API.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "capture-the-access-token",
      "title": "Capture the access token",
      "module": "Postman and authentication",
      "source": "API document, Step 25",
      "blocks": [
        {
          "text": "Go to Scripts → Post-response of Login API."
        },
        {
          "text": "Paste:"
        },
        {
          "code": "let res = pm.response.json();\npm.environment.set(\"token\", res.accessToken);",
          "language": "js",
          "title": "Example"
        },
        {
          "text": "Click Send again."
        },
        {
          "text": "Now token is stored in environment variable."
        },
        {
          "text": "This token represents authenticated session"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Go to Scripts → Post-response of Login API.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "access-a-protected-api",
      "title": "Access a protected API",
      "module": "Postman and authentication",
      "source": "API document, Step 26",
      "blocks": [
        {
          "text": "Create new request → name it Get Profile."
        },
        {
          "text": "Set:\nMethod → GET\nURL → https://dummyjson.com/auth/me"
        },
        {
          "text": "Go to Authorization tab:\nType → Bearer Token\nToken → {{token}}"
        },
        {
          "text": "Click Send"
        },
        {
          "text": "This step is AUTHORIZATION\nServer checks token\nAllows access only if valid"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Create new request → name it Get Profile.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "test-unauthorized-access",
      "title": "Test unauthorized access",
      "module": "Postman and authentication",
      "source": "API document, Step 27",
      "blocks": [
        {
          "text": "In the same request:"
        },
        {
          "text": "Set No Auth and clear DummyJSON cookies → send → expect 401 Unauthorized."
        },
        {
          "text": "Use wrong token → Click Send → 401 Unauthorized"
        },
        {
          "text": "Key understanding:\nUser exists\nBut access denied"
        },
        {
          "text": "Missing or invalid credentials prevent the server from authenticating the request. To test authorization separately, use an authenticated identity that lacks permission."
        }
      ],
      "level": "Beginner",
      "learningObjective": "Test unauthorized access.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "compare-public-and-protected-endpoints",
      "title": "Compare public and protected endpoints",
      "module": "Postman and authentication",
      "source": "API document, Step 28",
      "blocks": [
        {
          "text": "Test different endpoints:"
        },
        {
          "text": "https://dummyjson.com/users → works without auth\nhttps://dummyjson.com/products → works without auth\nhttps://dummyjson.com/auth/me → requires token"
        },
        {
          "text": "This shows real-world:\nPublic APIs\nProtected APIs"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Compare public and protected endpoints.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "run-the-request-chain",
      "title": "Run the request chain",
      "module": "Postman and authentication",
      "source": "API document, Step 29",
      "blocks": [
        {
          "text": "Now your flow is:"
        },
        {
          "text": "Get user data\n→ Extract username/password\n→ Login (Authentication)\n→ Extract token\n→ Call protected API (Authorization)"
        },
        {
          "text": "All values flow automatically using environment variables."
        }
      ],
      "level": "Beginner",
      "learningObjective": "Run the request chain.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "organize-collection-folders",
      "title": "Organize collection folders",
      "module": "Collections and environments",
      "source": "API document, Step 30",
      "blocks": [
        {
          "text": "Create folders inside collection:"
        },
        {
          "text": "User APIs\nAuth APIs"
        },
        {
          "text": "Move requests accordingly to maintain clean structure."
        }
      ],
      "level": "Beginner",
      "learningObjective": "Organize collection folders.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "configure-environment-urls",
      "title": "Configure environment URLs",
      "module": "Collections and environments",
      "source": "API document, Step 31",
      "blocks": [
        {
          "text": "Add variable:"
        },
        {
          "table": [
            [
              "Variable",
              "Value"
            ],
            [
              "baseUrl",
              "https://dummyjson.com"
            ]
          ]
        },
        {
          "text": "Update URLs:\n{{baseUrl}}/users/1\n{{baseUrl}}/auth/login\n{{baseUrl}}/auth/me"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Configure environment URLs.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "generate-pre-request-test-data",
      "title": "Generate pre-request test data",
      "module": "Collections and environments",
      "source": "API document, Step 32",
      "blocks": [
        {
          "text": "In any request → Pre-request Script:"
        },
        {
          "code": "let random = Math.floor(Math.random() * 1000);\npm.environment.set(\"dynamicUser\", \"user\" + random);",
          "language": "js",
          "title": "Example"
        },
        {
          "text": "Used for dynamic testing scenarios."
        }
      ],
      "level": "Beginner",
      "learningObjective": "Generate pre-request test data.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "validate-responses-in-postman",
      "title": "Validate responses in Postman",
      "module": "Collections and environments",
      "source": "API document, Step 33",
      "blocks": [
        {
          "text": "In Scripts → Post-response:"
        },
        {
          "code": "pm.test(\"Status is 200\", () => {\n    pm.response.to.have.status(200);\n});\n\npm.test(\"Access token exists\", () => {\n    let res = pm.response.json();\n    pm.expect(res.accessToken).to.be.a(\"string\").and.not.empty;\n});",
          "language": "js",
          "title": "Example"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Validate responses in Postman.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "run-a-postman-collection",
      "title": "Run a Postman collection",
      "module": "Collections and environments",
      "source": "API document, Step 34",
      "blocks": [
        {
          "text": "Click collection → Click Run"
        },
        {
          "text": "Select all requests → Click Run Collection"
        },
        {
          "text": "This executes full flow sequentially."
        }
      ],
      "level": "Beginner",
      "learningObjective": "Click collection → Click Run",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "run-csv-driven-tests",
      "title": "Run CSV-driven tests",
      "module": "Automation, CI, and contracts",
      "source": "API document, Step 35",
      "blocks": [
        {
          "text": "Open Postman and make sure your collection already has a working Login API that uses {{username}} and {{password}}. Now create a CSV file using Excel or Notepad and save it as testdata.csv. Inside that file, write:"
        },
        {
          "code": "username,password\nemilys,emilyspass\nemilys,wrong-password",
          "language": "csv",
          "title": "Example"
        },
        {
          "text": "Now go back to Postman and click on your collection name in the left panel. On the top right of the collection, click the Run (▶) button. This opens the Collection Runner window. On the right side, you will see an option called “Select File” under the Data section. Click it and upload your CSV file."
        },
        {
          "text": "Ensure your request body in Postman is written like:"
        },
        {
          "code": "{\n  \"username\": \"{{username}}\",\n  \"password\": \"{{password}}\"\n}",
          "language": "json",
          "title": "Example"
        },
        {
          "text": "Run only Login for each CSV row. The first row should pass the 200 assertion. The second demonstrates a failing positive assertion. For a passing negative test, explicitly assert the invalid-credentials status."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Run CSV-driven tests.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "execute-collections-with-newman",
      "title": "Execute collections with Newman",
      "module": "Automation, CI, and contracts",
      "source": "API document, Step 36",
      "blocks": [
        {
          "text": "Use the Newman-compatible Postman Collection v2.1 export. The HTML reporter is an optional add-on."
        },
        {
          "text": "Now you move from UI testing to automation execution. In Postman, click on your collection → click the three dots (⋮) → click Export → select Collection v2.1 → save the JSON file. Do the same for your Environment file."
        },
        {
          "text": "Now install Newman using terminal:"
        },
        {
          "code": "npm install -g newman",
          "language": "bash",
          "title": "Example"
        },
        {
          "text": "Open Command Prompt or PowerShell and navigate to the folder where your files are saved. Run:"
        },
        {
          "code": "newman run collection.json -e environment.json",
          "language": "bash",
          "title": "Example"
        },
        {
          "text": "You will see execution logs directly in terminal — each API call, status code, and result. You can also generate reports:"
        },
        {
          "code": "npm install -g newman-reporter-html\nnewman run collection.json -e environment.json -r cli,html",
          "language": "bash",
          "title": "Example"
        },
        {
          "text": "This creates a detailed HTML report. This step is important because it allows you to run API tests without Postman UI, which is exactly how execution happens in real projects."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Use the Newman-compatible Postman Collection v2.1 export. The HTML reporter is an optional add-on.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "run-newman-in-jenkins-and-github-actions",
      "title": "Run Newman in Jenkins and GitHub Actions",
      "module": "Automation, CI, and contracts",
      "source": "API document, Step 37",
      "blocks": [
        {
          "text": "On a Windows Jenkins agent with Node.js and Newman on PATH, create a job and add an Execute Windows batch command build step. Check out the repository containing collection.json and environment.json before running it."
        },
        {
          "code": "newman run collection.json -e environment.json",
          "language": "bash",
          "title": "Example"
        },
        {
          "text": "Click Build Now, and Jenkins will execute your API tests automatically."
        },
        {
          "text": "For GitHub Actions, create a file .github/workflows/api.yml and add:"
        },
        {
          "code": "name: API Tests\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: \"22\"\n      - run: npx --yes newman run collection.json -e environment.json",
          "language": "yaml",
          "title": "Example"
        },
        {
          "text": "Commit the exported collection and a demo environment file at the repository root. Keep real credentials out of exported files. Push a change to run the workflow."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "On a Windows Jenkins agent with Node.js and Newman on PATH, create a job and add an Execute Windows batch command build step. Check out the repository containing collection.json and environment.json before running it.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "generate-postman-assertions-with-ai",
      "title": "Generate Postman assertions with AI",
      "module": "Automation, CI, and contracts",
      "source": "API document, Step 38",
      "blocks": [
        {
          "text": "Instead of writing test scripts manually, you can use AI tools like ChatGPT or Cursor AI. For example, you can give a prompt:"
        },
        {
          "text": "“Generate Postman test script for login API with status validation and token check”"
        },
        {
          "text": "AI will generate something like:"
        },
        {
          "code": "pm.test(\"Status is 200\", function () {\n    pm.response.to.have.status(200);\n});\n\npm.test(\"Access token exists\", function () {\n    let res = pm.response.json();\n    pm.expect(res.accessToken).to.be.a(\"string\").and.not.empty;\n});",
          "language": "js",
          "title": "Example"
        },
        {
          "text": "Now go to Postman → open your request → click Scripts → Post-response → paste this script → click Send. You will see test results in the bottom panel. This speeds up your work, but remember AI gives generic output — you must enhance it with real business validations."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Generate Postman assertions with AI.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "validate-the-login-json-schema",
      "title": "Validate the login JSON Schema",
      "module": "Automation, CI, and contracts",
      "source": "API document, Step 39",
      "blocks": [
        {
          "text": "Go to your Login API → open Scripts → Post-response. Define a schema:"
        },
        {
          "code": "const schema = {\n  type: \"object\",\n  properties: {\n    id: { type: \"number\" },\n    username: { type: \"string\" },\n    accessToken: { type: \"string\", minLength: 1 }\n  },\n  required: [\"id\", \"username\", \"accessToken\"]\n};",
          "language": "js",
          "title": "Example"
        },
        {
          "text": "Now validate response:"
        },
        {
          "code": "pm.test(\"Schema is valid\", function () {\n    pm.response.to.have.jsonSchema(schema);\n});",
          "language": "js",
          "title": "Example"
        },
        {
          "text": "Click Send. If API response structure changes, this test will fail immediately. This is very important in real projects because frontend depends on response structure. Even if API works, wrong structure can break UI — this step catches that early."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Validate the login JSON Schema.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "run-the-complete-authentication-workflow",
      "title": "Run the complete authentication workflow",
      "module": "Automation, CI, and contracts",
      "source": "API document, Step 40",
      "blocks": [
        {
          "text": "Now combine everything into one real workflow. Your flow is:"
        },
        {
          "text": "GET /users/1 → extract username and password\nPOST /auth/login → authenticate user\nGET /auth/me → access protected API"
        },
        {
          "text": "In first request, extract:"
        },
        {
          "code": "let res = pm.response.json();\npm.environment.set(\"username\", res.username);\npm.environment.set(\"password\", res.password);",
          "language": "js",
          "title": "Example"
        },
        {
          "text": "In second request, use:"
        },
        {
          "code": "{\n  \"username\": \"{{username}}\",\n  \"password\": \"{{password}}\"\n}",
          "language": "json",
          "title": "Example"
        },
        {
          "text": "Extract token:"
        },
        {
          "code": "const res = pm.response.json();\npm.environment.set(\"token\", res.accessToken);",
          "language": "js",
          "title": "Example"
        },
        {
          "text": "In third request, go to Authorization tab → select Bearer Token → enter {{token}}. Click Send and verify response."
        },
        {
          "text": "Now test negative:"
        },
        {
          "text": "Change password → login fails"
        },
        {
          "text": "Set No Auth and clear DummyJSON cookies → expect 401 Unauthorized."
        },
        {
          "text": "Use wrong token → access denied"
        },
        {
          "text": "This exercise tests the data and authentication dependencies across the full request chain."
        },
        {
          "image": "content/api-illustrations/figure-2.webp",
          "alt": "Course reference chart covering HTTP, Postman workflows, authentication, authorization, and interview concepts."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Run the complete authentication workflow.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "prepare-the-shopping-app-project",
      "title": "Prepare the shopping app project",
      "module": "API and UI integration",
      "source": "API document, Step 41",
      "blocks": [
        {
          "text": "This lab uses the Express API on port 4000. Stop your own previous development server with Ctrl+C if that port is occupied. The Windows commands below help identify a process before stopping it."
        },
        {
          "code": "netstat -ano | findstr :3000",
          "language": "powershell",
          "title": "Example"
        },
        {
          "text": "If the PID belongs to your own development server, stop it before continuing."
        },
        {
          "code": "taskkill /PID <pid> /F",
          "language": "powershell",
          "title": "Example"
        },
        {
          "text": "Do same for 4000 if needed"
        },
        {
          "heading": "PHASE 1 — PROJECT SETUP"
        },
        {
          "heading": "Create project"
        },
        {
          "code": "mkdir shopping-app\ncd shopping-app\nnpm init -y",
          "language": "bash",
          "title": "Example"
        },
        {
          "heading": "Install dependencies"
        },
        {
          "code": "npm install express jsonwebtoken cors",
          "language": "bash",
          "title": "Example"
        },
        {
          "heading": "PHASE 2 — BACKEND (SERVER)"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "This lab uses the Express API on port 4000. Stop your own previous development server with Ctrl+C if that port is occupied. The Windows commands below help identify a process before stopping it.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "build-and-run-the-express-api",
      "title": "Build and run the Express API",
      "module": "API and UI integration",
      "source": "API document, Step 41",
      "blocks": [
        {
          "text": "This local teaching example stores data in memory and uses a demo signing secret. The cart is shared among authenticated demo requests, and restarting the server resets it."
        },
        {
          "text": "Create file: `server.js`"
        },
        {
          "code": "const express = require(\"express\");\nconst jwt = require(\"jsonwebtoken\");\nconst cors = require(\"cors\");\n\nconst app = express();\napp.use(cors());\napp.use(express.json());\n\nconst SECRET = \"mysecret\";\n\n// 🔹 DATA\nlet users = [\n    { id: 1, username: \"wasim\", password: \"1234\" }\n];\n\nlet products = [\n    { id: 1, name: \"Laptop\", price: 50000 },\n    { id: 2, name: \"iPhone\", price: 80000 }\n];\n\nlet cart = [];\n\n// 🔹 TEST\napp.get(\"/\", (req, res) => {\n    res.send(\"API WORKING ✅\");\n});\n\n// 🔹 LOGIN\napp.post(\"/login\", (req, res) => {\n\n    const { username, password } = req.body;\n\n    let user = users.find(u => u.username === username && u.password === password);\n\n    if (!user) return res.status(401).json({ message: \"Invalid credentials\" });\n\n    let token = jwt.sign({ username }, SECRET, { expiresIn: \"1h\" });\n\n    res.json({ token });\n});\n\n// 🔹 AUTH\nfunction authenticate(req, res, next) {\n\n    let authHeader = req.headers[\"authorization\"];\n\n    if (!authHeader) return res.status(401).json({ message: \"No token\" });\n\n    let token = authHeader.split(\" \")[1];\n\n    try {\n        jwt.verify(token, SECRET);\n        next();\n    } catch {\n        return res.status(403).json({ message: \"Invalid token\" });\n    }\n}\n\n// 🔹 PRODUCTS\napp.get(\"/products\", (req, res) => {\n    res.json(products);\n});\n\n// 🔹 CART\napp.get(\"/cart\", authenticate, (req, res) => {\n    res.json(cart);\n});\n\napp.post(\"/cart\", authenticate, (req, res) => {\n    cart.push({ id: Date.now(), ...req.body });\n    res.json({ message: \"Added\" });\n});\n\napp.delete(\"/cart/:id\", authenticate, (req, res) => {\n    cart = cart.filter(c => c.id != req.params.id);\n    res.json({ message: \"Deleted\" });\n});\n\n// 🔹 START\napp.listen(4000, () => console.log(\"Server running on port 4000\"));",
          "language": "javascript",
          "title": "Example"
        },
        {
          "heading": "Run server"
        },
        {
          "code": "node server.js",
          "language": "bash",
          "title": "Example"
        },
        {
          "heading": "Verify"
        },
        {
          "text": "Open:"
        },
        {
          "code": "http://localhost:4000/",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "Output:"
        },
        {
          "code": "API WORKING ✅",
          "language": "text",
          "title": "Example"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "This local teaching example stores data in memory and uses a demo signing secret. The cart is shared among authenticated demo requests, and restarting the server resets it.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "test-the-shopping-api-in-postman",
      "title": "Test the shopping API in Postman",
      "module": "API and UI integration",
      "source": "API document, Step 41",
      "blocks": [
        {
          "text": "Send POST /login first. Copy the response token into the Bearer header for cart requests. All requests in this lab use localhost:4000."
        },
        {
          "text": "POST"
        },
        {
          "code": "http://localhost:4000/login",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "Body → raw → JSON:"
        },
        {
          "code": "{\n  \"username\": \"wasim\",\n  \"password\": \"1234\"\n}",
          "language": "json",
          "title": "Example"
        },
        {
          "text": "Copy token"
        },
        {
          "heading": "GET PRODUCTS"
        },
        {
          "text": "GET"
        },
        {
          "code": "http://localhost:4000/products",
          "language": "http",
          "title": "Example"
        },
        {
          "heading": "ADD TO CART"
        },
        {
          "text": "POST"
        },
        {
          "code": "http://localhost:4000/cart",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "Headers:"
        },
        {
          "code": "Authorization: Bearer <token>\nContent-Type: application/json",
          "language": "http",
          "title": "Example"
        },
        {
          "text": "Body:"
        },
        {
          "code": "{\n  \"productId\": 1,\n  \"name\": \"Laptop\",\n  \"price\": 50000,\n  \"quantity\": 1\n}",
          "language": "json",
          "title": "Example"
        },
        {
          "heading": "GET CART"
        },
        {
          "text": "GET"
        },
        {
          "code": "http://localhost:4000/cart",
          "language": "text",
          "title": "Example"
        },
        {
          "text": "Header:"
        },
        {
          "code": "Authorization: Bearer <token>",
          "language": "http",
          "title": "Example"
        },
        {
          "heading": "NEGATIVE TEST"
        },
        {
          "text": "Remove token → Send"
        },
        {
          "text": "Expected:"
        },
        {
          "code": "401 Unauthorized",
          "language": "http",
          "title": "Example"
        },
        {
          "table": [
            [
              "API",
              "Auth Required",
              "Why"
            ],
            [
              "/products",
              "No",
              "Public data"
            ],
            [
              "/login",
              "No",
              "Entry point"
            ],
            [
              "/cart",
              "Yes",
              "User-specific"
            ],
            [
              "/orders (future)",
              "Yes",
              "Sensitive"
            ]
          ]
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Send POST /login first. Copy the response token into the Bearer header for cart requests. All requests in this lab use localhost:4000.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "connect-the-shopping-ui-to-the-api",
      "title": "Connect the shopping UI to the API",
      "module": "API and UI integration",
      "source": "API document, Step 41",
      "blocks": [
        {
          "text": "Create file in same folder"
        },
        {
          "code": "<!DOCTYPE html>\n<html>\n<head>\n<title>Shopping App</title>\n\n<style>\nbody { font-family: Arial; background:#f5f5f5; margin:0; }\nheader { background:#222; color:white; padding:15px; text-align:center; }\n.container { display:flex; padding:20px; }\n.box { width:50%; background:white; margin:10px; padding:20px; border-radius:10px; }\n</style>\n\n</head>\n\n<body>\n\n<header><h2>🛒 Shopping App</h2></header>\n\n<div style=\"text-align:center;margin:20px;\">\n<input id=\"username\" placeholder=\"username\">\n<input id=\"password\" type=\"password\" placeholder=\"password\">\n<button onclick=\"login()\">Login</button>\n<p id=\"status\"></p>\n</div>\n\n<div class=\"container\">\n\n<div class=\"box\">\n<h3>Products</h3>\n<div id=\"products\"></div>\n</div>\n\n<div class=\"box\">\n<h3>Cart</h3>\n<ul id=\"cart\"></ul>\n<p id=\"total\"></p>\n</div>\n\n</div>\n\n<script>\n\nlet token = null;\n\n// LOGIN\nfunction login() {\nfetch(\"http://localhost:4000/login\", {\nmethod:\"POST\",\nheaders:{\"Content-Type\":\"application/json\"},\nbody:JSON.stringify({\nusername:document.getElementById(\"username\").value,\npassword:document.getElementById(\"password\").value\n})\n})\n.then(res=>res.json())\n.then(data=>{\nif(data.token){\ntoken=data.token;\ndocument.getElementById(\"status\").innerText=\"✅ Logged in\";\nloadCart();\n}else{\ndocument.getElementById(\"status\").innerText=\"❌ Login failed\";\n}\n});\n}\n\n// LOAD PRODUCTS\nfetch(\"http://localhost:4000/products\")\n.then(res=>res.json())\n.then(data=>{\nlet div=document.getElementById(\"products\");\ndata.forEach(p=>{\ndiv.innerHTML+=`${p.name} ₹${p.price} \n<button onclick='addToCart(${JSON.stringify(p)})'>Add</button><br>`;\n});\n});\n\n// ADD CART\nfunction addToCart(p){\nif(!token){ alert(\"Login first\"); return; }\n\nfetch(\"http://localhost:4000/cart\",{\nmethod:\"POST\",\nheaders:{\n\"Content-Type\":\"application/json\",\n\"Authorization\":\"Bearer \"+token\n},\nbody:JSON.stringify({...p,quantity:1})\n}).then(loadCart);\n}\n\n// LOAD CART\nfunction loadCart(){\nif(!token)return;\n\nfetch(\"http://localhost:4000/cart\",{\nheaders:{\"Authorization\":\"Bearer \"+token}\n})\n.then(res=>res.json())\n.then(data=>{\nlet ul=document.getElementById(\"cart\");\nul.innerHTML=\"\";\nlet total=0;\n\ndata.forEach(i=>{\ntotal+=i.price*i.quantity;\nul.innerHTML+=`<li>${i.name} - ₹${i.price}</li>`;\n});\n\ndocument.getElementById(\"total\").innerText=\"Total ₹\"+total;\n});\n}\n\n</script>\n\n</body>\n</html>",
          "language": "html",
          "title": "Example"
        },
        {
          "heading": "Run UI"
        },
        {
          "text": "Open index.html in your browser while the Express server is running on port 4000. Log in, add a product to the cart, and compare the UI with the Postman response."
        },
        {
          "heading": "FINAL FLOW"
        },
        {
          "code": "Login → token\n      ↓\nUI stores token\n      ↓\nToken sent in header\n      ↓\nBackend validates\n      ↓\nCart allowed",
          "language": "text",
          "title": "Example"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Create file in same folder",
      "hideReview": true,
      "legacyIds": []
    }
  ]
};
