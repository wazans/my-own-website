window.TestNovaDocumentCourse = {
  "id": "rest",
  "title": "REST Assured with Java",
  "storageKey": "testnova-reader-rest-v1",
  "hashNavigation": true,
  "topics": [
    {
      "id": "api-testing-prerequisites",
      "title": "API testing prerequisites",
      "module": "Java API testing setup",
      "source": "REST document, pre requisite",
      "blocks": [
        {
          "text": "Till now you used Postman for manual testing.\nNow you will use Java (Rest Assured) to automate the same APIs."
        },
        {
          "text": "Postman = manual clicks\nRest Assured = code execution + automatic validation"
        },
        {
          "text": "Rest Assured helps in:"
        },
        {
          "text": "automation"
        },
        {
          "text": "repeatable tests"
        },
        {
          "text": "CI/CD integration"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Till now you used Postman for manual testing.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "introduction-to-rest-assured",
      "title": "Introduction to REST Assured",
      "module": "Java API testing setup",
      "source": "REST document, pre requisite  2",
      "blocks": [
        {
          "text": "Rest Assured is a Java library used for API testing."
        },
        {
          "text": "Core structure:"
        },
        {
          "text": "The call below uses the local /users fixture after Maven setup."
        },
        {
          "code": "given().when().get(\"/users\").then().statusCode(200);",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "heading": "Meaning"
        },
        {
          "text": "given → request setup"
        },
        {
          "text": "when → API call"
        },
        {
          "text": "then → validation"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Rest Assured is a Java library used for API testing.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "setup",
      "title": "Maven and local API setup",
      "module": "Java API testing setup",
      "source": "REST document, pre requisite 3",
      "blocks": [
        {
          "text": "For the local /users examples, start the JSON Server fixture from API Fundamentals. Save Java code under src/main/java. Place imports above the class and place executable fragments inside a method. Run Maven from the project root."
        },
        {
          "text": "Create a Maven project with JDK 17 and Maven. Save the following as pom.xml. Jackson maps Java Maps and POJOs to JSON and reads responses back into Java objects."
        },
        {
          "code": "<project xmlns=\"http://maven.apache.org/POM/4.0.0\">\n  <modelVersion>4.0.0</modelVersion>\n  <groupId>training.testnova</groupId>\n  <artifactId>api-training</artifactId>\n  <version>1.0.0</version>\n  <properties>\n    <maven.compiler.source>17</maven.compiler.source>\n    <maven.compiler.target>17</maven.compiler.target>\n  </properties>\n  <dependencies>\n    <dependency>\n      <groupId>io.rest-assured</groupId>\n      <artifactId>rest-assured</artifactId>\n      <version>5.3.0</version>\n    </dependency>\n    <dependency>\n      <groupId>com.fasterxml.jackson.core</groupId>\n      <artifactId>jackson-databind</artifactId>\n      <version>2.22.0</version>\n    </dependency>\n  </dependencies>\n</project>",
          "language": "xml",
          "title": "pom.xml"
        },
        {
          "text": "Set base URI:"
        },
        {
          "code": "RestAssured.baseURI = \"http://localhost:3000\";",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "code": "import io.restassured.RestAssured;\nimport java.io.File;\nimport java.util.HashMap;\nimport java.util.List;\nimport java.util.Map;\nimport static io.restassured.RestAssured.given;\nimport static org.hamcrest.Matchers.*;",
          "language": "java",
          "title": "Imports used across the course"
        },
        {
          "code": "import io.restassured.RestAssured;\nimport static io.restassured.RestAssured.given;\n\npublic class LocalApiSmoke {\n    public static void main(String[] args) {\n        RestAssured.baseURI = \"http://localhost:3000\";\n        given().when().get(\"/users\").then().statusCode(200);\n    }\n}",
          "language": "java",
          "title": "src/main/java/LocalApiSmoke.java"
        },
        {
          "code": "mvn compile exec:java -Dexec.mainClass=LocalApiSmoke",
          "language": "bash",
          "title": "Run the local smoke check"
        }
      ],
      "level": "Beginner",
      "learningObjective": "For the local /users examples, start the JSON Server fixture from API Fundamentals. Save Java code under src/main/java. Place imports above the class and place executable fragments inside a method. Run Maven from the project root.",
      "hideReview": true,
      "legacyIds": [
        "local-docs"
      ]
    },
    {
      "id": "automate-your-first-api-check",
      "title": "Automate your first API check",
      "module": "Java API testing setup",
      "learningObjective": "Turn a manual GET request into repeatable checks for a known user and a missing user.",
      "hideReview": true,
      "blocks": [
        {
          "text": "Start the local JSON Server fixture from Set up JSON Server and use the Maven project from Maven and local API setup. Restore the original db.json if an earlier CRUD exercise deleted user u1."
        },
        {
          "heading": "Compare the manual and automated checks"
        },
        {
          "table": [
            [
              "What you check",
              "Postman",
              "REST Assured"
            ],
            [
              "Request setup",
              "Accept: application/json and a user ID",
              "given().accept(ContentType.JSON).pathParam(\"id\", \"u1\")"
            ],
            [
              "Request",
              "GET http://localhost:3000/users/u1",
              "when().get(\"/users/{id}\")"
            ],
            [
              "Response",
              "200, JSON, and id u1",
              "then().statusCode(200).contentType(ContentType.JSON).body(\"id\", equalTo(\"u1\"))"
            ]
          ]
        },
        {
          "title": "src/main/java/UsersContractCheck.java",
          "language": "java",
          "code": "import io.restassured.http.ContentType;\nimport static io.restassured.RestAssured.given;\nimport static org.hamcrest.Matchers.equalTo;\n\npublic class UsersContractCheck {\n    public static void main(String[] args) {\n        given().baseUri(\"http://localhost:3000\")\n            .accept(ContentType.JSON).pathParam(\"id\", \"u1\")\n        .when().get(\"/users/{id}\")\n        .then().statusCode(200).contentType(ContentType.JSON)\n            .body(\"id\", equalTo(\"u1\"));\n\n        given().baseUri(\"http://localhost:3000\")\n            .pathParam(\"id\", \"missing-user\")\n        .when().get(\"/users/{id}\")\n        .then().statusCode(404);\n    }\n}"
        },
        {
          "title": "Run both checks",
          "language": "bash",
          "code": "mvn compile exec:java -Dexec.mainClass=UsersContractCheck"
        },
        {
          "heading": "Practice"
        },
        {
          "text": "Add an assertion for the known user’s name. Then deliberately change the expected value and run the check again to see how REST Assured reports the mismatch."
        }
      ],
      "resources": [
        {
          "label": "Set up JSON Server",
          "url": "/rest.html#json-server"
        },
        {
          "label": "Set up Maven and REST Assured",
          "url": "/rest.html#setup"
        },
        {
          "label": "REST Assured usage guide",
          "url": "https://github.com/rest-assured/rest-assured/wiki/Usage"
        }
      ]
    },
    {
      "id": "base-uri",
      "title": "Base URI",
      "module": "Read and validate bookings",
      "source": "REST document, STEP 1",
      "blocks": [
        {
          "text": "From here through the booking workflow, use Restful Booker. Its /booking and /auth endpoints are separate from JSON Server’s /users."
        },
        {
          "code": "RestAssured.baseURI = \"https://restful-booker.herokuapp.com\";",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "Avoid repeating full URL in every request"
        }
      ],
      "level": "Beginner",
      "learningObjective": "From here through the booking workflow, use Restful Booker. Its /booking and /auth endpoints are separate from JSON Server’s /users.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "get-requests",
      "title": "GET booking IDs",
      "module": "Read and validate bookings",
      "source": "REST document, STEP 2",
      "blocks": [
        {
          "text": "Run this fragment inside your method after setting the Restful Booker base URI. Use a booking ID from the returned list for read-only exercises. Create your own booking before testing updates or deletion."
        },
        {
          "code": "List<Integer> bookingIds = given()\n    .when().get(\"/booking\")\n    .then().statusCode(200)\n    .extract().jsonPath().getList(\"bookingid\", Integer.class);\nif (bookingIds.isEmpty()) {\n    throw new IllegalStateException(\"Create a booking before reading its details.\");\n}\nint bookingId = bookingIds.get(0);",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "This returns list of booking IDs"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Run this fragment inside your method after setting the Restful Booker base URI. Use a booking ID from the returned list for read-only exercises. Create your own booking before testing updates or deletion.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "get-a-booking-by-path-parameter",
      "title": "GET a booking by path parameter",
      "module": "Read and validate bookings",
      "source": "REST document, STEP 3",
      "blocks": [
        {
          "text": "Use bookingId from the previous lesson. The {id} placeholder is filled by pathParam."
        },
        {
          "code": "given().pathParam(\"id\", bookingId).when().get(\"/booking/{id}\").then().statusCode(200);",
          "language": "java",
          "title": "Java fragment"
        }
      ],
      "level": "Beginner",
      "learningObjective": "Use bookingId from the previous lesson. The {id} placeholder is filled by pathParam.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "validate-response",
      "title": "Validate the response body",
      "module": "Read and validate bookings",
      "source": "REST document, STEP 4",
      "blocks": [
        {
          "text": "Use bookingId from the GET booking IDs lesson and import the Hamcrest matchers shown in Maven setup."
        },
        {
          "code": "given().pathParam(\"id\", bookingId).when().get(\"/booking/{id}\")\n    .then().statusCode(200)\n    .body(\"firstname\", notNullValue())\n    .body(\"totalprice\", instanceOf(Number.class));",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "Validate that the response has a first name and a numeric total price. For a booking you created, compare the price to your submitted value."
        }
      ],
      "level": "Beginner",
      "learningObjective": "Use bookingId from the GET booking IDs lesson and import the Hamcrest matchers shown in Maven setup.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "create-a-booking-with-post",
      "title": "Create a booking with POST",
      "module": "POST request body variations",
      "source": "REST document, STEP 5.1",
      "blocks": [
        {
          "text": "Run inside your Java method with Restful Booker configured. A successful creation returns 200 and includes bookingid and booking. The following six lessons demonstrate different ways to send the same required fields."
        },
        {
          "code": "given()\n    .header(\"Content-Type\", \"application/json\")\n    .body(\"{\\n\" +\n          \"  \\\"firstname\\\": \\\"Wasim\\\",\\n\" +\n          \"  \\\"lastname\\\": \\\"Ansari\\\",\\n\" +\n          \"  \\\"totalprice\\\": 1000,\\n\" +\n          \"  \\\"depositpaid\\\": true,\\n\" +\n          \"  \\\"bookingdates\\\": {\\n\" +\n          \"    \\\"checkin\\\": \\\"2024-01-01\\\",\\n\" +\n          \"    \\\"checkout\\\": \\\"2024-01-05\\\"\\n\" +\n          \"  },\\n\" +\n          \"  \\\"additionalneeds\\\": \\\"Breakfast\\\"\\n\" +\n          \"}\")\n.when()\n    .post(\"/booking\")\n.then()\n    .statusCode(200);",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "Creates a new booking"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Run inside your Java method with Restful Booker configured. A successful creation returns 200 and includes bookingid and booking. The following six lessons demonstrate different ways to send the same required fields.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "pass-the-body-as-a-string",
      "title": "Pass the body as a String",
      "module": "POST request body variations",
      "source": "REST document, STEP 5.2",
      "blocks": [
        {
          "text": "Use the Restful Booker base URI and the Maven dependencies from setup. Place the request fragment inside your Java method."
        },
        {
          "code": "String body = \"\"\"\n{\n  \"firstname\": \"Wasim\",\n  \"lastname\": \"Ansari\",\n  \"totalprice\": 1000,\n  \"depositpaid\": true,\n  \"bookingdates\": {\n    \"checkin\": \"2024-01-01\",\n    \"checkout\": \"2024-01-05\"\n  },\n  \"additionalneeds\": \"Breakfast\"\n}\n\"\"\";\n\ngiven()\n    .contentType(\"application/json\")\n    .body(body)\n    .when().post(\"/booking\")\n    .then().statusCode(200);",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "Use a JSON String for quick experiments or small fixed payloads."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Use the Restful Booker base URI and the Maven dependencies from setup. Place the request fragment inside your Java method.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "build-a-request-body-with-a-java-map",
      "title": "Build a request body with a Java Map",
      "module": "POST request body variations",
      "source": "REST document, STEP 5.3",
      "blocks": [
        {
          "text": "Use the Restful Booker base URI and the Maven dependencies from setup. Place the request fragment inside your Java method."
        },
        {
          "code": "HashMap<String, Object> body = new HashMap<>();\nbody.put(\"firstname\", \"Wasim\");\nbody.put(\"lastname\", \"Ansari\");\nbody.put(\"totalprice\", 1000);\nbody.put(\"depositpaid\", true);\nbody.put(\"bookingdates\", Map.of(\"checkin\", \"2024-01-01\", \"checkout\", \"2024-01-05\"));\nbody.put(\"additionalneeds\", \"Breakfast\");\n\ngiven()\n    .contentType(\"application/json\")\n    .body(body)\n    .when().post(\"/booking\")\n    .then().statusCode(200);",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "REST Assured uses Jackson to serialize the Map. Build the Map dynamically as needed. The required bookingdates field still holds a nested value."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Use the Restful Booker base URI and the Maven dependencies from setup. Place the request fragment inside your Java method.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "build-nested-json-with-maps",
      "title": "Build nested JSON with Maps",
      "module": "POST request body variations",
      "source": "REST document, STEP 5.4",
      "blocks": [
        {
          "text": "Use the Restful Booker base URI and the Maven dependencies from setup. Place the request fragment inside your Java method."
        },
        {
          "code": "HashMap<String, Object> bookingDates = new HashMap<>();\nbookingDates.put(\"checkin\", \"2024-01-01\");\nbookingDates.put(\"checkout\", \"2024-01-05\");\n\nHashMap<String, Object> body = new HashMap<>();\nbody.put(\"firstname\", \"Wasim\");\nbody.put(\"lastname\", \"Ansari\");\nbody.put(\"totalprice\", 1000);\nbody.put(\"depositpaid\", true);\nbody.put(\"bookingdates\", bookingDates);\n\ngiven()\n    .header(\"Content-Type\", \"application/json\")\n    .body(body)\n.when()\n    .post(\"/booking\")\n.then()\n    .statusCode(200);",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "Handles complex JSON\nVery important in real APIs"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Use the Restful Booker base URI and the Maven dependencies from setup. Place the request fragment inside your Java method.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "serialize-a-booking-pojo",
      "title": "Serialize a booking POJO",
      "module": "POST request body variations",
      "source": "REST document, STEP 5.5",
      "blocks": [
        {
          "text": "Save the class as Booking.java in the same package as your calling code. Add the Jackson dependency shown in Maven setup."
        },
        {
          "text": "Use the Restful Booker base URI and the Maven dependencies from setup. Place the request fragment inside your Java method."
        },
        {
          "heading": "Create Class"
        },
        {
          "code": "public class Booking {\n    public String firstname;\n    public String lastname;\n    public int totalprice;\n    public boolean depositpaid;\n    public BookingDates bookingdates;\n    public String additionalneeds;\n\n    public static class BookingDates {\n        public String checkin;\n        public String checkout;\n    }\n}",
          "language": "java",
          "title": "Booking.java"
        },
        {
          "heading": "Use it"
        },
        {
          "code": "Booking b = new Booking();\nb.firstname = \"Wasim\";\nb.lastname = \"Ansari\";\nb.totalprice = 1000;\nb.depositpaid = true;\nb.bookingdates = new Booking.BookingDates();\nb.bookingdates.checkin = \"2024-01-01\";\nb.bookingdates.checkout = \"2024-01-05\";\nb.additionalneeds = \"Breakfast\";\n\ngiven()\n    .header(\"Content-Type\", \"application/json\")\n    .body(b)\n.when()\n    .post(\"/booking\")\n.then()\n    .statusCode(200);",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "Jackson serializes the Java object. Keep the fields aligned with the API contract so the same model can be reused."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Save the class as Booking.java in the same package as your calling code. Add the Jackson dependency shown in Maven setup.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "read-a-post-body-from-a-json-file",
      "title": "Read a POST body from a JSON file",
      "module": "POST request body variations",
      "source": "REST document, STEP 5.6",
      "blocks": [
        {
          "text": "Save this fixture as booking.json at the Maven project root and run the Java example with that directory as its working directory."
        },
        {
          "text": "booking.json"
        },
        {
          "code": "{\n  \"firstname\": \"Wasim\",\n  \"lastname\": \"Ansari\",\n  \"totalprice\": 1000,\n  \"depositpaid\": true,\n  \"bookingdates\": {\n    \"checkin\": \"2024-01-01\",\n    \"checkout\": \"2024-01-05\"\n  },\n  \"additionalneeds\": \"Breakfast\"\n}",
          "language": "json",
          "title": "booking.json"
        },
        {
          "heading": "Code"
        },
        {
          "code": "given()\n    .header(\"Content-Type\", \"application/json\")\n    .body(new File(\"booking.json\"))\n.when()\n    .post(\"/booking\")\n.then()\n    .statusCode(200);",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "Keep large payloads in separate JSON fixtures."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Save this fixture as booking.json at the Maven project root and run the Java example with that directory as its working directory.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "build-a-body-with-stringbuilder",
      "title": "Build a body with StringBuilder",
      "module": "POST request body variations",
      "source": "REST document, STEP 5.7",
      "blocks": [
        {
          "text": "Use the Restful Booker base URI and the Maven dependencies from setup. Place the request fragment inside your Java method."
        },
        {
          "code": "String firstname = \"Wasim\";\nString body = new StringBuilder()\n    .append(\"{\")\n    .append(\"\\\"firstname\\\":\\\"\").append(firstname).append(\"\\\",\")\n    .append(\"\\\"lastname\\\":\\\"Ansari\\\",\")\n    .append(\"\\\"totalprice\\\":1000,\\\"depositpaid\\\":true,\")\n    .append(\"\\\"bookingdates\\\":{\\\"checkin\\\":\\\"2024-01-01\\\",\\\"checkout\\\":\\\"2024-01-05\\\"},\")\n    .append(\"\\\"additionalneeds\\\":\\\"Breakfast\\\"}\")\n    .toString();\n\ngiven()\n    .contentType(\"application/json\")\n    .body(body)\n    .when().post(\"/booking\")\n    .then().statusCode(200);",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "Use StringBuilder to see how dynamic assembly works. Only interpolate the trusted sample string shown here. Use Jackson for arbitrary input so JSON escaping is handled correctly."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Use the Restful Booker base URI and the Maven dependencies from setup. Place the request fragment inside your Java method.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "extract-the-booking-id",
      "title": "Extract the booking ID",
      "module": "Authenticated booking workflow",
      "source": "REST document, STEP 6",
      "blocks": [
        {
          "text": "Use booking.json from the previous lesson and import java.io.File. Save the ID from your own POST response before running the mutation examples."
        },
        {
          "code": "int bookingId = given()\n    .contentType(\"application/json\")\n    .body(new File(\"booking.json\"))\n    .when().post(\"/booking\")\n    .then().statusCode(200)\n    .extract().path(\"bookingid\");\nSystem.out.println(\"Booking ID: \" + bookingId);",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "Dynamic value → used later"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Use booking.json from the previous lesson and import java.io.File. Save the ID from your own POST response before running the mutation examples.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "generate-an-authentication-token",
      "title": "Generate an authentication token",
      "module": "Authenticated booking workflow",
      "source": "REST document, STEP 7",
      "blocks": [
        {
          "code": "String token =\ngiven()\n    .header(\"Content-Type\", \"application/json\")\n    .body(\"{\\\"username\\\":\\\"admin\\\",\\\"password\\\":\\\"password123\\\"}\")\n.when()\n    .post(\"/auth\")\n.then().statusCode(200)\n    .extract().path(\"token\");\nif (token == null || token.isBlank()) {\n    throw new IllegalStateException(\"No Restful Booker token was returned.\");\n}",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "Use the token as a Cookie for the authenticated update and delete examples."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Use the token as a Cookie for the authenticated update and delete examples.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "replace-a-booking-with-put",
      "title": "Replace a booking with PUT",
      "module": "Authenticated booking workflow",
      "source": "REST document, STEP 8",
      "blocks": [
        {
          "text": "Use bookingId and token from the two previous lessons in the same method. The complete payload replaces the original booking fields."
        },
        {
          "code": "given()\n    .header(\"Content-Type\", \"application/json\")\n    .header(\"Cookie\", \"token=\" + token)\n    .body(\"{\\n\" +\n          \"  \\\"firstname\\\": \\\"Updated\\\",\\n\" +\n          \"  \\\"lastname\\\": \\\"User\\\",\\n\" +\n          \"  \\\"totalprice\\\": 2000,\\n\" +\n          \"  \\\"depositpaid\\\": false,\\n\" +\n          \"  \\\"bookingdates\\\": {\\n\" +\n          \"    \\\"checkin\\\": \\\"2024-02-01\\\",\\n\" +\n          \"    \\\"checkout\\\": \\\"2024-02-05\\\"\\n\" +\n          \"  },\\n\" +\n          \"  \\\"additionalneeds\\\": \\\"Lunch\\\"\\n\" +\n          \"}\")\n.when()\n    .put(\"/booking/\" + bookingId)\n.then()\n    .statusCode(200);",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "Full update"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Use bookingId and token from the two previous lessons in the same method. The complete payload replaces the original booking fields.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "partially-update-a-booking-with-patch",
      "title": "Partially update a booking with PATCH",
      "module": "Authenticated booking workflow",
      "source": "REST document, STEP 9",
      "blocks": [
        {
          "text": "Use the ID of your own booking and the token generated earlier in the same method."
        },
        {
          "code": "given()\n    .header(\"Content-Type\", \"application/json\")\n    .header(\"Cookie\", \"token=\" + token)\n    .body(\"{\\\"firstname\\\":\\\"PartialUpdate\\\"}\")\n.when()\n    .patch(\"/booking/\" + bookingId)\n.then()\n    .statusCode(200);",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "Updates only selected fields"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Use the ID of your own booking and the token generated earlier in the same method.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "delete-a-booking",
      "title": "Delete a booking",
      "module": "Authenticated booking workflow",
      "source": "REST document, STEP 10",
      "blocks": [
        {
          "text": "Use the ID of your own booking and the token generated earlier. Restful Booker documents 201 for DELETE."
        },
        {
          "code": "given()\n    .header(\"Cookie\", \"token=\" + token)\n.when()\n    .delete(\"/booking/\" + bookingId)\n.then()\n    .statusCode(201);",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "Deletes booking"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Use the ID of your own booking and the token generated earlier. Restful Booker documents 201 for DELETE.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "verify-deletion-with-a-negative-test",
      "title": "Verify deletion with a negative test",
      "module": "Authenticated booking workflow",
      "source": "REST document, STEP 11",
      "blocks": [
        {
          "text": "Use the same bookingId immediately after the successful DELETE."
        },
        {
          "code": "given()\n.when()\n    .get(\"/booking/\" + bookingId)\n.then()\n    .statusCode(404);",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "Confirms deletion"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Use the same bookingId immediately after the successful DELETE.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "filter-bookings-with-query-parameters",
      "title": "Filter bookings with query parameters",
      "module": "Authenticated booking workflow",
      "source": "REST document, STEP 12",
      "blocks": [
        {
          "code": "given()\n    .queryParam(\"firstname\", \"Wasim\")\n    .queryParam(\"lastname\", \"Ansari\")\n.when()\n    .get(\"/booking\")\n.then()\n    .statusCode(200);",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "Filters results"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Filters results",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "validate-response-headers",
      "title": "Validate response headers",
      "module": "Authenticated booking workflow",
      "source": "REST document, STEP 13",
      "blocks": [
        {
          "code": "given()\n.when()\n    .get(\"/booking\")\n.then()\n    .header(\"Content-Type\", containsString(\"json\"));",
          "language": "java",
          "title": "Java fragment"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Validate response headers",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "run-the-end-to-end-booking-workflow",
      "title": "Run the end-to-end booking workflow",
      "module": "Authenticated booking workflow",
      "source": "REST document, STEP 14",
      "blocks": [
        {
          "code": "// 1. Create booking\n// 2. Extract bookingId\n// 3. Generate token\n// 4. Update booking\n// 5. Delete booking\n// 6. Validate deletion",
          "language": "text",
          "title": "Workflow order"
        },
        {
          "text": "Save booking.json from the JSON file lesson in the project root. The workflow creates a fresh booking, updates it, deletes it, and checks for 404."
        },
        {
          "code": "import io.restassured.RestAssured;\nimport java.io.File;\nimport java.util.HashMap;\nimport java.util.List;\nimport java.util.Map;\nimport static io.restassured.RestAssured.given;\nimport static org.hamcrest.Matchers.*;\n\npublic class BookingFlow {\n    public static void main(String[] args) {\n        RestAssured.baseURI = \"https://restful-booker.herokuapp.com\";\n\n        int bookingId = given()\n            .contentType(\"application/json\")\n            .body(new File(\"booking.json\"))\n            .when().post(\"/booking\")\n            .then().statusCode(200)\n            .extract().path(\"bookingid\");\n\n        String token =\n        given()\n            .header(\"Content-Type\", \"application/json\")\n            .body(\"{\\\"username\\\":\\\"admin\\\",\\\"password\\\":\\\"password123\\\"}\")\n        .when()\n            .post(\"/auth\")\n        .then().statusCode(200)\n            .extract().path(\"token\");\n        if (token == null || token.isBlank()) {\n            throw new IllegalStateException(\"No Restful Booker token was returned.\");\n        }\n\n        given()\n            .header(\"Content-Type\", \"application/json\")\n            .header(\"Cookie\", \"token=\" + token)\n            .body(\"{\\n\" +\n                  \"  \\\"firstname\\\": \\\"Updated\\\",\\n\" +\n                  \"  \\\"lastname\\\": \\\"User\\\",\\n\" +\n                  \"  \\\"totalprice\\\": 2000,\\n\" +\n                  \"  \\\"depositpaid\\\": false,\\n\" +\n                  \"  \\\"bookingdates\\\": {\\n\" +\n                  \"    \\\"checkin\\\": \\\"2024-02-01\\\",\\n\" +\n                  \"    \\\"checkout\\\": \\\"2024-02-05\\\"\\n\" +\n                  \"  },\\n\" +\n                  \"  \\\"additionalneeds\\\": \\\"Lunch\\\"\\n\" +\n                  \"}\")\n        .when()\n            .put(\"/booking/\" + bookingId)\n        .then()\n            .statusCode(200);\n\n        given()\n            .header(\"Content-Type\", \"application/json\")\n            .header(\"Cookie\", \"token=\" + token)\n            .body(\"{\\\"firstname\\\":\\\"PartialUpdate\\\"}\")\n        .when()\n            .patch(\"/booking/\" + bookingId)\n        .then()\n            .statusCode(200);\n\n        given()\n            .header(\"Cookie\", \"token=\" + token)\n        .when()\n            .delete(\"/booking/\" + bookingId)\n        .then()\n            .statusCode(201);\n\n        given()\n        .when()\n            .get(\"/booking/\" + bookingId)\n        .then()\n            .statusCode(404);\n    }\n}",
          "language": "java",
          "title": "src/main/java/BookingFlow.java"
        },
        {
          "code": "mvn compile exec:java -Dexec.mainClass=BookingFlow",
          "language": "bash",
          "title": "Run the workflow"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Save booking.json from the JSON file lesson in the project root. The workflow creates a fresh booking, updates it, deletes it, and checks for 404.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "serialization-and-deserialization",
      "title": "Serialization and deserialization",
      "module": "JSON and object mapping",
      "source": "REST document, STEP 15",
      "blocks": [
        {
          "text": "Serialization = Java object → JSON\nDeserialization = JSON → Java object"
        },
        {
          "text": "Used for clean request/response handling."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Serialization = Java object → JSON",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "extract-a-field-from-a-json-response",
      "title": "Extract a field from a JSON response",
      "module": "JSON and object mapping",
      "source": "REST document, STEP 16",
      "blocks": [
        {
          "code": "String name = given().baseUri(\"http://localhost:3000\")\n    .when().get(\"/users/u1\")\n    .then().statusCode(200).extract().path(\"name\");",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "This extracts one scalar field. A later lesson maps the entire response into a User object."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "This extracts one scalar field. A later lesson maps the entire response into a User object.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "authentication-and-authorization",
      "title": "Authentication and authorization",
      "module": "JSON and object mapping",
      "source": "REST document, STEP 17",
      "blocks": [
        {
          "text": "Run this Restful Booker fragment using the fixture and imports from the booking lessons. It creates its own booking before using an authenticated update."
        },
        {
          "text": "For local API (json-server), auth is not enforced by default."
        },
        {
          "text": "For real APIs: https://restful-booker.herokuapp.com"
        },
        {
          "text": "Authentication → login → token"
        },
        {
          "text": "Restful Booker checks the token cookie on mutations. A bearer header is common in other APIs, but is not the mechanism used in this booking example."
        },
        {
          "code": "int bookingId = given()\n    .contentType(\"application/json\")\n    .body(new File(\"booking.json\"))\n    .when().post(\"/booking\")\n    .then().statusCode(200)\n    .extract().path(\"bookingid\");\n\nString token =\n         given()\n               .header(\"Content-Type\", \"application/json\")\n               .body(\"{\\\"username\\\":\\\"admin\\\",\\\"password\\\":\\\"password123\\\"}\")\n               .when()\n               .post(\"/auth\")\n               .then()\n               .statusCode(200)\n               .extract()\n               .path(\"token\");\n\n\n\n   given()\n         .header(\"Content-Type\", \"application/json\")\n         .header(\"Cookie\", \"token=\" + token)\n         .body(\"{\\n\"\n               + \"  \\\"firstname\\\": \\\"Harper\\\",\\n\"\n               + \"  \\\"lastname\\\": \\\"Quinn\\\",\\n\"\n               + \"  \\\"totalprice\\\": 345,\\n\"\n               + \"  \\\"depositpaid\\\": false,\\n\"\n               + \"  \\\"bookingdates\\\": {\\n\"\n               + \"    \\\"checkin\\\": \\\"2020-08-01\\\",\\n\"\n               + \"    \\\"checkout\\\": \\\"2020-08-04\\\"\\n\"\n               + \"  },\\n\"\n               + \"  \\\"additionalneeds\\\": \\\"Cab Service\\\"\\n\"\n               + \"}\")\n         .when()\n         .put(\"/booking/\" + bookingId)\n         .then()\n         .statusCode(200);",
          "language": "java",
          "title": "Java fragment"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Run this Restful Booker fragment using the fixture and imports from the booking lessons. It creates its own booking before using an authenticated update.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "json-objects",
      "title": "JSON objects",
      "module": "JSON and object mapping",
      "source": "REST document, STEP 18",
      "blocks": [
        {
          "text": "A JSON object contains named properties. Here, name has a string value."
        },
        {
          "text": "Example:"
        },
        {
          "code": "{\n  \"name\": \"Wasim\"\n}",
          "language": "json",
          "title": "Example"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "A JSON object contains named properties. Here, name has a string value.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "query-a-json-response-with-jsonpath",
      "title": "Query a JSON response with JSONPath",
      "module": "JSON and object mapping",
      "source": "REST document, STEP 19",
      "blocks": [
        {
          "code": "given().baseUri(\"http://localhost:3000\")\n    .when().get(\"/users/u1\")\n    .then().statusCode(200).body(\"name\", equalTo(\"Wasim\"));",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "Used to read JSON response."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Used to read JSON response.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "query-an-array-with-jsonpath",
      "title": "Query an array with JSONPath",
      "module": "JSON and object mapping",
      "source": "REST document, STEP 20",
      "blocks": [
        {
          "code": "given().baseUri(\"http://localhost:3000\")\n    .when().get(\"/users?id=u1\")\n    .then().statusCode(200).body(\"[0].name\", equalTo(\"Wasim\"));",
          "language": "java",
          "title": "Java fragment"
        },
        {
          "text": "Access array elements."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Access array elements.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "extract-a-list-from-a-json-array",
      "title": "Extract a list from a JSON array",
      "module": "JSON and object mapping",
      "source": "REST document, STEP 21",
      "blocks": [
        {
          "code": "List<String> names = given().baseUri(\"http://localhost:3000\")\n    .when().get(\"/users\")\n    .then().statusCode(200).extract().jsonPath().getList(\"name\", String.class);",
          "language": "java",
          "title": "Java fragment"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Extract a list from a JSON array",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "deserialize-a-json-response-into-an-array",
      "title": "Deserialize a JSON response into an array",
      "module": "JSON and object mapping",
      "source": "REST document, STEP 22",
      "blocks": [
        {
          "text": "Place User.java from the request POJO lesson in the same package. JSON Server returns objects, so deserialize to User[] instead of String[]. The previous lesson demonstrates extracting only the names."
        },
        {
          "code": "User[] users = given().baseUri(\"http://localhost:3000\")\n    .when().get(\"/users\")\n    .then().statusCode(200).extract().as(User[].class);",
          "language": "java",
          "title": "Java fragment"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Place User.java from the request POJO lesson in the same package. JSON Server returns objects, so deserialize to User[] instead of String[]. The previous lesson demonstrates extracting only the names.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "read-swagger-and-api-documentation",
      "title": "Read Swagger and API documentation",
      "module": "Documentation and framework design",
      "source": "REST document, STEP 23",
      "blocks": [
        {
          "text": "Use Swagger / API docs to understand:"
        },
        {
          "text": "endpoints"
        },
        {
          "text": "request/response"
        },
        {
          "text": "auth"
        },
        {
          "text": "Find the HTTP method and path, check required fields and authentication, then compare the documented success and failure responses against your results."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Read Swagger and API documentation.",
      "hideReview": true,
      "legacyIds": [],
      "resources": [
        {
          "label": "Restful Booker API documentation",
          "url": "https://restful-booker.herokuapp.com/apidoc/index.html"
        }
      ]
    },
    {
      "id": "structure-a-rest-api-automation-framework",
      "title": "Structure a REST API automation framework",
      "module": "Documentation and framework design",
      "source": "REST document, STEP 24",
      "blocks": [
        {
          "text": "Framework includes:"
        },
        {
          "text": "base class"
        },
        {
          "text": "utilities"
        },
        {
          "text": "test classes"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Structure a REST API automation framework.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "describe-an-api-test-in-cucumber",
      "title": "Describe an API test in Cucumber",
      "module": "Documentation and framework design",
      "source": "REST document, STEP 25",
      "blocks": [
        {
          "text": "Write BDD style:"
        },
        {
          "code": "Given user calls GET users API\nWhen request is sent\nThen status code should be 200",
          "language": "gherkin",
          "title": "Example"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Describe an API test in Cucumber.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "convert-a-request-body-to-a-pojo",
      "title": "Convert a request body to a POJO",
      "module": "Documentation and framework design",
      "source": "REST document, STEP 26",
      "blocks": [
        {
          "text": "Create Java class:"
        },
        {
          "code": "public class User {\n    public String id;\n    public String name;\n    public String email;\n\n    public User() {}\n\n    public User(String name, String email) {\n        this.name = name;\n        this.email = email;\n    }\n}",
          "language": "java",
          "title": "User.java"
        },
        {
          "text": "Use:"
        },
        {
          "code": "given().baseUri(\"http://localhost:3000\")\n    .contentType(\"application/json\").body(new User(\"Wasim\", \"wasim@example.test\"))\n    .when().post(\"/users\")\n    .then().statusCode(201);",
          "language": "java",
          "title": "Java fragment"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Convert a request body to a POJO.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "deserialize-a-response-body-into-a-pojo",
      "title": "Deserialize a response body into a POJO",
      "module": "Documentation and framework design",
      "source": "REST document, STEP 27",
      "blocks": [
        {
          "text": "Use User.java from the previous lesson and keep the JSON Server fixture running."
        },
        {
          "code": "User user = given().baseUri(\"http://localhost:3000\")\n    .when().get(\"/users/u1\")\n    .then().statusCode(200).extract().as(User.class);",
          "language": "java",
          "title": "Java fragment"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Use User.java from the previous lesson and keep the JSON Server fixture running.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "separate-tests-and-api-services",
      "title": "Separate tests and API services",
      "module": "Documentation and framework design",
      "source": "REST document, STEP 28",
      "blocks": [
        {
          "text": "Keep:"
        },
        {
          "text": "test logic separate"
        },
        {
          "text": "API calls separate"
        },
        {
          "text": "Improves maintainability."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Separate tests and API services.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "centralize-api-routes",
      "title": "Centralize API routes",
      "module": "Documentation and framework design",
      "source": "REST document, STEP 29",
      "blocks": [
        {
          "text": "Define endpoints centrally:"
        },
        {
          "code": "String USERS = \"/users\";",
          "language": "java",
          "title": "Java fragment"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Centralize API routes.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "use-generics-in-api-helpers",
      "title": "Use generics in API helpers",
      "module": "Documentation and framework design",
      "source": "REST document, STEP 30",
      "blocks": [
        {
          "text": "Reusable methods for:"
        },
        {
          "text": "GET"
        },
        {
          "text": "POST"
        },
        {
          "text": "PUT"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Use generics in API helpers.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "reuse-request-headers",
      "title": "Reuse request headers",
      "module": "Documentation and framework design",
      "source": "REST document, STEP 31",
      "blocks": [
        {
          "text": "Create common headers method:"
        },
        {
          "code": "given().header(\"Content-Type\",\"application/json\");",
          "language": "java",
          "title": "Java fragment"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Reuse request headers.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "share-test-context",
      "title": "Share test context",
      "module": "Documentation and framework design",
      "source": "REST document, STEP 32",
      "blocks": [
        {
          "text": "Carry the booking ID and token through one workflow or a per-test context object. Avoid relying on test execution order or shared static state."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Carry the booking ID and token through one workflow or a per-test context object. Avoid relying on test execution order or shared static state.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "share-cucumber-scenario-context",
      "title": "Share Cucumber scenario context",
      "module": "Documentation and framework design",
      "source": "REST document, STEP 33",
      "blocks": [
        {
          "text": "Use scenario-scoped storage to share the response, booking ID, or token between Cucumber steps. Each scenario starts with fresh context."
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Use scenario-scoped storage to share the response, booking ID, or token between Cucumber steps. Each scenario starts with fresh context.",
      "hideReview": true,
      "legacyIds": []
    },
    {
      "id": "read-the-base-url-from-configuration",
      "title": "Read the base URL from configuration",
      "module": "Documentation and framework design",
      "source": "REST document, STEP 34",
      "blocks": [
        {
          "text": "Read config from file:"
        },
        {
          "code": "baseUrl=http://localhost:3000",
          "language": "properties",
          "title": "Example"
        }
      ],
      "level": "Intermediate",
      "learningObjective": "Read the base URL from configuration.",
      "hideReview": true,
      "legacyIds": []
    }
  ]
};
