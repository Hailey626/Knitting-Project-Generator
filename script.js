let stitches = 24; // Default stitches
let rows = 10; // Default rows
let rowColors = []; // Array to store colors for each row

function setup() {
  // Create the canvas dynamically
  const canvasContainer = document.getElementById('canvas-container');
  const canvas = createCanvas(800, 400);
  canvas.parent(canvasContainer);
  noLoop(); // Prevent automatic redrawing

  // Initialize color pickers
  initializeRowColors();
}

function draw() {
  background(255);

  const stitchWidth = width / stitches;
  const rowHeight = height / rows;

  for (let row = 0; row < rows; row++) {
    for (let stitch = 0; stitch < stitches; stitch++) {
      const x = stitch * stitchWidth;
      const y = row * rowHeight;

      // Use the assigned color for this row
      const color = rowColors[row] || "#ffffff"; // Default to white if no color is assigned
      fill(color);
      rect(x, y, stitchWidth, rowHeight);
    }
  }
}

// Dynamically create color pickers for each row
function initializeRowColors() {
  const rowColorsContainer = document.getElementById('row-colors');
  rowColorsContainer.innerHTML = ""; // Clear existing color pickers

  for (let i = 0; i < rows; i++) {
    const colorInput = document.createElement('input');
    colorInput.type = "color";
    colorInput.value = getRandomColor(); // Assign a random default color
    colorInput.dataset.row = i;

    // Update color array when the user selects a color
    colorInput.addEventListener('input', (e) => {
      const row = parseInt(e.target.dataset.row);
      rowColors[row] = e.target.value;
      redraw();
    });

    const label = document.createElement('label');
    label.textContent = `Row ${i + 1}:`;
    label.appendChild(colorInput);

    rowColorsContainer.appendChild(label);
  }

  // Initialize rowColors array with default colors
  rowColors = Array.from({ length: rows }, () => getRandomColor());
}

// Generate a random color (optional, for initial assignment)
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

// Update values and redraw when sliders change
document.getElementById('stitches').addEventListener('input', (e) => {
  stitches = parseInt(e.target.value);
  document.getElementById('stitches-value').textContent = stitches;
  redraw();
});

document.getElementById('rows').addEventListener('input', (e) => {
  rows = parseInt(e.target.value);
  document.getElementById('rows-value').textContent = rows;
  initializeRowColors(); // Recreate color pickers
  redraw();
});
