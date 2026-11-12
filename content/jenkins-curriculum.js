window.TestNovaDocumentCourse = {
  "id": "jenkins",
  "title": "Jenkins",
  "storageKey": "testnova-reader-jenkins",
  "hashNavigation": true,
  "readOnly": true,
  "topics": [
    {
      "id": "jenkins-installation",
      "title": "Jenkins Installation on Windows 11",
      "module": "Getting started",
      "blocks": [
        {
          "heading": "1. What you need"
        },
        {
          "text": "Start with Windows 11, Chrome, the Java JDK and the Jenkins WAR. Jenkins can fetch your GitHub project, run Playwright and publish results. Install Node.js and Git when you reach the pipeline lesson."
        },
        {
          "heading": "2. Install Java 21"
        },
        {
          "text": "Download the Eclipse Temurin Java 21 LTS Windows JDK MSI. Choose x64 for most PCs or ARM64 for an ARM PC. Enable Add to PATH and Set JAVA_HOME if offered. Open a fresh Command Prompt and verify that java -version reports Java 21."
        },
        {
          "heading": "3. Download Jenkins"
        },
        {
          "text": "Choose the Jenkins LTS Generic Java package (.war). In File Explorer create C:\\Jenkins and move jenkins.war into it."
        },
        {
          "heading": "4. Start and unlock Jenkins"
        },
        {
          "text": "Run the startup commands below in Command Prompt and leave that window open. Wait for Jenkins to finish starting, then open http://localhost:8080 in Chrome. Use a second Command Prompt to read the temporary password. If the default path differs, use the location printed in the startup log. Paste the password into Unlock Jenkins and select Continue."
        },
        {
          "heading": "5. Complete the setup wizard"
        },
        {
          "text": "Choose Install suggested plugins. Create your first administrator with a unique password, name and email address. Set the Jenkins URL to http://localhost:8080/, save the settings and select Start using Jenkins."
        },
        {
          "heading": "6. Create your first Windows job"
        },
        {
          "text": "From the dashboard select New Item, name it First-Jenkins-Job, choose Freestyle project and select OK. Under Build Steps, add Execute Windows batch command and paste the example below. Save and click Build Now. Open the build’s Console Output and confirm it prints both messages, the Java version and Finished: SUCCESS."
        },
        {
          "heading": "7. Stop and restart"
        },
        {
          "text": "Press Ctrl+C in the Command Prompt running Jenkins. To restart, run the same startup commands. Jobs and settings persist when you reuse the same Jenkins home."
        },
        {
          "heading": "8. Troubleshoot"
        },
        {
          "text": "If Java is unrecognized, reopen Command Prompt and check PATH. If the WAR cannot be opened, check its filename and directory. If port 8080 is busy, append --httpPort=9090 and browse to http://localhost:9090. For password or startup errors, check the console. If plugins fail, check internet access and retry."
        },
        {
          "heading": "9. Continue with Playwright"
        },
        {
          "text": "Install Node.js and Git, then follow the linked login pipeline lesson. The WAR runs in your terminal. The Jenkins Windows MSI is available if you want a Windows service."
        }
      ],
      "examples": [
        {
          "title": "Verify Java",
          "language": "bat",
          "code": "java -version"
        },
        {
          "title": "Start Jenkins locally",
          "language": "bat",
          "code": "cd /d C:\\Jenkins\njava -jar jenkins.war --httpListenAddress=127.0.0.1"
        },
        {
          "title": "Read the initial admin password",
          "language": "bat",
          "code": "type \"%USERPROFILE%\\.jenkins\\secrets\\initialAdminPassword\""
        },
        {
          "title": "First-Jenkins-Job",
          "language": "bat",
          "code": "echo Hello Jenkins!\necho Jenkins installation successful!\njava -version"
        }
      ],
      "resources": [
        {
          "label": "Eclipse Temurin JDK",
          "url": "https://adoptium.net/temurin/releases/"
        },
        {
          "label": "Jenkins LTS download",
          "url": "https://www.jenkins.io/download/"
        },
        {
          "label": "Jenkins Java support policy",
          "url": "https://www.jenkins.io/doc/book/platform-information/support-policy-java/"
        },
        {
          "label": "Run a Playwright Login in Jenkins",
          "url": "playwright-reader.html?topic=playwright-notes-30"
        }
      ],
      "hideReview": true
    },
    {
      "id": "why-jenkins",
      "title": "Why Jenkins?",
      "module": "Continuous integration",
      "paragraphs": [
        "Jenkins automates test execution and build deliveries so QA work runs on schedule or when code changes, without manual execution."
      ],
      "hideReview": true
    },
    {
      "id": "build-process",
      "title": "Build process",
      "module": "Pipeline and repository setup",
      "paragraphs": [
        "A Jenkins pipeline typically checks out a repo, runs Maven tests, and publishes test artifacts or reports. Update the Git URL to point to your automation repository. This example uses a Windows agent."
      ],
      "examples": [
        {
          "title": "Jenkinsfile",
          "language": "groovy",
          "code": "pipeline {\n  agent any\n  stages {\n    stage('Checkout') {\n      steps { git url: 'your-repo-url.git' }\n    }\n    stage('Build + Test') {\n      steps { bat 'mvn clean test' }\n    }\n  }\n}"
        }
      ],
      "hideReview": true
    },
    {
      "id": "repo-setup",
      "title": "Repository setup",
      "module": "Pipeline and repository setup",
      "paragraphs": [
        "Keep Jenkins configuration inside your automation project, including pipeline scripts, test commands, and report generation.",
        "Use local project branches and internal Git repositories instead of external document links."
      ],
      "hideReview": true
    },
    {
      "id": "benefits",
      "title": "Key benefits",
      "module": "Results and follow-up",
      "blocks": [
        {
          "heading": "Scheduled runs"
        },
        {
          "text": "Run tests automatically on every commit or at fixed intervals."
        },
        {
          "heading": "Central reports"
        },
        {
          "text": "Keep logs, screenshots, and test results in one accessible place."
        },
        {
          "heading": "CI/CD alignment"
        },
        {
          "text": "Use Jenkins to integrate source control and automated QA tests."
        }
      ],
      "hideReview": true
    },
    {
      "id": "faq",
      "title": "Common questions about Jenkins",
      "module": "Results and follow-up",
      "blocks": [
        {
          "heading": "What is Jenkins used for in QA?"
        },
        {
          "text": "Jenkins automates test suites, generates reports, and integrates with version control so builds can run on code changes."
        },
        {
          "heading": "Is Jenkins free to use?"
        },
        {
          "text": "Jenkins is a free, open-source automation server with a plugin ecosystem."
        },
        {
          "heading": "Can Jenkins run different types of tests?"
        },
        {
          "text": "A pipeline can run unit, integration, browser, and API tests through their respective build tools and test frameworks."
        }
      ],
      "hideReview": true
    },
    {
      "id": "related-courses",
      "title": "Related courses",
      "module": "Results and follow-up",
      "paragraphs": [
        "Continue with the Selenium Java Hybrid Framework, Cucumber BDD, or the original Java notes."
      ],
      "resources": [
        {
          "label": "Hybrid Framework",
          "url": "/hybrid.html"
        },
        {
          "label": "Cucumber Basics",
          "url": "/cucumber.html"
        },
        {
          "label": "Java notes",
          "url": "/master.html"
        }
      ],
      "hideReview": true
    }
  ]
};
