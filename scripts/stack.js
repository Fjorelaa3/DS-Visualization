'use strict';

const stack = [];
const stackLimit = 10;

// Helper function to get input value
function getInputValue() {
  return document.getElementById("stackInput").value.trim();
}

// Function to push an element to the stack
function pushToStack() {
  const element = getInputValue();
  if (!element) {
    alert("Please enter an element to push.");
    return;
  }
  if (stack.length < stackLimit) {
    stack.push(element);
    updateStackVisuals();
  } else {
    alert("Stack is full!");
  }
  document.getElementById("stackInput").value = "";
}

// Function to pop an element from the stack
function popFromStack() {
  if (stack.length > 0) {
    stack.pop();
    updateStackVisuals();
  } else {
    alert("Stack is empty!");
  }
}

// Function to peek the top element of the stack
function peekStack() {
  if (stack.length > 0) {
    alert(`Top element of Stack: ${stack[stack.length - 1]}`);
  } else {
    alert("Stack is empty!");
  }
}

// Function to clear the stack
function clearStack() {
  if (stack.length > 0) {
    stack.length = 0; // Clear the stack
    updateStackVisuals();
  } else {
    alert("Stack is already empty!");
  }
}

// Function to find the maximum element in the stack
function maxElement() {
  if (stack.length > 0) {
    const maxElement = Math.max(...stack.map(Number));
    alert(`Maximum element in Stack: ${maxElement}`);
  } else {
    alert("Stack is empty!");
  }
}

// Function to find the minimum element in the stack
function minElement() {
  if (stack.length > 0) {
    const minElement = Math.min(...stack.map(Number));
    alert(`Minimum element in Stack: ${minElement}`);
  } else {
    alert("Stack is empty!");
  }
}

// Function to update the stack visuals
function updateStackVisuals() {
  const stackBoxes = document.getElementById("stackBoxes");
  stackBoxes.innerHTML = ""; // Clear the existing stack visuals
  stack.slice().reverse().forEach(value => {
    const box = document.createElement("div");
    box.className = "box";
    box.textContent = value;
    stackBoxes.appendChild(box);
  });
}

// Function to search for an element in the stack
function search() {
  const searchElement = getInputValue();
  if (!searchElement) {
    alert("Please enter an element to search.");
    return;
  }

  // Convert searchElement to a number for numeric comparison
  const searchValue = Number(searchElement);
  const index = stack.findIndex(element => Number(element) === searchValue);

  if (index !== -1) {
    alert(`Element "${searchElement}" found at position: ${index + 1}`);
  } else {
    alert(`Element "${searchElement}" not found in the stack.`);
  }
  document.getElementById("stackInput").value = "";
}

// Function to remove an element from the stack
function remove() {
  const element = getInputValue();
  if (!element) {
    alert("Please enter an element to remove.");
    return;
  }

  // Convert element to a number for numeric comparison
  const elementValue = Number(element);
  const indices = [];
  stack.forEach((value, index) => {
    if (Number(value) === elementValue) {
      indices.push(index);
    }
  });

  if (indices.length > 0) {
    // Remove elements from the stack, iterate in reverse to prevent index shifting
    for (let i = indices.length - 1; i >= 0; i--) {
      stack.splice(indices[i], 1);
    }
    updateStackVisuals();
  } else {
    alert("Element not found in the stack.");
  }
}

// Function to generate a random stack
function random() {
  const length = Math.floor(Math.random() * stackLimit) + 1;
  stack.length = 0; // Clear the stack
  for (let i = 0; i < length; i++) {
    const element = Math.floor(Math.random() * 100);
    stack.push(element);
  }
  updateStackVisuals();
}

// Add event listeners for the buttons
document.getElementById("pushButton").addEventListener("click", pushToStack);
document.getElementById("popButton").addEventListener("click", popFromStack);
document.getElementById("peekButton").addEventListener("click", peekStack);
document.getElementById("clearButton").addEventListener("click", clearStack);
document.getElementById("maxButton").addEventListener("click", maxElement);
document.getElementById("minButton").addEventListener("click", minElement);
document.getElementById("searchButton").addEventListener("click", search);
document.getElementById("removeButton").addEventListener("click", remove);
document.getElementById("randomButton").addEventListener("click", random);
