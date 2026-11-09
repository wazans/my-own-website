# Java and Selenium course source map

Ranges use zero-based paragraph indexes in the uploaded DOCX Word XML, including paragraphs inside tables. The extracted document contains 3,948 paragraph records, 29 table elements and 21 paragraphs with embedded images. The ranges below identify the source for each lesson. They include surrounding notes and may overlap.

## Course boundaries

- Core Java uses Sets 1, 2, 3 and 3.2 plus the advanced Java notes before Set 4. The WebDriver table exercise embedded in the collections section belongs to Selenium.
- Selenium uses Sets 4 through 6. Maven setup, TestNG lifecycle, and some practice scaffolding fill gaps in the source notes.
- Framework architecture, framework-specific reporting and Excel data providers in Set 5 are outside this migration. The Hybrid Framework reader remains a separate route.
- Sets 7 through 13 cover API and REST Assured, Cucumber, Jenkins, Jira and Agile, manual testing, SQL, and Git. They are outside both courses.
- Reference-only headings, inaccessible local paths, redundant interview phrasing, code screenshots and unfinished XPath inspection notes were excluded. JDBC and Java web development were headings or outline material and do not have lessons.
- The architecture figure was redrawn to replace the old JSON Wire label with W3C WebDriver. The Shadow DOM DevTools image was retained. The Maven IDE screenshot contains an old Surefire configuration and was replaced with copyable XML.

## Lesson mapping

| Course | Lesson ID | Source |
| --- | --- | --- |
| java | `compile-and-run-your-first-java-class` | Set 1 process flow, paragraphs 1–6 |
| java | `primitive-and-reference-types` | Set 1, 114–116 and 324–332 |
| java | `wrapper-classes-and-boxing` | Set 1, 117–323 |
| java | `operators-and-ternary-expressions` | Set 1, 333–346 |
| java | `if-else-and-switch` | Set 1 541–557 and Set 2 1778–1796 |
| java | `for-while-and-do-while` | Set 1, 7–113 and 558–584 |
| java | `enhanced-for-and-nested-loops` | Set 1, 29–50 and 719–738 |
| java | `break-continue-and-conditional-loops` | Set 1, 64–85 and 585–718 |
| java | `string-equality-and-immutability` | Set 2, 1802–1837 and 1885–1920 |
| java | `stringbuilder-and-stringbuffer` | Set 1, 1195–1319 and Set 2, 1921–1927 and 2078–2143 |
| java | `extract-and-clean-text` | Set 2, 1928–1973 |
| java | `arrays-reverse-and-intersect` | Set 2, 1974–2000 and 2017–2033 |
| java | `classes-constructors-and-encapsulation` | Set 1, 749–790 and 1167–1172 |
| java | `static-fields-methods-and-constants` | Set 1, 347–540 |
| java | `teacher-and-hod-inheritance-walkthrough` | Set 1, 791–1119 |
| java | `inheritance-overloading-and-overriding` | Set 1, 739–748 and 1348–1585 |
| java | `abstract-classes-and-interfaces` | Set 1, 1586–1759 |
| java | `exception-hierarchy-and-recovery` | Exception Handling, 2587–2766 |
| java | `throw-throws-and-custom-exceptions` | Set 1, 1120–1166 and 1173–1194 |
| java | `arraylist-and-iteration` | Set 3, 2231–2257 and 2326–2344 |
| java | `hashmap-and-map-iteration` | Set 3, 2258–2325 and 2519–2555 |
| java | `hashset-linkedhashset-and-treeset` | Set 3, 2441–2518 |
| java | `synchronizing-a-list` | Set 3, 2345–2363 and 2407–2440 |
| java | `generics-and-type-safety` | Set 1, 260–323 and Set 3.2, 2556–2586 |
| java | `threads-and-java-8-language-features` | Set 1, 1760–1775 and Java 8 Features, 2767–2773 |
| java | `bufferedreader-and-design-pattern-notes` | Advanced Java, 2774–2841 and framework notes, 3370–3430 |
| java | `fibonacci-primes-and-digit-sums` | Set 2, 2061–2077 and 2144–2174 |
| java | `swap-values-and-find-second-largest` | Set 2, 1974–1988 and 2001–2016 and 2034–2041 |
| java | `reverse-text-palindrome-and-anagram` | Set 1, 7–28 and Set 2, 1838–1850 and 2175–2192 |
| java | `count-words-characters-and-duplicates` | Set 2, 1851–1884 and 1989–2000 and 2018–2032 and 2042–2060 and 2193–2227 |
| java | `oop-and-collections-interview-questions` | Set 1, 483–540 and Set 3, 2407–2440 and 2519–2586 |
| selenium | `architecture` | Set 4, 2843–2850 and Set 5, 3310–3323 |
| selenium | `maven-setup-and-first-browser-launch` | Set 4, 2843–2850 and Set 5, 3320–3323 with supplemental Maven setup |
| selenium | `locators` | Set 4, 2851–2856 and 2911–2924 |
| selenium | `xpath-axes-and-devtools-validation` | Set 4, 2857–2877 and 2925–2938 |
| selenium | `webelement-methods-and-forms` | Set 4, 2939–3007 and previous Selenium forms lessons |
| selenium | `dropdowns` | Set 4, 2954–2995 |
| selenium | `increment-counters-and-product-selection` | Set 4, 2939–2953 and 2996–3007 |
| selenium | `sync` | Set 4, 3008–3014 and Set 5, 3324–3369 |
| selenium | `actions` | Set 4, 3015–3049 |
| selenium | `windows-tabs-and-frames` | Set 4, 3050–3072 |
| selenium | `calendar` | Set 4, 3073–3142 |
| selenium | `javascript-executor` | Set 4, 3143–3193 |
| selenium | `screenshots` | Set 4, 3194–3233 and 3281–3287 |
| selenium | `shadow-dom` | Set 4, 2878–2910 and 3288–3305 |
| selenium | `tables` | Set 3, 2364–2406 and Set 4, 3234–3280 |
| selenium | `testng-lifecycle-assertions-and-cleanup` | Set 6, 3485–3489 and 3520–3528, supplemented with lifecycle example |
| selenium | `testng-groups-suites-and-maven-execution` | Set 6, 3490–3519 and 3529–3541 |
| selenium | `advanced-strategy` | Set 5, 3306–3369 and existing Selenium strategy lesson |
| selenium | `practice-page-setup` | Previous Selenium reader, practice setup |
| selenium | `sel-sec-1` | Previous Selenium reader, #sel-sec-1 |
| selenium | `sel-sec-2` | Previous Selenium reader, #sel-sec-2 |
| selenium | `sel-sec-3` | Previous Selenium reader, #sel-sec-3 |
| selenium | `sel-sec-4` | Previous Selenium reader, #sel-sec-4 |
| selenium | `sel-sec-5` | Previous Selenium reader, #sel-sec-5 |
| selenium | `sel-sec-6` | Previous Selenium reader, #sel-sec-6 |
| selenium | `sel-sec-7` | Previous Selenium reader, #sel-sec-7 |
| selenium | `sel-sec-8` | Previous Selenium reader, #sel-sec-8 |
| selenium | `sel-sec-9` | Previous Selenium reader, #sel-sec-9 |
| selenium | `sel-sec-10` | Previous Selenium reader, #sel-sec-10 |
| selenium | `sel-sec-11` | Previous Selenium reader, #sel-sec-11 |
| selenium | `sel-sec-12` | Previous Selenium reader, #sel-sec-12 |
| selenium | `sel-sec-13` | Previous Selenium reader, #sel-sec-13 |
| selenium | `sel-sec-14` | Previous Selenium reader, #sel-sec-14 |
| selenium | `sel-sec-15` | Previous Selenium reader, #sel-sec-15 |
| selenium | `sel-sec-16` | Previous Selenium reader, #sel-sec-16 |
| selenium | `sel-sec-17` | Previous Selenium reader, #sel-sec-17 |
| selenium | `sel-sec-18` | Previous Selenium reader, #sel-sec-18 |
| selenium | `sel-sec-19` | Previous Selenium reader, #sel-sec-19 |
| selenium | `sel-sec-20` | Previous Selenium reader, #sel-sec-20 |
| selenium | `sel-sec-21` | Previous Selenium reader, #sel-sec-21 |
| selenium | `sel-sec-22` | Previous Selenium reader, #sel-sec-22 |
| selenium | `sel-sec-23` | Previous Selenium reader, #sel-sec-23 |
| selenium | `sel-sec-24` | Previous Selenium reader, #sel-sec-24 |
| selenium | `sel-sec-25` | Previous Selenium reader, #sel-sec-25 |
| selenium | `sel-sec-26` | Previous Selenium reader, #sel-sec-26 |
| selenium | `sel-sec-27` | Previous Selenium reader, #sel-sec-27 |
| selenium | `sel-sec-28` | Previous Selenium reader, #sel-sec-28 |
| selenium | `sel-sec-29` | Previous Selenium reader, #sel-sec-29 |
| selenium | `sel-sec-30` | Previous Selenium reader, #sel-sec-30 |

## Legacy Selenium bookmarks

All 41 legacy lesson IDs are canonical IDs in the new reader. The original 11 concept IDs open the corresponding concept lessons. The original practice IDs `sel-sec-1` through `sel-sec-30` open their respective exercises. The reader copies matching completion flags from `seleniumBasicsProgress` when the new progress key is first used.

## Technical edits

- Core Java targets JDK 17. The Teacher and HOD walkthrough now has three named source files, matching package declarations and a compilation command. The number exercises account for tied maxima, distinct second-largest values and overflow in the prime-loop bound. The text exercises separate reference equality, content equality, token count and frequency. The checked-exception lesson uses a complete custom exception example.
- The Selenium examples use Selenium Manager, duration-based explicit waits, native shadow-root traversal and explicit window and frame cleanup. The legacy dynamic-content exercise starts its request before waiting. The hidden-element exercise checks visibility, and the stale-element exercise waits for the replacement after triggering a redraw.
- The TestNG example POM pins Selenium 4.44.0, TestNG 7.12.0 and Maven Surefire 3.5.2. The checkout exercise uses an embedded HTML fixture. The 30 legacy exercises use the existing external practice site and still depend on its selectors.

The lesson map is a selective migration. It records the source ranges used, including source notes consolidated into single explanations and code examples adapted for JDK 17 and Selenium 4.
