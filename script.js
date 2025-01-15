// Elements
const stitchesInput = document.getElementById('stitches');
const rowsInput = document.getElementById('rows');
const stitchesValue = document.getElementById('stitches-value');
const rowsValue = document.getElementById('rows-value');
const rowColorsContainer = document.getElementById('row-colors');
const canvas = document.getElementById('patternCanvas');
const ctx = canvas.getContext('2d');

let stitches = parseInt(stitchesInput.value);
let rows = parseInt(rowsInput.value);
let rowColors = [];

// Initialize row colors and UI
function initializeRowColors() {
  rowColorsContainer.innerHTML = ""; // Clear previous color pickers
  rowColors = Array.from({ length: rows }, () => getRandomColor());

  rowColors.forEach((color, index) => {
    const label = document.createElement('label');
    label.textContent = `Row ${index + 1}: `;

    const colorInput = document.createElement('input');
    colorInput.type = "color";
    colorInput.value = color;
    colorInput.dataset.row = index;

    // Update color on input
    colorInput.addEventListener('input', (e) => {
      const row = parseInt(e.target.dataset.row);
      rowColors[row] = e.target.value;
      drawPattern();
    });

    label.appendChild(colorInput);
    rowColorsContainer.appendChild(label);
  });
}

// Generate random color for rows
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

// Draw the circular knitting pattern
function drawPattern() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 10;
  const rowHeight = radius / rows;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < rows; row++) {
    const startRadius = row * rowHeight;
    const endRadius = startRadius + rowHeight;
    const angleStep = (2 * Math.PI) / stitches;

    ctx.beginPath();
    for (let stitch = 0; stitch <= stitches; stitch++) {
      const angle = stitch * angleStep;
      const x = centerX + endRadius * Math.cos(angle);
      const y = centerY + endRadius * Math.sin(angle);

      if (stitch === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();

    // Fill with row color
    ctx.fillStyle = rowColors[row];
    ctx.fill();
  }
}

// Event listeners
stitchesInput.addEventListener('input', (e) => {
  stitches = parseInt(e.target.value);
  stitchesValue.textContent = stitches;
  drawPattern();
});

rowsInput.addEventListener('input', (e) => {
  rows = parseInt(e.target.value);
  rowsValue.textContent = rows;
  initializeRowColors(); // Recreate color pickers for new rows
  drawPattern();
});

// Initialize tool
initializeRowColors();
drawPattern();
