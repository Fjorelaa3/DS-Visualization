// BSTNode class represents a single node in the BST
class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// BST class represents the Binary Search Tree
class BST {
  constructor() {
    this.root = null;
  }

  // Insert a node with the given value into the BST
  insert(value) {
    const newNode = new BSTNode(value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  // Remove a node with the given value from the BST
  remove(value) {
    this.root = this.removeNode(this.root, value);
  }

  removeNode(node, key) {
    if (node === null) {
      return null;
    } else if (key < node.value) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.value) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // Node to be deleted has no children or one child
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }
  
      // Node to be deleted has two children
      const successor = this.findSuccessor(node.right, true);
      if (successor === node.right) {
        // If the successor is the immediate right child
        node.value = successor.value;
        node.right = this.removeNode(node.right, successor.value);
      } else {
        // If the successor is from the left subtree of the right child
        node.value = successor.value;
        node.right = this.removeNode(node.right, successor.value);
      }
  
      return node;
    }
  }
  

  // Search for a node with the given value in the BST
  search(value) {
    return this.searchNode(this.root, value);
  }

  searchNode(node, value) {
    if (node === null) {
      return null;
    }

    if (node.value === value) {
      return node;
    }

    if (value < node.value) {
      return this.searchNode(node.left, value);
    } else if (value > node.value) {
      return this.searchNode(node.right, value);
    } else {
      return null;
    }
  }

// Find the minimum value in the BST
 findMin(node = this.root) {
  if (node === null) {
    return null;
  }

  while (node.left !== null) {
    node = node.left;
  }
  return node.value;
}

// Find the maximum value in the BST
findMax(node = this.root) {
  if (node === null) {
    return null;
  }

  while (node.right !== null) {
    node = node.right;
  }
  return node.value;
}

  // Perform an inorder traversal of the BST
  inorder(node, callback) {
    if (node !== null) {
      this.inorder(node.left, callback);
      callback(node.value);
      this.inorder(node.right, callback);
    }
  }

  // Perform a preorder traversal of the BST
  preorder(node, callback) {
    if (node !== null) {
      callback(node.value);
      this.preorder(node.left, callback);
      this.preorder(node.right, callback);
    }
  }

  // Perform a postorder traversal of the BST
  postorder(node, callback) {
    if (node !== null) {
      this.postorder(node.left, callback);
      this.postorder(node.right, callback);
      callback(node.value);
    }
  }

  // Find the successor of a node with the given value in the BST
  findSuccessor(nodeOrValue, returnNode = false) {
    let node = null;
    if (typeof nodeOrValue === 'object') {
      node = nodeOrValue;
    } else {
      node = this.searchNode(this.root, nodeOrValue);
    }
  
    if (node === null) {
      return null;
    }
  
    if (node.right !== null) {
      let current = node.right;
      while (current.left !== null) {
        current = current.left;
      }
      return returnNode ? current : current.value;
    } else {
      let successor = null;
      let ancestor = this.root;
      while (ancestor !== node) {
        if (node.value < ancestor.value) {
          successor = ancestor;
          ancestor = ancestor.left;
        } else {
          ancestor = ancestor.right;
        }
      }
      return returnNode ? successor : (successor !== null ? successor.value : null);
    }
  }
  
  // Find the predecessor of a node with the given value in the BST
  findPredecessor(value) {
    const node = this.searchNode(this.root, value);
    console.log({node: node})
    if (node === null) {
      return null;
    }

    if (node.left !== null) {
      let current = node.left;
      while (current.right !== null) {
        current = current.right;
      }
      return current.value;
    } else {
      let predecessor = null;
      let ancestor = this.root;
      while (ancestor !== node) {
        if (node.value > ancestor.value) {
          predecessor = ancestor;
          ancestor = ancestor.right;
        } else {
          ancestor = ancestor.left;
        }
      }
      if (predecessor === null) {
        return null;
      }
      return predecessor.value;
    }
  }


  // Clear the BST by setting the root to null
  clear() {
    this.root = null;
  }

  // Generate a random BST
  generateRandomTree(isBalanced) {
    this.clear();
    if (isBalanced) {
      this.generateBalancedTree();
    } else {
      this.generateUnbalancedTree();
    }
  }

  generateBalancedTree() {
    this.clear(); // Clear the existing tree
    
    const values = this.getRandomUniqueValues();
    values.sort((a, b) => a - b);
    this.root = this.generateBalancedTreeHelper(values, 0, values.length - 1);
  }
  

  generateBalancedTreeHelper(values, start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const newNode = new BSTNode(values[mid]);
    newNode.left = this.generateBalancedTreeHelper(values, start, mid - 1);
    newNode.right = this.generateBalancedTreeHelper(values, mid + 1, end);
    return newNode;
  }

  generateUnbalancedTree() {
    const values = this.getRandomUniqueValues();
    for (let i = 0; i < values.length; i++) {
      this.insert(values[i]);
    }
  }

  getRandomUniqueValues() {
    const values = [];
    const range = 100;
    for (let i = 1; i <= range; i++) {
      values.push(i);
    }
    for (let i = values.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }
    return values.slice(0, 10);
  }
}

// Initialize the Binary Search Tree
const bst = new BST();

// Function to draw the BST visualization
function drawBST() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  
  // Adjust canvas size
  canvas.width = 1000;
  canvas.height = 500;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Clear the result div
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = "";

  // Calculate the maximum depth of the BST
  const maxDepth = calculateMaxDepth(bst.root);

  // Calculate the width and height of each node based on the maximum depth
  const nodeSize = 40; // Adjust the desired node size
  const childOffsetX = nodeSize * 3; // Adjust child offset
  const edgeWidth = 2; // Adjust edge width

  // Set the initial x and y coordinates for the root node
  const rootX = canvas.width / 2;
  const rootY = nodeSize; // Adjust root node position

  // Draw the BST nodes
  drawNode(bst.root, rootX, rootY, nodeSize);

  // Draw the BST edges
  drawEdges(bst.root, rootX, rootY, nodeSize, edgeWidth);
}

// Function to calculate the width of the subtree rooted at a given node
function calculateSubtreeWidth(node, size) {
  if (node === null) {
    return 0;
  }
  return calculateSubtreeWidth(node.left, size) + size + calculateSubtreeWidth(node.right, size);
}

function drawNode(node, x, y, size) {
  if (node === null) {
    return;
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Draw the node
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#000000";
  ctx.stroke();

  // Draw the node value
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "14px Arial";
  ctx.fillText(node.value, x, y);
  // Calculate the width of the subtree rooted at the current node
  const subtreeWidth = calculateSubtreeWidth(node, size);

  // Calculate the offset for the next level of nodes based on the subtree width
  const childOffsetX = subtreeWidth / 2;

  // Draw the left child
  if (node.left !== null) {
    const leftX = x - childOffsetX;
    const leftY = y + size * 2;
    ctx.beginPath();
    ctx.moveTo(x, y + size / 2);
    ctx.lineTo(leftX, leftY - size / 2);
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    drawNode(node.left, leftX, leftY, size); // Recursively draw left child node
  }

  // Draw the right child
  if (node.right !== null) {
    const rightX = x + childOffsetX;
    const rightY = y + size * 2;
    ctx.beginPath();
    ctx.moveTo(x, y + size / 2);
    ctx.lineTo(rightX, rightY - size / 2);
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    drawNode(node.right, rightX, rightY, size); // Recursively draw right child node
  }
}

function drawEdges(node, x, y, size, edgeWidth) {
  if (node === null) {
    return;
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

 // Calculate the width of the subtree rooted at the current node
 const subtreeWidth = calculateSubtreeWidth(node, size);

 // Calculate the offset for the next level of nodes based on the subtree width
 const childOffsetX = subtreeWidth / 2;

  // Draw the left edge
  if (node.left !== null) {
    const leftX = x - childOffsetX;
    const leftY = y + size * 2;
    ctx.beginPath();
    ctx.moveTo(x, y + size / 2);
    ctx.lineTo(leftX, leftY - size / 2);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = edgeWidth;
    ctx.stroke();
    drawEdges(node.left, leftX, leftY, size, edgeWidth); // Pass edgeWidth parameter
  }

  // Draw the right edge
  if (node.right !== null) {
    const rightX = x + childOffsetX;
    const rightY = y + size * 2;
    ctx.beginPath();
    ctx.moveTo(x, y + size / 2);
    ctx.lineTo(rightX, rightY - size / 2);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = edgeWidth;
    ctx.stroke();
    drawEdges(node.right, rightX, rightY, size, edgeWidth); // Pass edgeWidth parameter
  }
}

function calculateMaxDepth(node) {
  if (node === null) {
    return 0;
  }

  const leftDepth = calculateMaxDepth(node.left);
  const rightDepth = calculateMaxDepth(node.right);

  return Math.max(leftDepth, rightDepth) + 1;
}

// Add a node to the BST
function addNode() {
  const valueInput = document.getElementById("addInput");
  const value = parseInt(valueInput.value);
  if (!isNaN(value)) {
    bst.insert(value);
    drawBST();
    valueInput.value = "";
  }
}

// Remove a node from the BST
function removeNode() {
  const valueInput = document.getElementById("removeInput");
  const value = parseInt(valueInput.value);
  if (!isNaN(value)) {
    bst.remove(value);
    drawBST();
    valueInput.value = "";
  }
}

// Clear the BST
function clearTree() {
  bst.clear();
  drawBST();
}

// Search for a node in the BST
function search() {
  const valueInput = document.getElementById("searchInput");
  const value = parseInt(valueInput.value);
  if (!isNaN(value)) {
    const found = bst.search(value);
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = found ? "Found" : "Not Found";
    valueInput.value = "";
  }
}

// Find the minimum value in the BST
function findMin() {
  const min = bst.findMin();
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = min !== null ? min.toString() : "Empty";
}

// Find the maximum value in the BST
function findMax() {
  const max = bst.findMax();
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = max !== null ? max.toString() : "Empty";
}

// Find the successor of a node in the BST
function findSuccessor() {
  const valueInput = document.getElementById("successorInput");
  console.log({valueInput: valueInput})
  const value = parseInt(valueInput.value);
  console.log({value: value})
  if (!isNaN(value)) {
    const successor = bst.findSuccessor(value);
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = successor !== null ? successor.toString() : "Not Found";
    valueInput.value = "";
  }
}

// Find the predecessor of a node in the BST
function findPredecessor() {
  const valueInput = document.getElementById("predecessorInput");
  console.log({valueInput: valueInput})
  const value = parseInt(valueInput.value);
  console.log({value: value})
  if (!isNaN(value)) {
    const predecessor = bst.findPredecessor(value);
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = predecessor !== null ? predecessor.toString() : "Not Found";
    valueInput.value = "";
  }
}

// Perform a traversal of the BST
function traverse() {
  const traverseSelect = document.getElementById("traverseSelect");
  const selectedOption = traverseSelect.options[traverseSelect.selectedIndex].value;
  const resultDiv = document.getElementById("result");
  let result = "";

  switch (selectedOption) {
    case "inorder":
      bst.inorder(bst.root, value => {
        result += value + " ";
      });
      resultDiv.textContent = result;
      break;
    case "preorder":
      bst.preorder(bst.root, value => {
        result += value + " ";
      });
      resultDiv.textContent = result;
      break;
    case "postorder":
      bst.postorder(bst.root, value => {
        result += value + " ";
      });
      resultDiv.textContent = result;
      break;
  }
}

// Generate a random BST
function balance() {
  const balanceSelect = document.getElementById("balanceSelect");
  const selectedOption = balanceSelect.options[balanceSelect.selectedIndex].value;

  bst.generateRandomTree(selectedOption === "balanced");
  drawBST();
}


// Initialize the BST visualization
function init() {
  const addButton = document.getElementById("addButton");
  addButton.addEventListener("click", addNode);

  const removeButton = document.getElementById("removeButton");
  removeButton.addEventListener("click", removeNode);

  const clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", clearTree);

  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", search);

  const minButton = document.getElementById("minButton");
  minButton.addEventListener("click", findMin);

  const maxButton = document.getElementById("maxButton");
  maxButton.addEventListener("click", findMax);

  const successorButton = document.getElementById("successorButton");
  successorButton.addEventListener("click", findSuccessor);

  const predecessorButton = document.getElementById("predecessorButton");
  predecessorButton.addEventListener("click", findPredecessor);

  const traverseButton = document.getElementById("traverseButton");
  traverseButton.addEventListener("click", traverse);

  const balanceButton = document.getElementById("balanceButton");
  balanceButton.addEventListener("click", balance);

  drawBST();


init();
}