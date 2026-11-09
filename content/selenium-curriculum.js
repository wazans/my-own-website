window.TestNovaDocumentCourse = {
  "id": "selenium",
  "title": "Selenium Automation with Java",
  "storageKey": "testnova-selenium",
  "hashNavigation": true,
  "showSavedEdits": true,
  "topics": [
    {
      "id": "architecture",
      "title": "WebDriver architecture and Selenium Manager",
      "module": "Selenium Introduction and Setup",
      "level": "Beginner",
      "learningObjective": "Follow a command from the Java test through WebDriver to the browser.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "WebDriver is the Java interface for browser commands. ChromeDriver implements it for Chrome. The Java binding sends W3C WebDriver commands to the driver, which controls the browser. Selenium Manager resolves a suitable driver when the binding needs one and no driver was configured. Network restrictions can require preinstalled browser and driver binaries."
        },
        {
          "table": [
            [
              "Layer",
              "Role"
            ],
            [
              "Java binding",
              "Creates and sends WebDriver commands"
            ],
            [
              "Browser driver",
              "Processes session commands for the browser"
            ],
            [
              "Browser",
              "Renders the page and performs the interaction"
            ]
          ]
        },
        {
          "image": "content/selenium-illustrations/webdriver-command-flow.svg",
          "alt": "Java binding sends W3C WebDriver commands to a browser driver, which controls the browser."
        }
      ],
      "hideReview": true
    },
    {
      "id": "maven-setup-and-first-browser-launch",
      "title": "Maven setup and first browser launch",
      "module": "Selenium Introduction and Setup",
      "level": "Beginner",
      "learningObjective": "Create a Maven project, launch Chrome, navigate and end the session.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Use JDK 17, Maven and Chrome. Put pom.xml at the project root and FirstBrowser.java under src/main/java. After mvn compile, use your IDE’s Maven-aware Run command on FirstBrowser. close closes the current window. quit ends the entire session and belongs in finally after a successful session creation."
        },
        {
          "title": "pom.xml",
          "code": "<project xmlns=\"http://maven.apache.org/POM/4.0.0\">\n  <modelVersion>4.0.0</modelVersion>\n  <groupId>training.testnova</groupId>\n  <artifactId>selenium-practice</artifactId>\n  <version>1.0.0</version>\n  <properties>\n    <maven.compiler.release>17</maven.compiler.release>\n    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>\n  </properties>\n  <dependencies>\n    <dependency>\n      <groupId>org.seleniumhq.selenium</groupId>\n      <artifactId>selenium-java</artifactId>\n      <version>4.44.0</version>\n    </dependency>\n    <dependency>\n      <groupId>org.testng</groupId>\n      <artifactId>testng</artifactId>\n      <version>7.12.0</version>\n      <scope>test</scope>\n    </dependency>\n  </dependencies>\n  <build>\n    <plugins>\n      <plugin>\n        <groupId>org.apache.maven.plugins</groupId>\n        <artifactId>maven-compiler-plugin</artifactId>\n        <version>3.13.0</version>\n      </plugin>\n      <plugin>\n        <groupId>org.apache.maven.plugins</groupId>\n        <artifactId>maven-surefire-plugin</artifactId>\n        <version>3.5.2</version>\n      </plugin>\n    </plugins>\n  </build>\n</project>",
          "explanation": "These versions are pinned for a repeatable training setup.",
          "language": "xml"
        },
        {
          "title": "src/main/java/FirstBrowser.java",
          "code": "import org.openqa.selenium.WebDriver;\nimport org.openqa.selenium.chrome.ChromeDriver;\n\npublic class FirstBrowser {\n    public static void main(String[] args) {\n        WebDriver driver = new ChromeDriver();\n        try {\n            driver.get(\"https://example.com/\");\n            System.out.println(driver.getTitle());\n            driver.navigate().to(\"https://example.org/\");\n            driver.navigate().back();\n            driver.navigate().refresh();\n        } finally {\n            driver.quit();\n        }\n    }\n}",
          "explanation": "Assign the Chrome-specific implementation to a WebDriver reference. The title for example.com is Example Domain.",
          "language": "java"
        },
        {
          "heading": "Practice exercise"
        },
        {
          "text": "Navigate forward again before refreshing and print the resulting URL."
        }
      ],
      "hideReview": true
    },
    {
      "id": "locators",
      "title": "DOM and locator strategies",
      "module": "Locators and XPath",
      "level": "Beginner",
      "learningObjective": "Choose an appropriate locator for a known HTML element.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "The DOM is the browser’s tree of nodes and attributes. Inspect the rendered element and prefer a stable ID or an application-owned data attribute. A className locator takes one class token. Link text locators apply to links. CSS and XPath can scope a search to a component."
        },
        {
          "title": "Eight locator strategies (Java fragment)",
          "code": "By.id(\"email\");\nBy.name(\"email\");\nBy.className(\"checkout-button\");\nBy.tagName(\"button\");\nBy.linkText(\"Checkout\");\nBy.partialLinkText(\"Check\");\nBy.cssSelector(\"form[data-testid='checkout'] button[type='submit']\");\nBy.xpath(\"//button[normalize-space(.)='Checkout']\");",
          "explanation": "Import org.openqa.selenium.By. Each line creates a locator for example markup.",
          "language": "java"
        }
      ],
      "hideReview": true
    },
    {
      "id": "xpath-axes-and-devtools-validation",
      "title": "XPath axes and DevTools validation",
      "module": "Locators and XPath",
      "level": "Beginner",
      "learningObjective": "Navigate between related DOM nodes and verify how many matches an XPath returns.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "An absolute path depends on the tree from the document root. Anchor relative paths to stable attributes, labels or scoped components. XPath positions start at 1. following-sibling and preceding-sibling stay under the same parent. parent:: moves up and child:: moves down. // searches descendants and can match more broadly than intended."
        },
        {
          "title": "DevTools Console expressions",
          "code": "$x(\"//label[normalize-space(.)='Email']/following-sibling::input[1]\")\n$x(\"//input[@name='email']/preceding-sibling::label[1]\")\n$x(\"//input[@name='email']/parent::div/child::label\")\n$x(\"//button[starts-with(@id,'checkout-')]\")",
          "explanation": "Inspect each returned element and aim for one match for a single-element action.",
          "language": "javascript"
        },
        {
          "title": "Find the age cell beside Ann",
          "language": "java",
          "code": "By age = By.xpath(\"//td[normalize-space(.)='Ann']/following-sibling::td[@data-column='age']\");\nString value = driver.findElement(age).getText();",
          "explanation": "The source follows the name cell to a sibling. Scope the XPath to the intended table when more than one table can contain Ann. Import org.openqa.selenium.By and run inside a WebDriver session."
        },
        {
          "heading": "Practice exercise"
        },
        {
          "text": "Replace an absolute XPath with a locator anchored to the form and compare matches."
        }
      ],
      "hideReview": true
    },
    {
      "id": "webelement-methods-and-forms",
      "title": "WebElement methods and forms",
      "module": "Web Elements and User Interactions",
      "level": "Beginner",
      "learningObjective": "Find one or many elements, enter text and verify control state.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "findElement returns the first match or throws NoSuchElementException. findElements returns an empty list when there are no matches. clear and sendKeys update text fields. getText reads visible text. getDomAttribute reads the declared attribute, while getDomProperty reads a live property such as input value. getAttribute blends property and attribute lookup. Check displayed, enabled and selected state where relevant."
        },
        {
          "title": "Fill and inspect a form (Java fragment)",
          "code": "WebElement email = driver.findElement(By.id(\"email\"));\nemail.clear();\nemail.sendKeys(\"student@example.com\");\nSystem.out.println(email.getDomProperty(\"value\"));\nWebElement optIn = driver.findElement(By.id(\"subscribe\"));\nif (!optIn.isSelected()) optIn.click();\nWebElement radio = driver.findElement(By.id(\"delivery-standard\"));\nif (!radio.isSelected()) radio.click();\nWebElement submit = driver.findElement(By.cssSelector(\"button[type='submit']\"));\nif (submit.isDisplayed() && submit.isEnabled()) submit.click();\nfor (WebElement message : driver.findElements(By.cssSelector(\".message\"))) {\n    System.out.println(message.getText());\n}",
          "explanation": "Use By and WebElement from org.openqa.selenium. Locator names assume the sample form’s markup.",
          "language": "java"
        }
      ],
      "hideReview": true
    },
    {
      "id": "dropdowns",
      "title": "Standard dynamic and autosuggest dropdowns",
      "module": "Web Elements and User Interactions",
      "level": "Beginner",
      "learningObjective": "Select an option using the control’s markup and wait for suggestions.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Select works with native select elements. For a custom listbox, click its trigger and locate the option by stable value or text. Autosuggest options arrive after typing. Wait for the desired suggestion instead of choosing a fixed list index."
        },
        {
          "title": "Native select and custom suggestion (Java fragment)",
          "code": "new Select(driver.findElement(By.id(\"country\"))).selectByVisibleText(\"India\");\ndriver.findElement(By.id(\"city\")).sendKeys(\"Ben\");\nBy suggestion = By.xpath(\"//*[@role='option' and normalize-space(.)='Bengaluru']\");\nnew WebDriverWait(driver, Duration.ofSeconds(5))\n    .until(ExpectedConditions.elementToBeClickable(suggestion))\n    .click();",
          "explanation": "Import java.time.Duration and Select, WebDriverWait, ExpectedConditions from org.openqa.selenium.support.ui. The country and city controls illustrate separate widgets.",
          "language": "java"
        },
        {
          "heading": "Source exercise: choose Bengaluru and Chennai"
        },
        {
          "title": "Scope the destination locator (Java fragment)",
          "language": "java",
          "code": "driver.get(\"https://rahulshettyacademy.com/dropdownsPractise/\");\ndriver.findElement(By.id(\"ctl00_mainContent_ddl_originStation1_CTXT\")).click();\nwait.until(ExpectedConditions.elementToBeClickable(By.cssSelector(\"a[value='BLR']\"))).click();\n\nBy destination = By.cssSelector(\"#ctl00_mainContent_ddl_destinationStation1_CTNR a[value='MAA']\");\nwait.until(ExpectedConditions.elementToBeClickable(destination)).click();\nSystem.out.println(driver.findElement(By.id(\"ctl00_mainContent_ddl_destinationStation1_CTXT\"))\n    .getDomProperty(\"value\"));",
          "explanation": "The source’s indexed XPath chooses the second Chennai link. Scoping to the destination container expresses the intent directly. Use the existing driver, a WebDriverWait named wait, and import By and ExpectedConditions. The expected destination is Chennai."
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open the source dropdown fixture",
          "url": "https://rahulshettyacademy.com/dropdownsPractise/"
        }
      ]
    },
    {
      "id": "increment-counters-and-product-selection",
      "title": "Increment counters and product selection",
      "module": "Web Elements and User Interactions",
      "level": "Beginner",
      "learningObjective": "Scope a click to the right product card and verify a quantity change.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "The source exercise selects a specific product before adding it to the cart. Scope by a stable product ID rather than a global index. After clicking the increment button, wait for the new quantity to appear and assert the exact value."
        },
        {
          "title": "Product-card interaction (Java fragment)",
          "code": "By card = By.cssSelector(\"[data-product-id='sku-42']\");\nWebElement product = driver.findElement(card);\nproduct.findElement(By.cssSelector(\"[data-testid='increment']\")).click();\nBy quantity = By.cssSelector(\"[data-product-id='sku-42'] [data-testid='quantity']\");\nwait.until(d -> \"2\".equals(d.findElement(quantity).getText()));\ndriver.findElement(card).findElement(By.cssSelector(\"[data-testid='add-to-cart']\")).click();",
          "explanation": "The example assumes quantity starts at 1. wait is a WebDriverWait. Re-find the card in case the page re-rendered it.",
          "language": "java"
        }
      ],
      "hideReview": true
    },
    {
      "id": "sync",
      "title": "Implicit explicit and reusable waits",
      "module": "Synchronization and Waits",
      "level": "Intermediate",
      "learningObjective": "Wait for the state that makes the next interaction meaningful.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Implicit wait applies to element searches throughout a session. Explicit wait polls a condition for a bounded time. Keep implicit wait at its default zero when using explicit waits so nested lookups do not extend timing unpredictably. Presence permits hidden elements. Visibility requires a rendered element. Selenium’s clickability check requires visible and enabled, so a blocking overlay may still need a separate wait."
        },
        {
          "title": "Reusable explicit wait methods (Java fragment)",
          "code": "static WebElement visible(WebDriver driver, By locator) {\n    return new WebDriverWait(driver, Duration.ofSeconds(5))\n        .until(ExpectedConditions.visibilityOfElementLocated(locator));\n}\n\nstatic void clickWhenReady(WebDriver driver, By locator) {\n    new WebDriverWait(driver, Duration.ofSeconds(5))\n        .until(ExpectedConditions.elementToBeClickable(locator))\n        .click();\n}",
          "explanation": "Place these methods in a class. Import Duration, By, WebDriver, WebElement, WebDriverWait and ExpectedConditions. Pass a locator so each poll can locate the current node.",
          "language": "java"
        },
        {
          "heading": "Practice exercise"
        },
        {
          "text": "Use a visibility wait for delayed output and an invisibility wait for a loading overlay. Compare with a fixed sleep."
        }
      ],
      "hideReview": true
    },
    {
      "id": "actions",
      "title": "Mouse and keyboard actions",
      "module": "Advanced Browser Handling",
      "level": "Intermediate",
      "learningObjective": "Build and perform an input sequence with Selenium Actions.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Use Actions for composite inputs such as hover followed by click, a drag, or a modifier key sequence. perform sends the actions. Release modifiers in the same sequence so they do not affect later input."
        },
        {
          "title": "Hover and keyboard selection (Java fragment)",
          "code": "new Actions(driver).moveToElement(menu).perform();\nwait.until(ExpectedConditions.elementToBeClickable(By.linkText(\"Settings\"))).click();\nnew Actions(driver).click(field)\n    .keyDown(Keys.SHIFT).sendKeys(Keys.HOME).keyUp(Keys.SHIFT)\n    .perform();",
          "explanation": "Import org.openqa.selenium.interactions.Actions and org.openqa.selenium.Keys. menu and field are WebElements. Locate field after navigation when the action opens a new page.",
          "language": "java"
        }
      ],
      "hideReview": true
    },
    {
      "id": "windows-tabs-and-frames",
      "title": "Windows tabs and frames",
      "module": "Advanced Browser Handling",
      "level": "Intermediate",
      "learningObjective": "Switch browsing context deliberately and restore it after use.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Window handles are opaque identifiers. To identify a tab created by a click, snapshot handles first and wait for a new one. Do not rely on their iteration order. An iframe has a separate document. Switch into it before querying the DOM and return to defaultContent in finally."
        },
        {
          "title": "New tab and return (Java fragment)",
          "code": "String original = driver.getWindowHandle();\ndriver.switchTo().newWindow(WindowType.TAB);\ntry {\n    driver.get(\"https://example.com/\");\n    System.out.println(driver.getTitle());\n} finally {\n    driver.close();\n    driver.switchTo().window(original);\n}",
          "explanation": "Import org.openqa.selenium.WindowType. newWindow creates and selects the tab.",
          "language": "java"
        },
        {
          "title": "Frame context (Java fragment)",
          "code": "wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(By.id(\"payment-frame\")));\ntry {\n    driver.findElement(By.id(\"confirm\")).click();\n} finally {\n    driver.switchTo().defaultContent();\n}",
          "explanation": "Use a locator for the iframe. The confirm button is located within that document.",
          "language": "java"
        }
      ],
      "hideReview": true
    },
    {
      "id": "calendar",
      "title": "Calendar and date selection",
      "module": "Advanced Browser Handling",
      "level": "Intermediate",
      "learningObjective": "Select a date using its full value and limit calendar navigation.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "For a custom date picker, navigate to the target month and wait for the calendar heading to change. Match a complete date attribute or accessible label. Day number alone can match adjacent months. Use a bounded number of month changes and fail with the requested date if it remains unavailable."
        },
        {
          "title": "Choose a date in the visible month (Java fragment)",
          "code": "LocalDate target = LocalDate.of(2027, 1, 15);\nBy day = By.cssSelector(\"button[data-date='\" + target + \"']\");\nwait.until(ExpectedConditions.elementToBeClickable(day)).click();",
          "explanation": "Import java.time.LocalDate. This fragment assumes the target month is already open and the date picker supplies ISO dates.",
          "language": "java"
        }
      ],
      "hideReview": true
    },
    {
      "id": "javascript-executor",
      "title": "JavaScriptExecutor and scrolling",
      "module": "Advanced Browser Handling",
      "level": "Intermediate",
      "learningObjective": "Scroll a page or a container and understand when script execution is appropriate.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Normal Selenium interactions preserve user-facing behavior. JavaScript is appropriate when the scenario specifically needs controlled scrolling or DOM measurements. Pass elements as script arguments. A JavaScript click can bypass checks and conceal a real interaction problem."
        },
        {
          "title": "Scroll element and container (Java fragment)",
          "code": "JavascriptExecutor js = (JavascriptExecutor) driver;\njs.executeScript(\"arguments[0].scrollIntoView({block:'center'});\", target);\njs.executeScript(\"arguments[0].scrollTop = arguments[0].scrollHeight;\", container);",
          "explanation": "Import org.openqa.selenium.JavascriptExecutor. target and container are WebElements from the current browsing context.",
          "language": "java"
        }
      ],
      "hideReview": true
    },
    {
      "id": "screenshots",
      "title": "Screenshots and headless Chrome",
      "module": "Advanced Browser Handling",
      "level": "Intermediate",
      "learningObjective": "Capture a screenshot and configure a predictable headless viewport.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "TakesScreenshot exposes browser screenshots. Save bytes to a named artifact directory. Avoid collecting sensitive page contents. Headless tests still render a viewport, so set its size to make responsive behavior reproducible."
        },
        {
          "title": "Write a PNG (Java fragment)",
          "code": "Path target = Path.of(\"artifacts\", \"checkout.png\");\nFiles.createDirectories(target.getParent());\nFiles.write(target, ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES));",
          "explanation": "Import java.nio.file.Files, java.nio.file.Path, org.openqa.selenium.TakesScreenshot and OutputType. Handle or declare IOException.",
          "language": "java"
        },
        {
          "title": "Create headless Chrome (Java fragment)",
          "code": "ChromeOptions options = new ChromeOptions();\noptions.addArguments(\"--headless\", \"--window-size=1440,900\");\nWebDriver driver = new ChromeDriver(options);",
          "explanation": "Import ChromeDriver and ChromeOptions from org.openqa.selenium.chrome. Clean up this session with quit in finally.",
          "language": "java"
        }
      ],
      "hideReview": true
    },
    {
      "id": "shadow-dom",
      "title": "Native Shadow DOM traversal",
      "module": "Advanced Browser Handling",
      "level": "Intermediate",
      "learningObjective": "Locate a shadow host and search through the returned SearchContext.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "A shadow root separates internal DOM nodes from the document tree. Locate the host, obtain its shadow root with getShadowRoot and query inside using CSS. Repeat for nested roots. Ordinary document-level XPath does not cross this boundary."
        },
        {
          "title": "Find a button inside a shadow root (Java fragment)",
          "code": "WebElement host = driver.findElement(By.cssSelector(\"practice-shadow-box\"));\nSearchContext root = host.getShadowRoot();\nWebElement button = root.findElement(By.cssSelector(\"button\"));\nbutton.click();",
          "explanation": "Import org.openqa.selenium.SearchContext, WebElement and By. The page needs a host with a shadow root and the shown selector.",
          "language": "java"
        },
        {
          "image": "content/selenium-illustrations/shadow-dom-devtools.png",
          "alt": "The Elements panel shows expanded web components and arrows pointing to their open shadow roots."
        }
      ],
      "hideReview": true
    },
    {
      "id": "tables",
      "title": "Web table rows columns and searches",
      "module": "Web Tables and Dynamic Data",
      "level": "Intermediate",
      "learningObjective": "Find a row by cell value and convert browser data into Java values.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Scope searches to the table body, then find td cells within each row. Java lists are zero-indexed. A relative XPath starts with . when searching within a row. Extract strings promptly because a redraw can invalidate a WebElement. Re-query after pagination or sorting."
        },
        {
          "title": "Find an order status (Java fragment)",
          "code": "List<WebElement> rows = driver.findElements(By.cssSelector(\"#orders tbody tr\"));\nMap<String, String> statusByOrder = new LinkedHashMap<>();\nfor (WebElement row : rows) {\n    List<WebElement> cells = row.findElements(By.xpath(\"./td\"));\n    if (cells.size() >= 2) {\n        statusByOrder.put(cells.get(0).getText().strip(), cells.get(1).getText().strip());\n    }\n}\nSystem.out.println(statusByOrder.getOrDefault(\"ORD-42\", \"Missing\"));",
          "explanation": "Import List, Map and LinkedHashMap from java.util. This two-column table uses unique order IDs and a header outside tbody.",
          "language": "java"
        },
        {
          "heading": "Practice exercise"
        },
        {
          "text": "Change the exercise to assert that an order is present and its status is Shipped."
        }
      ],
      "hideReview": true
    },
    {
      "id": "testng-lifecycle-assertions-and-cleanup",
      "title": "TestNG lifecycle assertions and cleanup",
      "module": "TestNG Fundamentals",
      "level": "Intermediate",
      "learningObjective": "Create a grouped browser test with setup and teardown around every method.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "TestNG discovers @Test methods. @BeforeClass and @AfterClass surround a test class. @BeforeMethod and @AfterMethod run around each test method. Use alwaysRun on teardown for cleanup after failures. Assertions compare observed results against expectations. Keep tests independent and use dependsOnMethods only for a genuine prerequisite."
        },
        {
          "title": "src/test/java/BrowserTitleTest.java",
          "code": "import org.openqa.selenium.WebDriver;\nimport org.openqa.selenium.chrome.ChromeDriver;\nimport org.testng.Assert;\nimport org.testng.annotations.AfterMethod;\nimport org.testng.annotations.BeforeMethod;\nimport org.testng.annotations.Test;\n\npublic class BrowserTitleTest {\n    private WebDriver driver;\n\n    @BeforeMethod\n    public void openBrowser() {\n        driver = new ChromeDriver();\n    }\n\n    @Test(groups = {\"sanity\", \"regression\"})\n    public void verifiesTitle() {\n        driver.get(\"https://example.com/\");\n        Assert.assertEquals(driver.getTitle(), \"Example Domain\", \"Unexpected title\");\n    }\n\n    @AfterMethod(alwaysRun = true)\n    public void closeBrowser() {\n        if (driver != null) {\n            try {\n                driver.quit();\n            } finally {\n                driver = null;\n            }\n        }\n    }\n}",
          "explanation": "Use the POM from the setup lesson and run this class without parallel method execution.",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "One passing test when Chrome starts and the page loads."
        }
      ],
      "hideReview": true
    },
    {
      "id": "testng-groups-suites-and-maven-execution",
      "title": "TestNG groups suites and Maven execution",
      "module": "TestNG Fundamentals",
      "level": "Intermediate",
      "learningObjective": "Filter a suite by group and find evidence after a failed run.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Group labels let a smoke suite run a subset of independent methods. Configure Surefire to load a suite or allow it to discover Test classes. mvn test compiles and runs the tests. Inspect target/surefire-reports for assertion and exception details. TestNG can generate a testng-failed.xml suite for reruns. A listener implementing ITestListener can collect failure artifacts when the session is still available."
        },
        {
          "title": "src/test/resources/testng.xml",
          "code": "<!DOCTYPE suite SYSTEM \"https://testng.org/testng-1.0.dtd\">\n<suite name=\"Browser suite\">\n  <test name=\"Sanity tests\">\n    <groups>\n      <run><include name=\"sanity\"/></run>\n    </groups>\n    <classes>\n      <class name=\"BrowserTitleTest\"/>\n    </classes>\n  </test>\n</suite>",
          "explanation": "Use the fully qualified test class name when the class declares a package.",
          "language": "xml"
        },
        {
          "title": "Surefire plugin configuration",
          "code": "<configuration>\n  <suiteXmlFiles>\n    <suiteXmlFile>src/test/resources/testng.xml</suiteXmlFile>\n  </suiteXmlFiles>\n</configuration>",
          "explanation": "Add this inside the existing maven-surefire-plugin element in pom.xml.",
          "language": "xml"
        },
        {
          "title": "Run from the project directory",
          "code": "mvn test",
          "explanation": "Look for the test count and failures in the Maven output.",
          "language": "bash"
        },
        {
          "heading": "Practice exercise"
        },
        {
          "text": "Change the expected title to cause an assertion failure and locate its stack trace."
        }
      ],
      "hideReview": true
    },
    {
      "id": "advanced-strategy",
      "title": "Stable automation and failure diagnosis",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Diagnose locator, timing and context failures using the symptoms.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Choose scenarios with an observable result and reproducible inputs. Keep selectors near the interaction, use stable IDs or test hooks, parameterize test data, and close each session reliably. A stale reference means the underlying node changed or its context is no longer active. Re-locate after the expected redraw. A timeout means the condition did not become true in time. Collect the current URL, screenshot, locator and relevant DOM state."
        },
        {
          "heading": "Interview questions"
        },
        {
          "text": "When should findElements be used to check absence? Why should implicit and explicit waits stay separate? What distinguishes stale references, missing elements and intercepted clicks? How can you identify a newly opened tab without using a fixed handle index?"
        },
        {
          "heading": "Practice exercise"
        },
        {
          "text": "Build a checkout test that adds one named product, verifies its order row, and saves a screenshot when an assertion fails."
        },
        {
          "heading": "Runnable checkout exercise"
        },
        {
          "text": "This test uses a self-contained HTML fixture. The first click schedules a quantity update, the second adds a row to the order table, and the assertion checks the row by order ID. Place the class in src/test/java and run mvn -Dtest=CheckoutTest test using the setup POM. If you configured a suite file, add this class to it or use the default Surefire discovery configuration."
        },
        {
          "title": "src/test/java/CheckoutTest.java",
          "language": "java",
          "code": "import java.nio.charset.StandardCharsets;\nimport java.time.Duration;\nimport java.util.Base64;\nimport org.openqa.selenium.By;\nimport org.openqa.selenium.WebDriver;\nimport org.openqa.selenium.chrome.ChromeDriver;\nimport org.openqa.selenium.support.ui.ExpectedConditions;\nimport org.openqa.selenium.support.ui.WebDriverWait;\nimport org.testng.Assert;\nimport org.testng.annotations.Test;\n\npublic class CheckoutTest {\n    @Test\n    public void addsTheSelectedProduct() {\n        String html = \"\"\"\n            <!doctype html><meta charset=\"utf-8\"><title>Checkout fixture</title>\n            <section data-product-id=\"sku-42\">\n              <h1>Java notebook</h1><output id=\"quantity\">1</output>\n              <button id=\"increment\">Add one</button>\n              <button id=\"add-to-cart\">Add to cart</button>\n            </section>\n            <table id=\"orders\"><tbody></tbody></table>\n            <script>\n              const quantity = document.querySelector('#quantity');\n              document.querySelector('#increment').onclick =\n                () => setTimeout(() => { quantity.textContent = '2'; }, 200);\n              document.querySelector('#add-to-cart').onclick = () => {\n                const row = document.querySelector('#orders tbody').insertRow();\n                row.dataset.orderId = 'ORD-42';\n                row.insertCell().textContent = 'sku-42';\n                row.insertCell().textContent = quantity.textContent;\n              };\n            </script>\n            \"\"\";\n        String encoded = Base64.getEncoder().encodeToString(html.getBytes(StandardCharsets.UTF_8));\n        WebDriver driver = new ChromeDriver();\n        try {\n            driver.get(\"data:text/html;charset=utf-8;base64,\" + encoded);\n            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));\n            driver.findElement(By.cssSelector(\"[data-product-id='sku-42'] #increment\")).click();\n            wait.until(ExpectedConditions.textToBe(By.id(\"quantity\"), \"2\"));\n            driver.findElement(By.id(\"add-to-cart\")).click();\n            By cells = By.cssSelector(\"#orders tr[data-order-id='ORD-42'] td\");\n            var order = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(cells));\n            Assert.assertEquals(order.get(0).getText(), \"sku-42\");\n            Assert.assertEquals(order.get(1).getText(), \"2\");\n        } finally {\n            driver.quit();\n        }\n    }\n}",
          "explanation": "Base64 keeps the data URL valid. Wait for the observable quantity rather than the 200 ms implementation delay. A passing test reports that the row contains sku-42 and quantity 2."
        }
      ],
      "hideReview": true
    },
    {
      "id": "practice-page-setup",
      "title": "Practice page setup",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Run the practice exercises in a fresh WebDriver session.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Open the practice page in Chrome and inspect the scenario before copying its fragment into a test. Each exercise assumes the driver is already on the practice page. Run exercises independently because interactions change the page state. The examples depend on the practice site’s markup."
        },
        {
          "title": "Navigate to the practice site (Java fragment)",
          "code": "driver.get(\"https://www.sreenidhirajakrishnan.com/practice\");",
          "explanation": "Use the driver from the first browser lesson and keep quit in finally.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-1",
      "title": "Basic Form Elements",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice basic form elements on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Fill each field, submit, and assert the resulting confirmation. Use fake data for password and contact fields."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "driver.findElement(By.id(\"text-input\")).sendKeys(\"Wasim\");\ndriver.findElement(By.id(\"password-input\")).sendKeys(\"1234\");\ndriver.findElement(By.id(\"email-input\")).sendKeys(\"student@example.com\");\ndriver.findElement(By.id(\"phone-input\")).sendKeys(\"9999999999\");\ndriver.findElement(By.id(\"textarea-input\")).sendKeys(\"QA Engineer\");\ndriver.findElement(By.id(\"form-submit\")).click();",
          "explanation": "Use synthetic data and assert the form response.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-2",
      "title": "Button Interactions",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice button interactions on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Exercise single, double and context clicks separately. Wait for a visible state change after triggering the delay."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "driver.findElement(By.id(\"single-click-btn\")).click();\nnew Actions(driver).doubleClick(driver.findElement(By.id(\"double-click-btn\"))).perform();\nnew Actions(driver).contextClick(driver.findElement(By.id(\"right-click-btn\"))).perform();\ndriver.findElement(By.id(\"start-delay-btn\")).click();",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-3",
      "title": "Checkboxes & Radio Buttons",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice checkboxes & radio buttons on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Start with a fresh form. Check isSelected on the affected options after each action."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "driver.findElement(By.id(\"select-all\")).click();\ndriver.findElement(By.id(\"radio-1\")).click();",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-4",
      "title": "Dropdowns",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice dropdowns on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Verify the selected options by visible text. Selecting a second option is valid only for the multi-select."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "new Select(driver.findElement(By.id(\"standard-select\"))).selectByVisibleText(\"Red\");\nSelect multi = new Select(driver.findElement(By.id(\"multi-select\")));\nmulti.selectByVisibleText(\"Java\");\nmulti.selectByVisibleText(\"Python\");",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-5",
      "title": "Locator Practice",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice locator practice on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Compare the matches returned by ID, class, name and XPath. Confirm each locator resolves the intended element."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "driver.findElement(By.id(\"locator-by-id\"));\ndriver.findElement(By.className(\"locator-by-class\"));\ndriver.findElement(By.name(\"locator-name\"));\ndriver.findElement(By.xpath(\"//span[text()='ExactTextTarget']\"));",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-6",
      "title": "Dynamic Content",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice dynamic content on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Capture the starting counter and verify it increases by one. Wait for delayed content to appear."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "driver.findElement(By.id(\"change-text-btn\")).click();\ndriver.findElement(By.id(\"increment-btn\")).click();\ndriver.findElement(By.id(\"load-content-btn\")).click();",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-7",
      "title": "Waits & Synchronisation",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice waits & synchronisation on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Wait for the target output to become visible before reading it. Keep the driver’s implicit wait at zero."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));\ndriver.findElement(By.id(\"ajax-btn\")).click();\nwait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(\"//p[normalize-space(.)='Loaded']\")));",
          "explanation": "Trigger the request before waiting. Confirm the XPath matches the output text on the fixture.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-8",
      "title": "Table Automation",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice table automation on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Scope cell queries to each row and assert a meaningful column value. Check the row shape before indexing."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "List<WebElement> rows = driver.findElements(By.xpath(\"//table[@id='practice-table']//tr\"));\nfor (WebElement row : rows) {\n    System.out.println(row.getText());\n}",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-9",
      "title": "Alerts",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice alerts on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Wait for the alert, read its message, then accept it. An alert belongs to the browser rather than the document DOM."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "driver.findElement(By.id(\"alert-btn\")).click();\ndriver.switchTo().alert().accept();\n\ndriver.findElement(By.id(\"confirm-btn\")).click();\ndriver.switchTo().alert().dismiss();",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-10",
      "title": "Modals",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice modals on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "A modal is part of the DOM. Wait for it to appear, act inside its container and wait for it to disappear."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "driver.findElement(By.id(\"open-modal-btn\")).click();",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-11",
      "title": "iFrame",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice iframe on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Switch into the frame before locating a field. Restore default content in finally."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(By.tagName(\"iframe\")));\ntry {\n    driver.findElement(By.tagName(\"input\")).sendKeys(\"Inside Frame\");\n} finally {\n    driver.switchTo().defaultContent();\n}",
          "explanation": "Use WebDriverWait for wait. Scope the frame locator further when the page contains more than one iframe.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-12",
      "title": "Shadow DOM",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice shadow dom on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Find the host and use getShadowRoot to locate the internal control."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "SearchContext root = driver.findElement(By.cssSelector(\"practice-shadow-box\")).getShadowRoot();\nroot.findElement(By.cssSelector(\"button\")).click();",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-13",
      "title": "Drag & Drop",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice drag & drop on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Use a composite pointer action and assert the drop target’s resulting state."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "WebElement source = driver.findElement(By.id(\"drag-source\"));\nWebElement target = driver.findElement(By.id(\"drop-zone\"));\nnew Actions(driver).dragAndDrop(source, target).perform();",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-14",
      "title": "Hover Menu",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice hover menu on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Hover over the trigger before clicking a submenu item. Wait for the item to be interactable."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "new Actions(driver).moveToElement(driver.findElement(By.id(\"hover-menu-trigger\"))).perform();",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-15",
      "title": "Tooltip",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice tooltip on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Hover over the target and wait for the tooltip’s visible text."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "new Actions(driver).moveToElement(driver.findElement(By.id(\"tooltip-trigger\"))).perform();",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-16",
      "title": "File Upload",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice file upload on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Send an absolute path to the file input. Supply a small local test file and check the upload confirmation."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "driver.findElement(By.id(\"file-upload\")).sendKeys(java.nio.file.Path.of(\"sample.txt\").toAbsolutePath().toString());",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-17",
      "title": "Download",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice download on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Click the download control and verify the result with a configured download directory or an HTTP-level check."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "driver.findElement(By.id(\"download-btn\")).click();",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-18",
      "title": "Hidden Elements",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice hidden elements on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Trigger the reveal first. Wait for visibility and avoid bypassing the user action with a JavaScript click."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "By hiddenControl = By.id(\"css-hidden-btn\");\nWebElement control = driver.findElement(hiddenControl);\nSystem.out.println(control.isDisplayed());",
          "explanation": "Expected output is false while the element is hidden. For a control the user can reveal, click the reveal trigger first and then wait for visibility.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-19",
      "title": "Scroll Testing",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice scroll testing on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Use scrolling for a viewport-related scenario and assert the resulting position or visible target."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "WebElement element = driver.findElement(By.id(\"scroll-target\"));\n((JavascriptExecutor) driver).executeScript(\"arguments[0].scrollIntoView();\", element);",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-20",
      "title": "Multiple Windows",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice multiple windows on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Record the original handle, wait for a new handle, switch, and restore the original in finally."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "String original = driver.getWindowHandle();\nSet<String> before = driver.getWindowHandles();\ndriver.findElement(By.id(\"open-window-btn\")).click();\nString opened = wait.until(d -> d.getWindowHandles().stream()\n    .filter(handle -> !before.contains(handle))\n    .findFirst().orElse(null));\ndriver.switchTo().window(opened);\ntry {\n    System.out.println(driver.getTitle());\n} finally {\n    driver.close();\n    driver.switchTo().window(original);\n}",
          "explanation": "Import java.util.Set and initialize wait as a WebDriverWait. This exercise expects one new window.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-21",
      "title": "Authentication Simulation",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice authentication simulation on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Use test credentials and check the simulated authentication result."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "driver.findElement(By.id(\"auth-username\")).sendKeys(\"admin\");\ndriver.findElement(By.id(\"password-input\")).sendKeys(\"admin123\");\ndriver.findElement(By.id(\"auth-login-btn\")).click();",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-22",
      "title": "Stale Element Simulation",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice stale element simulation on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Re-query the replacement node after the redraw. Avoid storing the original WebElement across the update."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "By replacement = By.id(\"stale-target\");\nWebElement original = driver.findElement(replacement);\ndriver.findElement(By.id(\"stale-refresh-btn\")).click();\nwait.until(ExpectedConditions.stalenessOf(original));\nWebElement current = wait.until(ExpectedConditions.visibilityOfElementLocated(replacement));\nSystem.out.println(current.getText());",
          "explanation": "Initialize wait as a WebDriverWait. The old reference becomes stale when the fixture replaces the node.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-23",
      "title": "Dynamic List",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice dynamic list on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Wait until the expected list item appears and scope queries to the list container."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "driver.findElement(By.id(\"list-input\")).sendKeys(\"Item1\");\ndriver.findElement(By.id(\"add-item-btn\")).click();",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-24",
      "title": "Network Delay Simulation",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice network delay simulation on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Use an explicit wait tied to the delayed result. The exercise simulates network latency."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "driver.findElement(By.id(\"delay-btn\")).click();",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-25",
      "title": "Random Fail (Flaky) Elements",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice random fail (flaky) elements on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Record the failure state and distinguish intentionally random behavior from a synchronization issue."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "new WebDriverWait(driver, Duration.ofSeconds(10))\n        .until(ExpectedConditions.elementToBeClickable(By.id(\"flaky-btn\")));\ndriver.findElement(By.id(\"flaky-btn\")).click();",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-26",
      "title": "Keyboard Actions",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice keyboard actions on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Focus the target first and perform the keyboard sequence. Release modifiers and verify the final value."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "WebElement field = driver.findElement(By.id(\"text-input\"));\nnew Actions(driver).click(field)\n    .keyDown(Keys.CONTROL).sendKeys(\"a\").keyUp(Keys.CONTROL)\n    .sendKeys(Keys.DELETE)\n    .perform();\nSystem.out.println(field.getDomProperty(\"value\"));",
          "explanation": "This example uses the practice form input. Use Keys.COMMAND for the equivalent selection shortcut on macOS. The expected value is empty.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-27",
      "title": "Slider",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice slider on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Move the slider and assert its value or accessible state. Relative offsets can vary with viewport size."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "new Actions(driver)\n        .clickAndHold(driver.findElement(By.id(\"slider\")))\n        .moveByOffset(50, 50)\n        .release()\n        .perform();",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-28",
      "title": "Date Picker",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice date picker on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Select the full date and check the input value. Avoid matching a day that belongs to another month."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "driver.findElement(By.id(\"date-picker\")).sendKeys(\"2026-06-24\");",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-29",
      "title": "Resizable Element",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice resizable element on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Drag the resize handle and compare the resulting element dimensions."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "new Actions(driver)\n        .clickAndHold(driver.findElement(By.cssSelector(\".resize-handle\")))\n        .moveByOffset(50, 50)\n        .release()\n        .perform();",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    },
    {
      "id": "sel-sec-30",
      "title": "Complex DOM Structure",
      "module": "Selenium Best Practices and Practical Programs",
      "level": "Intermediate",
      "learningObjective": "Practice complex dom structure on a dedicated browser fixture.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Scope the locator to the intended region. Inspect the DOM and count matches before acting."
        },
        {
          "title": "Practice page interaction (Java fragment)",
          "code": "driver.findElement(By.xpath(\"//div[@id='xpath-grandparent']//span[@id='xpath-leaf']\")).getText();",
          "explanation": "Open the practice page first. Place this fragment inside your test using the existing driver. Import any Selenium types named in the fragment and define fixture-specific inputs before running it.",
          "language": "java"
        }
      ],
      "hideReview": true,
      "resources": [
        {
          "label": "Open Selenium practice site",
          "url": "https://www.sreenidhirajakrishnan.com/practice"
        }
      ]
    }
  ],
  "legacyProgressKey": "seleniumBasicsProgress"
};
