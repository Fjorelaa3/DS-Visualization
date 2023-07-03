'use strict';

let stack = [];

// Function to push an element to the stack
function pushToStack() {
  let stackInput = document.getElementById("stackInput");
  let element = stackInput.value;
  if (element !== "") {
    if (stack.length < 10) { // Check if the stack size is less than the limit
      stack.push(element);
      updateStackVisuals();
    } else {
      alert("Stack is full!");
    }
    stackInput.value = ""; // Clear the input field
  }
}

// Function to pop an element from the stack
function popFromStack() {
  if (stack.length > 0) { // Check if the stack is not empty
    stack.pop(); // Remove the top element from the stack
    updateStackVisuals();
  } else {
    alert("Stack is empty!");
  }
}

// Function to peek the top element of the stack
function peekStack() {
  if (stack.length > 0) { // Check if the stack is not empty
    alert("Top element of Stack: " + stack[stack.length - 1]); // Display the top element of the stack
  } else {
    alert("Stack is empty!"); // Display an alert if the stack is empty
  }
}

// Function to clear the stack
function clearStack() {
  if (stack.length > 0) { // Check if the stack is not empty
    stack = []; // Clear the stack by assigning an empty array
    updateStackVisuals();
  } else {
    alert("Stack is already empty!"); // Display an alert if the stack is already empty
  }
}

// Function to find the maximum element in the stack
function maxElement() {
  if (stack.length > 0) { // Check if the stack is not empty
    let maxElement = Math.max(...stack.map(Number)); // Find the maximum element using Math.max and convert stack elements to numbers
    alert("Maximum element in Stack: " + maxElement); // Display the max element
  } else {
    alert("Stack is empty!");
  }
}

// Function to find the minimum element in the stack
function minElement() {
  if (stack.length > 0) { // Check if the stack is not empty
    let minElement = Math.min(...stack.map(Number)); // Find the minimum element using Math.min and convert stack elements to numbers
    alert("Minimum element in Stack: " + minElement); // Display the minimum element
  } else {
    alert("Stack is empty!");
  }
}

// Function to update the stack visuals
function updateStackVisuals() {
  let stackBoxes = document.getElementById("stackBoxes");
  stackBoxes.innerHTML = ""; // Clear the existing stack visuals
  for (let i = stack.length - 1; i >= 0; i--) {
    let box = document.createElement("div"); // Create a div element for each stack element
    box.className = "box";
    box.textContent = stack[i]; // Set the text content of the div element to the stack element
    stackBoxes.appendChild(box); // Append the div element to the stackBoxes container
  }
}

// Function to search for an element in the stack
function search() {
  let stackInput = document.getElementById("stackInput");
  let element = stackInput.value;
  if (element !== "") { // Check if the search element is not empty
    let indices = [];
    stack.forEach((value, index) => {
      if (value == element) { // Use loose equality (==) to compare parsed values
        indices.push(index); // Add the index
      }
    });

    if (indices.length > 0) { // Check if any indices were found
      alert("Element found at indices: " + indices.join(", ")); // Display the indices where the element was found
    } else {
      alert("Element not found in the stack."); // Display an alert if the element was not found
    }
  } else {
    alert("Please enter an element to search."); // Display an alert if no search element was entered
  }
}

// Function to remove an element from the stack
function remove() {
  let stackInput = document.getElementById("stackInput");
  let element = stackInput.value;
  if (element !== "") { // Check if the element to be removed is not empty
    let indices = [];
    stack.forEach((value, index) => {
      if (value == element) { // Use loose equality (==) to compare parsed values
        indices.push(index); // Add the index to the indices array if the element is found
      }
    });

    if (indices.length > 0) { // Check if any indices were found
      indices.forEach((index) => {
        stack.splice(index, 1); // Remove the element from the stack using its index
      });
      updateStackVisuals(); // Update the stack visuals
    } else {
      alert("Element not found in the stack."); // Display an alert if the element was not found
    }
  } else {
    alert("Please enter an element to remove."); // Display an alert if no element to remove was entered
  }
}

// Function to generate a random stack
function random() {
  let length = Math.floor(Math.random() * 10) + 1; // Generate a random stack length between 1 and 10
  stack = []; // Clear the stack
  for (let i = 0; i < length; i++) {
    let element = Math.floor(Math.random() * 100); // Generate a random element between 0 and 99
    stack.push(element); // Add the element to the stack
  }
  updateStackVisuals(); // Update the stack visuals
}

