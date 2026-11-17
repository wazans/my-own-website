window.TestNovaDocumentCourse = {
  id: 'testng',
  title: 'TestNG',
  storageKey: 'testnova-selenium',
  hashNavigation: true,
  readOnly: true,
  topics: [
    {
      id: 'testng-first-test',
      title: 'TestNG Basics and Your First Test',
      module: 'TestNG Fundamentals',
      level: 'Beginner',
      learningObjective: 'Set up a Maven project, write a Java test, and read its result.',
      blocks: [
        { text: 'TestNG runs Java test methods, applies setup and cleanup, and reports passes, failures, and skips. Selenium controls a browser. You can use both together, but this first test needs only a JDK and Maven.' },
        { heading: 'Create a Maven project' },
        { text: 'Use JDK 17. Check both java -version and mvn -v so you can see which JDK Maven uses. Create a project folder with this pom.xml at its root.' },
        {
          title: 'pom.xml',
          language: 'xml',
          code: `<project xmlns="http://maven.apache.org/POM/4.0.0">
  <modelVersion>4.0.0</modelVersion>
  <groupId>training.testnova</groupId>
  <artifactId>testng-practice</artifactId>
  <version>1.0.0</version>
  <properties>
    <maven.compiler.release>17</maven.compiler.release>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>
  <dependencies>
    <dependency>
      <groupId>org.testng</groupId>
      <artifactId>testng</artifactId>
      <version>7.12.0</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.13.0</version>
      </plugin>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>3.5.2</version>
      </plugin>
    </plugins>
  </build>
</project>`
        },
        {
          title: 'src/test/java/practice/CalculatorTest.java',
          language: 'java',
          code: `package practice;

import org.testng.Assert;
import org.testng.annotations.Test;

public class CalculatorTest {
    @Test(groups = "smoke")
    public void addsTwoNumbers() {
        Assert.assertEquals(2 + 3, 5, "The sum should be five");
    }

    @Test(groups = "regression")
    public void multipliesTwoNumbers() {
        Assert.assertEquals(3 * 4, 12);
    }
}`
        },
        { title: 'Run from the project directory', language: 'bash', code: 'mvn test' },
        { text: 'Surefire discovers CalculatorTest by its class name. Expect two passing tests. Read assertion failures in the terminal or under target/surefire-reports.' }
      ],
      practice: 'Change the expected sum to 6, run the tests, read both values in the failure message, then restore the correct expectation.',
      resources: [
        { label: 'TestNG documentation', url: 'https://testng.org/documentation.html' },
        { label: 'TestNG with Maven Surefire', url: 'https://maven.apache.org/surefire-archives/surefire-3.5.2/maven-surefire-plugin/examples/testng.html' }
      ]
    },
    {
      id: 'testng-lifecycle-assertions-and-cleanup',
      title: 'Lifecycle Annotations, Assertions and Cleanup',
      module: 'TestNG Fundamentals',
      level: 'Beginner',
      learningObjective: 'Choose a setup and cleanup scope and use hard or soft assertions intentionally.',
      blocks: [
        { table: [
          ['Setup and teardown', 'Scope'],
          ['@BeforeSuite / @AfterSuite', 'Around the entire XML suite'],
          ['@BeforeTest / @AfterTest', 'Around the classes in an XML <test> block'],
          ['@BeforeClass / @AfterClass', 'Around the test methods of a test class'],
          ['@BeforeMethod / @AfterMethod', 'Around each test method invocation']
        ] },
        { text: 'In a simple sequential run, setup goes from suite to method, then the test runs and cleanup goes from method back to suite. Use method-level setup for fresh test data or a browser per test. Set alwaysRun = true on teardown so TestNG attempts cleanup after a failure or skip. Check whether the resource was created before closing it.' },
        { text: 'A hard assertion from Assert stops the current method when it fails. SoftAssert gathers failures in one method and throws at assertAll(). Give each invocation its own SoftAssert.' },
        {
          title: 'src/test/java/practice/LifecycleTest.java',
          language: 'java',
          code: `package practice;

import java.util.ArrayList;
import java.util.List;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

public class LifecycleTest {
    private List<String> cart;

    @BeforeMethod
    public void setUp() {
        cart = new ArrayList<>();
    }

    @Test
    public void addsAnItemToACleanCart() {
        cart.add("notebook");
        SoftAssert checks = new SoftAssert();
        checks.assertEquals(cart.size(), 1, "Cart size");
        checks.assertTrue(cart.contains("notebook"), "Item is present");
        checks.assertAll();
    }

    @AfterMethod(alwaysRun = true)
    public void cleanUp() {
        cart = null;
    }
}`
        }
      ],
      practice: 'Make both soft checks fail and run mvn -Dtest=LifecycleTest test. Verify that the failure lists both messages.'
    },
    {
      id: 'testng-groups-suites-and-maven-execution',
      title: 'Groups, testng.xml and Maven Execution',
      module: 'TestNG Fundamentals',
      level: 'Beginner',
      learningObjective: 'Select tests by group or method and run one or more suite files with Maven.',
      blocks: [
        { text: 'An XML suite contains one or more <test> blocks. Each can select classes or packages. Use fully qualified Java names for class entries. Groups such as smoke and regression can select methods across classes.' },
        {
          title: 'src/test/resources/testng.xml',
          language: 'xml',
          code: `<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Practice suite">
  <test name="Smoke checks">
    <groups>
      <run><include name="smoke"/></run>
    </groups>
    <classes>
      <class name="practice.CalculatorTest"/>
    </classes>
  </test>
</suite>`
        },
        {
          title: 'Add inside the existing Surefire plugin in pom.xml',
          language: 'xml',
          code: `<configuration>
  <suiteXmlFiles>
    <suiteXmlFile>src/test/resources/testng.xml</suiteXmlFile>
  </suiteXmlFiles>
</configuration>`
        },
        { text: 'Run mvn test. Expect only addsTwoNumbers from the first lesson. To select by method, remove the groups filter and place the following methods element inside the class entry. Add one suiteXmlFile entry per independent suite, or use a parent suite with <suite-files> to reference child files.' },
        {
          title: 'Filter by method name',
          language: 'xml',
          code: `<methods>
  <include name="addsTwoNumbers"/>
  <exclude name="multipliesTwoNumbers"/>
</methods>`
        }
      ],
      practice: 'Change the group include to regression and check that only multipliesTwoNumbers runs. Remove the added Surefire configuration before running later standalone examples, or add their classes to a suite.'
    },
    {
      id: 'testng-parameters-data-providers-and-factories',
      title: 'Parameters, Data Providers and Factories',
      module: 'Data and Execution',
      level: 'Intermediate',
      learningObjective: 'Choose between XML configuration, data rows, and separately initialized test instances.',
      blocks: [
        { table: [
          ['Feature', 'Use it when'],
          ['@Parameters', 'A suite supplies a setting such as the environment or browser'],
          ['@DataProvider', 'One test method should run once for each input row'],
          ['@Factory', 'Several methods need to run on separately configured instances of the same class']
        ] },
        { text: 'For an XML parameter, put <parameter name="browser" value="chrome"/> in a <suite> or <test> element and read it with @Parameters("browser") on a configuration or test method with a String parameter. Use @Optional("chrome") on that argument when a default makes sense.' },
        {
          title: 'src/test/java/practice/AdditionDataTest.java',
          language: 'java',
          code: `package practice;

import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class AdditionDataTest {
    @DataProvider
    public Object[][] additions() {
        return new Object[][] {{2, 3, 5}, {-2, 2, 0}};
    }

    @Test(dataProvider = "additions")
    public void addsNumbers(int left, int right, int expected) {
        Assert.assertEquals(left + right, expected);
    }
}`
        },
        {
          title: 'src/test/java/practice/ShippingFactoryTest.java',
          language: 'java',
          code: `package practice;

import org.testng.Assert;
import org.testng.annotations.Factory;
import org.testng.annotations.Test;

public class ShippingFactoryTest {
    @Factory
    public Object[] shippingCases() {
        return new Object[] {
            new ShippingChecks(30, 5),
            new ShippingChecks(60, 0)
        };
    }

    public static class ShippingChecks {
        private final int subtotal;
        private final int expectedFee;

        public ShippingChecks(int subtotal, int expectedFee) {
            this.subtotal = subtotal;
            this.expectedFee = expectedFee;
        }

        @Test
        public void calculatesShippingFee() {
            int fee = subtotal >= 50 ? 0 : 5;
            Assert.assertEquals(fee, expectedFee);
        }
    }
}`
        }
      ],
      practice: 'Add an input row to AdditionDataTest, then run mvn "-Dtest=AdditionDataTest,ShippingFactoryTest" test and compare the invocation counts.'
    },
    {
      id: 'testng-priority-dependencies-and-repetition',
      title: 'Priority, Dependencies and Repeated Runs',
      module: 'Data and Execution',
      level: 'Intermediate',
      learningObjective: 'Tell scheduling order, required prerequisites, and planned repetition apart.',
      blocks: [
        { text: 'In a sequential run, lower priority values are scheduled first. Priority alone does not make one test depend on another. A hard dependency declared with dependsOnMethods skips the dependent method when the prerequisite fails.' },
        { text: 'invocationCount schedules the same test method multiple times. Use 10 or 100 to repeat the same check. For a different input on each invocation, supply rows with @DataProvider.' },
        {
          title: 'src/test/java/practice/ExecutionTest.java',
          language: 'java',
          code: `package practice;

import org.testng.Assert;
import org.testng.annotations.Test;

public class ExecutionTest {
    @Test(priority = 1)
    public void fixtureAvailable() {
        Assert.assertFalse("demo".isBlank());
    }

    @Test(dependsOnMethods = "fixtureAvailable")
    public void readsFixture() {
        Assert.assertEquals("demo".length(), 4);
    }

    @Test(priority = 2, invocationCount = 10)
    public void repeatsTheSameCheck() {
        Assert.assertEquals(Math.abs(-4), 4);
    }
}`
        }
      ],
      practice: 'Run mvn -Dtest=ExecutionTest test. Then make fixtureAvailable fail and verify that readsFixture is skipped while the independent repetitions still run.'
    },
    {
      id: 'testng-parallel-execution',
      title: 'Parallel Suites and Test Isolation',
      module: 'Data and Execution',
      level: 'Intermediate',
      learningObjective: 'Choose a parallel mode and keep browser sessions and test data isolated.',
      blocks: [
        { table: [
          ['Suite parallel mode', 'Unit of scheduling'],
          ['methods', 'Individual test methods'],
          ['classes', 'Test classes'],
          ['tests', 'XML <test> blocks'],
          ['instances', 'Individual test-class instances']
        ] },
        { text: 'Start with independent methods and a small thread-count. With parallel methods, two methods on the same test instance can execute at once. Use local variables and unique test data. When testing a browser, give each invocation its own WebDriver and quit it in that invocation. A single shared driver field can lead to one test closing another test’s browser.' },
        {
          title: 'src/test/resources/parallel.xml',
          language: 'xml',
          code: `<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Parallel practice" parallel="methods" thread-count="2">
  <test name="Independent calculations">
    <classes>
      <class name="practice.CalculatorTest"/>
    </classes>
  </test>
</suite>`
        },
        { text: 'Point Surefire’s suiteXmlFile to src/test/resources/parallel.xml, then run mvn test. Both calculator methods should pass. Print Thread.currentThread().getName() inside each method to see how TestNG assigned workers.' }
      ],
      practice: 'Compare workers with parallel="methods" and parallel="classes" using the same class. Remove the suite filter before running a standalone example from another lesson.'
    },
    {
      id: 'testng-listeners-reports-and-screenshots',
      title: 'Listeners, Reports and Failure Screenshots',
      module: 'Failure Diagnostics',
      level: 'Intermediate',
      learningObjective: 'Capture evidence at the right point in a failed test run.',
      blocks: [
        { table: [
          ['TestNG interface', 'When to use it'],
          ['ITestListener', 'Collect evidence when a test starts, passes, fails, or skips'],
          ['ISuiteListener', 'Run work at the start or end of a suite'],
          ['IInvokedMethodListener', 'Observe individual test or configuration method invocations'],
          ['IReporter', 'Generate a summary after all suites finish'],
          ['IAnnotationTransformer', 'Modify annotation settings before execution']
        ] },
        { text: 'Read Maven results in target/surefire-reports. TestNG can generate its own HTML report when its default reporters are enabled. ExtentReports is a separate reporting library that can attach screenshots and logs. Capture a screenshot in onTestFailure while the driver session is still open, then release that session in teardown.' },
        { text: 'Register a test listener with @Listeners or with a listeners element in the suite XML. Register an IAnnotationTransformer through the suite or TestNG runner because it needs to load before TestNG reads annotations.' },
        { text: 'For the browser example, add org.seleniumhq.selenium:selenium-java version 4.44.0 with test scope to the practice POM and have Chrome available. Run this class without parallel method execution.' },
        {
          title: 'src/test/java/practice/ScreenshotTest.java',
          language: 'java',
          code: `package practice;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.ITestListener;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

@Listeners(ScreenshotTest.FailureScreenshot.class)
public class ScreenshotTest {
    private ChromeDriver driver;

    @BeforeMethod
    public void openBrowser() {
        driver = new ChromeDriver();
    }

    @Test
    public void checksThePageTitle() {
        driver.get("data:text/html,<title>TestNG%20practice</title>");
        Assert.assertEquals(driver.getTitle(), "TestNG practice");
    }

    @AfterMethod(alwaysRun = true)
    public void closeBrowser() {
        if (driver != null) {
            try {
                driver.quit();
            } finally {
                driver = null;
            }
        }
    }

    public static class FailureScreenshot implements ITestListener {
        @Override
        public void onTestFailure(ITestResult result) {
            if (!(result.getInstance() instanceof ScreenshotTest test) || test.driver == null) {
                return;
            }
            try {
                byte[] screenshot = test.driver.getScreenshotAs(OutputType.BYTES);
                Path folder = Files.createDirectories(Path.of("target", "screenshots"));
                Path file = Files.createTempFile(folder, result.getName() + "-", ".png");
                Files.write(file, screenshot);
                System.out.println("Failure screenshot: " + file);
            } catch (IOException | WebDriverException error) {
                System.err.println("Screenshot unavailable: " + error.getMessage());
            }
        }
    }
}`
        }
      ],
      practice: 'Change the expected title so it fails and run mvn -Dtest=ScreenshotTest test. Check the screenshot in target/screenshots and the original assertion failure in the test report.'
    },
    {
      id: 'testng-failed-runs-and-retry-analyzer',
      title: 'Rerun Failed Tests and Use a Retry Analyzer',
      module: 'Failure Diagnostics',
      level: 'Intermediate',
      learningObjective: 'Distinguish a failed-suite rerun from a bounded retry during the current run.',
      blocks: [
        { text: 'After a failing suite run, find testng-failed.xml in the TestNG output directory when its failed-suite reporter is enabled. The XML selects failed methods and may include required dependencies. Rerun that file as a suite with the same classpath and environment.' },
        { text: 'An IRetryAnalyzer decides whether TestNG should retry immediately after an unsuccessful attempt. One retry gives at most two attempts. Limit retries to transient failures you can investigate, and record both attempts. Repeated assertion failures need diagnosis.' },
        {
          title: 'src/test/java/practice/RetryTest.java',
          language: 'java',
          code: `package practice;

import org.testng.Assert;
import org.testng.IRetryAnalyzer;
import org.testng.ITestResult;
import org.testng.annotations.Test;

public class RetryTest {
    private int attempts;

    public static class RetryOnce implements IRetryAnalyzer {
        private boolean retried;

        @Override
        public boolean retry(ITestResult result) {
            if (retried) {
                return false;
            }
            retried = true;
            System.out.println("Retrying " + result.getName());
            return true;
        }
    }

    @Test(retryAnalyzer = RetryOnce.class)
    public void demonstratesOneRetry() {
        attempts++;
        Assert.assertEquals(attempts, 2, "Simulate a failure on the first attempt");
    }
}`
        },
        { text: 'This is a serial demonstration of one test method. In a parallel or data-driven suite, scope retry bookkeeping to each test case so unrelated invocations cannot consume each other’s retry allowance.' }
      ],
      practice: 'Run mvn -Dtest=RetryTest test and find the retry message. Change the expected value to 3 and confirm the run ends in a failure after the second attempt.'
    },
    {
      id: 'testng-cucumber-runner',
      title: 'Run Cucumber Scenarios with TestNG',
      module: 'Framework Integration',
      level: 'Intermediate',
      learningObjective: 'Use Cucumber’s TestNG adapter to select and run tagged scenarios.',
      blocks: [
        { text: 'In an existing Cucumber-JVM project, add io.cucumber:cucumber-testng with test scope and use the same version as cucumber-java. Extend AbstractTestNGCucumberTests so the adapter exposes scenarios to TestNG. Point features and glue at your project’s feature files and step-definition package.' },
        {
          title: 'src/test/java/practice/CucumberRunnerTest.java',
          language: 'java',
          code: `package practice;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;

@CucumberOptions(
    features = "src/test/resources/features",
    glue = "practice.steps",
    tags = "@smoke and not @wip",
    plugin = {"pretty", "html:target/cucumber.html"}
)
public class CucumberRunnerTest extends AbstractTestNGCucumberTests {
}`
        },
        { text: 'Cucumber tags filter scenarios. TestNG groups filter TestNG methods. Cucumber hooks run Java setup or teardown around a scenario, and Background runs shared Gherkin steps. A Scenario Outline creates one scenario per Examples row.' }
      ],
      practice: 'In your Cucumber project, tag one scenario @smoke and another @smoke @wip. Run mvn -Dtest=CucumberRunnerTest test and verify that only the first scenario runs.',
      resources: [
        { label: 'Cucumber BDD course', url: '/cucumber.html' },
        { label: 'Cucumber TestNG adapter', url: 'https://github.com/cucumber/cucumber-jvm/tree/main/cucumber-testng' }
      ]
    }
  ]
};
