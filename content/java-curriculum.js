window.TestNovaDocumentCourse = {
  "id": "java",
  "title": "Core Java Programming",
  "storageKey": "testnova-java",
  "hashNavigation": true,
  "showSavedEdits": true,
  "topics": [
    {
      "id": "compile-and-run-your-first-java-class",
      "title": "Compile and run your first Java class",
      "module": "Java Fundamentals",
      "level": "Beginner",
      "learningObjective": "Trace source code from the compiler to the JVM and run a main method.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "A JDK supplies javac and the runtime tools. The runtime environment provides a JVM and supporting libraries. javac compiles a source file to bytecode. The java launcher loads that bytecode and calls the public static main method. Save a public class in a file with the same name."
        },
        {
          "title": "HelloJava.java",
          "code": "public class HelloJava {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java\");\n    }\n}",
          "explanation": "main is static so the launcher can call it without constructing HelloJava.",
          "language": "java"
        },
        {
          "title": "Compile and launch",
          "code": "javac HelloJava.java\njava HelloJava",
          "explanation": "Run both commands in the folder containing HelloJava.java.",
          "language": "bash"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "Hello, Java"
        }
      ],
      "hideReview": true
    },
    {
      "id": "primitive-and-reference-types",
      "title": "Primitive and reference types",
      "module": "Java Fundamentals",
      "level": "Beginner",
      "learningObjective": "Choose a type and predict what a widening or narrowing conversion does.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Java has eight primitive types. byte, short, int and long store integers. float and double store floating-point numbers. char represents one UTF-16 code unit. boolean represents true or false. A reference variable stores a reference to an object or null. Widening is usually implicit. Narrowing needs a cast and can lose information."
        },
        {
          "title": "Conversions.java",
          "code": "public class Conversions {\n    public static void main(String[] args) {\n        int count = 42;\n        long widened = count;\n        double price = 12.75;\n        int whole = (int) price;\n        String label = \"Items\";\n        System.out.println(label + \": \" + widened + \", \" + whole);\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "Items: 42, 12"
        }
      ],
      "hideReview": true
    },
    {
      "id": "wrapper-classes-and-boxing",
      "title": "Wrapper classes and boxing",
      "module": "Java Fundamentals",
      "level": "Beginner",
      "learningObjective": "Convert primitives to wrappers and identify null unboxing.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Collections use reference type arguments, so ArrayList<Integer> can store boxed ints. Integer.valueOf boxes explicitly and intValue unboxes explicitly. Assignments can do either conversion implicitly. An Integer can be null, and unboxing null throws NullPointerException. Use equals for wrapper value equality."
        },
        {
          "title": "Boxing.java",
          "code": "public class Boxing {\n    public static void main(String[] args) {\n        Integer explicit = Integer.valueOf(12);\n        Integer automatic = 12;\n        int unboxed = explicit.intValue();\n        int autoUnboxed = automatic;\n        System.out.println(unboxed + autoUnboxed);\n        System.out.println(explicit.equals(automatic));\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "24, then true"
        },
        {
          "heading": "Practice exercise"
        },
        {
          "text": "Initialize a wrapper to null and predict which assignment would throw."
        }
      ],
      "hideReview": true
    },
    {
      "id": "operators-and-ternary-expressions",
      "title": "Operators and ternary expressions",
      "module": "Java Fundamentals",
      "level": "Beginner",
      "learningObjective": "Combine arithmetic, comparison, short-circuit logic and conditional expressions.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Integer division truncates toward zero. The remainder operator is useful for divisibility. && only evaluates its right operand when the left operand is true. The conditional expression chooses one of two values based on a boolean condition."
        },
        {
          "title": "Operators.java",
          "code": "public class Operators {\n    public static void main(String[] args) {\n        int count = 9;\n        String parity = count % 2 == 0 ? \"even\" : \"odd\";\n        System.out.println(count / 2 + \" \" + parity);\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "4 odd"
        }
      ],
      "hideReview": true
    },
    {
      "id": "if-else-and-switch",
      "title": "If else and switch",
      "module": "Conditional Statements and Loops",
      "level": "Beginner",
      "learningObjective": "Choose between ranges with if and discrete values with switch.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Test the most specific condition first in an if chain. An arrow-style switch arm executes without fall-through. Traditional colon-style cases usually need break. The source largest-of-three exercise compares each candidate with the others and must account for ties."
        },
        {
          "title": "Decisions.java",
          "code": "public class Decisions {\n    public static void main(String[] args) {\n        int a = 9, b = 9, c = 3;\n        if (a >= b && a >= c) System.out.println(a);\n        else if (b >= c) System.out.println(b);\n        else System.out.println(c);\n        String day = switch (2) {\n            case 1 -> \"Monday\";\n            case 2 -> \"Tuesday\";\n            default -> \"Other\";\n        };\n        System.out.println(day);\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "9, then Tuesday"
        }
      ],
      "hideReview": true
    },
    {
      "id": "for-while-and-do-while",
      "title": "For while and do while",
      "module": "Conditional Statements and Loops",
      "level": "Beginner",
      "learningObjective": "Choose the right loop based on when its condition should be tested.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "A for loop groups initialization, the continuation condition and the update. A while loop checks before each iteration. A do-while checks after the body, so its body runs at least once."
        },
        {
          "title": "LoopForms.java",
          "code": "public class LoopForms {\n    public static void main(String[] args) {\n        for (int n = 1; n <= 10; n++) System.out.print(n + \" \");\n        int n = 3;\n        while (n > 0) n--;\n        do { n++; } while (n < 1);\n        System.out.println(\"\\nFinal value: \" + n);\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "title": "Main.java",
          "code": "public class Main {\n    public static void main(String[] args) {\n       String data=\"wasim\";\n       int count=0;\n       while(true)\n       {\n         try\n         {\n          data.charAt(count);\n          count++;\n         }\n         catch(Exception e)\n         {\n           System.out.println(count);\n           break; //if no break 5 will keep on printing\n         }\n\n       }\n    }\n}",
          "explanation": "Source program. Expected output for this input: 5",
          "language": "java"
        },
        {
          "title": "J_DoWhileExplained.java",
          "code": "public class J_DoWhileExplained {\n   public static void main(String[] args) {\n       int i=1;\n       do {\n           System.out.println(\"hello\");\n           i++;\n       }\n       while (i <= 5);\n\n   }\n\n}",
          "explanation": "Source program. Expected output for this input: hello | hello | hello | hello | hello",
          "language": "java"
        },
        {
          "heading": "Practice exercise"
        },
        {
          "text": "Start the while counter at zero and compare how often each body runs."
        }
      ],
      "hideReview": true
    },
    {
      "id": "enhanced-for-and-nested-loops",
      "title": "Enhanced for and nested loops",
      "module": "Conditional Statements and Loops",
      "level": "Beginner",
      "learningObjective": "Iterate over values and distinguish inner and outer loop boundaries.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Enhanced for exposes each value in order. Use an indexed loop when you need a position. With nested loops, the inner loop starts again for each outer iteration."
        },
        {
          "title": "NestedLoops.java",
          "code": "public class NestedLoops {\n    public static void main(String[] args) {\n        String[] labels = {\"A\", \"B\"};\n        for (String label : labels) {\n            for (int n = 1; n <= 2; n++) System.out.println(label + n);\n        }\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "A1, A2, B1, B2 on separate lines"
        }
      ],
      "hideReview": true
    },
    {
      "id": "break-continue-and-conditional-loops",
      "title": "Break continue and conditional loops",
      "module": "Conditional Statements and Loops",
      "level": "Beginner",
      "learningObjective": "Skip a value, terminate a loop, and stop searching after the first match.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "continue skips the rest of the current iteration. break exits the innermost loop. In the source divisibility exercise, test the stop condition first so a later change to the skip condition cannot hide it."
        },
        {
          "title": "LoopControl.java",
          "code": "public class LoopControl {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 50; i++) {\n            if (i % 5 == 0 && i % 7 == 0) break;\n            if (i % 3 == 0) continue;\n            System.out.print(i + \" \");\n        }\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "title": "FindCharacter.java",
          "code": "public class FindCharacter {\n    public static void main(String[] args) {\n        String word = \"automation\";\n        for (int i = 0; i < word.length(); i++) {\n            if (word.charAt(i) != 'o') continue;\n            System.out.println(i);\n            break;\n        }\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "title": "R_Continue.java",
          "code": "public class R_Continue {\n   public static void main(String[] args) {\n       for (int i = 0; i < 10; i++) {\n\n           if(i==3)\n           {\n               continue;\n           }\n           System.out.println(i);\n\n       }\n   }\n}",
          "explanation": "Source program. Expected output for this input: 0 | 1 | 2 | 4 | 5 | 6 | 7 | 8 | 9",
          "language": "java"
        },
        {
          "title": "Main.java",
          "code": "public class Main {\n    public static void main(String[] args) {\n\n         int i=1;\n         for(i=1;i<=50;i++)\n         {\n\n             if(i%3==0)\n             {\n                 continue;\n             }\n             System.out.println(i);\n         }\n       }\n\n}",
          "explanation": "Source program. Expected output for this input: 1 | 2 | 4 | 5 | 7 | 8 | 10 | 11 | 13 | 14 | 16 | 17 | 19 | 20 | 22 | 23 | 25 | 26 | 28 | 29 | 31 | 32 | 34 | 35 | 37 | 38 | 40 | 41 | 43 | 44 | 46 | 47 | 49 | 50",
          "language": "java"
        },
        {
          "title": "Main.java",
          "code": "public class Main {\n    public static void main(String[] args) {\n\n         int i=1;\n         for(i=1;i<=50;i++)\n         {\n\n             if(i%3==0)\n             {\n                 continue;\n             }\n             if(i%5==0 && i%7==0)\n             {\n                 break;\n             }\n             System.out.println(i);\n         }\n       }\n\n}",
          "explanation": "Source program. Expected output for this input: 1 | 2 | 4 | 5 | 7 | 8 | 10 | 11 | 13 | 14 | 16 | 17 | 19 | 20 | 22 | 23 | 25 | 26 | 28 | 29 | 31 | 32 | 34",
          "language": "java"
        },
        {
          "title": "Main.java",
          "code": "public class Main {\n    public static void main(String[] args) {\n\n         for(int i=1;i<=100;i++)\n         {\n\n             if(i%4==0)\n             {\n                 continue;\n             }\n             if(i%6==0 && i%9==0)\n             {\n                 break;\n             }\n             System.out.println(i);\n\n         }\n    }\n\n}",
          "explanation": "Source program. Expected output for this input: 1 | 2 | 3 | 5 | 6 | 7 | 9 | 10 | 11 | 13 | 14 | 15 | 17",
          "language": "java"
        },
        {
          "title": "Main.java",
          "code": "public class Main {\n    public static void main(String[] args) {\n\n         String s=\"abcdefghijklmnopqrstuzvwxy\";\n\n         for (int i=0;i<s.length();i++)\n\n         {\n             char ch=s.charAt(i);\n             if(ch=='a'||ch=='e'||ch=='i'||ch=='o'||ch=='u')\n             {\n                 continue;\n             }\n             if(ch=='z')\n             {\n                 break;\n             }\n             System.out.println(ch);\n\n         }\n    }\n\n}",
          "explanation": "Source program. Expected output for this input: b | c | d | f | g | h | j | k | l | m | n | p | q | r | s | t",
          "language": "java"
        },
        {
          "heading": "Practice exercise"
        },
        {
          "text": "Run the divisibility loop and verify that 33 and 35 are both excluded."
        }
      ],
      "hideReview": true
    },
    {
      "id": "string-equality-and-immutability",
      "title": "String equality and immutability",
      "module": "Strings and Arrays",
      "level": "Beginner",
      "learningObjective": "Compare string content and keep the result of a string operation.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "A String cannot change after construction. Methods like replace return a result. String literals may refer to the same pooled instance. new String constructs a separate instance. Use equals for text comparison and use == when you need identity."
        },
        {
          "title": "StringIdentity.java",
          "code": "public class StringIdentity {\n    public static void main(String[] args) {\n        String original = \"java\";\n        String copy = new String(\"java\");\n        String upper = original.toUpperCase(java.util.Locale.ROOT);\n        System.out.println(original == copy);\n        System.out.println(original.equals(copy));\n        System.out.println(original + \" \" + upper);\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "title": "U_StringComparisonExample.java",
          "code": "public class U_StringComparisonExample {\n   public static void main(String[] args) {\n       String str1 = \"Hello\";\n       String str2 = new String(\"Hello\");\n       //When you create a string using the new keyword, it creates a new object on the heap\n       String str3 = \"Hello\";\n       //Both str1 and str3 refer to the same object because they are initialized with the same literal.\n\n       // Using == for reference equality\n       //The == operator checks if two references point to the same object.\n       System.out.println(\"Using == for reference equality:\");\n       System.out.println(\"str1 == str2: \" + (str1 == str2)); // false\n       System.out.println(\"str1 == str3: \" + (str1 == str3)); // true\n\n       // Using equals for content equality\n       //The equals method checks if two objects have the same content.\n       System.out.println(\"Using equals for content equality:\");\n       System.out.println(\"str1.equals(str2): \" + str1.equals(str2)); // true\n       System.out.println(\"str1.equals(str3): \" + str1.equals(str3)); // true\n\n       /*\n\n           String str1 = \"Hello\";\n                   This creates a string \"Hello\" and stores it in the string pool.\n           String str3 = \"Hello\";\n                   Since \"Hello\" is already in the string pool, str3 refers to the same object as str1.\n           String str2 = new String(\"Hello\");\n                   This creates a new string object in memory, separate from the string pool.\n        */\n   }\n}",
          "explanation": "Source program. Expected output for this input: Using == for reference equality: | str1 == str2: false | str1 == str3: true | Using equals for content equality: | str1.equals(str2): true | str1.equals(str3): true",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "false, true, then java JAVA"
        }
      ],
      "hideReview": true
    },
    {
      "id": "stringbuilder-and-stringbuffer",
      "title": "StringBuilder and StringBuffer",
      "module": "Strings and Arrays",
      "level": "Beginner",
      "learningObjective": "Choose a mutable text builder and understand the scope of synchronization.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "StringBuilder is a good default for text assembled by one thread. StringBuffer synchronizes individual methods. A compound operation that needs to be atomic still needs a locking strategy. Convert the buffer to a String when you are done."
        },
        {
          "title": "BuildText.java",
          "code": "public class BuildText {\n    public static void main(String[] args) {\n        StringBuilder builder = new StringBuilder();\n        for (String word : new String[]{\"Core\", \"Java\"}) {\n            if (builder.length() > 0) builder.append(' ');\n            builder.append(word);\n        }\n        System.out.println(builder);\n        System.out.println(new StringBuffer(\"Java\").reverse());\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "Core Java, then avaJ"
        }
      ],
      "hideReview": true
    },
    {
      "id": "extract-and-clean-text",
      "title": "Extract and clean text",
      "module": "Strings and Arrays",
      "level": "Beginner",
      "learningObjective": "Trim whitespace, select a substring and remove characters using a regular expression.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "substring includes the start index and excludes the end. trim removes leading and trailing characters up to U+0020. strip uses Unicode whitespace rules. replaceAll interprets its first argument as a regular expression."
        },
        {
          "title": "CleanText.java",
          "code": "public class CleanText {\n    public static void main(String[] args) {\n        String text = \"  Order #42!  \".strip();\n        System.out.println(text.substring(0, 5));\n        System.out.println(text.replaceAll(\"[^0-9]\", \"\"));\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "title": "Z23_Subtring_trim_index.java",
          "code": "public class Z23_Subtring_trim_index {\n\n   public static void main(String[] args) {\n       String s=\"wasim(guest)\";\n       int startIndex=s.indexOf('(');\n       int endIndex=s.indexOf(')');\n       String output=s.substring(startIndex+1,endIndex);\n       System.out.println(output);\n       String outs=s.trim().substring(0,startIndex);\n       System.out.println(outs);\n\n   }\n}",
          "explanation": "Source program. Expected output for this input: guest | wasim",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "Order, then 42"
        }
      ],
      "hideReview": true
    },
    {
      "id": "arrays-reverse-and-intersect",
      "title": "Arrays reverse and intersect",
      "module": "Strings and Arrays",
      "level": "Beginner",
      "learningObjective": "Index an array, reverse its elements, and compute its distinct intersection with another array.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "An array has a fixed length. Indexes start at zero. Use two pointers for in-place reversal. For a distinct intersection, use a membership set and preserve encounter order with a LinkedHashSet."
        },
        {
          "title": "ArrayOperations.java",
          "code": "public class ArrayOperations {\n    public static void main(String[] args) {\n        int[] values = {1, 2, 1, 3, 4};\n        for (int left = 0, right = values.length - 1; left < right; left++, right--) {\n            int temp = values[left];\n            values[left] = values[right];\n            values[right] = temp;\n        }\n        System.out.println(java.util.Arrays.toString(values));\n        var membership = java.util.Set.of(1, 4, 8);\n        var common = new java.util.LinkedHashSet<Integer>();\n        for (int value : values) if (membership.contains(value)) common.add(value);\n        System.out.println(common);\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "[4, 3, 1, 2, 1], then [4, 1]"
        }
      ],
      "hideReview": true
    },
    {
      "id": "classes-constructors-and-encapsulation",
      "title": "Classes constructors and encapsulation",
      "module": "Object-Oriented Programming",
      "level": "Intermediate",
      "learningObjective": "Initialize an object with this and protect invariants behind methods.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "A class defines fields and methods. A constructor initializes an instance. this refers to the current object and distinguishes fields from same-named parameters. A setter can enforce validation. A getter exposes a value while keeping the field private."
        },
        {
          "title": "AccountDemo.java",
          "code": "public class AccountDemo {\n    public static void main(String[] args) {\n        Account account = new Account(100);\n        account.setBalance(120);\n        System.out.println(account.getBalance());\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "title": "Append to AccountDemo.java",
          "code": "class Account {\n    private int balance;\n    Account(int balance) { setBalance(balance); }\n    int getBalance() { return balance; }\n    void setBalance(int balance) {\n        if (balance < 0) throw new IllegalArgumentException(\"Negative balance\");\n        this.balance = balance;\n    }\n}",
          "explanation": "Place this package-private class below AccountDemo in the same file.",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "120"
        }
      ],
      "hideReview": true
    },
    {
      "id": "static-fields-methods-and-constants",
      "title": "Static fields methods and constants",
      "module": "Object-Oriented Programming",
      "level": "Intermediate",
      "learningObjective": "Explain which members belong to a class and which belong to one instance.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Each object gets its own instance fields. A static field is shared by instances of the loaded class. A static method has no this and needs an object reference to access instance data. static final prevents reassignment of a class field. A final object reference can still refer to a mutable object."
        },
        {
          "heading": "Practice exercise"
        },
        {
          "text": "Create three instances and compare a static counter with an instance counter."
        },
        {
          "table": [
            [
              "Feature",
              "Static",
              "Instance"
            ],
            [
              "Belongs to",
              "Loaded class",
              "Object"
            ],
            [
              "Field copies",
              "One per loaded class",
              "One per object"
            ],
            [
              "Access from a static method",
              "Through the class",
              "Through an object reference"
            ]
          ]
        }
      ],
      "hideReview": true
    },
    {
      "id": "teacher-and-hod-inheritance-walkthrough",
      "title": "Teacher and HOD inheritance walkthrough",
      "module": "Object-Oriented Programming",
      "level": "Intermediate",
      "learningObjective": "Build the Teacher and HOD classes and predict which display method runs.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Teacher owns the name and faculty ID and initializes them in its constructor. HOD extends Teacher and calls super to initialize the parent state before setting its appointment date. HOD overrides display and uses inherited getters. The reference in Main has type Teacher, which determines accessible methods at compile time. The HOD object determines the implementation called at runtime."
        },
        {
          "title": "teacher/Teacher.java",
          "code": "package teacher;\n\npublic class Teacher {\n    private String name;\n    private final int factId;\n\n    public Teacher(String name, int factId) {\n        this.name = name;\n        this.factId = factId;\n    }\n\n    public String getName() { return name; }\n    public void setName(String name) { this.name = name; }\n    public int getFactId() { return factId; }\n    public void display() { System.out.println(name + \" (\" + factId + \")\"); }\n}",
          "explanation": "Define shared state and expose it through methods.",
          "language": "java"
        },
        {
          "title": "admin/HOD.java",
          "code": "package admin;\n\nimport teacher.Teacher;\n\npublic class HOD extends Teacher {\n    private final String dateOfAppointment;\n\n    public HOD(String name, int factId, String dateOfAppointment) {\n        super(name, factId);\n        this.dateOfAppointment = dateOfAppointment;\n    }\n\n    @Override\n    public void display() {\n        System.out.println(\"Name: \" + getName());\n        System.out.println(\"Faculty ID: \" + getFactId());\n        System.out.println(\"Date of appointment: \" + dateOfAppointment);\n    }\n}",
          "explanation": "super invokes the parent constructor. @Override lets the compiler check the signature.",
          "language": "java"
        },
        {
          "title": "Main.java",
          "code": "import teacher.Teacher;\nimport admin.HOD;\n\npublic class Main {\n    public static void main(String[] args) {\n        Teacher t = new HOD(\"Wasim\", 101, \"01-Jan-2024\");\n        t.display();\n    }\n}",
          "explanation": "The runtime selects HOD.display().",
          "language": "java"
        },
        {
          "title": "Compile from the directory containing Main.java",
          "code": "javac teacher/Teacher.java admin/HOD.java Main.java\njava Main",
          "explanation": "",
          "language": "bash"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "Name: Wasim. Faculty ID: 101. Date of appointment: 01-Jan-2024."
        },
        {
          "heading": "Practice exercise"
        },
        {
          "text": "Add a plain Teacher instance and call display on both objects from a Teacher array."
        }
      ],
      "hideReview": true
    },
    {
      "id": "inheritance-overloading-and-overriding",
      "title": "Inheritance overloading and overriding",
      "module": "Object-Oriented Programming",
      "level": "Intermediate",
      "learningObjective": "Recognize inheritance shapes and distinguish compile-time selection from runtime dispatch.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "A Java class has one direct superclass. A chain of subclasses is multilevel inheritance. Multiple subclasses of one parent form hierarchical inheritance. Overloaded methods have different parameter lists and are selected at compile time. Overridden instance methods retain the signature and dispatch at runtime. super.method() selects the parent implementation."
        },
        {
          "title": "Overload.java",
          "code": "public class Overload {\n    static int add(int a, int b) { return a + b; }\n    static int add(int a, int b, int c) { return a + b + c; }\n\n    public static void main(String[] args) {\n        System.out.println(add(2, 3));\n        System.out.println(add(2, 3, 4));\n    }\n}",
          "explanation": "Arity selects the overload.",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "5, then 9"
        }
      ],
      "hideReview": true
    },
    {
      "id": "abstract-classes-and-interfaces",
      "title": "Abstract classes and interfaces",
      "module": "Object-Oriented Programming",
      "level": "Intermediate",
      "learningObjective": "Choose an abstract base for shared state and interfaces for capabilities.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "An abstract class can have constructors, instance fields and implemented methods. An interface can declare contracts, default behavior and static methods. Call a static interface method through the interface name. A class may implement several interfaces. If unrelated interfaces provide conflicting defaults, the implementing class resolves the conflict explicitly."
        },
        {
          "title": "Notifier.java",
          "code": "interface Loggable {\n    default String label() { return \"notification\"; }\n    static String category() { return \"messages\"; }\n}\ninterface Sendable {\n    void send(String text);\n}\nabstract class BaseNotifier {\n    abstract String destination();\n}\npublic class Notifier extends BaseNotifier implements Loggable, Sendable {\n    @Override String destination() { return \"console\"; }\n    @Override public void send(String text) {\n        System.out.println(label() + \" to \" + destination() + \": \" + text);\n    }\n    public static void main(String[] args) {\n        System.out.println(Loggable.category());\n        new Notifier().send(\"Hello\");\n    }\n}",
          "explanation": "Notifier extends a single class while implementing two independent contracts.",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "messages, then notification to console: Hello"
        },
        {
          "table": [
            [
              "Feature",
              "Abstract class",
              "Interface"
            ],
            [
              "Instance state",
              "Can declare fields",
              "Cannot declare instance fields"
            ],
            [
              "Constructors",
              "Allowed",
              "None"
            ],
            [
              "Inheritance",
              "A class extends one superclass",
              "A class can implement multiple interfaces"
            ]
          ]
        }
      ],
      "hideReview": true
    },
    {
      "id": "exception-hierarchy-and-recovery",
      "title": "Exception hierarchy and recovery",
      "module": "Exception Handling",
      "level": "Intermediate",
      "learningObjective": "Distinguish checked exceptions, unchecked exceptions and JVM errors.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Throwable has two main branches, Exception and Error. Checked exceptions must be caught or declared when a method can throw them. RuntimeException subclasses are unchecked. Errors are unchecked and typically indicate conditions application code cannot meaningfully recover from. All of these are thrown at runtime."
        },
        {
          "title": "ParseNumber.java",
          "code": "public class ParseNumber {\n    public static void main(String[] args) {\n        try {\n            Integer.parseInt(\"abc\");\n        } catch (NumberFormatException ex) {\n            System.out.println(\"Enter a whole number\");\n        } finally {\n            System.out.println(\"Parsing attempt finished\");\n        }\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "Enter a whole number, then Parsing attempt finished"
        },
        {
          "table": [
            [
              "Type",
              "Compiler checks handling",
              "Example"
            ],
            [
              "Checked exception",
              "Yes",
              "IOException"
            ],
            [
              "Unchecked exception",
              "No",
              "NumberFormatException"
            ],
            [
              "Error",
              "No",
              "StackOverflowError"
            ]
          ]
        }
      ],
      "hideReview": true
    },
    {
      "id": "throw-throws-and-custom-exceptions",
      "title": "Throw throws and custom exceptions",
      "module": "Exception Handling",
      "level": "Intermediate",
      "learningObjective": "Declare a checked exception, throw it at a validation boundary and catch it in the caller.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "throw transfers control with a specific exception object. throws declares which checked exceptions may escape a method. finally runs during ordinary control flow out of the try, including an exception. Prefer try-with-resources for closable resources."
        },
        {
          "title": "Voting.java",
          "code": "public class Voting {\n    static class CustomAgeException extends Exception {\n        CustomAgeException(String message) { super(message); }\n    }\n\n    static void register(int age) throws CustomAgeException {\n        if (age < 18) throw new CustomAgeException(\"Must be 18 or older\");\n        System.out.println(\"Registered\");\n    }\n\n    public static void main(String[] args) {\n        try {\n            register(17);\n        } catch (CustomAgeException ex) {\n            System.out.println(ex.getMessage());\n        }\n    }\n}",
          "explanation": "A catch at the caller turns a domain error into a clear message.",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "Must be 18 or older"
        }
      ],
      "hideReview": true
    },
    {
      "id": "arraylist-and-iteration",
      "title": "ArrayList and iteration",
      "module": "Java Collections",
      "level": "Intermediate",
      "learningObjective": "Add and merge lists and traverse using a loop or iterator.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "ArrayList stores elements in encounter order and permits duplicates. addAll appends another collection. Enhanced for is concise for reads. Use an iterator’s remove method for supported removals during traversal, or removeIf for a predicate."
        },
        {
          "title": "MergeLists.java",
          "code": "public class MergeLists {\n    public static void main(String[] args) {\n        var names = new java.util.ArrayList<>(java.util.List.of(\"A\", \"B\"));\n        names.addAll(java.util.List.of(\"B\", \"C\"));\n        for (String name : names) System.out.print(name + \" \");\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "A B B C"
        }
      ],
      "hideReview": true
    },
    {
      "id": "hashmap-and-map-iteration",
      "title": "HashMap and map iteration",
      "module": "Java Collections",
      "level": "Intermediate",
      "learningObjective": "Store keyed values and iterate over keys and values together.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "HashMap allows one null key and null values. put replaces a value when the key already exists. entrySet gives both key and value. HashMap has no iteration-order guarantee. Hashtable synchronizes individual operations and rejects null keys and values. Use a concurrent collection when the access pattern requires it."
        },
        {
          "title": "MapCounts.java",
          "code": "public class MapCounts {\n    public static void main(String[] args) {\n        var counts = new java.util.HashMap<String, Integer>();\n        for (String word : \"a b a\".split(\" \")) counts.merge(word, 1, Integer::sum);\n        for (var entry : counts.entrySet()) {\n            System.out.println(entry.getKey() + \"=\" + entry.getValue());\n        }\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "title": "B_HashMap.java",
          "code": "import java.util.HashMap;\n\npublic class B_HashMap {\n   public static void main(String[] args) {\n       HashMap<Integer,String> hs=new HashMap();\n       //No duplicate keys: Each key can map to at most one value.\n       hs.put(1,\"Delhi\");\n       hs.put(1,\"Kolkata\");//will replace\n       //Allows null values and one null key.\n       hs.put(null,\"no city\");\n       hs.put(null,\"another no city\");//will replace\n       hs.put(11,null);//allows null values but only one null key\n       System.out.println(hs);\n       //Not synchronised: If multiple threads access a HashMap concurrently, and at least one of the threads modifies the map structurally, it must be synchronized externally.\n       //Does not maintain insertion order: The order of keys and values can change.\n       HashMap<String, String> map = new HashMap<>();\n       map.put(\"One\", \"1\");\n       map.put(\"Two\", \"2\");\n       map.put(\"Three\", \"3\");\n       map.put(\"Four\", \"4\");\n\n       // Print the map\n       System.out.println(map); // Output could be in any order, e.g., {Three=3, One=1, Four=4, Two=2}\n   }\n}",
          "explanation": "Source program. Expected output for this input: {null=another no city, 1=Kolkata, 11=null} | {One=1, Four=4, Two=2, Three=3} Hash-based iteration order can vary.",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "a=2 and b=1, in unspecified order"
        }
      ],
      "hideReview": true
    },
    {
      "id": "hashset-linkedhashset-and-treeset",
      "title": "HashSet LinkedHashSet and TreeSet",
      "module": "Java Collections",
      "level": "Intermediate",
      "learningObjective": "Pick a set based on uniqueness and ordering.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "HashSet deduplicates without promising encounter order. LinkedHashSet keeps insertion order. TreeSet sorts by natural order or a supplied comparator. With a comparator, values that compare as zero occupy one position."
        },
        {
          "title": "SetOrder.java",
          "code": "public class SetOrder {\n    public static void main(String[] args) {\n        var values = java.util.List.of(3, 1, 3, 2);\n        System.out.println(new java.util.LinkedHashSet<>(values));\n        System.out.println(new java.util.TreeSet<>(values));\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "title": "H_LinkedHashSet_maitainsorder.java",
          "code": "import java.util.HashSet;\nimport java.util.LinkedHashSet;\nimport java.util.Set;\n\npublic class H_LinkedHashSet_maitainsorder {\n   public static void main(String[] args) {\n       //Set<String> LinkhashSet=new HashSet<>();\n       Set<String> LinkhashSet=new LinkedHashSet<>();\n       LinkhashSet.add(\"Apple\");\n       LinkhashSet.add(\"Banana\");\n       LinkhashSet.add(\"Cherry\");\n       //LinkedHashSet: Maintains insertion order\n       LinkhashSet.stream().forEach(System.out::println);\n   }\n}",
          "explanation": "Source program. Expected output for this input: Apple | Banana | Cherry Hash-based iteration order can vary.",
          "language": "java"
        },
        {
          "title": "I_TreeSet.java",
          "code": "import java.util.Set;\nimport java.util.TreeSet;\n\npublic class I_TreeSet {\n   public static void main(String[] args) {\n       //TreeSet: Sorted order.\n       Set<Integer> ts=new TreeSet<>();\n       ts.add(3);\n       ts.add(1);\n       ts.add(4);\n       ts.add(5);\n       ts.add(6);\n       ts.add(2);\n       ts.add(77);\n       ts.stream().forEach(System.out::println);\n\n   }\n}",
          "explanation": "Source program. Expected output for this input: 1 | 2 | 3 | 4 | 5 | 6 | 77",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "[3, 1, 2], then [1, 2, 3]"
        },
        {
          "table": [
            [
              "Type",
              "Iteration"
            ],
            [
              "HashSet",
              "Unspecified"
            ],
            [
              "LinkedHashSet",
              "Insertion order"
            ],
            [
              "TreeSet",
              "Sorted"
            ]
          ]
        }
      ],
      "hideReview": true
    },
    {
      "id": "synchronizing-a-list",
      "title": "Synchronizing a list",
      "module": "Java Collections",
      "level": "Intermediate",
      "learningObjective": "Recognize when individual synchronized methods are insufficient.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Collections.synchronizedList wraps a list with synchronized access. Synchronize on the wrapper while iterating and when multiple calls must form one atomic action. For read-heavy workloads, CopyOnWriteArrayList offers snapshot iteration at the cost of copying on writes."
        },
        {
          "title": "SynchronizedIteration.java",
          "code": "public class SynchronizedIteration {\n    public static void main(String[] args) {\n        java.util.List<String> fruits = java.util.Collections.synchronizedList(new java.util.ArrayList<>());\n        fruits.add(\"Banana\");\n        synchronized (fruits) {\n            for (String fruit : fruits) System.out.println(fruit);\n        }\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "Banana"
        }
      ],
      "hideReview": true
    },
    {
      "id": "generics-and-type-safety",
      "title": "Generics and type safety",
      "module": "Advanced Java Concepts",
      "level": "Advanced",
      "learningObjective": "Use a type parameter to preserve the element type without casts.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Type parameters let a class or method work with different reference types. The compiler checks assignments such as List<String>. Use Integer in place of int when specifying a type argument. A generic method declares its parameters before the return type."
        },
        {
          "title": "GenericFirst.java",
          "code": "import java.util.List;\n\npublic class GenericFirst {\n    static <T> T first(List<T> values) { return values.get(0); }\n\n    public static void main(String[] args) {\n        String word = first(List.of(\"java\"));\n        System.out.println(word);\n    }\n}",
          "explanation": "The compiler infers T as String. The method requires a nonempty list.",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "java"
        }
      ],
      "hideReview": true
    },
    {
      "id": "threads-and-java-8-language-features",
      "title": "Threads and Java 8 language features",
      "module": "Advanced Java Concepts",
      "level": "Advanced",
      "learningObjective": "Start a thread, wait for it to finish, and recognize lambdas and stream pipelines.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "start schedules a thread to run its task. Calling run directly is an ordinary method call. join waits for completion. A lambda supplies a functional-interface implementation. Streams express transformations without requiring a mutable accumulator. The source’s Java 8 section is brief, so this example connects its listed features to the thread material."
        },
        {
          "title": "ThreadAndStream.java",
          "code": "import java.util.List;\n\npublic class ThreadAndStream {\n    public static void main(String[] args) throws InterruptedException {\n        Thread worker = new Thread(() -> System.out.println(\"Worker finished\"));\n        worker.start();\n        worker.join();\n        List.of(\"Java\", \"Go\", \"Ruby\").stream()\n            .filter(name -> name.length() == 4)\n            .forEach(System.out::println);\n    }\n}",
          "explanation": "join ensures the worker’s line is printed before the stream output.",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "Worker finished, Java, Ruby on separate lines"
        }
      ],
      "hideReview": true
    },
    {
      "id": "bufferedreader-and-design-pattern-notes",
      "title": "BufferedReader and design pattern notes",
      "module": "Advanced Java Concepts",
      "level": "Advanced",
      "learningObjective": "Read lines safely and distinguish the source’s pattern references from its worked examples.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "BufferedReader wraps a Reader and provides readLine. The method returns null at end of input. Try-with-resources closes the reader even if reading fails. The design-pattern section is a reference outline. Its Singleton example appears later in the framework material. A singleton controls instance count, while a factory centralizes object creation."
        },
        {
          "title": "ReadLines.java",
          "code": "import java.io.BufferedReader;\nimport java.io.IOException;\nimport java.io.StringReader;\n\npublic class ReadLines {\n    public static void main(String[] args) throws IOException {\n        try (BufferedReader reader = new BufferedReader(new StringReader(\"Java\\nCollections\"))) {\n            String line;\n            while ((line = reader.readLine()) != null) System.out.println(line);\n        }\n    }\n}",
          "explanation": "Swap StringReader for Files.newBufferedReader when reading a real file.",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "Java, then Collections"
        }
      ],
      "hideReview": true
    },
    {
      "id": "fibonacci-primes-and-digit-sums",
      "title": "Fibonacci primes and digit sums",
      "module": "Java Coding Practice and Interview Preparation",
      "level": "Intermediate",
      "learningObjective": "Trace a recurrence, test divisibility efficiently and process integer digits.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Fibonacci advances a pair of consecutive values. Primality requires checking possible divisors only up to the square root. Using divisor <= n / divisor avoids overflow from squaring the divisor. Repeated remainder and division by ten extract digits from right to left."
        },
        {
          "title": "NumberPractice.java",
          "code": "public class NumberPractice {\n    public static void main(String[] args) {\n        int a = 0, b = 1;\n        for (int i = 0; i < 7; i++) {\n            System.out.print(a + \" \");\n            int next = a + b;\n            a = b;\n            b = next;\n        }\n        int n = 29;\n        boolean prime = n >= 2;\n        for (int d = 2; prime && d <= n / d; d++) prime = n % d != 0;\n        System.out.println(\"\\nPrime: \" + prime);\n        int sum = 0;\n        for (int value = 512; value != 0; value /= 10) sum += value % 10;\n        System.out.println(\"Digit sum: \" + sum);\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "title": "Q_Fibonacci.java",
          "code": "public class Q_Fibonacci {\n   public static void main(String[] args) {\n       int n = 10; // Number of terms\n       int a = 0, b = 1;\n\n       System.out.print(\"Fibonacci Series: \" + a + \" \" + b);\n\n       for (int i = 2; i < n; i++) {\n           int next = a + b;\n           System.out.print(\" \" + next);\n           a = b;\n           b = next;\n       }\n   }\n}",
          "explanation": "Source program. Expected output for this input: Fibonacci Series: 0 1 1 2 3 5 8 13 21 34",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "0 1 1 2 3 5 8, then Prime: true, then Digit sum: 8"
        },
        {
          "heading": "Practice exercise"
        },
        {
          "text": "Test the primality check for 1, 2 and 49."
        }
      ],
      "hideReview": true
    },
    {
      "id": "swap-values-and-find-second-largest",
      "title": "Swap values and find second largest",
      "module": "Java Coding Practice and Interview Preparation",
      "level": "Intermediate",
      "learningObjective": "Swap using a temporary variable or concatenation and handle duplicate maxima.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "A temporary variable works for primitives and references. The concatenation technique for swapping strings recovers each original using its length, but allocates more text. For the second-largest distinct number, track two candidates and skip duplicate maxima. Use an absent value when there is no runner-up."
        },
        {
          "title": "SwapAndRank.java",
          "code": "public class SwapAndRank {\n    public static void main(String[] args) {\n        int a = 12, b = 34;\n        int temp = a; a = b; b = temp;\n        System.out.println(a + \" \" + b);\n        String left = \"Core\", right = \"Java\";\n        left = left + right;\n        right = left.substring(0, left.length() - right.length());\n        left = left.substring(right.length());\n        System.out.println(left + \" \" + right);\n        Integer first = null, second = null;\n        for (int value : new int[]{9, 9, -1, 4}) {\n            if (first == null || value > first) { second = first; first = value; }\n            else if (value < first && (second == null || value > second)) second = value;\n        }\n        System.out.println(second);\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "title": "J_SwapStrings.java",
          "code": "public class J_SwapStrings {\n\n   public static void main(String[] args) {\n       String a=\"Hello\";\n       String b=\"World\";\n       a= a + b;\n       b=a.substring(0,a.length()-b.length());\n       System.out.println(\"b is \" +b);\n       a=a.substring(b.length());\n       System.out.println(\"a is \" +a);\n\n   }\n\n}",
          "explanation": "Source program. Expected output for this input: b is Hello | a is World",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "34 12, Java Core, then 4"
        }
      ],
      "hideReview": true
    },
    {
      "id": "reverse-text-palindrome-and-anagram",
      "title": "Reverse text palindrome and anagram",
      "module": "Java Coding Practice and Interview Preparation",
      "level": "Intermediate",
      "learningObjective": "Distinguish order-sensitive palindrome checks from order-independent anagram checks.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Reversal can use a loop from the last index or StringBuilder.reverse. Repeated immutable concatenation allocates intermediate strings. A palindrome matches its reverse. Anagrams contain the same characters with equal multiplicity. Sorting the two character arrays is a straightforward comparison after choosing a normalization rule."
        },
        {
          "title": "WordPuzzles.java",
          "code": "public class WordPuzzles {\n    public static void main(String[] args) {\n        String word = \"level\";\n        String reversed = new StringBuilder(word).reverse().toString();\n        System.out.println(word.equals(reversed));\n        char[] left = \"listen\".toCharArray();\n        char[] right = \"silent\".toCharArray();\n        java.util.Arrays.sort(left);\n        java.util.Arrays.sort(right);\n        System.out.println(java.util.Arrays.equals(left, right));\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "title": "E_StringPalindromeCheck.java",
          "code": "public class E_StringPalindromeCheck {\n   public static void main(String[] args) {\n       String s = \"arora\";\n       String rev = \"\";\n\n       // Reverse the string `s`\n       for (int i = s.length() - 1; i >= 0; i--) {\n           rev = rev + s.charAt(i); // Constructing the reversed string\n       }\n\n       System.out.println(rev); // Print the reversed string\n\n       // Check if the original string `s` is equal to its reversed version `rev`\n       if (s.equals(rev)) {\n           System.out.println(\"palindrome string\");\n       } else {\n           System.out.println(\"not palindrome\");\n       }\n   }\n}",
          "explanation": "Source program. Expected output for this input: arora | palindrome string",
          "language": "java"
        },
        {
          "title": "ReverseAString.java",
          "code": "public class ReverseAString {\n   public static void main(String[] args) {\n       String s=\"wasim\";\n       String rev=\"\";\n       for (int i = s.length()-1; i >=0 ; i--) {\n          rev=rev+s.charAt(i);\n       }\n       System.out.println(rev);\n\n   }\n}",
          "explanation": "Source program. Expected output for this input: misaw",
          "language": "java"
        },
        {
          "heading": "Expected output"
        },
        {
          "text": "true, then true"
        }
      ],
      "hideReview": true
    },
    {
      "id": "count-words-characters-and-duplicates",
      "title": "Count words characters and duplicates",
      "module": "Java Coding Practice and Interview Preparation",
      "level": "Intermediate",
      "learningObjective": "Separate token counts, word frequency, character frequency and distinct membership.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Split nonblank text on one or more whitespace characters. The array length counts total tokens. A map counts each token or character. LinkedHashMap keeps first-seen order. A set of seen values identifies duplicates when add returns false."
        },
        {
          "title": "CountAndDeduplicate.java",
          "code": "public class CountAndDeduplicate {\n    public static void main(String[] args) {\n        String text = \"java java test\";\n        String[] words = text.isBlank() ? new String[0] : text.strip().split(\"\\\\s+\");\n        var frequency = new java.util.LinkedHashMap<String, Integer>();\n        for (String word : words) frequency.merge(word, 1, Integer::sum);\n        System.out.println(words.length + \" \" + frequency);\n        var counts = new java.util.LinkedHashMap<Integer, Integer>();\n        text.codePoints().filter(c -> c != ' ').forEach(c -> counts.merge(c, 1, Integer::sum));\n        counts.forEach((c, n) -> System.out.print(Character.toString(c) + \"=\" + n + \" \"));\n    }\n}",
          "explanation": "",
          "language": "java"
        },
        {
          "title": "StringDemo11223.java",
          "code": "import java.util.HashMap;\n\npublic class StringDemo11223 {\n\n   static String s = \"Bangalore\";\n\n   public static void CountChar() {\n       // Create a HashMap to store the character and its count\n       HashMap<Character, Integer> charCountMap = new HashMap<>();\n\n       // Iterate over each character in the string\n       for (int i = 0; i < s.length(); i++) {\n           char ch = s.charAt(i);\n\n           // If the character is already in the map, increment its count\n           if (charCountMap.containsKey(ch)) {\n               charCountMap.put(ch, charCountMap.get(ch) + 1);\n           } else {\n               // If the character is not in the map, add it with a count of 1\n               charCountMap.put(ch, 1);\n           }\n       }\n\n       // Print the characters and their occurrences\n       for (HashMap.Entry<Character, Integer> entry : charCountMap.entrySet()) {\n           System.out.println(entry.getKey() + \": \" + entry.getValue());\n       }\n   }\n\n   public static void main(String[] args) {\n       CountChar();\n   }\n}",
          "explanation": "Source program. Expected output for this input: a: 2 | B: 1 | r: 1 | e: 1 | g: 1 | l: 1 | n: 1 | o: 1 Hash-based iteration order can vary.",
          "language": "java"
        },
        {
          "heading": "Practice exercise"
        },
        {
          "text": "Print only characters whose frequency is one, then find duplicate numbers in an array."
        }
      ],
      "hideReview": true
    },
    {
      "id": "oop-and-collections-interview-questions",
      "title": "OOP and collections interview questions",
      "module": "Java Coding Practice and Interview Preparation",
      "level": "Intermediate",
      "learningObjective": "Explain design choices using the source’s interview prompts.",
      "blocks": [
        {
          "heading": "Concept explanation"
        },
        {
          "text": "Describe encapsulation as controlling access to state. Use Teacher and HOD to illustrate inheritance and overriding. Explain the difference between an ordered list with duplicates and a set of unique values. Describe how a map associates keys with values and why stable equals and hashCode matter for hash keys."
        },
        {
          "heading": "Interview questions"
        },
        {
          "text": "Why can an instance method access a static field? What does an instance method need that a static method lacks? When would you choose a default interface method? How do ArrayList and HashMap store and locate values? When would you choose LinkedHashSet over TreeSet?"
        },
        {
          "heading": "Practice exercise"
        },
        {
          "text": "Answer each question with a short example and one limitation."
        }
      ],
      "hideReview": true
    }
  ]
};
