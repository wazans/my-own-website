window.TestNovaDocumentCourse = {
  "id": "jenkins",
  "title": "Jenkins",
  "storageKey": "testnova-reader-jenkins",
  "hashNavigation": true,
  "readOnly": true,
  "topics": [
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
