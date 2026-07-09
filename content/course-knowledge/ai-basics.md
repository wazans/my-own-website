# AI Basics for QA

## How AI can help QA

Simple explanation:
AI helps QA by speeding up test design, summarizing information, generating first drafts, analyzing failures, and finding patterns. AI supports the tester; it does not replace judgment.

Do this:
1. Give AI one requirement.
2. Ask for positive, negative, and edge test scenarios.
3. Ask it to convert scenarios into test cases.
4. Ask it to identify missing acceptance criteria.
5. Review everything before using it.

Observe this:
AI produces useful drafts quickly, but some cases may be duplicate, vague, or not valid for the product.

Practice this:
Use a login requirement and ask AI for ten test cases. Remove weak cases and improve the rest.

Expected output:
You get a reviewed test case list that is faster to prepare than writing from scratch.

## AI for defect analysis

Simple explanation:
AI can summarize logs, group failures, and suggest likely causes. The QA engineer still confirms the cause with evidence.

Do this:
1. Collect error message, screenshot, trace, and recent change notes.
2. Ask AI to summarize the failure.
3. Ask for likely categories: test data, environment, product bug, or automation issue.
4. Verify the most likely cause manually.
5. Write a clear defect report.

Observe this:
AI can reduce investigation time when the input evidence is clear.

Practice this:
Paste a sample failed test log and ask AI to produce a short failure summary.

Expected output:
You get a defect-ready summary with suspected cause and next debugging step.

## RAG for course assistants

Simple explanation:
RAG means retrieval augmented generation. The assistant first retrieves relevant course content, then answers using only that content.

Do this:
1. Store course notes in markdown.
2. Split notes into chunks.
3. Create embeddings for chunks.
4. Retrieve chunks similar to the question.
5. Send only relevant chunks to the model.

Observe this:
Answers stay closer to TestNova content and avoid guessing outside the course.

Practice this:
Add one markdown lesson and ask three questions that should be answered from it.

Expected output:
The assistant answers from the lesson and shows the source file.
