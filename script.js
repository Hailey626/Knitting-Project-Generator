let stitches = 100;
let rows = 50;
let color1 = "#ff0000";
let color2 = "#0000ff";

function setup() {
  // Create the canvas dynamically
  const canvasContainer = document.getElementById('canvas-container');
  const canvas = createCanvas(800, 400);
  canvas.parent(canvasContainer);
  noLoop(); // Prevent automatic redrawing
}

function draw() {
  background(255);

  const stitchWidth = width / stitches;
  const rowHeight = height / rows;

  for (let row = 0; row < rows; row++) {
    for (let stitch = 0; stitch < stitches; stitch++) {
      const x = stitch * stitchWidth;
      const y = row * rowHeight;

      // Alternate colors based on the row
      const color = row % 2 === 0 ? color1 : color2;
      fill(color);
      rect(x, y, stitchWidth, rowHeight);
    }
  }
}

// Update values and redraw when controls change
document.getElementById('stitches').addEventListener('input', (e) => {
  stitches = parseInt(e.target.value);
  document.getElementById('stitches-value').textContent = stitches;
  redraw();
});

document.getElementById('rows').addEventListener('input', (e) => {
  rows = parseInt(e.target.value);
  document.getElementById('rows-value').textContent = rows;
  redraw();
});

document.getElementById('color1').addEventListener('input', (e) => {
  color1 = e.target.value;
  redraw();
});

document.getElementById('color2').addEventListener('input', (e) => {
  color2 = e.target.value;
  redraw();
});
