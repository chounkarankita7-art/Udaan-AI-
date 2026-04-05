export interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const questionBank: Record<string, Record<string, Question[]>> = {
  Python: {
    Easy: [
      { id: "py-e-1", question: "Which keyword is used to define a function in Python?", options: ["function", "def", "define", "func"], correct: 1, explanation: "'def' is used to define a function in Python." },
      { id: "py-e-2", question: "What is the output of print(type([]))?", options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "list"], correct: 0, explanation: "[] creates a list object; type([]) returns <class 'list'>." },
      { id: "py-e-3", question: "Which of the following is a mutable data type in Python?", options: ["tuple", "string", "list", "frozenset"], correct: 2, explanation: "Lists are mutable — they can be changed after creation." },
      { id: "py-e-4", question: "What does len('hello') return?", options: ["4", "5", "6", "error"], correct: 1, explanation: "'hello' has 5 characters, so len() returns 5." },
      { id: "py-e-5", question: "Which symbol is used for single-line comments in Python?", options: ["//", "/*", "#", "--"], correct: 2, explanation: "# starts a single-line comment in Python." },
      { id: "py-e-6", question: "What is the result of 3 ** 2 in Python?", options: ["6", "9", "8", "5"], correct: 1, explanation: "** is the exponentiation operator; 3**2 = 9." },
      { id: "py-e-7", question: "Which method is used to add an element at the end of a list?", options: ["add()", "insert()", "append()", "push()"], correct: 2, explanation: "append() adds an element at the end of a list." },
      { id: "py-e-8", question: "What is the output of bool(0)?", options: ["True", "False", "None", "0"], correct: 1, explanation: "0 is falsy in Python, so bool(0) is False." },
      { id: "py-e-9", question: "Which function converts a string to an integer?", options: ["toInt()", "int()", "Integer()", "parse()"], correct: 1, explanation: "int() converts a string or float to an integer." },
      { id: "py-e-10", question: "How do you start a Python for loop?", options: ["for x in range:", "for(x=0;x<n;x++)", "for x in range(n):", "foreach x in n:"], correct: 2, explanation: "Python for loops use the 'for x in iterable:' syntax." },
    ],
    Medium: [
      { id: "py-m-1", question: "What is the difference between a list and a tuple?", options: ["No difference", "Tuples are mutable, lists are not", "Lists are mutable, tuples are not", "Tuples allow duplicates, lists do not"], correct: 2, explanation: "Lists are mutable (changeable), tuples are immutable." },
      { id: "py-m-2", question: "What does the *args syntax do in a function definition?", options: ["Returns multiple values", "Passes keyword arguments", "Passes variable number of positional arguments", "Unpacks a dictionary"], correct: 2, explanation: "*args allows passing a variable number of positional arguments." },
      { id: "py-m-3", question: "Which module is used for regular expressions in Python?", options: ["regex", "re", "regexp", "rx"], correct: 1, explanation: "The 're' module provides regular expression support in Python." },
      { id: "py-m-4", question: "What is a lambda function?", options: ["A recursive function", "An anonymous single-expression function", "A class method", "A built-in function"], correct: 1, explanation: "Lambda creates anonymous functions: lambda x: x*2." },
      { id: "py-m-5", question: "What does list comprehension [x**2 for x in range(3)] return?", options: ["[0, 1, 4]", "[1, 4, 9]", "[0, 1, 2]", "[0, 2, 4]"], correct: 0, explanation: "range(3) gives 0,1,2 → squared = [0, 1, 4]." },
      { id: "py-m-6", question: "What is the GIL in Python?", options: ["Global Import Library", "General Interface Layer", "Global Interpreter Lock", "Generic Integer Limit"], correct: 2, explanation: "The GIL prevents multiple threads from executing Python bytecode simultaneously." },
      { id: "py-m-7", question: "Which method is used to open a file in Python?", options: ["file.open()", "open()", "File()", "read()"], correct: 1, explanation: "The built-in open() function is used to open files." },
      { id: "py-m-8", question: "What does the 'yield' keyword do?", options: ["Returns a value and exits", "Creates a generator function", "Imports a module", "Defines a class property"], correct: 1, explanation: "yield makes a function a generator, pausing and resuming on iteration." },
      { id: "py-m-9", question: "What is the output of sorted([3,1,2], reverse=True)?", options: ["[1,2,3]", "[3,2,1]", "[3,1,2]", "Error"], correct: 1, explanation: "sorted() with reverse=True returns a descending list." },
      { id: "py-m-10", question: "How is a dictionary created in Python?", options: ["[]", "()", "{}", "dict[]"], correct: 2, explanation: "Dictionaries use curly braces {} with key:value pairs." },
    ],
    Hard: [
      { id: "py-h-1", question: "What is a metaclass in Python?", options: ["A subclass", "A class of a class", "A mixin", "An abstract base class"], correct: 1, explanation: "A metaclass defines the behavior of a class itself." },
      { id: "py-h-2", question: "What does __slots__ do in a class?", options: ["Prevents inheritance", "Restricts attribute creation", "Enables multiple inheritance", "Defines class constants"], correct: 1, explanation: "__slots__ restricts the instance to only defined attributes, saving memory." },
      { id: "py-h-3", question: "What is the time complexity of dict lookup in Python?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], correct: 2, explanation: "Python dict uses a hash table, giving O(1) average lookup." },
      { id: "py-h-4", question: "What does functools.lru_cache do?", options: ["Limits function calls", "Caches function results", "Logs function calls", "Limits recursion"], correct: 1, explanation: "lru_cache memoizes function results for the same inputs." },
      { id: "py-h-5", question: "Which design pattern does Python's context manager (with) implement?", options: ["Singleton", "Observer", "RAII/Resource Acquisition Is Initialization", "Factory"], correct: 2, explanation: "Context managers ensure proper resource acquisition and release." },
    ],
  },
  JavaScript: {
    Easy: [
      { id: "js-e-1", question: "Which keyword declares a block-scoped variable?", options: ["var", "let", "scope", "block"], correct: 1, explanation: "'let' and 'const' are block-scoped; 'var' is function-scoped." },
      { id: "js-e-2", question: "What does === check?", options: ["Value only", "Type only", "Value and type", "Reference"], correct: 2, explanation: "=== is strict equality — checks both value and type." },
      { id: "js-e-3", question: "Which method adds an element to the end of an array?", options: ["append()", "push()", "add()", "insert()"], correct: 1, explanation: "push() adds one or more elements to the end of an array." },
      { id: "js-e-4", question: "What is the output of typeof null?", options: ["null", "undefined", "object", "number"], correct: 2, explanation: "typeof null is 'object' — this is a historical bug in JavaScript." },
      { id: "js-e-5", question: "How do you write a comment in JavaScript?", options: ["# comment", "<!-- comment -->", "// comment", "** comment"], correct: 2, explanation: "// is used for single-line comments in JavaScript." },
      { id: "js-e-6", question: "Which method converts a JSON string to a JS object?", options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.toObject()"], correct: 1, explanation: "JSON.parse() parses a JSON string into a JavaScript object." },
      { id: "js-e-7", question: "What is the output of 2 + '3' in JavaScript?", options: ["5", "'23'", "23", "error"], correct: 2, explanation: "JS coerces 2 to a string and concatenates: '23'." },
      { id: "js-e-8", question: "Which event is triggered when a button is clicked?", options: ["onpress", "onclick", "onselect", "ontap"], correct: 1, explanation: "The 'click' event is triggered when a user clicks an element." },
      { id: "js-e-9", question: "What does Array.isArray([1,2,3]) return?", options: ["false", "undefined", "true", "1"], correct: 2, explanation: "Array.isArray() returns true for arrays." },
      { id: "js-e-10", question: "How do you declare an arrow function?", options: ["function => x", "x -> {}", "const f = () => {}", "def f() =>"], correct: 2, explanation: "Arrow functions use the => syntax: const f = () => {}." },
    ],
    Medium: [
      { id: "js-m-1", question: "What is a closure in JavaScript?", options: ["A loop construct", "A function with access to its outer scope", "A sealed object", "An IIFE"], correct: 1, explanation: "A closure is a function that retains access to its enclosing scope." },
      { id: "js-m-2", question: "What does Promise.all() do?", options: ["Runs promises sequentially", "Resolves when all promises resolve", "Rejects all promises", "Returns the fastest promise"], correct: 1, explanation: "Promise.all() resolves when all given promises resolve, or rejects on first failure." },
      { id: "js-m-3", question: "What is event bubbling?", options: ["Event fires multiple times", "Event propagates from child to parent", "Event propagates from parent to child", "Event cancellation"], correct: 1, explanation: "Bubbling: events propagate upward from the target to the root." },
      { id: "js-m-4", question: "What does the 'this' keyword refer to in an arrow function?", options: ["The function itself", "The global object", "The enclosing lexical scope's this", "undefined"], correct: 2, explanation: "Arrow functions don't have their own 'this'; they inherit from the lexical scope." },
      { id: "js-m-5", question: "What is the difference between null and undefined?", options: ["No difference", "null is assigned, undefined is declared but not assigned", "undefined is assigned, null is not", "Both mean no value"], correct: 1, explanation: "undefined: variable declared but not assigned. null: explicitly assigned empty value." },
      { id: "js-m-6", question: "Which method creates a new array without modifying the original?", options: ["splice()", "push()", "map()", "sort()"], correct: 2, explanation: "map() returns a new array; splice() and push() mutate the original." },
      { id: "js-m-7", question: "What does async/await simplify?", options: ["Synchronous code", "Promise-based asynchronous code", "Error handling only", "Module imports"], correct: 1, explanation: "async/await provides syntactic sugar over Promises for cleaner async code." },
      { id: "js-m-8", question: "What is the output of [1,2,3].reduce((a,b) => a+b, 0)?", options: ["6", "3", "0", "error"], correct: 0, explanation: "reduce accumulates: 0+1+2+3 = 6." },
      { id: "js-m-9", question: "What is prototypal inheritance?", options: ["Class-based inheritance", "Objects inheriting from other objects via prototype chain", "Interface implementation", "Mixin pattern"], correct: 1, explanation: "JS uses prototypal inheritance — objects link to other objects via __proto__." },
      { id: "js-m-10", question: "What does Object.freeze() do?", options: ["Copies an object", "Makes an object immutable", "Seals prototype", "Converts to JSON"], correct: 1, explanation: "Object.freeze() prevents adding, removing, or changing properties." },
    ],
    Hard: [
      { id: "js-h-1", question: "What is the event loop in JavaScript?", options: ["A for loop over events", "A mechanism to handle async operations on a single thread", "A multi-threading system", "A DOM event system"], correct: 1, explanation: "The event loop allows JS to perform non-blocking operations despite being single-threaded." },
      { id: "js-h-2", question: "What is a WeakMap?", options: ["A map with weak keys (garbage collected)", "A partial map", "A sorted map", "A read-only map"], correct: 0, explanation: "WeakMap holds weak references to keys, allowing GC when no other refs exist." },
      { id: "js-h-3", question: "What does Symbol() create?", options: ["A string primitive", "A unique and immutable primitive value", "A number", "A boolean"], correct: 1, explanation: "Symbol() creates a unique, immutable primitive — useful as unique keys." },
      { id: "js-h-4", question: "What is the Temporal Dead Zone?", options: ["A zone where time functions fail", "Period where let/const vars exist but are not accessible", "Arrow function scope", "Deleted object scope"], correct: 1, explanation: "TDZ: let/const declarations are hoisted but not initialized until the declaration." },
      { id: "js-h-5", question: "What does structuredClone() do?", options: ["Shallow copies an object", "Deep copies an object", "Freezes an object", "Serializes to JSON"], correct: 1, explanation: "structuredClone() creates a deep copy, handling nested structures and circular refs." },
    ],
  },
  "Data Structures": {
    Easy: [
      { id: "ds-e-1", question: "Which data structure uses LIFO order?", options: ["Queue", "Stack", "Array", "Graph"], correct: 1, explanation: "Stack uses Last In, First Out (LIFO)." },
      { id: "ds-e-2", question: "Which data structure uses FIFO order?", options: ["Stack", "Tree", "Queue", "Heap"], correct: 2, explanation: "Queue uses First In, First Out (FIFO)." },
      { id: "ds-e-3", question: "What is the time complexity of binary search?", options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"], correct: 2, explanation: "Binary search halves the search space each step — O(log n)." },
      { id: "ds-e-4", question: "What is a linked list node composed of?", options: ["Key only", "Value and next pointer", "Index and value", "Two pointers"], correct: 1, explanation: "A linked list node has data and a pointer to the next node." },
      { id: "ds-e-5", question: "Which traversal visits root first in a BST?", options: ["Inorder", "Postorder", "Preorder", "Level order"], correct: 2, explanation: "Preorder: Root → Left → Right." },
      { id: "ds-e-6", question: "What is the best case time complexity of bubble sort?", options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"], correct: 2, explanation: "With an already sorted array, optimized bubble sort runs in O(n)." },
      { id: "ds-e-7", question: "What does a hash table use to map keys to values?", options: ["Binary search", "Hash function", "Linked list traversal", "Sorting"], correct: 1, explanation: "A hash function converts a key to an index in the backing array." },
      { id: "ds-e-8", question: "In a binary tree, each node has at most how many children?", options: ["1", "3", "2", "4"], correct: 2, explanation: "Binary trees have at most 2 children per node: left and right." },
      { id: "ds-e-9", question: "What is the space complexity of a recursive DFS on a graph of n nodes?", options: ["O(1)", "O(n)", "O(n²)", "O(log n)"], correct: 1, explanation: "DFS uses the call stack, which can go as deep as n levels — O(n)." },
      { id: "ds-e-10", question: "Which sorting algorithm has the best average complexity?", options: ["Bubble sort", "Selection sort", "Merge sort", "Insertion sort"], correct: 2, explanation: "Merge sort guarantees O(n log n) in all cases." },
    ],
    Medium: [
      { id: "ds-m-1", question: "What is the difference between a stack and a heap in memory?", options: ["No difference", "Stack for static/local vars, heap for dynamic allocation", "Heap for static, stack for dynamic", "Stack is larger"], correct: 1, explanation: "Stack holds local variables with automatic lifetime; heap holds dynamic allocations." },
      { id: "ds-m-2", question: "What is a balanced BST?", options: ["BST where all nodes have 2 children", "BST where height difference between subtrees is at most 1", "BST sorted alphabetically", "BST with even number of nodes"], correct: 1, explanation: "A balanced BST keeps heights of left and right subtrees within 1 of each other." },
      { id: "ds-m-3", question: "What data structure is ideal for implementing a priority queue?", options: ["Array", "Linked list", "Heap", "Stack"], correct: 2, explanation: "A heap supports O(log n) insert and O(1)/O(log n) extract-min/max." },
      { id: "ds-m-4", question: "What is Dijkstra's algorithm used for?", options: ["Sorting", "Shortest path in weighted graph", "Tree traversal", "Cycle detection"], correct: 1, explanation: "Dijkstra finds the shortest path from a source in a weighted graph." },
      { id: "ds-m-5", question: "What is the time complexity of inserting into a hash table (average)?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], correct: 3, explanation: "Hash tables have O(1) average insertion due to direct index computation." },
      { id: "ds-m-6", question: "What is dynamic programming?", options: ["Programming with dynamic types", "Breaking problems into overlapping subproblems with memoization", "Parallel programming", "Runtime code generation"], correct: 1, explanation: "DP solves complex problems by caching results of overlapping subproblems." },
      { id: "ds-m-7", question: "What is a trie used for?", options: ["Number sorting", "String prefix operations and autocomplete", "Graph traversal", "Memory management"], correct: 1, explanation: "A trie is a tree structure optimized for prefix-based string operations." },
      { id: "ds-m-8", question: "What is the time complexity of quick sort on average?", options: ["O(n²)", "O(n)", "O(n log n)", "O(log n)"], correct: 2, explanation: "Quick sort's average case is O(n log n) with good pivot selection." },
      { id: "ds-m-9", question: "What is a minimum spanning tree?", options: ["Tree with minimum depth", "Subset of graph edges connecting all vertices with minimum total weight", "Tree with fewest nodes", "Shortest path tree"], correct: 1, explanation: "MST connects all vertices with the minimum sum of edge weights." },
      { id: "ds-m-10", question: "What does BFS use internally?", options: ["Stack", "Queue", "Heap", "Recursion"], correct: 1, explanation: "BFS uses a queue to explore nodes level by level." },
    ],
    Hard: [
      { id: "ds-h-1", question: "What is the amortized complexity of push in a dynamic array?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], correct: 2, explanation: "Though individual push can be O(n) when resizing, amortized over n pushes it's O(1)." },
      { id: "ds-h-2", question: "What is a red-black tree?", options: ["A weighted tree", "A self-balancing BST with color properties", "A heap variant", "A graph type"], correct: 1, explanation: "Red-black trees maintain balance using color rules, ensuring O(log n) operations." },
      { id: "ds-h-3", question: "What is the purpose of a segment tree?", options: ["Storing graph edges", "Range queries and point updates in O(log n)", "Sorting arrays", "Storing key-value pairs"], correct: 1, explanation: "Segment trees efficiently handle range sum/min/max queries and point updates." },
      { id: "ds-h-4", question: "What is the difference between DFS and BFS in terms of space complexity?", options: ["Same complexity", "DFS O(h), BFS O(w) where h=height, w=max width", "BFS is always O(1)", "DFS uses O(n²)"], correct: 1, explanation: "DFS space depends on tree height; BFS space depends on maximum tree width." },
      { id: "ds-h-5", question: "What is a Bloom filter?", options: ["A search tree", "A probabilistic data structure to test set membership", "A hash collision resolver", "A compression algorithm"], correct: 1, explanation: "Bloom filters test membership with possible false positives but no false negatives." },
    ],
  },
  "ML/AI": {
    Easy: [
      { id: "ml-e-1", question: "What does ML stand for?", options: ["Meta Learning", "Machine Learning", "Model Logic", "Multi Layer"], correct: 1, explanation: "ML stands for Machine Learning." },
      { id: "ml-e-2", question: "What type of learning uses labeled data?", options: ["Unsupervised", "Reinforcement", "Supervised", "Semi-supervised"], correct: 2, explanation: "Supervised learning trains on labeled input-output pairs." },
      { id: "ml-e-3", question: "What is overfitting?", options: ["Model performs well on training, poorly on test data", "Model is too simple", "Model has too few parameters", "Model underfits the data"], correct: 0, explanation: "Overfitting: model memorizes training data and generalizes poorly." },
      { id: "ml-e-4", question: "Which algorithm is used for classification and regression?", options: ["K-Means", "PCA", "Decision Tree", "DBSCAN"], correct: 2, explanation: "Decision Trees work for both classification and regression tasks." },
      { id: "ml-e-5", question: "What is the activation function Sigmoid's output range?", options: ["-1 to 1", "0 to 1", "-∞ to ∞", "0 to ∞"], correct: 1, explanation: "Sigmoid squashes input to a range of (0, 1)." },
      { id: "ml-e-6", question: "What is K-Means used for?", options: ["Classification", "Regression", "Clustering", "Dimensionality reduction"], correct: 2, explanation: "K-Means groups data into K clusters based on distance." },
      { id: "ml-e-7", question: "What does CNN stand for?", options: ["Circular Neural Network", "Convolutional Neural Network", "Connected Node Network", "Central Neural Net"], correct: 1, explanation: "CNN = Convolutional Neural Network, used primarily for image processing." },
      { id: "ml-e-8", question: "What metric measures classification accuracy?", options: ["MSE", "RMSE", "Accuracy", "R²"], correct: 2, explanation: "Accuracy = (correct predictions) / (total predictions)." },
      { id: "ml-e-9", question: "What is a feature in ML?", options: ["A label", "An input variable used for prediction", "A model parameter", "A loss function"], correct: 1, explanation: "Features are input variables fed to the model for making predictions." },
      { id: "ml-e-10", question: "What is the purpose of the train-test split?", options: ["To reduce data size", "To evaluate model on unseen data", "To clean data", "To normalize features"], correct: 1, explanation: "Splitting lets us evaluate how well the model generalizes to new data." },
    ],
    Medium: [
      { id: "ml-m-1", question: "What is gradient descent?", options: ["A regularization technique", "An optimization algorithm that minimizes loss", "A data preprocessing step", "A neural network layer"], correct: 1, explanation: "Gradient descent iteratively updates parameters to minimize the loss function." },
      { id: "ml-m-2", question: "What is the vanishing gradient problem?", options: ["Loss function becomes 0", "Gradients become too small to update early layers", "Model learns too fast", "Weights explode"], correct: 1, explanation: "In deep networks, gradients shrink as they backpropagate, slowing early layer learning." },
      { id: "ml-m-3", question: "What is dropout in neural networks?", options: ["Removing training samples", "Randomly disabling neurons during training to prevent overfitting", "Reducing learning rate", "Pruning the network after training"], correct: 1, explanation: "Dropout randomly sets neuron activations to 0 during training as regularization." },
      { id: "ml-m-4", question: "What does PCA do?", options: ["Classifies data", "Reduces dimensionality while preserving variance", "Clusters data", "Normalizes features"], correct: 1, explanation: "PCA finds principal components that capture maximum variance with fewer dimensions." },
      { id: "ml-m-5", question: "What is the difference between precision and recall?", options: ["No difference", "Precision: TP/(TP+FP), Recall: TP/(TP+FN)", "Precision: TP/(TP+FN), Recall: TP/(TP+FP)", "Both equal accuracy"], correct: 1, explanation: "Precision measures correct positives; recall measures how many positives were found." },
      { id: "ml-m-6", question: "What is a hyperparameter?", options: ["A learned weight", "A parameter set before training", "The loss function", "An activation function"], correct: 1, explanation: "Hyperparameters (learning rate, epochs, layers) are set before training begins." },
      { id: "ml-m-7", question: "What is transfer learning?", options: ["Moving data between servers", "Using a pre-trained model on a new related task", "Transferring model weights to another language", "Cross-validation technique"], correct: 1, explanation: "Transfer learning reuses knowledge from a pre-trained model for a new task." },
      { id: "ml-m-8", question: "What does LSTM stand for?", options: ["Long Short-Term Memory", "Layered Sequential Training Module", "Linear Supervised Training Model", "Large Scale Text Model"], correct: 0, explanation: "LSTM = Long Short-Term Memory, designed to handle sequential data." },
      { id: "ml-m-9", question: "What is cross-validation?", options: ["Comparing two models", "Evaluating model by splitting data into multiple train/test folds", "Validating data quality", "Checking model against a baseline"], correct: 1, explanation: "Cross-validation (e.g., k-fold) reduces evaluation bias by rotating training/test splits." },
      { id: "ml-m-10", question: "What is L1 regularization also known as?", options: ["Ridge", "Elastic Net", "Dropout", "Lasso"], correct: 3, explanation: "L1 regularization is called Lasso; L2 is called Ridge." },
    ],
    Hard: [
      { id: "ml-h-1", question: "What is the attention mechanism in transformers?", options: ["A focus layer for images", "A mechanism computing weighted relevance of all tokens to each other", "A dropout variant", "An optimizer"], correct: 1, explanation: "Attention allows the model to weigh all input positions when encoding each position." },
      { id: "ml-h-2", question: "What is the bias-variance tradeoff?", options: ["Balancing model complexity vs. simplicity", "Tradeoff between high bias (underfitting) and high variance (overfitting)", "Balancing data and model size", "Tradeoff between accuracy and speed"], correct: 1, explanation: "Complex models have low bias but high variance; simple models the opposite." },
      { id: "ml-h-3", question: "What is RLHF?", options: ["Reinforcement Learning from Human Feedback", "Recursive Layer Hierarchical Framework", "Regularization with Latent Hidden Features", "Residual Learning Hidden Factor"], correct: 0, explanation: "RLHF trains language models using human preference feedback as reward signal." },
      { id: "ml-h-4", question: "What is the purpose of batch normalization?", options: ["Reduce dataset size", "Normalize layer inputs to stabilize and speed up training", "Normalize output predictions", "Shuffle training batches"], correct: 1, explanation: "Batch norm normalizes activations per mini-batch, reducing internal covariate shift." },
      { id: "ml-h-5", question: "What is a GAN?", options: ["Gradient Augmented Network", "Generative Adversarial Network", "Graph Attention Network", "Gated Activation Neuron"], correct: 1, explanation: "GANs train a generator and discriminator in opposition to generate realistic data." },
    ],
  },
  "Web Dev": {
    Easy: [
      { id: "web-e-1", question: "What does HTML stand for?", options: ["HyperText Markup Language", "High Text Machine Learning", "Hyper Transfer Markup Logic", "HyperText Machine Language"], correct: 0, explanation: "HTML = HyperText Markup Language, the structure of web pages." },
      { id: "web-e-2", question: "Which CSS property changes text color?", options: ["font-color", "text-color", "color", "foreground"], correct: 2, explanation: "The 'color' property sets the text color in CSS." },
      { id: "web-e-3", question: "What does the 'box model' include?", options: ["Content only", "Content, padding, border, margin", "Content and margin", "Content, padding, border"], correct: 1, explanation: "The CSS box model: content → padding → border → margin." },
      { id: "web-e-4", question: "What HTTP method is used to retrieve data?", options: ["POST", "PUT", "GET", "DELETE"], correct: 2, explanation: "GET requests retrieve data; POST submits data." },
      { id: "web-e-5", question: "What is the purpose of the <meta> tag?", options: ["Display content", "Provide metadata about the document", "Style elements", "Link scripts"], correct: 1, explanation: "Meta tags provide metadata like charset, viewport, description, author." },
      { id: "web-e-6", question: "What does CSS stand for?", options: ["Color Style Sheets", "Cascading Style Sheets", "Computer Style System", "Creative Styling Script"], correct: 1, explanation: "CSS = Cascading Style Sheets, used to style HTML documents." },
      { id: "web-e-7", question: "Which HTML tag creates a hyperlink?", options: ["<link>", "<url>", "<a>", "<href>"], correct: 2, explanation: "<a href='...'> creates a clickable hyperlink." },
      { id: "web-e-8", question: "What is the purpose of the alt attribute on <img>?", options: ["Set image dimensions", "Provide alternate text for accessibility", "Link to an image URL", "Set image border"], correct: 1, explanation: "alt provides descriptive text for screen readers and when image fails to load." },
      { id: "web-e-9", question: "What does 'responsive design' mean?", options: ["Fast loading design", "Design that adapts to different screen sizes", "Animated design", "Design with many colors"], correct: 1, explanation: "Responsive design ensures websites work well on all screen sizes and devices." },
      { id: "web-e-10", question: "What is a REST API?", options: ["A database", "An architectural style for networked applications using HTTP", "A JavaScript framework", "A CSS preprocessor"], correct: 1, explanation: "REST (Representational State Transfer) is a widely-used API design pattern over HTTP." },
    ],
    Medium: [
      { id: "web-m-1", question: "What is the difference between display:flex and display:grid?", options: ["No difference", "Flex is 1D layout; grid is 2D layout", "Grid is 1D; flex is 2D", "Flex only works horizontally"], correct: 1, explanation: "Flexbox is 1-dimensional (row or column); Grid is 2-dimensional (rows and columns)." },
      { id: "web-m-2", question: "What is CORS?", options: ["A CSS feature", "Cross-Origin Resource Sharing — controls cross-domain requests", "A compression standard", "A caching policy"], correct: 1, explanation: "CORS is a browser security mechanism controlling which origins can make cross-site requests." },
      { id: "web-m-3", question: "What is a JWT?", options: ["Java Web Token", "JSON Web Token — a signed token for auth", "JavaScript Web Transfer", "Joint Web Transaction"], correct: 1, explanation: "JWT is a compact, self-contained token carrying claims, signed with a secret or key." },
      { id: "web-m-4", question: "What is the virtual DOM in React?", options: ["A copy of the real DOM in memory for efficient updates", "A different browser API", "A DOM without JavaScript", "A CSS shadow DOM"], correct: 0, explanation: "React uses a virtual DOM to diff changes and minimize real DOM updates." },
      { id: "web-m-5", question: "What does localStorage.setItem() do?", options: ["Sets a cookie", "Stores a key-value pair in persistent browser storage", "Stores session data", "Sends data to the server"], correct: 1, explanation: "localStorage persists key-value pairs in the browser with no expiration." },
      { id: "web-m-6", question: "What is the difference between HTTP and HTTPS?", options: ["HTTPS uses different ports", "HTTPS encrypts data using TLS/SSL", "HTTP is newer", "HTTPS only works for APIs"], correct: 1, explanation: "HTTPS uses TLS/SSL to encrypt data in transit, unlike plain HTTP." },
      { id: "web-m-7", question: "What is semantic HTML?", options: ["HTML with styling", "Using elements that convey meaning about content", "Minified HTML", "HTML with JavaScript"], correct: 1, explanation: "Semantic elements like <article>, <nav>, <main> describe their content's meaning." },
      { id: "web-m-8", question: "What is debouncing in web development?", options: ["Preventing button clicks", "Delaying function execution until after a pause in events", "Caching API responses", "Lazy loading images"], correct: 1, explanation: "Debouncing ensures a function only fires after a specified delay of inactivity." },
      { id: "web-m-9", question: "What does SSR stand for?", options: ["Static Site Routing", "Server Side Rendering", "Secure Socket Rendering", "Simple Style Rules"], correct: 1, explanation: "SSR renders pages on the server and sends HTML to the client." },
      { id: "web-m-10", question: "What is a service worker?", options: ["A backend worker thread", "A script running in the background enabling offline and push features", "A web server process", "A CSS animation worker"], correct: 1, explanation: "Service workers run independently of web pages, enabling offline caching and push notifications." },
    ],
    Hard: [
      { id: "web-h-1", question: "What is the Critical Rendering Path?", options: ["The fastest server route", "Steps the browser takes to convert HTML/CSS/JS into pixels", "The main.js bundle path", "A CDN routing strategy"], correct: 1, explanation: "CRP: HTML parsing → DOM, CSS parsing → CSSOM → Render tree → Layout → Paint." },
      { id: "web-h-2", question: "What is hydration in SSR frameworks?", options: ["Adding water to CSS animations", "Attaching JS event handlers to server-rendered HTML", "Loading images lazily", "Pre-fetching API data"], correct: 1, explanation: "Hydration makes server-rendered HTML interactive by attaching client-side JS." },
      { id: "web-h-3", question: "What is Content Security Policy (CSP)?", options: ["A caching header", "An HTTP header that restricts resource loading to prevent XSS", "A CORS alternative", "A data compression policy"], correct: 1, explanation: "CSP headers tell browsers which sources are safe, reducing XSS attack surface." },
      { id: "web-h-4", question: "What is the difference between microtasks and macrotasks?", options: ["No difference", "Microtasks (Promises) run before macrotasks (setTimeout) in each event loop tick", "Macrotasks run first", "Both run simultaneously"], correct: 1, explanation: "After each macrotask, all microtasks are flushed before the next macrotask runs." },
      { id: "web-h-5", question: "What is tree shaking?", options: ["Removing unused CSS", "Eliminating dead code from JS bundles at build time", "Pruning DOM nodes", "Removing event listeners"], correct: 1, explanation: "Tree shaking statically analyzes imports and removes unused code from the final bundle." },
    ],
  },
};

export function getQuestions(category: string, difficulty: string, count: number = 10): Question[] {
  const pool = questionBank[category]?.[difficulty] || [];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
