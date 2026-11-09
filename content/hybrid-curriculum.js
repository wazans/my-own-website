window.TestNovaDocumentCourse = {
  "id": "hybrid",
  "title": "Selenium Java Hybrid Automation Framework",
  "storageKey": "testnova-reader-hybrid-v1",
  "hashNavigation": true,
  "topics": [
    {
      "id": "environment-setup",
      "title": "Set up Java, Maven and Selenium",
      "module": "Environment Setup and First Automation",
      "source": "🧱 STEP 0 — Environment Setup (Java + Selenium + Maven)",
      "level": "Beginner",
      "duration": "3 min read",
      "learningObjective": "Browser should open Amazon. Nothing else matters yet.",
      "hideReview": true,
      "legacyIds": [
        "step-0",
        "from-scratch"
      ],
      "blocks": [
        {
          "text": "1️⃣ Install Java (JDK)"
        },
        {
          "text": "You need JDK installed."
        },
        {
          "text": "Check:"
        },
        {
          "language": "bash",
          "code": "java -version",
          "title": "Example command"
        },
        {
          "text": "Expected:"
        },
        {
          "text": "Java 17 or later"
        },
        {
          "text": "If not installed → install JDK (Temurin / Oracle, any is fine)."
        },
        {
          "text": "2️⃣ Create Maven Project"
        },
        {
          "text": "In IntelliJ IDEA or Eclipse:"
        },
        {
          "text": "New Project → Maven"
        },
        {
          "text": "GroupId: com.automation"
        },
        {
          "text": "ArtifactId: amazon-selenium"
        },
        {
          "text": "3️⃣ Add Selenium Dependency"
        },
        {
          "text": "Open pom.xml → add:"
        },
        {
          "language": "xml",
          "code": "<project xmlns=\"http://maven.apache.org/POM/4.0.0\"\n         xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n         xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd\">\n  <modelVersion>4.0.0</modelVersion>\n  <groupId>com.automation</groupId>\n  <artifactId>amazon-selenium</artifactId>\n  <version>1.0-SNAPSHOT</version>\n  <properties>\n    <maven.compiler.release>17</maven.compiler.release>\n    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>\n  </properties>\n  <dependencies>\n    <dependency>\n      <groupId>org.seleniumhq.selenium</groupId>\n      <artifactId>selenium-java</artifactId>\n      <version>4.39.0</version>\n      <scope>test</scope>\n    </dependency>\n  </dependencies>\n</project>",
          "title": "pom.xml · complete starter file",
          "explanation": "Place this file at the project root. If IntelliJ already created a POM, merge the properties and dependency into its corresponding sections."
        },
        {
          "text": "4️⃣ ChromeDriver Setup"
        },
        {
          "text": "Download ChromeDriver matching your Chrome version."
        },
        {
          "text": "Set path in code:"
        },
        {
          "language": "java",
          "code": "System.setProperty(\"webdriver.chrome.driver\", \"C:\\\\drivers\\\\chromedriver.exe\");",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "text": "5️⃣ Create First Class"
        },
        {
          "text": "Path:"
        },
        {
          "text": "src/test/java/com/automation/basic"
        },
        {
          "text": "Class:"
        },
        {
          "text": "AmazonLaunchTest.java"
        },
        {
          "text": "6️⃣ Write Raw Code (No Framework, No Cleanliness Yet)"
        },
        {
          "language": "java",
          "code": "package com.automation.basic;\n\nimport org.openqa.selenium.WebDriver;\nimport org.openqa.selenium.chrome.ChromeDriver;\n\npublic class AmazonLaunchTest {\n\n\tpublic static void main(String[] args) {\n\n\n    \tWebDriver driver = new ChromeDriver();\n\n        driver.manage().window().maximize();\n\n        driver.get(\"https://www.amazon.in\");\n\n        System.out.println(\"Title is: \" + driver.getTitle());\n\n    \tdriver.quit();\n\t}\n}",
          "title": "src/test/java/com/automation/basic/AmazonLaunchTest.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "text": "7️⃣ Run It"
        },
        {
          "text": "Run as:"
        },
        {
          "text": "Java Application"
        },
        {
          "text": "Chrome opens"
        },
        {
          "text": "Amazon loads"
        },
        {
          "text": "Title prints"
        },
        {
          "text": "Browser closes"
        },
        {
          "text": "The hardcoded driver property above is an optional manual setup example. The complete class below uses Selenium Manager through new ChromeDriver(). To use a manually managed driver, insert the property before the constructor and update the file path for your machine."
        }
      ]
    },
    {
      "id": "first-amazon-search",
      "title": "Automate your first Amazon search",
      "module": "Environment Setup and First Automation",
      "source": "🧪 STEP 1 — First Real Interaction (Still Hardcoded)",
      "level": "Beginner",
      "duration": "3 min read",
      "learningObjective": "Automate your first Amazon search.",
      "hideReview": true,
      "legacyIds": [
        "step-1"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Set up Java, Maven and Selenium.”"
        },
        {
          "text": "Now we make it slightly meaningful."
        },
        {
          "text": "Goal"
        },
        {
          "text": "Search for a product (e.g., “laptop”)"
        },
        {
          "text": "Updated Code"
        },
        {
          "language": "java",
          "code": "package com.automation.basic;\n\nimport org.openqa.selenium.By;\nimport org.openqa.selenium.WebDriver;\nimport org.openqa.selenium.chrome.ChromeDriver;\n\npublic class AmazonLaunchTest {\n\n\tpublic static void main(String[] args) {\n\n\n    \tWebDriver driver = new ChromeDriver();\n        driver.manage().window().maximize();\n\n        driver.get(\"https://www.amazon.in\");\n\n    \t// Search for product\n        driver.findElement(By.id(\"twotabsearchtextbox\")).sendKeys(\"laptop\");\n        driver.findElement(By.id(\"nav-search-submit-button\")).click();\n\n        System.out.println(\"Search done. Title: \" + driver.getTitle());\n\n    \tdriver.quit();\n\t}\n}",
          "title": "src/test/java/com/automation/basic/AmazonLaunchTest.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "heading": "What You Just Learned"
        },
        {
          "text": "Locate elements using css,xpath,id but with thread.sleep"
        },
        {
          "text": "Perform actions (sendKeys, click)"
        },
        {
          "text": "Page navigation"
        },
        {
          "text": "Basic automation flow"
        },
        {
          "text": "Real World Note (Important)"
        },
        {
          "text": "Amazon is:"
        },
        {
          "text": "dynamic"
        },
        {
          "text": "sometimes slow"
        },
        {
          "text": "changes DOM often"
        },
        {
          "text": "So if it fails → it’s normal, not your fault."
        },
        {
          "text": "We’ll fix that later with:"
        },
        {
          "text": "waits"
        },
        {
          "text": "better locators"
        },
        {
          "text": "structure"
        },
        {
          "text": "What NOT to do right now"
        },
        {
          "text": "Don’t add TestNG\n ❌ Don’t add Page Object\n ❌ Don’t add config\n ❌ Don’t add waits yet"
        },
        {
          "text": "You are still in raw stage"
        },
        {
          "text": "Perfect start."
        },
        {
          "text": "Good. Now we move from “script” → structure."
        },
        {
          "text": "Still no TestNG.\n Still no config.\n Just clean separation (Interview Question 2 alignment)."
        }
      ]
    },
    {
      "id": "page-object-model",
      "title": "Separate browser actions from tests with POM",
      "module": "Framework Architecture and Page Object Model",
      "source": "🔷 STEP 2 — Convert Amazon Script into Page + Test Structure",
      "level": "Beginner",
      "duration": "3 min read",
      "learningObjective": "Separate browser actions from tests with POM.",
      "hideReview": true,
      "legacyIds": [
        "step-2",
        "framework-overview"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Automate your first Amazon search.”"
        },
        {
          "text": "Goal"
        },
        {
          "text": "Take your working hardcoded script and split it into:"
        },
        {
          "text": "Page class → UI logic"
        },
        {
          "text": "Test class → flow"
        },
        {
          "text": "This is where most people first start looking like real engineers."
        },
        {
          "text": "Final Structure After This Step"
        },
        {
          "text": "src/test/java"
        },
        {
          "language": "text",
          "code": " └── com.automation.framework\n \t├── pages\n \t│   └── AmazonHomePage.java\n \t├── tests\n \t│   └── AmazonSearchTest.java\n \t└── utils\n     \t└── (empty for now)",
          "title": "Project or execution diagram"
        },
        {
          "text": "1️⃣ Create Page Class"
        },
        {
          "text": "pages/AmazonHomePage.java"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.pages;\n\nimport org.openqa.selenium.By;\nimport org.openqa.selenium.WebDriver;\n\npublic class AmazonHomePage {\n\n\tWebDriver driver;\n\n\t// Constructor\n\tpublic AmazonHomePage(WebDriver driver) {\n    \tthis.driver = driver;\n\t}\n\n\t// Locators\n\tprivate By searchBox = By.id(\"twotabsearchtextbox\");\n\tprivate By searchButton = By.id(\"nav-search-submit-button\");\n\n\t// Actions\n\tpublic void enterSearchText(String text) {\n        driver.findElement(searchBox).sendKeys(text);\n\t}\n\n\tpublic void clickSearch() {\n        driver.findElement(searchButton).click();\n\t}\n\n\tpublic String getPageTitle() {\n    \treturn driver.getTitle();\n\t}\n}",
          "title": "src/test/java/com/automation/framework/pages/AmazonHomePage.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "text": "Why this is correct"
        },
        {
          "text": "Only locators + actions"
        },
        {
          "text": "No test logic"
        },
        {
          "text": "No assertions"
        },
        {
          "text": "Exactly what interviewers expect"
        },
        {
          "text": "2️⃣ Create Test Class"
        },
        {
          "text": "tests/AmazonSearchTest.java"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.tests;\n\nimport com.automation.framework.pages.AmazonHomePage;\nimport org.openqa.selenium.WebDriver;\nimport org.openqa.selenium.chrome.ChromeDriver;\n\npublic class AmazonSearchTest {\n\n\tpublic static void main(String[] args) {\n\n\n    \tWebDriver driver = new ChromeDriver();\n        driver.manage().window().maximize();\n\n        driver.get(\"https://www.amazon.in\");\n\n    \t// Create Page Object\n    \tAmazonHomePage homePage = new AmazonHomePage(driver);\n\n    \t// Test Flow\n    \thomePage.enterSearchText(\"laptop\");\n        homePage.clickSearch();\n\n        System.out.println(\"Result Page Title: \" + homePage.getPageTitle());\n\n    \tdriver.quit();\n\t}\n}",
          "title": "src/test/java/com/automation/framework/tests/AmazonSearchTest.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "text": "What just changed (Very Important)"
        },
        {
          "text": "Before:"
        },
        {
          "text": "driver.findElement(...)"
        },
        {
          "text": "Now:"
        },
        {
          "text": "homePage.enterSearchText(...)"
        },
        {
          "text": "You stopped talking to WebDriver\n 👉 You started talking to business actions"
        },
        {
          "text": "That’s the shift from script → framework"
        },
        {
          "text": "Interview Gold Line (Remember this)"
        },
        {
          "text": "I separate page-level actions from test logic using Page Object Model to improve maintainability and readability.”"
        },
        {
          "heading": "Common Mistakes (Avoid Now)"
        },
        {
          "text": "Writing assertions inside Page\n ❌ Keeping locators in test class\n ❌ Mixing driver logic everywhere\n ❌ Creating too many unnecessary classes"
        },
        {
          "text": "What You Achieved"
        },
        {
          "text": "Introduced Page Object Model (POM)"
        },
        {
          "text": "Clean separation"
        },
        {
          "text": "Readable test flow"
        },
        {
          "text": "Reusable actions"
        },
        {
          "text": "Now you’re no longer a beginner."
        },
        {
          "text": "Good. Now we make the jump from “script execution” to test execution."
        },
        {
          "text": "This is where your project starts looking like something Jenkins can run later."
        }
      ]
    },
    {
      "id": "testng-lifecycle",
      "title": "Run your first TestNG test",
      "module": "TestNG and Maven Execution",
      "source": "🔷 STEP 3 — Introduce TestNG (Execution Layer)",
      "level": "Intermediate",
      "duration": "3 min read",
      "learningObjective": "Run your first TestNG test.",
      "hideReview": true,
      "legacyIds": [
        "step-3"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Separate browser actions from tests with POM.”"
        },
        {
          "text": "Goal"
        },
        {
          "text": "Remove main()"
        },
        {
          "text": "Use TestNG annotations"
        },
        {
          "text": "Separate setup / test / teardown"
        },
        {
          "text": "No config yet. No utils yet. Keep it tight."
        },
        {
          "text": "1️⃣ Add TestNG Dependency"
        },
        {
          "text": "In pom.xml add:"
        },
        {
          "language": "xml",
          "code": "<dependency>\n    <groupId>org.testng</groupId>\n    <artifactId>testng</artifactId>\n    <version>7.12.0</version>\n    <scope>test</scope>\n</dependency>",
          "title": "pom.xml · XML example"
        },
        {
          "text": "Then refresh Maven."
        },
        {
          "text": "2️⃣ Update Your Test Class"
        },
        {
          "text": "tests/AmazonSearchTest.java"
        },
        {
          "text": "Replace your current class with this:"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.tests;\n\nimport com.automation.framework.pages.AmazonHomePage;\nimport org.openqa.selenium.WebDriver;\nimport org.openqa.selenium.chrome.ChromeDriver;\nimport org.testng.annotations.*;\n\npublic class AmazonSearchTest {\n\n\tWebDriver driver;\n\tAmazonHomePage homePage;\n\n\t@BeforeMethod\n\tpublic void setUp() {\n\n\n    \tdriver = new ChromeDriver();\n        driver.manage().window().maximize();\n        driver.get(\"https://www.amazon.in\");\n\n    \thomePage = new AmazonHomePage(driver);\n\t}\n\n\t@Test\n\tpublic void searchProductTest() {\n\n        homePage.enterSearchText(\"laptop\");\n        homePage.clickSearch();\n\n        System.out.println(\"Result Page Title: \" + homePage.getPageTitle());\n\t}\n\n\t@AfterMethod\n\tpublic void tearDown() {\n    \tdriver.quit();\n\t}\n}",
          "title": "src/test/java/com/automation/framework/tests/AmazonSearchTest.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "text": "3️⃣ How to Run"
        },
        {
          "text": "Right-click class → Run as TestNG Test"
        },
        {
          "text": "Expected:"
        },
        {
          "text": "Browser opens"
        },
        {
          "text": "Search runs"
        },
        {
          "text": "Browser closes"
        },
        {
          "heading": "What You Just Learned"
        },
        {
          "text": "BeforeMethod"
        },
        {
          "text": "Runs before each test\n 👉 setup (driver, URL)"
        },
        {
          "text": "Test"
        },
        {
          "text": "Actual test logic"
        },
        {
          "text": "AfterMethod"
        },
        {
          "text": "Runs after each test\n 👉 cleanup (driver quit)"
        },
        {
          "text": "Why This Step Matters"
        },
        {
          "text": "Before:"
        },
        {
          "text": "You had to run manually"
        },
        {
          "text": "No test lifecycle"
        },
        {
          "text": "No scalability"
        },
        {
          "text": "Now:"
        },
        {
          "text": "Tests are structured"
        },
        {
          "text": "Multiple tests possible"
        },
        {
          "text": "CI-ready foundation"
        },
        {
          "heading": "Interview Line (Very Important)"
        },
        {
          "text": "I use TestNG for managing test execution, including setup, teardown, grouping, and reporting.”"
        },
        {
          "heading": "Common Mistakes (Avoid)"
        },
        {
          "text": "Putting driver setup inside test method\n ❌ Forgetting driver.quit()\n ❌ Writing everything inside @Test\n ❌ Mixing page logic here"
        },
        {
          "text": "Now you officially have a basic framework skeleton."
        },
        {
          "text": "Now we move from “working framework” → clean, reusable framework."
        },
        {
          "text": "This is a big step in interviews.\n You stop repeating driver code everywhere."
        }
      ]
    },
    {
      "id": "base-test",
      "title": "Reuse browser setup and teardown",
      "module": "TestNG and Maven Execution",
      "source": "🔷 STEP 4 — Introduce BaseTest (Driver Reusability)",
      "level": "Intermediate",
      "duration": "3 min read",
      "learningObjective": "Reuse browser setup and teardown.",
      "hideReview": true,
      "legacyIds": [
        "step-4"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Run your first TestNG test.”"
        },
        {
          "text": "Goal"
        },
        {
          "text": "Remove duplicate setup/teardown from test classes"
        },
        {
          "text": "Centralize WebDriver handling"
        },
        {
          "text": "Make tests cleaner and scalable"
        },
        {
          "text": "Updated Structure"
        },
        {
          "text": "src/test/java"
        },
        {
          "language": "text",
          "code": " └── com.automation.framework\n \t├── pages\n \t│   └── AmazonHomePage.java\n \t├── tests\n \t│   └── AmazonSearchTest.java\n \t└── utils\n     \t    └── BaseTest.java   ✅ NEW",
          "title": "Project or execution diagram"
        },
        {
          "text": "1️⃣ Create BaseTest Class"
        },
        {
          "text": "utils/BaseTest.java"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.utils;\n\nimport org.openqa.selenium.WebDriver;\nimport org.openqa.selenium.chrome.ChromeDriver;\nimport org.testng.annotations.*;\n\npublic class BaseTest {\n\n\tprotected WebDriver driver;\n\n\t@BeforeMethod\n\tpublic void setUp() {\n\n\n    \tdriver = new ChromeDriver();\n        driver.manage().window().maximize();\n        driver.get(\"https://www.amazon.in\");\n\t}\n\n\t@AfterMethod(alwaysRun = true)\n\tpublic void tearDown() {\n    \tif (driver != null) driver.quit();\n\t}\n\n    public WebDriver getDriver() {\n        return driver;\n    }\n}",
          "title": "src/test/java/com/automation/framework/utils/BaseTest.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "text": "Why this is important"
        },
        {
          "text": "Driver logic lives in one place"
        },
        {
          "text": "All tests reuse it"
        },
        {
          "text": "Easier maintenance"
        },
        {
          "text": "2️⃣ Update Test Class (Inheritance)"
        },
        {
          "text": "tests/AmazonSearchTest.java"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.tests;\n\nimport com.automation.framework.pages.AmazonHomePage;\nimport com.automation.framework.utils.BaseTest;\nimport org.testng.annotations.Test;\n\npublic class AmazonSearchTest extends BaseTest {\n\n\t@Test\n\tpublic void searchProductTest() {\n\n    \tAmazonHomePage homePage = new AmazonHomePage(getDriver());\n\n        homePage.enterSearchText(\"laptop\");\n        homePage.clickSearch();\n\n        System.out.println(\"Result Page Title: \" + homePage.getPageTitle());\n\t}\n}",
          "title": "src/test/java/com/automation/framework/tests/AmazonSearchTest.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "text": "What just changed"
        },
        {
          "text": "Before:"
        },
        {
          "language": "java",
          "code": "driver = new ChromeDriver();",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "text": "Now:\n 👉 Test class doesn’t care about driver creation\n 👉 It just uses driver"
        },
        {
          "text": "That’s real abstraction."
        },
        {
          "text": "Interview Gold Line"
        },
        {
          "text": "I created a BaseTest class to handle driver initialization and teardown, ensuring reusability and reducing code duplication across test classes.”"
        },
        {
          "heading": "Common Mistakes"
        },
        {
          "text": "Creating driver again in test class\n ❌ Not using extends BaseTest\n ❌ Making driver private (should be protected)\n ❌ Hardcoding everything forever (we fix next)"
        },
        {
          "text": "What You Achieved"
        },
        {
          "text": "Centralized driver management"
        },
        {
          "text": "Cleaner test classes"
        },
        {
          "text": "Reusable setup"
        },
        {
          "text": "Foundation for CI/CD"
        },
        {
          "text": "Now your framework looks professional baseline."
        },
        {
          "text": "Now we do the step that separates “working code” from real framework."
        },
        {
          "text": "Right now your project is still hardcoded.\n That’s fine for learning, but not acceptable in real projects."
        }
      ]
    },
    {
      "id": "testng-suite",
      "title": "Create and run testng.xml",
      "module": "TestNG and Maven Execution",
      "source": "🔷 STEP 8 — Create testng.xml (Where & How in IntelliJ)",
      "level": "Intermediate",
      "duration": "3 min read",
      "learningObjective": "Create and run testng.xml.",
      "hideReview": true,
      "legacyIds": [
        "step-8"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Reuse browser setup and teardown.”"
        },
        {
          "text": "WHERE to create"
        },
        {
          "text": "In IntelliJ:"
        },
        {
          "text": "Right-click project root (same level as pom.xml)"
        },
        {
          "text": "Click New → File"
        },
        {
          "text": "Name it:"
        },
        {
          "text": "testng.xml"
        },
        {
          "text": "Final location:"
        },
        {
          "text": "amazon-selenium/"
        },
        {
          "language": "text",
          "code": " ├── pom.xml\n ├── testng.xml   ✅ HERE\n └── src/",
          "title": "Project or execution diagram"
        },
        {
          "text": "Basic testng.xml"
        },
        {
          "language": "xml",
          "code": "<!DOCTYPE suite SYSTEM \"https://testng.org/testng-1.0.dtd\">\n\n<suite name=\"Amazon Suite\">\n\n    <test name=\"All Tests\">\n        <classes>\n            <class name=\"com.automation.framework.tests.AmazonSearchTest\"/>\n        </classes>\n    </test>\n\n</suite>",
          "title": "testng.xml · XML example",
          "explanation": "Create testng.xml in the project root. This first suite runs the search class already available at this stage."
        },
        {
          "text": "How to Run"
        },
        {
          "text": "Right click testng.xml → Run"
        },
        {
          "text": "Runs ALL classes"
        }
      ]
    },
    {
      "id": "testng-selection",
      "title": "Select TestNG classes, methods and groups",
      "module": "TestNG and Maven Execution",
      "source": "🔷 STEP 9 — Advanced TestNG Usage (Important)",
      "level": "Intermediate",
      "duration": "3 min read",
      "learningObjective": "Select TestNG classes, methods and groups.",
      "hideReview": true,
      "legacyIds": [],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Create and run testng.xml.”"
        },
        {
          "text": "Goal"
        },
        {
          "text": "Control execution like a pro"
        },
        {
          "text": "1. Run Specific Class Only"
        },
        {
          "language": "xml",
          "code": "<classes>\n    <class name=\"com.automation.framework.tests.AmazonResultsTest\"/>\n</classes>",
          "title": "testng.xml · XML example"
        },
        {
          "text": "2. Run Specific Method"
        },
        {
          "language": "xml",
          "code": "<class name=\"com.automation.framework.tests.AmazonSearchTest\">\n    <methods>\n        <include name=\"searchProductTest\"/>\n    </methods>\n</class>",
          "title": "pom.xml · XML example"
        },
        {
          "text": "3. Parallel Execution (Basic)"
        },
        {
          "language": "xml",
          "code": "<suite name=\"Amazon Suite\" verbose=\"2\">",
          "title": "testng.xml · XML example"
        },
        {
          "text": "4. Grouping (Better Design)"
        },
        {
          "text": "In test:"
        },
        {
          "language": "java",
          "code": "@Test(groups = \"smoke\")",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "text": "In XML:"
        },
        {
          "language": "xml",
          "code": "<groups>\n    <run>\n        <include name=\"\t\"/>\n    </run>\n</groups>",
          "title": "testng.xml · XML example"
        },
        {
          "text": "Keep execution sequential until the Parallel Execution lesson, which introduces one WebDriver per thread."
        }
      ]
    },
    {
      "id": "maven-execution",
      "title": "Run TestNG with Maven and Surefire",
      "module": "TestNG and Maven Execution",
      "source": "🔷 STEP 10 — Run Using Maven (pom.xml)",
      "level": "Intermediate",
      "duration": "3 min read",
      "learningObjective": "Run TestNG with Maven and Surefire.",
      "hideReview": true,
      "legacyIds": [
        "step-11"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Select TestNG classes, methods and groups.”"
        },
        {
          "text": "1️⃣ Add Surefire Plugin"
        },
        {
          "language": "xml",
          "code": "<build>\n    <plugins>\n        <plugin>\n            <groupId>org.apache.maven.plugins</groupId>\n            <artifactId>maven-surefire-plugin</artifactId>\n            <version>3.2.5</version>\n            <configuration>\n                <suiteXmlFiles>\n                    <suiteXmlFile>testng.xml</suiteXmlFile>\n                </suiteXmlFiles>\n            </configuration>\n        </plugin>\n    </plugins>\n</build>",
          "title": "pom.xml · build fragment",
          "explanation": "Add the Surefire plugin inside the existing build/plugins section. The combined example later in this lesson adds the Java compiler settings."
        },
        {
          "text": "2️⃣ Run in IntelliJ"
        },
        {
          "text": "Option A:"
        },
        {
          "text": "Right click pom.xml → Run → Maven → test"
        },
        {
          "text": "Option B:"
        },
        {
          "text": "Terminal:"
        },
        {
          "language": "bash",
          "code": "mvn clean test",
          "title": "Example command"
        },
        {
          "text": "What Happens"
        },
        {
          "text": "Maven\n→ Surefire\n→ TestNG\n→ testng.xml\n→ your test classes"
        },
        {
          "text": "Same flow used in Jenkins"
        },
        {
          "text": "Interview Gold Explanation (This Section)"
        },
        {
          "text": "I structured my test suite using TestNG XML, allowing execution control over multiple classes, methods, and groups. I ensured different test scenarios like search, validation, and result verification were separated into different test classes. For CI/CD, I configured Maven Surefire plugin to execute the suite via testng.xml.”"
        },
        {
          "text": "Final Status Now"
        },
        {
          "text": "Multiple meaningful test classes"
        },
        {
          "text": "Page separation (Home + Results)"
        },
        {
          "text": "testng.xml execution control"
        },
        {
          "text": "Maven execution ready"
        },
        {
          "text": "Framework scalable"
        },
        {
          "text": "This is now a real automation framework, not practice"
        },
        {
          "heading": "Configure the compiler and test runner"
        },
        {
          "text": "In IntelliJ"
        },
        {
          "text": "Open your project"
        },
        {
          "text": "In left panel → double click pom.xml"
        },
        {
          "text": "Add this inside <project> (scroll to bottom)"
        },
        {
          "text": "If <build> exists → add inside it\n👉 If not → create <build>"
        },
        {
          "language": "xml",
          "code": "<build>\n    <plugins>\n\n        <!-- Run testng.xml -->\n        <plugin>\n            <groupId>org.apache.maven.plugins</groupId>\n            <artifactId>maven-surefire-plugin</artifactId>\n            <version>3.2.5</version>\n            <configuration>\n                <suiteXmlFiles>\n                    <suiteXmlFile>testng.xml</suiteXmlFile>\n                </suiteXmlFiles>\n            </configuration>\n        </plugin>\n\n        <!-- Java version -->\n        <plugin>\n            <groupId>org.apache.maven.plugins</groupId>\n            <artifactId>maven-compiler-plugin</artifactId>\n            <version>3.11.0</version>\n            <configuration>\n                <release>17</release>\n            </configuration>\n        </plugin>\n\n    </plugins>\n</build>",
          "title": "pom.xml · build fragment",
          "explanation": "Merge this into the existing build section. If you added the earlier Surefire-only example, replace its build fragment with this combined version."
        },
        {
          "text": "Click THIS"
        },
        {
          "text": "Top right corner:\n👉 “Load Maven Changes” (elephant icon 🐘)"
        }
      ]
    },
    {
      "id": "configuration",
      "title": "Read settings from config.properties",
      "module": "Configuration and Stability",
      "source": "🔷 STEP 5 — Config Properties (Remove Hardcoding)",
      "level": "Intermediate",
      "duration": "3 min read",
      "learningObjective": "Read settings from config.properties.",
      "hideReview": true,
      "legacyIds": [
        "step-5"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Run TestNG with Maven and Surefire.”"
        },
        {
          "text": "Goal"
        },
        {
          "text": "Remove hardcoded:"
        },
        {
          "text": "URL"
        },
        {
          "text": "Browser"
        },
        {
          "text": "Make framework configurable"
        },
        {
          "text": "Same code → different environments"
        },
        {
          "text": "Updated Structure"
        },
        {
          "text": "src/test"
        },
        {
          "language": "text",
          "code": " ├── java\n │   └── com.automation.framework\n │   \t├── pages\n │   \t├── tests\n │   \t└── utils\n │       \t├── BaseTest.java\n │       \t└── ConfigReader.java   ✅ NEW\n └── resources\n \t└── config.properties      \t✅ NEW",
          "title": "Project or execution diagram"
        },
        {
          "text": "1️⃣ Create config.properties"
        },
        {
          "text": "src/test/resources/config.properties"
        },
        {
          "language": "properties",
          "code": "url=https://www.amazon.in\nbrowser=chrome",
          "title": "src/test/resources/config.properties"
        },
        {
          "text": "Keep it simple for now"
        },
        {
          "text": "2️⃣ Create ConfigReader"
        },
        {
          "text": "utils/ConfigReader.java"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.utils;\n\nimport java.io.IOException;\nimport java.io.InputStream;\nimport java.io.UncheckedIOException;\nimport java.util.Properties;\n\npublic class ConfigReader {\n    private final Properties properties = new Properties();\n\n    public ConfigReader() {\n        try (InputStream stream = ConfigReader.class.getResourceAsStream(\"/config.properties\")) {\n            if (stream == null) throw new IllegalStateException(\"Missing config.properties\");\n            properties.load(stream);\n        } catch (IOException error) {\n            throw new UncheckedIOException(\"Could not load config.properties\", error);\n        }\n    }\n\n    public String getProperty(String key) {\n        String value = properties.getProperty(key);\n        if (value == null || value.isBlank()) {\n            throw new IllegalArgumentException(\"Missing configuration: \" + key);\n        }\n        return value.trim();\n    }\n}",
          "title": "src/test/java/com/automation/framework/utils/ConfigReader.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "text": "3️⃣ Update BaseTest (Remove Hardcoding)"
        },
        {
          "text": "BaseTest.java"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.utils;\n\nimport org.openqa.selenium.WebDriver;\nimport org.openqa.selenium.chrome.ChromeDriver;\nimport org.testng.annotations.*;\n\npublic class BaseTest {\n\n\tprotected WebDriver driver;\n\tConfigReader config;\n\n\t@BeforeMethod\n\tpublic void setUp() {\n\n    \tconfig = new ConfigReader();\n\n    \tString browser = config.getProperty(\"browser\");\n    \tString url = config.getProperty(\"url\");\n\n    \tif (!browser.equalsIgnoreCase(\"chrome\")) {\n            throw new IllegalArgumentException(\"Use browser=chrome at this stage\");\n        }\n        driver = new ChromeDriver();\n\n        driver.manage().window().maximize();\n        driver.get(url);\n\t}\n\n\t@AfterMethod(alwaysRun = true)\n\tpublic void tearDown() {\n    \tif (driver != null) driver.quit();\n\t}\n\n    public WebDriver getDriver() {\n        return driver;\n    }\n}",
          "title": "src/test/java/com/automation/framework/utils/BaseTest.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "text": "What Just Changed (Very Important)"
        },
        {
          "text": "Before:"
        },
        {
          "language": "java",
          "code": "driver.get(\"https://www.amazon.in\");",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "text": "Now:"
        },
        {
          "language": "java",
          "code": "driver.get(url);",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "text": "Your framework is now environment-driven"
        },
        {
          "text": "Interview Gold Line"
        },
        {
          "text": "I externalized environment-specific values using config.properties, making the framework flexible and reusable across environments.”"
        },
        {
          "heading": "Common Mistakes"
        },
        {
          "text": "Hardcoding file path directly\n ❌ Not using user.dir\n ❌ Mixing config logic inside test classes\n ❌ Adding too many properties too early"
        },
        {
          "text": "What You Achieved"
        },
        {
          "text": "No hardcoding"
        },
        {
          "text": "Environment flexibility"
        },
        {
          "text": "Cleaner BaseTest"
        },
        {
          "text": "Real project feel"
        },
        {
          "text": "Now your framework is industry baseline ready."
        },
        {
          "text": "Now we fix the biggest real-world problem: flaky tests."
        },
        {
          "text": "Amazon is perfect for this because elements don’t always load instantly."
        }
      ]
    },
    {
      "id": "explicit-waits",
      "title": "Stabilize page actions with explicit waits",
      "module": "Configuration and Stability",
      "source": "🔷 STEP 6 — Wait Strategy (Stability Layer)",
      "level": "Intermediate",
      "duration": "3 min read",
      "learningObjective": "Stabilize page actions with explicit waits.",
      "hideReview": true,
      "legacyIds": [
        "step-6"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Read settings from config.properties.”"
        },
        {
          "text": "Goal"
        },
        {
          "text": "Remove timing issues"
        },
        {
          "text": "Replace direct actions with safe actions"
        },
        {
          "text": "Implement “universal wait” properly (not hacks)"
        },
        {
          "text": "First — What NOT to do"
        },
        {
          "text": "Thread.sleep(5000) → lazy + unreliable\n ❌ Mixing implicit & explicit randomly\n ❌ Clicking immediately after page load"
        },
        {
          "text": "Strong opinion:"
        },
        {
          "text": "If your framework depends on sleep, it’s already broken."
        },
        {
          "text": "Updated Structure"
        },
        {
          "text": "utils/"
        },
        {
          "language": "text",
          "code": " ├── BaseTest.java\n ├── ConfigReader.java\n └── WaitUtils.java   ✅ NEW",
          "title": "Project or execution diagram"
        },
        {
          "text": "1️⃣ Create WaitUtils"
        },
        {
          "text": "utils/WaitUtils.java"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.utils;\n\nimport org.openqa.selenium.*;\nimport org.openqa.selenium.support.ui.*;\n\nimport java.time.Duration;\n\npublic class WaitUtils {\n\n\tWebDriver driver;\n\tWebDriverWait wait;\n\n\tpublic WaitUtils(WebDriver driver) {\n    \tthis.driver = driver;\n    \tthis.wait = new WebDriverWait(driver, Duration.ofSeconds(10));\n\t}\n\n\tpublic WebElement waitForVisibility(By locator) {\n    \treturn wait.until(ExpectedConditions.visibilityOfElementLocated(locator));\n\t}\n\n\tpublic WebElement waitForClickable(By locator) {\n    \treturn wait.until(ExpectedConditions.elementToBeClickable(locator));\n\t}\n}",
          "title": "src/test/java/com/automation/framework/utils/WaitUtils.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "text": "2️⃣ Use WaitUtils in Page Class (Correct Design)"
        },
        {
          "text": "pages/AmazonHomePage.java"
        },
        {
          "text": "Update like this:"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.pages;\n\nimport com.automation.framework.utils.WaitUtils;\nimport org.openqa.selenium.By;\nimport org.openqa.selenium.WebDriver;\n\npublic class AmazonHomePage {\n\n\tWebDriver driver;\n\tWaitUtils wait;\n\n\tpublic AmazonHomePage(WebDriver driver) {\n    \tthis.driver = driver;\n    \tthis.wait = new WaitUtils(driver);\n\t}\n\n\tprivate By searchBox = By.id(\"twotabsearchtextbox\");\n\tprivate By searchButton = By.id(\"nav-search-submit-button\");\n\n\tpublic void enterSearchText(String text) {\n\n        wait.waitForVisibility(searchBox).sendKeys(text);\n\t}\n\n\tpublic void clickSearch() {\n        wait.waitForClickable(searchButton).click();\n\t}\n\n\tpublic String getPageTitle() {\n    \treturn driver.getTitle();\n\t}\n}",
          "title": "src/test/java/com/automation/framework/pages/AmazonHomePage.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "text": "What Just Happened"
        },
        {
          "text": "Before:"
        },
        {
          "text": "driver.findElement(searchBox).sendKeys(...)"
        },
        {
          "text": "Now:"
        },
        {
          "text": "wait.waitForVisibility(searchBox).sendKeys(...)"
        },
        {
          "text": "Every action is now protected against timing issues"
        },
        {
          "text": "This is your “Universal Wait”"
        },
        {
          "text": "Not magic. Not global setting."
        },
        {
          "text": "It’s consistent usage of explicit waits inside page methods"
        },
        {
          "text": "Interview Gold Line"
        },
        {
          "text": "We implemented explicit waits through a utility class and used them inside page methods to handle dynamic elements and reduce flakiness.”"
        },
        {
          "heading": "Common Mistakes"
        },
        {
          "text": "Adding waits in test class\n ❌ Mixing implicit wait in BaseTest\n ❌ Creating wait in every method repeatedly\n ❌ Using too long timeout blindly"
        },
        {
          "text": "What You Achieved"
        },
        {
          "text": "Stable interactions"
        },
        {
          "text": "Reduced flaky failures"
        },
        {
          "text": "Cleaner page logic"
        },
        {
          "text": "Real-world readiness"
        },
        {
          "text": "Now your framework is not just working — it’s reliable."
        },
        {
          "text": "Next Step"
        },
        {
          "text": "We will:"
        },
        {
          "text": "introduce Data Driven Testing"
        },
        {
          "text": "run same test with multiple inputs"
        },
        {
          "text": "make your framework scalable for real scenarios"
        },
        {
          "text": "This is where automation becomes powerful."
        },
        {
          "text": "Good catch on both points: where to create testng.xml and not cloning the same test again and again.\nLet’s do this cleanly from Step 7 onward, with different test intent + proper suite setup + Maven run."
        }
      ]
    },
    {
      "id": "amazon-results-page",
      "title": "Create the Amazon results page object",
      "module": "Configuration and Stability",
      "source": "🔷 STEP 7 — Add Meaningful, Different Tests",
      "level": "Intermediate",
      "duration": "3 min read",
      "learningObjective": "Encapsulate the results container and wait until it is visible.",
      "hideReview": true,
      "legacyIds": [
        "step-20"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Stabilize page actions with explicit waits.”"
        },
        {
          "heading": "Implementation"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.pages;\n\nimport com.automation.framework.utils.WaitUtils;\nimport org.openqa.selenium.By;\nimport org.openqa.selenium.WebDriver;\n\npublic class AmazonResultsPage {\n\n    WebDriver driver;\n    WaitUtils wait;\n\n    public AmazonResultsPage(WebDriver driver) {\n        this.driver = driver;\n        this.wait = new WaitUtils(driver);\n    }\n\n    private By resultsContainer = By.cssSelector(\"div.s-main-slot\");\n\n    public boolean isResultsDisplayed() {\n        return wait.waitForVisibility(resultsContainer).isDisplayed();\n    }\n}",
          "title": "src/test/java/com/automation/framework/pages/AmazonResultsPage.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "heading": "Verify the page object"
        },
        {
          "text": "After submitting a search, construct AmazonResultsPage with getDriver(). The independent test lesson calls isResultsDisplayed() and asserts the result."
        }
      ]
    },
    {
      "id": "independent-tests",
      "title": "Create independent Amazon test scenarios",
      "module": "Configuration and Stability",
      "source": "🔷 STEP 7 — Add Meaningful, Different Tests",
      "level": "Intermediate",
      "duration": "3 min read",
      "learningObjective": "Create independent Amazon test scenarios.",
      "hideReview": true,
      "legacyIds": [
        "step-7"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Create the Amazon results page object.”"
        },
        {
          "text": "Goal"
        },
        {
          "text": "Multiple distinct scenarios (not copy-paste)"
        },
        {
          "text": "Separate classes by intent"
        },
        {
          "text": "We’ll keep using Amazon."
        },
        {
          "text": "Classes you should create"
        },
        {
          "text": "pages/"
        },
        {
          "language": "text",
          "code": " ├── AmazonHomePage.java\n └── AmazonResultsPage.java   ✅ NEW",
          "title": "Project or execution diagram"
        },
        {
          "text": "tests/"
        },
        {
          "language": "text",
          "code": " ├── AmazonSearchTest.java\n ├── AmazonTitleValidationTest.java   ✅ NEW ….\n └── AmazonResultsTest.java           ✅ NEW",
          "title": "Project or execution diagram"
        },
        {
          "text": "1️⃣ Create Results Page (NEW)"
        },
        {
          "text": "pages/AmazonResultsPage.java"
        },
        {
          "text": "Now you have another page, not just home page"
        },
        {
          "text": "2️⃣ Test Class 1 — Search Flow (already exists, keep it)"
        },
        {
          "text": "tests/AmazonSearchTest.java"
        },
        {
          "text": "Just keep as is (search laptop)"
        },
        {
          "text": "3️⃣ Test Class 2 — Title Validation (NEW)"
        },
        {
          "text": "tests/AmazonTitleValidationTest.java"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.tests;\n\nimport com.automation.framework.utils.BaseTest;\nimport org.testng.Assert;\nimport org.testng.annotations.Test;\n\npublic class AmazonTitleValidationTest extends BaseTest {\n\n    @Test\n    public void verifyHomePageTitle() {\n\n        String title = getDriver().getTitle();\n\n        Assert.assertTrue(title.contains(\"Amazon\"),\n                \"Title does not contain Amazon\");\n\n        System.out.println(\"Title validation passed\");\n    }\n}",
          "title": "src/test/java/com/automation/framework/tests/AmazonTitleValidationTest.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "text": "This is validation-focused, not action-focused"
        },
        {
          "text": "4️⃣ Test Class 3 — Results Validation (NEW)"
        },
        {
          "text": "tests/AmazonResultsTest.java"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.tests;\n\nimport com.automation.framework.pages.AmazonHomePage;\nimport com.automation.framework.pages.AmazonResultsPage;\nimport com.automation.framework.utils.BaseTest;\nimport org.testng.Assert;\nimport org.testng.annotations.Test;\n\npublic class AmazonResultsTest extends BaseTest {\n\n    @Test\n    public void verifySearchResultsDisplayed() {\n\n        AmazonHomePage home = new AmazonHomePage(getDriver());\n        home.enterSearchText(\"headphones\");\n        home.clickSearch();\n\n        AmazonResultsPage results = new AmazonResultsPage(getDriver());\n\n        Assert.assertTrue(results.isResultsDisplayed(),\n                \"Results not displayed\");\n\n        System.out.println(\"Results page validation passed\");\n    }\n}",
          "title": "src/test/java/com/automation/framework/tests/AmazonResultsTest.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "text": "Now:"
        },
        {
          "text": "Different page"
        },
        {
          "text": "Different validation"
        },
        {
          "text": "Different purpose"
        },
        {
          "text": "Add AmazonTitleValidationTest and AmazonResultsTest to the <classes> block of testng.xml. Run mvn clean test to execute all three test classes."
        }
      ]
    },
    {
      "id": "testng-assertions",
      "title": "Verify behavior with TestNG assertions",
      "module": "Configuration and Stability",
      "source": "Website Step 19 and DOCX TestNG scenarios",
      "level": "Intermediate",
      "duration": "3 min read",
      "learningObjective": "Turn a browser action into a test with an observable expected result.",
      "hideReview": true,
      "legacyIds": [
        "step-19"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Create independent Amazon test scenarios.”"
        },
        {
          "text": "Use an assertion after the search. Compare the result with the same keyword sent to the search box so the failure reports a genuine mismatch."
        },
        {
          "language": "java",
          "code": "import org.testng.Assert;\n\n@Test\npublic void searchProductTest() {\n    AmazonHomePage home = new AmazonHomePage(getDriver());\n    home.enterSearchText(\"headphones\");\n    home.clickSearch();\n\n    String title = getDriver().getTitle().toLowerCase();\n    Assert.assertTrue(title.contains(\"headphones\"),\n        \"Result page title did not contain 'headphones'. Actual: \" + title);\n}",
          "title": "src/test/java/com/automation/framework/tests/AmazonSearchTest.java · replacement test method",
          "explanation": "Keep the existing TestNG Test annotation import and add the Assert import at the top of the file."
        },
        {
          "text": "Run the search test in IntelliJ. If the title includes headphones, the assertion passes. A mismatch includes the actual title in the TestNG output."
        }
      ]
    },
    {
      "id": "failure-screenshots",
      "title": "Capture failure screenshots",
      "module": "Listeners, Retry and Screenshots",
      "source": "🔷 STEP 12 — Screenshot on Failure",
      "level": "Intermediate",
      "duration": "3 min read",
      "learningObjective": "Capture failure screenshots.",
      "hideReview": true,
      "legacyIds": [
        "step-12"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Verify behavior with TestNG assertions.”"
        },
        {
          "text": "Create file"
        },
        {
          "text": "Path:\nsrc/test/java/com/automation/framework/utils/ScreenshotUtils.java"
        },
        {
          "text": "Code"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.utils;\n\nimport org.openqa.selenium.*;\nimport java.io.File;\nimport java.nio.file.Files;\n\npublic class ScreenshotUtils {\n\n    public static String capture(WebDriver driver, String testName) {\n        try {\n            File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);\n            String dir = System.getProperty(\"user.dir\") + \"/screenshots/\";\n            String path = dir + testName.replaceAll(\"[^a-zA-Z0-9._-]\", \"_\")\n                    + \"-\" + java.util.UUID.randomUUID() + \".png\";\n\n            File dest = new File(path);\n            dest.getParentFile().mkdirs(); // ensure folder exists\n            Files.copy(src.toPath(), dest.toPath());\n\n            return dest.getAbsolutePath();\n        } catch (Exception e) {\n            e.printStackTrace();\n            return null;\n        }\n    }\n}",
          "title": "src/test/java/com/automation/framework/utils/ScreenshotUtils.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "text": "Create folder (once)"
        },
        {
          "text": "Right-click project root → New → Directory → screenshots"
        }
      ]
    },
    {
      "id": "retry-analyzer",
      "title": "Implement a bounded TestNG retry",
      "module": "Listeners, Retry and Screenshots",
      "source": "🔷 STEP 13 — Retry Mechanism",
      "level": "Intermediate",
      "duration": "3 min read",
      "learningObjective": "Implement a bounded TestNG retry.",
      "hideReview": true,
      "legacyIds": [
        "step-13"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Capture failure screenshots.”"
        },
        {
          "text": "Create file"
        },
        {
          "text": "src/test/java/com/automation/framework/utils/RetryAnalyzer.java"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.utils;\n\nimport org.testng.IRetryAnalyzer;\nimport org.testng.ITestResult;\n\npublic class RetryAnalyzer implements IRetryAnalyzer {\n\n    private int count = 0;\n    private final int maxTry = 2; // total tries = 1 (original) + 2 retries\n\n    @Override\n    public boolean retry(ITestResult result) {\n        if (count < maxTry) {\n            count++;\n            System.out.println(\"Retrying test: \" + result.getName() + \" (attempt \" + (count + 1) + \")\");\n            return true;\n        }\n        count = 0;\n        return false;\n    }\n}",
          "title": "src/test/java/com/automation/framework/utils/RetryAnalyzer.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "text": "Apply this introductory counter to a single non-parameterized test method. For data-driven tests, retry bookkeeping must be scoped to each invocation. A retry can mask intermittent failures, so investigate the underlying cause."
        }
      ]
    },
    {
      "id": "testng-listener",
      "title": "Implement a TestNG listener",
      "module": "Listeners, Retry and Screenshots",
      "source": "🔷 STEP 14 — TestNG Listener (hooks + screenshot trigger)",
      "level": "Intermediate",
      "duration": "3 min read",
      "learningObjective": "Implement a TestNG listener.",
      "hideReview": true,
      "legacyIds": [
        "step-14"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Implement a bounded TestNG retry.”"
        },
        {
          "text": "Create file"
        },
        {
          "text": "src/test/java/com/automation/framework/utils/TestListener.java"
        },
        {
          "text": "Code"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.utils;\n\nimport org.testng.*;\nimport org.openqa.selenium.WebDriver;\n\npublic class TestListener implements ITestListener {\n\n    @Override\n    public void onTestStart(ITestResult result) {\n        System.out.println(\"STARTED: \" + result.getName());\n    }\n\n    @Override\n    public void onTestSuccess(ITestResult result) {\n        System.out.println(\"PASSED: \" + result.getName());\n    }\n\n    @Override\n    public void onTestFailure(ITestResult result) {\n        System.out.println(\"FAILED: \" + result.getName());\n\n        Object testClass = result.getInstance();\n        if (!(testClass instanceof BaseTest base)) return;\n        WebDriver driver = base.getDriver();\n        if (driver == null) return;\n\n        String path = ScreenshotUtils.capture(driver, result.getName());\n        System.out.println(\"Screenshot saved at: \" + path);\n    }\n\n    @Override\n    public void onTestSkipped(ITestResult result) {\n        System.out.println(\"SKIPPED: \" + result.getName());\n    }\n}",
          "title": "src/test/java/com/automation/framework/utils/TestListener.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "text": "BaseTest (must expose driver)"
        },
        {
          "text": "Open your existing BaseTest.java and ensure this exists:"
        },
        {
          "text": "BaseTest already exposes getDriver(). Keep the same method signature when its backing field becomes thread-local."
        }
      ]
    },
    {
      "id": "attach-retry",
      "title": "Attach retries to a test",
      "module": "Listeners, Retry and Screenshots",
      "source": "🔷 STEP 15 — Attach Retry to Tests",
      "level": "Intermediate",
      "duration": "3 min read",
      "learningObjective": "Attach retries to a test.",
      "hideReview": true,
      "legacyIds": [
        "step-15"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Implement a TestNG listener.”"
        },
        {
          "text": "Open any test class (e.g., AmazonResultsTest.java)"
        },
        {
          "text": "Update test method"
        },
        {
          "language": "java",
          "code": "@Test(retryAnalyzer = com.automation.framework.utils.RetryAnalyzer.class)\npublic void verifySearchResultsDisplayed() {\n    // your existing test steps\n}",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        }
      ]
    },
    {
      "id": "register-listener",
      "title": "Register the listener in testng.xml",
      "module": "Listeners, Retry and Screenshots",
      "source": "🔷 STEP 16 — Register Listener in testng.xml",
      "level": "Intermediate",
      "duration": "3 min read",
      "learningObjective": "Register the listener in testng.xml.",
      "hideReview": true,
      "legacyIds": [
        "step-22"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Attach retries to a test.”"
        },
        {
          "text": "Open/Create file (project root)"
        },
        {
          "text": "testng.xml"
        },
        {
          "language": "xml",
          "code": "<!DOCTYPE suite SYSTEM \"https://testng.org/testng-1.0.dtd\">\n\n<suite name=\"Amazon Suite\">\n\n    <listeners>\n        <listener class-name=\"com.automation.framework.utils.TestListener\"/>\n    </listeners>\n\n    <test name=\"All Tests\">\n        <classes>\n            <class name=\"com.automation.framework.tests.AmazonSearchTest\"/>\n            <class name=\"com.automation.framework.tests.AmazonResultsTest\"/>\n            <class name=\"com.automation.framework.tests.AmazonTitleValidationTest\"/>\n        </classes>\n    </test>\n\n</suite>",
          "title": "testng.xml · XML example"
        },
        {
          "text": "Optional but recommended) Surefire in pom.xml"
        },
        {
          "text": "Open pom.xml → ensure this exists:"
        },
        {
          "language": "xml",
          "code": "<build>\n  <plugins>\n\n    <plugin>\n      <groupId>org.apache.maven.plugins</groupId>\n      <artifactId>maven-surefire-plugin</artifactId>\n      <version>3.2.5</version>\n      <configuration>\n        <suiteXmlFiles>\n          <suiteXmlFile>testng.xml</suiteXmlFile>\n        </suiteXmlFiles>\n      </configuration>\n    </plugin>\n\n    <plugin>\n      <groupId>org.apache.maven.plugins</groupId>\n      <artifactId>maven-compiler-plugin</artifactId>\n      <version>3.11.0</version>\n      <configuration>\n        <source>17</source>\n        <target>17</target>\n      </configuration>\n    </plugin>\n\n  </plugins>\n</build>",
          "title": "pom.xml · optional build reference"
        }
      ]
    },
    {
      "id": "verify-failure-flow",
      "title": "Verify retries and screenshots end to end",
      "module": "Listeners, Retry and Screenshots",
      "source": "🧪 DEMO — See Everything in Action",
      "level": "Intermediate",
      "duration": "3 min read",
      "learningObjective": "Verify retries and screenshots end to end.",
      "hideReview": true,
      "legacyIds": [
        "step-16"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Register the listener in testng.xml.”"
        },
        {
          "text": "DEMO — See Everything in Action"
        },
        {
          "text": "1️⃣ Force a failure (to observe features)"
        },
        {
          "text": "Open AmazonResultsTest.java and temporarily do:"
        },
        {
          "language": "java",
          "code": "Assert.assertTrue(false, \"Force failure to test retry & screenshot\");",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "text": "2️⃣ Run via TestNG"
        },
        {
          "text": "Right-click testng.xml → Run"
        },
        {
          "text": "Console (expected)"
        },
        {
          "text": "STARTED: verifySearchResultsDisplayed"
        },
        {
          "text": "FAILED: verifySearchResultsDisplayed"
        },
        {
          "text": "Retrying test: verifySearchResultsDisplayed (attempt 2)"
        },
        {
          "text": "Retrying test: verifySearchResultsDisplayed (attempt 3)"
        },
        {
          "text": "Screenshot saved at: <project>/screenshots/verifySearchResultsDisplayed-<unique-id>.png"
        },
        {
          "text": "3️⃣ Check screenshot"
        },
        {
          "text": "Open:"
        },
        {
          "text": "<project-root>/screenshots/"
        },
        {
          "text": "You’ll see:"
        },
        {
          "text": "verifySearchResultsDisplayed-<unique-id>.png"
        },
        {
          "text": "4️⃣ Run via Maven (CI-style)"
        },
        {
          "text": "In IntelliJ:"
        },
        {
          "text": "Press Alt + 8 → Maven panel → Lifecycle → double-click test"
        },
        {
          "text": "OR Terminal:"
        },
        {
          "language": "bash",
          "code": "mvn clean test",
          "title": "Example command"
        },
        {
          "text": "Same results:"
        },
        {
          "text": "Retries happen"
        },
        {
          "text": "Screenshot saved"
        },
        {
          "text": "Listener logs printed"
        },
        {
          "text": "Restore test after demo"
        },
        {
          "text": "Replace back:"
        },
        {
          "language": "java",
          "code": "Assert.assertTrue(results.isResultsDisplayed());",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "heading": "FINAL FLOW (what you built)"
        },
        {
          "language": "bash",
          "code": "mvn test / testng.xml",
          "title": "Example command"
        },
        {
          "text": "TestNG runs tests"
        },
        {
          "text": "Test fails"
        },
        {
          "text": "RetryAnalyzer retries (up to 2)"
        },
        {
          "text": "Still fails → Listener.onTestFailure()"
        },
        {
          "text": "ScreenshotUtils captures image"
        },
        {
          "text": "Logs printed + file saved"
        },
        {
          "text": "One-line interview wrap"
        },
        {
          "text": "I implemented TestNG listeners to capture failures and take screenshots automatically, added retry logic for flaky tests, and executed the suite via Maven Surefire using testng.xml—validated by forcing failures and observing retries and artifacts.”"
        }
      ]
    },
    {
      "id": "log4j",
      "title": "Configure Log4j for console and file output",
      "module": "Logging and HTML Reports",
      "source": "STEP 17 — Logging (Add, Configure, See It Working)",
      "level": "Intermediate",
      "duration": "3 min read",
      "learningObjective": "replace scattered prints with structured logs you can trace.",
      "hideReview": true,
      "legacyIds": [
        "step-17",
        "step-10"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Verify retries and screenshots end to end.”"
        },
        {
          "text": "What we will do:"
        },
        {
          "text": "Add Log4j dependency"
        },
        {
          "text": "Create config file"
        },
        {
          "text": "Use logger in BaseTest, Pages, Tests, Listener"
        },
        {
          "heading": "Run and verify logs"
        },
        {
          "text": "Add dependency (pom.xml)"
        },
        {
          "text": "In IntelliJ, double-click pom.xml"
        },
        {
          "text": "Inside <dependencies> add:"
        },
        {
          "language": "xml",
          "code": "<dependency>\n  <groupId>org.apache.logging.log4j</groupId>\n  <artifactId>log4j-api</artifactId>\n  <version>2.25.5</version>\n</dependency>\n<dependency>\n  <groupId>org.apache.logging.log4j</groupId>\n  <artifactId>log4j-core</artifactId>\n  <version>2.25.5</version>\n</dependency>",
          "title": "pom.xml · XML example"
        },
        {
          "text": "Click Load Maven Changes (top-right 🐘)"
        },
        {
          "text": "In Project panel → src/test/resources"
        },
        {
          "text": "Right click → New → File → name: log4j2.xml"
        },
        {
          "text": "Paste:"
        },
        {
          "language": "xml",
          "code": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<Configuration status=\"WARN\">\n  <Appenders>\n    <Console name=\"Console\" target=\"SYSTEM_OUT\">\n      <PatternLayout pattern=\"%d{HH:mm:ss} %-5level %c - %msg%n\"/>\n    </Console>\n    <File name=\"File\" fileName=\"logs/test.log\">\n      <PatternLayout pattern=\"%d{yyyy-MM-dd HH:mm:ss} %-5level %c - %msg%n\"/>\n    </File>\n  </Appenders>\n  <Loggers>\n    <Root level=\"info\">\n      <AppenderRef ref=\"Console\"/>\n      <AppenderRef ref=\"File\"/>\n    </Root>\n  </Loggers>\n</Configuration>",
          "title": "src/test/resources/log4j2.xml · XML example"
        },
        {
          "text": "Create folder:"
        },
        {
          "text": "Right click project root → New → Directory → logs"
        },
        {
          "text": "Use logger in classes"
        },
        {
          "text": "In BaseTest.java:"
        },
        {
          "language": "java",
          "code": "import org.apache.logging.log4j.LogManager;\nimport org.apache.logging.log4j.Logger;\n\npublic class BaseTest {\n    protected static final Logger log = LogManager.getLogger(BaseTest.class);\n    // existing driver setup\n\n    @BeforeMethod\n    public void setUp() {\n        log.info(\"Launching browser\");\n        // existing code\n    }\n\n    @AfterMethod\n    public void tearDown() {\n        log.info(\"Closing browser\");\n        // existing code\n    }\n\n    public WebDriver getDriver() { return driver; }\n}",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "text": "In a Page (e.g., AmazonHomePage.java):"
        },
        {
          "language": "java",
          "code": "private static final Logger log = LogManager.getLogger(AmazonHomePage.class);\n\npublic void enterSearchText(String text) {\n    log.info(\"Entering search text: {}\", text);\n    wait.waitForVisibility(searchBox).sendKeys(text);\n}\n\npublic void clickSearch() {\n    log.info(\"Clicking search\");\n    wait.waitForClickable(searchButton).click();\n}",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "text": "In TestListener.java:"
        },
        {
          "language": "java",
          "code": "private static final Logger log = LogManager.getLogger(TestListener.class);\n\n@Override\npublic void onTestFailure(ITestResult result) {\n    log.error(\"FAILED: {}\", result.getName());\n    WebDriver driver = ((BaseTest) result.getInstance()).getDriver();\n    String path = ScreenshotUtils.capture(driver, result.getName());\n    log.error(\"Screenshot: {}\", path);\n}",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "heading": "Run and verify"
        },
        {
          "text": "Right click testng.xml → Run"
        },
        {
          "text": "Console shows timestamped logs"
        },
        {
          "text": "Open logs/test.log → full execution trace present"
        },
        {
          "heading": "Expected outcome:\nYou can read a clean timeline: launch → actions → pass/fail → screenshot path."
        },
        {
          "heading": "Log inside a page object"
        },
        {
          "text": "In src/test/java/com/automation/framework/pages/AmazonHomePage.java, add a class logger and call it inside enterSearchText before waiting for the search box."
        },
        {
          "language": "java",
          "code": "import org.apache.logging.log4j.LogManager;\nimport org.apache.logging.log4j.Logger;\n\n// Inside AmazonHomePage:\nprivate static final Logger log = LogManager.getLogger(AmazonHomePage.class);\n\n// Inside enterSearchText:\nlog.info(\"Searching for {}\", text);",
          "title": "AmazonHomePage.java · partial example"
        }
      ]
    },
    {
      "id": "extent-reports",
      "title": "Build an Extent HTML report with screenshots",
      "module": "Logging and HTML Reports",
      "source": "STEP 18 — Extent Report (Correct Setup with Screenshots)",
      "level": "Intermediate",
      "duration": "3 min read",
      "learningObjective": "Generate a professional HTML report with Pass/Fail status + Logs + Screenshots",
      "hideReview": true,
      "legacyIds": [
        "step-18"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Configure Log4j for console and file output.”"
        },
        {
          "heading": "PART 0 — Understand Flow (Important)"
        },
        {
          "heading": "Execution flow"
        },
        {
          "text": "TestNG → Listener → Extent Report → HTML generated"
        },
        {
          "text": "If Listener is not connected → report will be EMPTY ❌"
        },
        {
          "heading": "PART 1 — Add Dependency (pom.xml)"
        },
        {
          "text": "Open pom.xml"
        },
        {
          "text": "Add:"
        },
        {
          "language": "xml",
          "code": "<dependency>\n  <groupId>com.aventstack</groupId>\n  <artifactId>extentreports</artifactId>\n  <version>5.1.1</version>\n</dependency>",
          "title": "pom.xml · XML example"
        },
        {
          "text": "Click Load Maven Changes"
        },
        {
          "heading": "PART 2 — Create ReportManager"
        },
        {
          "text": "Path:"
        },
        {
          "text": "utils → ReportManager.java"
        },
        {
          "text": "Right click utils → New → Java Class → ReportManager"
        },
        {
          "text": "Paste:"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.utils;\n\nimport com.aventstack.extentreports.*;\nimport com.aventstack.extentreports.reporter.ExtentSparkReporter;\n\npublic class ReportManager {\n\n    private static ExtentReports extent;\n\n    public static synchronized ExtentReports getInstance() {\n\n        if (extent == null) {\n\n            String path = System.getProperty(\"user.dir\") + \"/reports/extent.html\";\n\n            ExtentSparkReporter spark = new ExtentSparkReporter(path);\n            spark.config().setReportName(\"Automation Report\");\n            spark.config().setDocumentTitle(\"Execution Report\");\n\n            extent = new ExtentReports();\n            extent.attachReporter(spark);\n        }\n\n        return extent;\n    }\n}",
          "title": "src/test/java/com/automation/framework/utils/ReportManager.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "heading": "PART 3 — Create reports Folder"
        },
        {
          "text": "Right click project root"
        },
        {
          "text": "New → Directory"
        },
        {
          "text": "Name:"
        },
        {
          "text": "reports"
        },
        {
          "heading": "PART 4 — Update TestListener (MOST IMPORTANT FIX)"
        },
        {
          "text": "Open:"
        },
        {
          "text": "utils → TestListener.java"
        },
        {
          "text": "Replace with:"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.utils;\n\nimport com.aventstack.extentreports.ExtentReports;\nimport com.aventstack.extentreports.ExtentTest;\nimport java.nio.file.Path;\nimport org.apache.logging.log4j.LogManager;\nimport org.apache.logging.log4j.Logger;\nimport org.openqa.selenium.WebDriver;\nimport org.testng.IExecutionListener;\nimport org.testng.ITestListener;\nimport org.testng.ITestResult;\n\npublic class TestListener implements ITestListener, IExecutionListener {\n    private static final Logger log = LogManager.getLogger(TestListener.class);\n    private final ExtentReports extent = ReportManager.getInstance();\n    private final ThreadLocal<ExtentTest> test = new ThreadLocal<>();\n\n    @Override\n    public void onTestStart(ITestResult result) {\n        test.set(extent.createTest(result.getMethod().getMethodName()));\n    }\n\n    @Override\n    public void onTestSuccess(ITestResult result) {\n        try {\n            entry(result).pass(\"Test passed\");\n        } finally {\n            test.remove();\n        }\n    }\n\n    @Override\n    public void onTestFailure(ITestResult result) {\n        try {\n            ExtentTest report = entry(result);\n            report.fail(result.getThrowable());\n            if (result.getInstance() instanceof BaseTest base) {\n                WebDriver driver = base.getDriver();\n                if (driver != null) {\n                    String path = ScreenshotUtils.capture(driver, result.getName());\n                    if (path != null) {\n                        String relativePath = Path.of(\"reports\").toAbsolutePath()\n                                .relativize(Path.of(path)).toString().replace('\\\\', '/');\n                        report.addScreenCaptureFromPath(relativePath);\n                    }\n                }\n            }\n        } catch (Exception error) {\n            log.warn(\"Could not attach failure evidence\", error);\n        } finally {\n            test.remove();\n        }\n    }\n\n    @Override\n    public void onTestSkipped(ITestResult result) {\n        try {\n            entry(result).skip(result.wasRetried() ? \"Retry scheduled\" : \"Test skipped\");\n        } finally {\n            test.remove();\n        }\n    }\n\n    @Override\n    public void onExecutionFinish() {\n        extent.flush();\n    }\n\n    private ExtentTest entry(ITestResult result) {\n        ExtentTest current = test.get();\n        return current != null ? current : extent.createTest(result.getMethod().getMethodName());\n    }\n}",
          "title": "src/test/java/com/automation/framework/utils/TestListener.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "heading": "PART 5 — Register Listener (CRITICAL STEP)"
        },
        {
          "text": "testng.xml"
        },
        {
          "text": "Add inside <suite>:"
        },
        {
          "language": "xml",
          "code": "<listeners>\n    <listener class-name=\"com.automation.framework.utils.TestListener\"/>\n</listeners>",
          "title": "testng.xml · XML example"
        },
        {
          "text": "If this step is missing → report = ZERO tests ❌"
        },
        {
          "heading": "PART 6 — Run Tests"
        },
        {
          "text": "Right click:"
        },
        {
          "text": "Click:"
        },
        {
          "text": "Run 'testng.xml'"
        },
        {
          "heading": "PART 7 — Open Report"
        },
        {
          "text": "Go to:"
        },
        {
          "text": "reports/extent.html"
        },
        {
          "text": "Double click → opens in browser"
        },
        {
          "heading": "EXPECTED RESULT"
        },
        {
          "text": "You should now see:"
        },
        {
          "text": "Test names\n✔ Pass/Fail count\n✔ Logs\n✔ Exception (if failed)\n✔ Screenshot attached"
        },
        {
          "heading": "FINAL FLOW"
        },
        {
          "text": "TestNG run"
        },
        {
          "text": "Listener triggered"
        },
        {
          "text": "Extent logs created"
        },
        {
          "text": "Screenshot captured"
        },
        {
          "text": "extent.flush()"
        },
        {
          "text": "HTML report generated"
        },
        {
          "heading": "INTERVIEW EXPLANATION"
        },
        {
          "text": "I integrated Extent Reports using TestNG listeners, where each test is dynamically logged using ThreadLocal ExtentTest instances. This ensures accurate reporting even during parallel execution, along with screenshots captured on failures."
        },
        {
          "heading": "EXPECTED OUTCOME"
        },
        {
          "text": "You now have:"
        },
        {
          "text": "Professional HTML report"
        },
        {
          "text": "Screenshot integration"
        },
        {
          "text": "Parallel-safe reporting"
        },
        {
          "text": "Clear execution visibility"
        }
      ]
    },
    {
      "id": "environment-switching",
      "title": "Switch between QA and UAT",
      "module": "Data-Driven and Advanced Execution",
      "source": "STEP 21 — Environment Handling (QA/UAT Switch)",
      "level": "Advanced",
      "duration": "3 min read",
      "learningObjective": "switch URLs/environments from config.",
      "hideReview": true,
      "legacyIds": [],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Build an Extent HTML report with screenshots.”"
        },
        {
          "text": "Update config.properties"
        },
        {
          "language": "properties",
          "code": "env=qa\nqa.url=https://qa.example.com\nuat.url=https://uat.example.com",
          "title": "src/test/resources/config.properties"
        },
        {
          "text": "Update BaseTest"
        },
        {
          "language": "java",
          "code": "String env = config.getProperty(\"env\");\nString url = config.getProperty(env + \".url\");\ndriver.get(url);",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "text": "Verify"
        },
        {
          "text": "Change env=uat"
        },
        {
          "text": "Run tests"
        },
        {
          "text": "URL changes accordingly"
        },
        {
          "heading": "Expected outcome:\nSame code runs on multiple environments."
        },
        {
          "text": "Apply the example inside the current BaseTest.setUp() after the browser is created. Replace the example hosts with environments you control. At the parallel stage, keep this same URL selection if you adopted it."
        }
      ]
    },
    {
      "id": "inline-data-provider",
      "title": "Supply inputs with a TestNG DataProvider",
      "module": "Data-Driven and Advanced Execution",
      "source": "STEP 22 — Data Driven Testing (Multiple Inputs)",
      "level": "Advanced",
      "duration": "3 min read",
      "learningObjective": "run same test with multiple data.",
      "hideReview": true,
      "legacyIds": [
        "step-21"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Switch between QA and UAT.”"
        },
        {
          "text": "Create DataProvider"
        },
        {
          "text": "In test class:"
        },
        {
          "language": "java",
          "code": "@DataProvider(name = \"searchData\")\npublic Object[][] data() {\n    return new Object[][] {\n        {\"laptop\"},\n        {\"mobile\"},\n        {\"headphones\"}\n    };\n}",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "text": "Use it"
        },
        {
          "language": "java",
          "code": "@Test(dataProvider = \"searchData\")\npublic void searchProductTest(String keyword) {\n    AmazonHomePage home = new AmazonHomePage(getDriver());\n    home.enterSearchText(keyword);\n    home.clickSearch();\n\n    AmazonResultsPage results = new AmazonResultsPage(getDriver());\n    Assert.assertTrue(results.isResultsDisplayed(), \"Results missing for \" + keyword);\n}",
          "title": "src/test/java/com/automation/framework/tests/AmazonSearchTest.java · replacement test method",
          "explanation": "Replace searchProductTest in AmazonSearchTest. Add imports for com.automation.framework.pages.AmazonResultsPage and org.testng.Assert."
        },
        {
          "heading": "Run and verify"
        },
        {
          "text": "Right click testng.xml → Run"
        },
        {
          "text": "Same test runs 3 times with different data"
        },
        {
          "heading": "Expected outcome:\nMultiple scenarios covered by one method."
        },
        {
          "text": "Keep the TestNG DataProvider and Test imports. The test needs BaseTest and AmazonHomePage, and the Excel variant also imports com.automation.framework.utils.ExcelUtils. Keep these data providers sequential while using the introductory retry analyzer."
        }
      ]
    },
    {
      "id": "excel-data-provider",
      "title": "Read test inputs from Excel using Apache POI",
      "module": "Data-Driven and Advanced Execution",
      "source": "STEP 23 — Data Driven Testing using Excel (Apache POI)",
      "level": "Advanced",
      "duration": "3 min read",
      "learningObjective": "Read test data from Excel instead of hardcoding, use it in TestNG DataProvider, and optionally write results back to Excel.",
      "hideReview": true,
      "legacyIds": [
        "step-23"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Supply inputs with a TestNG DataProvider.”"
        },
        {
          "heading": "PART 1 — Add Apache POI Dependency"
        },
        {
          "text": "Open pom.xml"
        },
        {
          "text": "Add inside <dependencies>:"
        },
        {
          "language": "xml",
          "code": "<dependency>\n    <groupId>org.apache.poi</groupId>\n    <artifactId>poi-ooxml</artifactId>\n    <version>5.4.1</version>\n</dependency>",
          "title": "pom.xml · XML example"
        },
        {
          "text": "Click Load Maven Changes"
        },
        {
          "heading": "PART 2 — Create Excel File"
        },
        {
          "text": "Go to project root"
        },
        {
          "text": "Create folder:"
        },
        {
          "text": "testdata"
        },
        {
          "text": "Inside it create file:"
        },
        {
          "text": "searchData.xlsx"
        },
        {
          "heading": "PART 3 — Add Data in Excel"
        },
        {
          "text": "Open Excel file and add:"
        },
        {
          "text": "keyword"
        },
        {
          "text": "laptop"
        },
        {
          "text": "mobile"
        },
        {
          "text": "headphones"
        },
        {
          "text": "Save file"
        },
        {
          "heading": "PART 4 — Create Excel Utility Class"
        },
        {
          "text": "Location:"
        },
        {
          "text": "utils/ExcelUtils.java"
        },
        {
          "text": "Code"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.utils;\n\nimport java.io.IOException;\nimport java.io.UncheckedIOException;\nimport java.nio.file.Files;\nimport java.nio.file.Path;\nimport org.apache.poi.ss.usermodel.DataFormatter;\nimport org.apache.poi.ss.usermodel.Row;\nimport org.apache.poi.ss.usermodel.Sheet;\nimport org.apache.poi.xssf.usermodel.XSSFWorkbook;\n\npublic class ExcelUtils {\n    public static Object[][] getTestData(String filePath, String sheetName) {\n        try (var input = Files.newInputStream(Path.of(filePath));\n             var workbook = new XSSFWorkbook(input)) {\n            Sheet sheet = workbook.getSheet(sheetName);\n            if (sheet == null || sheet.getRow(0) == null || sheet.getLastRowNum() < 1) {\n                throw new IllegalArgumentException(\"Missing sheet, header or data: \" + sheetName);\n            }\n\n            int columns = sheet.getRow(0).getLastCellNum();\n            if (columns < 1) throw new IllegalArgumentException(\"Empty header: \" + sheetName);\n            Object[][] data = new Object[sheet.getLastRowNum()][columns];\n            DataFormatter formatter = new DataFormatter();\n            for (int i = 1; i <= sheet.getLastRowNum(); i++) {\n                Row row = sheet.getRow(i);\n                if (row == null) throw new IllegalArgumentException(\"Missing row: \" + (i + 1));\n                for (int j = 0; j < columns; j++) {\n                    data[i - 1][j] = formatter.formatCellValue(row.getCell(j));\n                }\n            }\n            return data;\n        } catch (IOException error) {\n            throw new UncheckedIOException(\"Cannot read \" + filePath, error);\n        }\n    }\n}",
          "title": "src/test/java/com/automation/framework/utils/ExcelUtils.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "heading": "PART 5 — Use Excel in DataProvider"
        },
        {
          "text": "Open your test class:"
        },
        {
          "language": "java",
          "code": "@DataProvider(name = \"excelData\")\npublic Object[][] getData() {\n\n    String path = System.getProperty(\"user.dir\") + \"/testdata/searchData.xlsx\";\n\n    return ExcelUtils.getTestData(path, \"Sheet1\");\n}",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "heading": "PART 6 — Use DataProvider in Test"
        },
        {
          "language": "java",
          "code": "@Test(dataProvider = \"excelData\")\npublic void searchProductTest(String keyword) {\n    AmazonHomePage home = new AmazonHomePage(getDriver());\n    home.enterSearchText(keyword);\n    home.clickSearch();\n\n    AmazonResultsPage results = new AmazonResultsPage(getDriver());\n    Assert.assertTrue(results.isResultsDisplayed(), \"Results missing for \" + keyword);\n}",
          "title": "src/test/java/com/automation/framework/tests/AmazonSearchTest.java · replacement test method",
          "explanation": "Replace searchProductTest in AmazonSearchTest. Add imports for com.automation.framework.pages.AmazonResultsPage and org.testng.Assert."
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "TestNG runs the same test three times, once each for laptop, mobile, and headphones. The first Excel row is a header."
        },
        {
          "heading": "Interview explanation"
        },
        {
          "text": "Apache POI reads spreadsheet cells and the TestNG DataProvider turns each data row into a separate invocation of the same test."
        },
        {
          "text": "Keep the TestNG DataProvider and Test imports. The test needs BaseTest and AmazonHomePage, and the Excel variant also imports com.automation.framework.utils.ExcelUtils. Keep these data providers sequential while using the introductory retry analyzer."
        },
        {
          "table": [
            [
              "keyword"
            ],
            [
              "laptop"
            ],
            [
              "mobile"
            ],
            [
              "headphones"
            ]
          ]
        }
      ]
    },
    {
      "id": "parallel-execution",
      "title": "Run tests in parallel with ThreadLocal WebDriver",
      "module": "Data-Driven and Advanced Execution",
      "source": "STEP 19 — Parallel Execution (Make It Actually Parallel)",
      "level": "Advanced",
      "duration": "3 min read",
      "learningObjective": "run tests concurrently and prove it.",
      "hideReview": true,
      "legacyIds": [
        "step-27"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Read test inputs from Excel using Apache POI.”"
        },
        {
          "text": "What we will do:"
        },
        {
          "text": "Enable parallel in testng.xml"
        },
        {
          "text": "Ensure driver is thread-safe (ThreadLocal)"
        },
        {
          "text": "Print thread IDs to verify"
        },
        {
          "text": "Update testng.xml"
        },
        {
          "text": "Open testng.xml"
        },
        {
          "text": "Set:"
        },
        {
          "language": "xml",
          "code": "<suite name=\"Amazon Suite\" parallel=\"classes\" thread-count=\"2\">",
          "title": "testng.xml · XML example"
        },
        {
          "text": "Make driver thread-safe ()"
        },
        {
          "text": "In BaseTest.java:"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.utils;\n\nimport org.apache.logging.log4j.LogManager;\nimport org.apache.logging.log4j.Logger;\nimport org.openqa.selenium.WebDriver;\nimport org.openqa.selenium.chrome.ChromeDriver;\nimport org.testng.annotations.AfterMethod;\nimport org.testng.annotations.BeforeMethod;\n\npublic class BaseTest {\n    private static final Logger log = LogManager.getLogger(BaseTest.class);\n    private final ThreadLocal<WebDriver> driver = new ThreadLocal<>();\n    private final ConfigReader config = new ConfigReader();\n\n    @BeforeMethod\n    public void setUp() {\n        WebDriver browser = createDriver();\n        driver.set(browser);\n        browser.manage().window().maximize();\n        browser.get(config.getProperty(\"url\"));\n        log.info(\"Started browser on thread {}\", Thread.currentThread().getId());\n    }\n\n    protected WebDriver createDriver() {\n        return new ChromeDriver();\n    }\n\n    @AfterMethod(alwaysRun = true)\n    public void tearDown() {\n        WebDriver browser = getDriver();\n        try {\n            if (browser != null) browser.quit();\n        } finally {\n            driver.remove();\n        }\n    }\n\n    public WebDriver getDriver() {\n        return driver.get();\n    }\n}",
          "title": "src/test/java/com/automation/framework/utils/BaseTest.java",
          "explanation": "Replace the complete BaseTest class. Use getDriver() in each test and listener."
        },
        {
          "text": "Add verification prints"
        },
        {
          "text": "In any test:"
        },
        {
          "language": "java",
          "code": "System.out.println(\"Thread ID: \" + Thread.currentThread().getId());",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "heading": "Run and verify"
        },
        {
          "text": "Right click testng.xml → Run"
        },
        {
          "text": "You should see:"
        },
        {
          "text": "Multiple Chrome windows"
        },
        {
          "text": "Different thread IDs in console"
        },
        {
          "heading": "Expected outcome:\nTrue parallel execution without driver conflicts."
        },
        {
          "text": "For class-level parallelism, keep at least two test classes in the same suite. Each class must obtain the current session through getDriver(). If you enabled QA/UAT switching, keep that URL selection in setUp instead of reading the single url property."
        }
      ]
    },
    {
      "id": "cross-browser",
      "title": "Select a browser through configuration",
      "module": "Data-Driven and Advanced Execution",
      "source": "STEP 20 — Cross-Browser Execution (Switch via config)",
      "level": "Advanced",
      "duration": "3 min read",
      "learningObjective": "run same tests on different browsers using config.",
      "hideReview": true,
      "legacyIds": [
        "step-9"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Run tests in parallel with ThreadLocal WebDriver.”"
        },
        {
          "text": "Update config.properties"
        },
        {
          "text": "Open src/test/resources/config.properties:"
        },
        {
          "language": "properties",
          "code": "browser=chrome\nurl=https://www.amazon.in",
          "title": "src/test/resources/config.properties"
        },
        {
          "text": "Update BaseTest"
        },
        {
          "language": "java",
          "code": "// Add these imports at the top of BaseTest.java.\nimport org.openqa.selenium.edge.EdgeDriver;\nimport org.openqa.selenium.firefox.FirefoxDriver;\n\n// Replace createDriver() inside BaseTest.\nprotected WebDriver createDriver() {\n    String browser = config.getProperty(\"browser\");\n    return switch (browser.toLowerCase(java.util.Locale.ROOT)) {\n        case \"chrome\" -> new ChromeDriver();\n        case \"edge\" -> new EdgeDriver();\n        case \"firefox\" -> new FirefoxDriver();\n        default -> throw new IllegalArgumentException(\"Unsupported browser: \" + browser);\n    };\n}",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "heading": "Run and verify"
        },
        {
          "text": "Change browser=edge"
        },
        {
          "text": "Run testng.xml"
        },
        {
          "text": "Edge opens instead of Chrome"
        },
        {
          "heading": "Expected outcome:\nBrowser controlled via config without code changes."
        }
      ]
    },
    {
      "id": "driver-management",
      "title": "Manage browser driver binaries",
      "module": "Data-Driven and Advanced Execution",
      "source": "Website Step 24 and DOCX environment setup",
      "level": "Advanced",
      "duration": "3 min read",
      "learningObjective": "Remove machine-specific driver paths from the framework.",
      "hideReview": true,
      "legacyIds": [
        "step-24"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Select a browser through configuration.”"
        },
        {
          "text": "Delete the hardcoded webdriver.chrome.driver property when the matching browser driver can be resolved automatically. Selenium 4 includes Selenium Manager, which is invoked by the local driver constructor when a driver has not been provided."
        },
        {
          "language": "java",
          "code": "import org.openqa.selenium.chrome.ChromeDriver;\n\n// Inside your local browser creation branch:\nreturn new ChromeDriver();",
          "title": "BaseTest.java · Chrome creation fragment"
        },
        {
          "text": "The old lesson used the separate WebDriverManager library. If an existing project already uses it, its chromedriver().setup() call belongs before new ChromeDriver(). Use a single driver-resolution strategy for each browser."
        }
      ]
    },
    {
      "id": "git-github",
      "title": "Version the framework with Git and GitHub",
      "module": "Version Control and CI/CD",
      "source": "STEP 24 — Git & GitHub Complete Workflow (Version Control + Safe Development)",
      "level": "Advanced",
      "duration": "3 min read",
      "learningObjective": "Manage your framework professionally using Git and GitHub, create stable checkpoints, work on new features safely, and roll back anytime.",
      "hideReview": true,
      "legacyIds": [],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Manage browser driver binaries.”"
        },
        {
          "heading": "PART 1 — Initial Git Setup (One-time)"
        },
        {
          "text": "If your project is not yet connected to Git:"
        },
        {
          "text": "Open IntelliJ"
        },
        {
          "text": "Go to:"
        },
        {
          "text": "VCS → Enable Version Control Integration"
        },
        {
          "text": "Select:"
        },
        {
          "text": "Git"
        },
        {
          "text": "Click OK"
        },
        {
          "text": "Now your project is under Git"
        },
        {
          "heading": "PART 2 — First Commit (Save Current State)"
        },
        {
          "text": "Press:"
        },
        {
          "text": "Ctrl + K"
        },
        {
          "text": "(Commit window opens)"
        },
        {
          "text": "Select all files"
        },
        {
          "text": "Add message:"
        },
        {
          "text": "Initial framework setup till Step 22"
        },
        {
          "text": "Click:"
        },
        {
          "text": "Commit"
        },
        {
          "heading": "PART 3 — Connect to GitHub"
        },
        {
          "text": "Option A (via IntelliJ)"
        },
        {
          "text": "Git → GitHub → Share Project on GitHub"
        },
        {
          "text": "Enter repository name:"
        },
        {
          "text": "amazon-selenium-framework"
        },
        {
          "text": "Share"
        },
        {
          "text": "Option B (Manual via Terminal)"
        },
        {
          "language": "git",
          "code": "git init\ngit add .\ngit commit -m \"Initial commit\"\ngit remote add origin https://github.com/your-username/repo-name.git\ngit push -u origin master",
          "title": "Example command"
        },
        {
          "heading": "PART 4 — Create Stable Checkpoint (Tag)"
        },
        {
          "text": "Tag is used to freeze a working version"
        },
        {
          "text": "In IntelliJ"
        },
        {
          "text": "Alt + `"
        },
        {
          "text": "New Tag"
        },
        {
          "text": "Enter:"
        },
        {
          "text": "step-23-stable"
        },
        {
          "text": "Push tag to GitHub"
        },
        {
          "text": "Open terminal:"
        },
        {
          "language": "git",
          "code": "git push origin step-23-stable",
          "title": "Example command"
        },
        {
          "heading": "PART 5 — Create Branch for New Work"
        },
        {
          "text": "Branch is used for safe development"
        },
        {
          "text": "Create new branch"
        },
        {
          "language": "git",
          "code": "git checkout -b step-24-work",
          "title": "Example command"
        },
        {
          "text": "OR in IntelliJ:"
        },
        {
          "text": "Bottom right → click master"
        },
        {
          "text": "New Branch"
        },
        {
          "text": "Name:"
        },
        {
          "text": "step-24-work"
        },
        {
          "heading": "PART 6 — Daily Development Flow"
        },
        {
          "text": "Whenever you make changes:"
        },
        {
          "language": "git",
          "code": "git add .\ngit commit -m \"Added retry and listener improvements\"\ngit push",
          "title": "Example command"
        },
        {
          "text": "Keeps your work saved and versioned"
        },
        {
          "heading": "PART 7 — Rollback to Stable Version"
        },
        {
          "text": "If something breaks:"
        },
        {
          "text": "Option 1 — Checkout tag"
        },
        {
          "language": "git",
          "code": "git checkout step-23-stable",
          "title": "Example command"
        },
        {
          "text": "Option 2 — Create branch from tag"
        },
        {
          "language": "git",
          "code": "git checkout -b rollback-step23 step-23-stable",
          "title": "Example command"
        },
        {
          "text": "Safest way to restore working code"
        },
        {
          "heading": "PART 8 — Switch Between Work"
        },
        {
          "language": "git",
          "code": "git checkout step-24-work",
          "title": "Example command"
        },
        {
          "text": "Back to your development branch"
        },
        {
          "heading": "PART 9 — View History"
        },
        {
          "text": "In IntelliJ:"
        },
        {
          "text": "Git → Show History"
        },
        {
          "text": "OR"
        },
        {
          "text": "Alt + 9 (Git panel)"
        },
        {
          "text": "You can:"
        },
        {
          "text": "See commits"
        },
        {
          "text": "Compare changes"
        },
        {
          "text": "Revert code"
        },
        {
          "heading": "PART 10 — Push & Pull from GitHub"
        },
        {
          "text": "Push changes"
        },
        {
          "language": "git",
          "code": "git push",
          "title": "Example command"
        },
        {
          "text": "Pull latest updates"
        },
        {
          "language": "git",
          "code": "git pull",
          "title": "Example command"
        },
        {
          "heading": "PART 11 — Real Workflow (Industry Style)"
        },
        {
          "text": "master/main → stable code"
        },
        {
          "text": "feature branch → new changes"
        },
        {
          "text": "tag → release version"
        },
        {
          "text": "Example:"
        },
        {
          "text": "step-23-stable → stable tag"
        },
        {
          "text": "step-24-work → development branch"
        },
        {
          "heading": "PART 12 — How This Helps Your Framework"
        },
        {
          "text": "You never lose working code"
        },
        {
          "text": "You can experiment safely"
        },
        {
          "text": "You can go back anytime"
        },
        {
          "text": "Easy integration with Jenkins"
        },
        {
          "heading": "EXPECTED OUTCOME"
        },
        {
          "text": "You now have:"
        },
        {
          "text": "Code saved in GitHub"
        },
        {
          "text": "Stable version tagged"
        },
        {
          "text": "Separate branch for new work"
        },
        {
          "text": "Ability to rollback anytime"
        },
        {
          "text": "Professional version control setup"
        },
        {
          "heading": "INTERVIEW EXPLANATION"
        },
        {
          "text": "I use Git for version control and GitHub for repository management. I create stable checkpoints using tags and develop new features in separate branches to avoid breaking working code. This allows safe experimentation, easy rollback, and smooth CI/CD integration."
        }
      ]
    },
    {
      "id": "jenkins-maven",
      "title": "Run the Maven suite in Jenkins",
      "module": "Version Control and CI/CD",
      "source": "STEP 25 — CI/CD USING JENKINS (Run Your Framework Automatically)",
      "level": "Advanced",
      "duration": "3 min read",
      "learningObjective": "Run your Selenium framework automatically using Jenkins without IntelliJ, using Maven and GitHub integration.",
      "hideReview": true,
      "legacyIds": [
        "step-25"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Version the framework with Git and GitHub.”"
        },
        {
          "heading": "PART 1 — Install Jenkins"
        },
        {
          "text": "Download Jenkins from:"
        },
        {
          "text": "https://www.jenkins.io/download/"
        },
        {
          "text": "Install using Windows installer"
        },
        {
          "text": "After installation, open browser:"
        },
        {
          "text": "http://localhost:8080"
        },
        {
          "text": "Unlock Jenkins:"
        },
        {
          "text": "Go to path shown on screen (usually):"
        },
        {
          "text": "C:\\Program Files\\Jenkins\\secrets\\initialAdminPassword"
        },
        {
          "text": "Copy password and paste in browser"
        },
        {
          "text": "Click:"
        },
        {
          "text": "Install Suggested Plugins"
        },
        {
          "text": "Create admin user and finish setup"
        },
        {
          "heading": "PART 2 — Install Required Plugins"
        },
        {
          "text": "Go to:"
        },
        {
          "text": "Manage Jenkins → Manage Plugins"
        },
        {
          "text": "Install:"
        },
        {
          "text": "Maven Integration Plugin"
        },
        {
          "text": "Git Plugin"
        },
        {
          "text": "Pipeline Plugin (if not already)"
        },
        {
          "text": "Restart Jenkins"
        },
        {
          "heading": "PART 3 — Configure Maven in Jenkins"
        },
        {
          "text": "Manage Jenkins → Global Tool Configuration"
        },
        {
          "text": "Scroll to Maven"
        },
        {
          "text": "Add Maven"
        },
        {
          "text": "Fill:"
        },
        {
          "text": "Name:"
        },
        {
          "text": "Maven-3"
        },
        {
          "text": "Check:"
        },
        {
          "text": "Install automatically"
        },
        {
          "text": "Select latest version"
        },
        {
          "text": "Click Save"
        },
        {
          "heading": "PART 4 — Create Jenkins Job"
        },
        {
          "text": "New Item"
        },
        {
          "text": "Enter name:"
        },
        {
          "text": "amazon-selenium-framework"
        },
        {
          "text": "Select:"
        },
        {
          "text": "Freestyle project"
        },
        {
          "text": "Click OK"
        },
        {
          "heading": "PART 5 — Connect GitHub Repository"
        },
        {
          "text": "In job configuration:"
        },
        {
          "text": "Scroll to:"
        },
        {
          "text": "Source Code Management"
        },
        {
          "text": "Git"
        },
        {
          "text": "Enter repository URL:"
        },
        {
          "text": "https://github.com/your-username/repo-name.git"
        },
        {
          "text": "If private repo:"
        },
        {
          "text": "Add credentials (username + token)"
        },
        {
          "heading": "PART 6 — Configure Build Step (Maven Execution)"
        },
        {
          "text": "Build"
        },
        {
          "text": "Add build step → Invoke top-level Maven targets"
        },
        {
          "text": "Select Maven version:"
        },
        {
          "text": "In Goals:"
        },
        {
          "text": "clean test"
        },
        {
          "text": "This will run:"
        },
        {
          "language": "bash",
          "code": "mvn clean test",
          "title": "Example command"
        },
        {
          "heading": "PART 7 — Save and Run Job"
        },
        {
          "text": "Save"
        },
        {
          "text": "Build Now"
        },
        {
          "heading": "PART 8 — Verify Execution"
        },
        {
          "text": "Click build number:"
        },
        {
          "text": "1"
        },
        {
          "text": "Console Output"
        },
        {
          "heading": "EXPECTED OUTPUT"
        },
        {
          "text": "You should see:"
        },
        {
          "text": "Maven downloading dependencies"
        },
        {
          "text": "TestNG executing tests"
        },
        {
          "text": "Retry mechanism running"
        },
        {
          "text": "Screenshots being captured"
        },
        {
          "text": "Logs printed"
        },
        {
          "text": "Reports generated"
        },
        {
          "heading": "PART 9 — Verify Reports in Jenkins"
        },
        {
          "text": "Go to workspace folder:"
        },
        {
          "text": "Jenkins → Job → Workspace"
        },
        {
          "text": "Check folders:"
        },
        {
          "text": "screenshots/"
        },
        {
          "text": "reports/"
        },
        {
          "text": "test-output/"
        },
        {
          "text": "Open:"
        },
        {
          "text": "test-output/index.html"
        },
        {
          "text": "Default TestNG report"
        },
        {
          "heading": "PART 10 — (Optional) Auto Trigger Build"
        },
        {
          "text": "Go to job configuration"
        },
        {
          "text": "Build Triggers"
        },
        {
          "text": "Enable:"
        },
        {
          "text": "Poll SCM"
        },
        {
          "text": "Example:"
        },
        {
          "text": "H/5 * * * *"
        },
        {
          "text": "Runs every 5 minutes if code changes"
        },
        {
          "heading": "PART 11 — Real Execution Flow in Jenkins"
        },
        {
          "text": "Developer pushes code to GitHub"
        },
        {
          "text": "Jenkins pulls latest code"
        },
        {
          "text": "Maven runs (clean test) pom.xml"
        },
        {
          "text": "TestNG executes testng.xml"
        },
        {
          "text": "Framework runs tests"
        },
        {
          "text": "Retry handles failures"
        },
        {
          "text": "Listener captures screenshots"
        },
        {
          "heading": "EXPECTED OUTCOME"
        },
        {
          "text": "Tests run without IntelliJ"
        },
        {
          "text": "Fully automated execution"
        },
        {
          "text": "Works with GitHub"
        },
        {
          "text": "CI/CD pipeline ready"
        },
        {
          "text": "Same framework behavior as local"
        },
        {
          "heading": "INTERVIEW EXPLANATION"
        },
        {
          "text": "I integrated my Selenium framework with Jenkins by configuring a freestyle job that pulls code from GitHub and executes tests using Maven. The Surefire plugin triggers TestNG via testng.xml. During execution, retry logic, listeners, screenshots, and reports work seamlessly, making the framework fully CI/CD ready."
        },
        {
          "text": "Jenkins Pipeline (Jenkinsfile) version (more advanced)"
        },
        {
          "text": "OR how to publish reports directly in Jenkins UI"
        }
      ]
    },
    {
      "id": "jenkins-email",
      "title": "Send Jenkins build notifications",
      "module": "Version Control and CI/CD",
      "source": "Step 26🚀 Complete Jenkins Email Trigger Setup Guide",
      "level": "Advanced",
      "duration": "5 min read",
      "learningObjective": "Send Jenkins build notifications.",
      "hideReview": true,
      "legacyIds": [
        "step-26"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Run the Maven suite in Jenkins.”"
        },
        {
          "text": "This comprehensive guide details the configuration used to successfully resolve your Jenkins pipeline email delivery issue. It covers the end-to-end setup, from Google account security to the final working pipeline code."
        },
        {
          "heading": "Part 1: Google Account Security Configuration"
        },
        {
          "text": "Gmail blocks standard account passwords from automated tools. You must create an isolated 16-character App Password."
        },
        {
          "text": "Open your browser and navigate to the Google Account Security Dashboard."
        },
        {
          "text": "Scroll to the How you sign in to Google section."
        },
        {
          "text": "Ensure 2-Step Verification is turned ON. If it is off, complete the phone verification prompts to enable it."
        },
        {
          "text": "Go directly to Google App Passwords.  https://myaccount.google.com/apppasswords"
        },
        {
          "text": "In the App name field, type Jenkins."
        },
        {
          "text": "Click Create."
        },
        {
          "text": "Copy the generated 16-character security code inside the yellow box.\n(Note: Save this code without spaces; your standard password will not work in Jenkins)."
        },
        {
          "heading": "Part 2: Global Jenkins Location Suffix Setup"
        },
        {
          "text": "Jenkins must declare a verified global sender identity, or Gmail servers will discard the outbound pipeline traffic."
        },
        {
          "text": "Navigate to your Jenkins Dashboard."
        },
        {
          "text": "Go to Manage Jenkins ➡️ System."
        },
        {
          "text": "Locate the Jenkins Location block near the top."
        },
        {
          "text": "Find the System Admin e-mail address field."
        },
        {
          "text": "Enter the Gmail address used to authenticate to SMTP. Replace the example address with an account you control."
        },
        {
          "heading": "Part 3: Extended E-mail Notification Configuration"
        },
        {
          "text": "This section powers the emailext pipeline step. It requires explicit server paths and an active TLS encryption layer to deliver build logs."
        },
        {
          "text": "Scroll down the System configuration page to Extended E-mail Notification."
        },
        {
          "text": "Configure the core connectivity values:"
        },
        {
          "text": "SMTP Server: gmail.com"
        },
        {
          "text": "SMTP Port: 587"
        },
        {
          "text": "Click the Advanced... button directly below the port field."
        },
        {
          "text": "Locate the Credentials row and click Add ➡️ Jenkins. Configure the popup as follows:"
        },
        {
          "text": "Kind: Username with password"
        },
        {
          "text": "Username: your SMTP Gmail address."
        },
        {
          "text": "Password: Paste your 16-character Google App Password (without spaces)."
        },
        {
          "text": "ID / Description: gmail-app-password"
        },
        {
          "text": "Click Add to close the popup."
        },
        {
          "text": "Select the Gmail credential you created."
        },
        {
          "text": "Configure the network security checkboxes:"
        },
        {
          "text": "Use SSL: ❌ Leave Unchecked"
        },
        {
          "text": "Use TLS: Check this Box"
        },
        {
          "text": "Populate the routing parameters further down in this block:"
        },
        {
          "text": "Default Recipients: qa-team@example.com"
        },
        {
          "text": "Reply To List: qa-team@example.com"
        },
        {
          "heading": "Part 4: Standard E-mail Notification Fallback Setup"
        },
        {
          "text": "This step verifies your baseline credentials and provides diagnostic tools for the administrative user interface."
        },
        {
          "text": "Scroll further down to the standard E-mail Notification section."
        },
        {
          "text": "Set SMTP server to gmail.com."
        },
        {
          "text": "Set Default user e-mail suffix to @gmail.com."
        },
        {
          "text": "Click Advanced... to expand the hidden network card settings."
        },
        {
          "text": "Check the box for Use SMTP Authentication."
        },
        {
          "text": "Set the login identity:"
        },
        {
          "text": "Password: Paste the same 16-character Google App Password here."
        },
        {
          "text": "Align the socket controls:"
        },
        {
          "text": "Check the box for Test configuration by sending test e-mail."
        },
        {
          "text": "In the Test e-mail recipient box, enter qa-team@example.com"
        },
        {
          "text": "Click Test Configuration to confirm it displays a blue success message."
        },
        {
          "text": "Scroll to the absolute bottom of the screen and click the blue Save button."
        },
        {
          "heading": "Part 5: Global Pipeline Credential Sync"
        },
        {
          "text": "Pipelines require an explicitly defined string identifier from the global store to authenticate successfully during execution blocks."
        },
        {
          "text": "Go to Manage Jenkins ➡️ Credentials."
        },
        {
          "text": "Click the global link under the Domains column."
        },
        {
          "text": "Click Add Credentials on the top right."
        },
        {
          "text": "Input the following configuration details:"
        },
        {
          "text": "Password: Paste your 16-character Google App Password."
        },
        {
          "text": "ID: gmail-creds (This text label will be used inside your pipeline script)."
        },
        {
          "heading": "Part 6: Production Pipeline Declarative Script"
        },
        {
          "text": "This script checks out your TestNG regression repository, runs your tests via Maven, and sends detailed emails based on the build outcome."
        },
        {
          "language": "groovy",
          "code": "pipeline {\n    agent any\n    options { skipDefaultCheckout() }\n\n    tools {\n        maven 'Maven-3'\n    }\n\n    stages {\n        stage('Checkout') {\n            steps {\n                echo 'Cloning repo...'\n                checkout scm\n            }\n        }\n\n        stage('Build + Test (TestNG Suite)') {\n            steps {\n                echo 'Running testng.xml sequentially...'\n                bat 'mvn clean test'\n            }\n        }\n\n        stage('Reports') {\n            steps {\n                echo 'Reports will be generated in target/surefire-reports'\n            }\n        }\n    }\n\n    post {\n        always {\n            emailext (\n                to: 'qa-team@example.com',\n                subject: \"Jenkins Build #${env.BUILD_NUMBER} - ${currentBuild.currentResult}\",\n                body: \"<h3>Build Status: ${currentBuild.currentResult}</h3><p>Job: ${env.JOB_NAME}</p><p>Check console output here: ${env.BUILD_URL}</p>\",\n                mimeType: 'text/html'\n            )\n        }\n    }\n}",
          "title": "Jenkinsfile"
        },
        {
          "heading": "Part 7: Run and Validate"
        },
        {
          "text": "Open your pipeline configuration page, paste the complete code block above, and click Save."
        },
        {
          "text": "Click Build Now on the left-hand menu."
        },
        {
          "text": "Open the Console Output to verify execution blocks. You will see a successful emailext transmission indicators without any authentication drops."
        },
        {
          "text": "Open your Gmail inbox to view the structured HTML status layout."
        },
        {
          "text": "Use Pipeline script from SCM so checkout scm can resolve your repository. Store the app password in Jenkins credentials, use smtp.gmail.com on port 587 with STARTTLS, and replace the example recipient with your team address."
        }
      ]
    },
    {
      "id": "jenkins-sequential",
      "title": "Run test classes sequentially in a Jenkins pipeline",
      "module": "Version Control and CI/CD",
      "source": "Step 27- Sequentially execution with Email in Jenkins Pipeline",
      "level": "Advanced",
      "duration": "3 min read",
      "learningObjective": "Run test classes sequentially in a Jenkins pipeline.",
      "hideReview": true,
      "legacyIds": [],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Send Jenkins build notifications.”"
        },
        {
          "heading": "Part 1 — Prepare Your Project"
        },
        {
          "text": "Ensure both test classes exist:"
        },
        {
          "text": "AmazonTitleValidationTest"
        },
        {
          "text": "AmazonResultsTest"
        },
        {
          "text": "You may keep testng.xml, but pipeline will control execution order"
        },
        {
          "heading": "Part 2 — Create Jenkins Pipeline Job"
        },
        {
          "text": "Open Jenkins"
        },
        {
          "text": "Click New Item"
        },
        {
          "text": "Enter name: sequential-pipeline-with-email"
        },
        {
          "text": "Select Pipeline"
        },
        {
          "text": "Click OK"
        },
        {
          "heading": "Part 3 — Install Email Plugin"
        },
        {
          "text": "Go to Manage Jenkins → Manage Plugins → Available"
        },
        {
          "text": "Search: Email Extension Plugin"
        },
        {
          "text": "Install it"
        },
        {
          "heading": "Part 4 — Configure Email Settings"
        },
        {
          "text": "Go to Manage Jenkins → Configure System"
        },
        {
          "text": "Scroll to Extended E-mail Notification"
        },
        {
          "text": "Fill:"
        },
        {
          "text": "SMTP Server: smtp.gmail.com"
        },
        {
          "text": "Port: 587"
        },
        {
          "text": "TLS: Enabled"
        },
        {
          "text": "Username: your-email@gmail.com"
        },
        {
          "text": "Password: Gmail App Password"
        },
        {
          "text": "Click Test configuration"
        },
        {
          "heading": "Part 5 — Add Pipeline Script"
        },
        {
          "text": "Paste below in Pipeline Script:"
        },
        {
          "language": "groovy",
          "code": "pipeline {\n    agent any\n\n    tools {\n        maven 'Maven-3'\n    }\n\n    stages {\n\n        stage('Checkout') {\n            steps {\n                echo 'Cloning project...'\n                git branch: 'main', url: 'https://github.com/your-username/amazon-selenium-framework.git'\n            }\n        }\n\n        stage('Build') {\n            steps {\n                echo 'Building project...'\n                bat 'mvn clean compile'\n            }\n        }\n\n        stage('Run Class A') {\n            steps {\n                echo 'Running Class A...'\n                bat 'mvn -Dtest=AmazonTitleValidationTest -Dsurefire.reportsDirectory=target/reports-a test'\n            }\n        }\n\n        stage('Run Class B') {\n            steps {\n                echo 'Running Class B...'\n                bat 'mvn -Dtest=AmazonResultsTest -Dsurefire.reportsDirectory=target/reports-b test'\n            }\n        }\n\n        stage('Reports') {\n            steps {\n                echo 'Publishing reports...'\n            }\n        }\n    }\n\n    post {\n\n        always {\n            junit testResults: 'target/reports-*/*.xml', allowEmptyResults: true\n        }\n\n        success {\n            emailext(\n                to: 'qa-team@example.com',\n                subject: \"SUCCESS: ${JOB_NAME} - Build #${BUILD_NUMBER}\",\n                body: \"\"\"\n                Build SUCCESS\n\n                Job: ${JOB_NAME}\n                Build: ${BUILD_NUMBER}\n                URL: ${BUILD_URL}\n\n                Class A and Class B executed sequentially successfully.\n                \"\"\"\n            )\n        }\n\n        failure {\n            emailext(\n                to: 'qa-team@example.com',\n                subject: \"FAILURE: ${JOB_NAME} - Build #${BUILD_NUMBER}\",\n                body: \"\"\"\n                Build FAILED\n\n                Job: ${JOB_NAME}\n                Build: ${BUILD_NUMBER}\n                URL: ${BUILD_URL}\n\n                Please check Jenkins console logs.\n                \"\"\"\n            )\n        }\n    }\n}",
          "title": "Jenkinsfile"
        },
        {
          "heading": "Part 6 — Save and Execute"
        },
        {
          "text": "Click Save"
        },
        {
          "text": "Click Build Now"
        },
        {
          "heading": "Part 7 — Observe Pipeline Execution"
        },
        {
          "text": "Jenkins UI will show:"
        },
        {
          "text": "Checkout"
        },
        {
          "text": "Build"
        },
        {
          "text": "Run Class A"
        },
        {
          "text": "Run Class B"
        },
        {
          "text": "Reports"
        },
        {
          "text": "Execution order:"
        },
        {
          "text": "AmazonTitleValidationTest runs first"
        },
        {
          "text": "AmazonResultsTest runs next"
        },
        {
          "heading": "Part 8 — Verify Email Notification"
        },
        {
          "text": "After build completes:"
        },
        {
          "text": "Check inbox for success or failure email"
        },
        {
          "text": "Email contains job name, build number, and Jenkins URL"
        },
        {
          "heading": "Part 9 — Final Execution Flow"
        },
        {
          "text": "Git Checkout"
        },
        {
          "text": "Execute Class A"
        },
        {
          "text": "Execute Class B"
        },
        {
          "text": "Generate Reports"
        },
        {
          "text": "Send Email Notification"
        },
        {
          "heading": "Part 10 — Optional Enhancements"
        },
        {
          "text": "Attach reports in email:\nattachmentsPattern: 'reports/*.html'"
        },
        {
          "text": "Send email only on failure using post { failure { ... } }"
        },
        {
          "heading": "Part 11 — Interview Summary"
        },
        {
          "text": "Pipeline executes test classes sequentially using separate stages"
        },
        {
          "text": "Maven triggers TestNG execution"
        },
        {
          "text": "Email Extension Plugin sends automated notifications"
        },
        {
          "text": "Clear visibility of execution flow in Jenkins UI"
        },
        {
          "text": "Use catchError around an individual test stage if you want Class B to run after Class A fails. The sample uses normal pipeline behavior, which stops subsequent test stages on a failure."
        }
      ]
    },
    {
      "id": "selenium-grid",
      "title": "Run browsers remotely with Selenium Grid",
      "module": "Version Control and CI/CD",
      "source": "STEP 28 — Selenium Grid (Run Tests on Multiple Browsers/Machines)",
      "level": "Advanced",
      "duration": "3 min read",
      "learningObjective": "Execute your Selenium tests on multiple browsers and machines in parallel using a Hub–Node architecture (no Docker required).",
      "hideReview": true,
      "legacyIds": [
        "step-28"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Run test classes sequentially in a Jenkins pipeline.”"
        },
        {
          "text": "Add grid.url=http://localhost:4444 to src/test/resources/config.properties. Use the hub address reachable from the test runner. Each node needs a supported browser and driver."
        },
        {
          "heading": "PART 1 — What is Selenium Grid (in simple words)"
        },
        {
          "text": "Selenium Grid has:"
        },
        {
          "text": "Hub → central controller"
        },
        {
          "text": "Nodes → machines/browsers where tests actually run"
        },
        {
          "text": "Flow:"
        },
        {
          "text": "Your Test → Hub → Node (Chrome/Edge/Firefox) → Test runs"
        },
        {
          "heading": "PART 2 — Download Selenium Server"
        },
        {
          "text": "Open browser"
        },
        {
          "text": "Go to:"
        },
        {
          "text": "https://www.selenium.dev/downloads/"
        },
        {
          "text": "Download:"
        },
        {
          "text": "selenium-server-4.39.0.jar"
        },
        {
          "text": "Place it in a folder:"
        },
        {
          "text": "C:\\selenium-grid"
        },
        {
          "heading": "PART 3 — Start Hub"
        },
        {
          "text": "Open Command Prompt"
        },
        {
          "text": "Go to folder:"
        },
        {
          "language": "bash",
          "code": "cd C:\\selenium-grid",
          "title": "Example command"
        },
        {
          "text": "Run:"
        },
        {
          "language": "bash",
          "code": "java -jar selenium-server-4.39.0.jar hub",
          "title": "Example command"
        },
        {
          "text": "VERIFY HUB"
        },
        {
          "text": "Open browser:"
        },
        {
          "text": "http://localhost:4444"
        },
        {
          "text": "You should see Selenium Grid UI"
        },
        {
          "heading": "PART 4 — Start Node (Same Machine or Different Machine)"
        },
        {
          "text": "Open another Command Prompt:"
        },
        {
          "language": "bash",
          "code": "java -jar selenium-server-4.39.0.jar node",
          "title": "Example command"
        },
        {
          "text": "VERIFY NODE"
        },
        {
          "text": "Refresh:"
        },
        {
          "text": "You will see:"
        },
        {
          "text": "Node registered"
        },
        {
          "text": "Browser slots available"
        },
        {
          "heading": "PART 5 — Update Your Framework (IMPORTANT)"
        },
        {
          "text": "Now your tests should not use local driver like:"
        },
        {
          "text": "new ChromeDriver()"
        },
        {
          "text": "Instead use RemoteWebDriver"
        },
        {
          "text": "UPDATE BaseTest.java"
        },
        {
          "text": "Replace driver setup with:"
        },
        {
          "language": "java",
          "code": "// Add these imports to BaseTest.java.\nimport java.net.URI;\nimport org.openqa.selenium.Capabilities;\nimport org.openqa.selenium.chrome.ChromeOptions;\nimport org.openqa.selenium.edge.EdgeOptions;\nimport org.openqa.selenium.firefox.FirefoxOptions;\nimport org.openqa.selenium.remote.RemoteWebDriver;\n\n// Replace createDriver(). Keep the same ThreadLocal setup and teardown.\nprotected WebDriver createDriver() {\n    String browser = config.getProperty(\"browser\");\n    Capabilities options = switch (browser.toLowerCase(java.util.Locale.ROOT)) {\n        case \"chrome\" -> new ChromeOptions();\n        case \"edge\" -> new EdgeOptions();\n        case \"firefox\" -> new FirefoxOptions();\n        default -> throw new IllegalArgumentException(\"Unsupported browser: \" + browser);\n    };\n    try {\n        return new RemoteWebDriver(URI.create(config.getProperty(\"grid.url\")).toURL(), options);\n    } catch (java.net.MalformedURLException error) {\n        throw new IllegalArgumentException(\"Invalid grid.url\", error);\n    }\n}",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "heading": "PART 6 — Run Your Test"
        },
        {
          "text": "Start:"
        },
        {
          "text": "Hub"
        },
        {
          "text": "Node"
        },
        {
          "text": "Right click testng.xml → Run"
        },
        {
          "text": "VERIFY EXECUTION"
        },
        {
          "text": "Browser opens from node"
        },
        {
          "text": "Test runs"
        },
        {
          "text": "Hub UI shows session"
        },
        {
          "heading": "PART 7 — Parallel Execution with Grid"
        },
        {
          "text": "Update testng.xml:"
        },
        {
          "language": "xml",
          "code": "<suite name=\"Grid Suite\" parallel=\"classes\" thread-count=\"2\">",
          "title": "testng.xml · XML example"
        },
        {
          "text": "Run again"
        },
        {
          "heading": "EXPECTED RESULT"
        },
        {
          "text": "Multiple sessions running"
        },
        {
          "text": "Different browsers possible"
        },
        {
          "text": "Faster execution"
        },
        {
          "heading": "PART 8 — Multi-Browser Setup"
        },
        {
          "text": "Start multiple nodes:"
        },
        {
          "text": "Example:"
        },
        {
          "text": "Chrome node:"
        },
        {
          "language": "bash",
          "code": "java -jar selenium-server-4.39.0.jar node --selenium-manager true",
          "title": "Example command"
        },
        {
          "text": "Edge node:"
        },
        {
          "language": "bash",
          "code": "java -jar selenium-server-4.39.0.jar node --selenium-manager true",
          "title": "Example command"
        },
        {
          "text": "UPDATE BaseTest for dynamic browser"
        },
        {
          "heading": "PART 9 — Full Flow with Selenium Grid"
        },
        {
          "text": "TestNG"
        },
        {
          "text": "RemoteWebDriver"
        },
        {
          "text": "Selenium Grid Hub"
        },
        {
          "text": "Node (browser)"
        },
        {
          "text": "Test execution"
        },
        {
          "heading": "PART 10 — Where It Fits in Your Framework"
        },
        {
          "text": "Before:"
        },
        {
          "text": "Test → Local ChromeDriver"
        },
        {
          "text": "Now:"
        },
        {
          "text": "Test → RemoteWebDriver → Grid → Node"
        },
        {
          "heading": "PART 11 — Benefits"
        },
        {
          "text": "Run tests on multiple browsers"
        },
        {
          "text": "Run tests on multiple machines"
        },
        {
          "text": "Central control"
        },
        {
          "heading": "PART 12 — Limitations"
        },
        {
          "text": "Manual setup"
        },
        {
          "text": "Requires machines"
        },
        {
          "text": "Harder to scale compared to cloud"
        },
        {
          "heading": "EXPECTED OUTCOME"
        },
        {
          "text": "You now have:"
        },
        {
          "text": "Distributed test execution"
        },
        {
          "text": "Multi-browser support"
        },
        {
          "text": "Parallel execution"
        },
        {
          "text": "Grid-based architecture"
        },
        {
          "heading": "INTERVIEW EXPLANATION"
        },
        {
          "text": "I used Selenium Grid to enable distributed test execution across multiple browsers and machines. Tests connect to the Grid Hub using RemoteWebDriver, which routes them to appropriate nodes for execution. This improves scalability, supports cross-browser testing, and reduces execution time."
        },
        {
          "text": "SIMPLE UNDERSTANDING"
        },
        {
          "text": "Jenkins Agents = run tests on machines"
        },
        {
          "text": "Selenium Grid = run tests on browsers across machines"
        }
      ]
    },
    {
      "id": "centralized-locators",
      "title": "Centralize locators in page objects",
      "module": "Page Factory and Framework Refinement",
      "source": "STEP 28 — Centralize Locators (Single Source of Truth)",
      "level": "Advanced",
      "duration": "3 min read",
      "learningObjective": "Keep all locators in one place (page classes) so tests don’t break everywhere when UI changes.",
      "hideReview": true,
      "legacyIds": [],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Run browsers remotely with Selenium Grid.”"
        },
        {
          "heading": "PART 1 — Current Problem (What we are fixing)"
        },
        {
          "text": "Right now in tests you might have:"
        },
        {
          "language": "java",
          "code": "driver.findElement(By.id(\"twotabsearchtextbox\")).sendKeys(\"laptop\");\ndriver.findElement(By.id(\"nav-search-submit-button\")).click();",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "text": "Problem:"
        },
        {
          "text": "Locators scattered ❌"
        },
        {
          "text": "Hard to maintain ❌"
        },
        {
          "heading": "PART 2 — Create Page Class"
        },
        {
          "text": "In IntelliJ:"
        },
        {
          "text": "Go to:"
        },
        {
          "text": "src/test/java → com.automation.framework.pages"
        },
        {
          "text": "Right click → New → Java Class"
        },
        {
          "text": "Name:"
        },
        {
          "text": "AmazonHomePage"
        },
        {
          "heading": "PART 3 — Move Locators to Page Class"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.pages;\n\nimport org.openqa.selenium.By;\nimport org.openqa.selenium.WebDriver;\nimport org.openqa.selenium.support.ui.ExpectedConditions;\nimport org.openqa.selenium.support.ui.WebDriverWait;\nimport java.time.Duration;\n\npublic class AmazonHomePage {\n\n    WebDriver driver;\n\n    public AmazonHomePage(WebDriver driver) {\n        this.driver = driver;\n    }\n\n    // 🔹 Centralized locators\n    private By searchBox = By.id(\"twotabsearchtextbox\");\n    private By searchButton = By.id(\"nav-search-submit-button\");\n\n    // 🔹 Actions\n    public void enterSearchText(String text) {\n        new WebDriverWait(driver, Duration.ofSeconds(10))\n                .until(ExpectedConditions.visibilityOfElementLocated(searchBox)).sendKeys(text);\n    }\n\n    public void clickSearch() {\n        new WebDriverWait(driver, Duration.ofSeconds(10))\n                .until(ExpectedConditions.elementToBeClickable(searchButton)).click();\n    }\n\n    public String getPageTitle() {\n        return driver.getTitle();\n    }\n}",
          "title": "src/test/java/com/automation/framework/pages/AmazonHomePage.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "heading": "PART 4 — Use Page Class in Test"
        },
        {
          "text": "Before:"
        },
        {
          "language": "java",
          "code": "driver.findElement(By.id(\"twotabsearchtextbox\")).sendKeys(\"laptop\");",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "text": "After:"
        },
        {
          "language": "java",
          "code": "AmazonHomePage home = new AmazonHomePage(getDriver());\nhome.enterSearchText(\"laptop\");\nhome.clickSearch();",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "heading": "EXPECTED RESULT"
        },
        {
          "text": "Clean test code\n✔ Locators in one place\n✔ Easy maintenance"
        },
        {
          "text": "This variation demonstrates locator organization. Keep your existing explicit waits in the page methods when applying this change to the running suite."
        }
      ]
    },
    {
      "id": "page-factory",
      "title": "Refine page objects with Page Factory",
      "module": "Page Factory and Framework Refinement",
      "source": "STEP 29 — Implement Page Factory (Cleaner + Professional)",
      "level": "Advanced",
      "duration": "3 min read",
      "learningObjective": "Replace By locators with @FindBy + PageFactory",
      "hideReview": true,
      "legacyIds": [
        "step-29"
      ],
      "blocks": [
        {
          "heading": "Prerequisite"
        },
        {
          "text": "Complete the preceding lesson, “Centralize locators in page objects.”"
        },
        {
          "heading": "PART 1 — Why Page Factory"
        },
        {
          "text": "Instead of:"
        },
        {
          "language": "java",
          "code": "By searchBox = By.id(\"123.\");",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "text": "We use:"
        },
        {
          "language": "java",
          "code": "@FindBy(id=\"123\")\nWebElement searchBox;",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "text": "Benefits:"
        },
        {
          "text": "Cleaner code"
        },
        {
          "text": "Lazy loading"
        },
        {
          "text": "Less repetition"
        },
        {
          "heading": "PART 2 — Update Page Class"
        },
        {
          "text": "Open:"
        },
        {
          "text": "AmazonHomePage.java"
        },
        {
          "text": "Replace full code"
        },
        {
          "language": "java",
          "code": "package com.automation.framework.pages;\n\nimport org.openqa.selenium.WebDriver;\nimport org.openqa.selenium.support.ui.ExpectedConditions;\nimport org.openqa.selenium.support.ui.WebDriverWait;\nimport java.time.Duration;\nimport org.openqa.selenium.WebElement;\nimport org.openqa.selenium.support.FindBy;\nimport org.openqa.selenium.support.PageFactory;\n\npublic class AmazonHomePage {\n\n    WebDriver driver;\n\n    public AmazonHomePage(WebDriver driver) {\n        this.driver = driver;\n        PageFactory.initElements(driver, this); // 🔴 important\n    }\n\n    // 🔹 Page Factory locators\n    @FindBy(id = \"twotabsearchtextbox\")\n    private WebElement searchBox;\n\n    @FindBy(id = \"nav-search-submit-button\")\n    private WebElement searchButton;\n\n    // 🔹 Actions\n    public void enterSearchText(String text) {\n        new WebDriverWait(driver, Duration.ofSeconds(10))\n                .until(ExpectedConditions.visibilityOf(searchBox)).sendKeys(text);\n    }\n\n    public void clickSearch() {\n        new WebDriverWait(driver, Duration.ofSeconds(10))\n                .until(ExpectedConditions.elementToBeClickable(searchButton)).click();\n    }\n\n    public String getPageTitle() {\n        return driver.getTitle();\n    }\n}",
          "title": "src/test/java/com/automation/framework/pages/AmazonHomePage.java",
          "explanation": "Complete class for this stage. Create or replace the file at this path."
        },
        {
          "heading": "PART 3 — No Change in Test"
        },
        {
          "text": "Test remains same:"
        },
        {
          "language": "java",
          "code": "AmazonHomePage home = new AmazonHomePage(getDriver());\nhome.enterSearchText(\"laptop\");\nhome.clickSearch();",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "heading": "EXPECTED RESULT"
        },
        {
          "text": "Cleaner page class\n✔ No direct driver.findElement\n✔ Professional POM structure"
        },
        {
          "text": "Important Rule"
        },
        {
          "text": "Always include:"
        },
        {
          "language": "java",
          "code": "PageFactory.initElements(driver, this);",
          "title": "Java snippet",
          "explanation": "Partial example. Apply it in the class or method named in the surrounding instructions."
        },
        {
          "text": "Otherwise:\n❌ Elements will be NULL"
        },
        {
          "text": "FINAL UNDERSTANDING"
        },
        {
          "text": "Before:"
        },
        {
          "text": "Test → driver.findElement → messy"
        },
        {
          "text": "After:"
        },
        {
          "text": "Test → Page → Element → Action → clean"
        },
        {
          "heading": "INTERVIEW LINE"
        },
        {
          "text": "I centralized locators inside Page Object classes and implemented Page Factory using @FindBy annotations, which improved readability, reduced duplication, and made the framework easier to maintain."
        },
        {
          "text": "This variation demonstrates locator organization. Keep your existing explicit waits in the page methods when applying this change to the running suite."
        }
      ]
    }
  ]
};
