'use strict'

// Queue Array to store elements
let queue = [];

// Function to enqueue an element to the queue
function enqueue() {
  let queueInput = document.getElementById("queueInput");
  let element = queueInput.value;
  if (element !== "") {
    if (queue.length < 10) { // Limiting queue size to 10 for demonstration purposes
      queue.push(element);
      updateQueueVisuals();
    } else {
      alert("Queue is full!");
    }
    queueInput.value = "";
  }
}

// Function to dequeue an element from the queue
function dequeue() {
  if (queue.length > 0) {
    queue.shift(); // Remove the first element from the queue (FIFO)
    updateQueueVisuals();
  } else {
    alert("Queue is empty!");
  }
}

// Function to peek the front element of the queue
function firstEl() {
  if (queue.length > 0) {
    alert("Front element of Queue: " + queue[0]);
  } else {
    alert("Queue is empty!");
  }
}

// Function to clear the queue
function clearQueue() {
  if (queue.length > 0) {
    queue = []; // Clear the entire queue
    updateQueueVisuals();
  } else {
    alert("Queue is already empty!");
  }
}

// Function to find the maximum element in the queue
function maxElement() {
  if (queue.length > 0) {
    let maxElement = Math.max(...queue); // Find the maximum element in the queue
    alert("Maximum element in Queue: " + maxElement);
  } else {
    alert("Queue is empty!");
  }
}

// Function to find the minimum element in the queue
function minElement() {
  if (queue.length > 0) {
    let minElement = Math.min(...queue); // Find the minimum element in the queue
    alert("Minimum element in Queue: " + minElement);
  } else {
    alert("Queue is empty!");
  }
}

// Function to search for an element in the queue
function search() {
  let queueInput = document.getElementById("queueInput");
  let element = queueInput.value;
  if (element !== "") {
    let index = queue.findIndex((value) => String(value) === element); // Convert to string before comparison
    if (index !== -1) {
      alert("Element found at index: " + index);
    } else {
      alert("Element not found in the queue.");
    }
  } else {
    alert("Please enter an element to search.");
  }
}

// Function to remove an element from the queue
function remove() {
  let queueInput = document.getElementById("queueInput");
  let element = queueInput.value;
  if (element !== "") {
    let index = queue.findIndex((value) => String(value) === element); // Convert to string before comparison
    if (index !== -1) {
      queue.splice(index, 1); // Remove the element at the specified index from the queue
      updateQueueVisuals();
    } else {
      alert("Element not found in the queue.");
    }
  } else {
    alert("Please enter an element to remove.");
  }
}

// Function to update the queue visuals
function updateQueueVisuals() {
  let queueBoxes = document.getElementById("queueBoxes");
  queueBoxes.innerHTML = ""; // Clear existing queue visuals
  for (let i = 0; i < queue.length; i++) { // Loop from the front of the queue to the end
    let box = document.createElement("div");
    box.className = "box";
    box.textContent = queue[i];
    queueBoxes.appendChild(box);
  }
}



// Function to generate a random queue
function random() {
  let length = Math.floor(Math.random() * 10) + 1; // Random queue length between 1 and 10
  queue = [];
  for (let i = 0; i < length; i++) {
    let element = Math.floor(Math.random() * 100); // Random element between 0 and 99
    queue.push(element);
  }
  updateQueueVisuals();
}

