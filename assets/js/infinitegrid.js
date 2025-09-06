const filesCount = 60;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const mainglass = document.getElementById("main-glassbox");
const title = document.getElementById("title");
const exit = document.getElementById("exit");
const question = document.getElementById("question");
const questionBox = document.getElementById("question-box");
const closeButton = document.getElementById("close-button");

const imageWidth = 175;
const padding = 40;
const verticalStacks = 4;
const colBuffer = 40;
const friction = 0.92;
const speedFactor = 1.0;
const maxVelocity = 50;

let width, height;
let images = [];
const filesPath = "files/";

let columns = [];
let numCols;
let usedIndices = new Set();

let offsetX = 0, offsetY = 0;
let velocityX = 0, velocityY = 0;
let isDragging = false;
let dragStart = { x: 0, y: 0 };

function loadImages(count) {
  return Promise.all(
    Array.from({ length: count }, (_, i) => {
      const padNumber = (num) => num.toString().padStart(2, '0');
      const fileName = `${filesPath}InfiniteGrid_Page_${padNumber(i + 1)}_Image_0001.jpg`;

      return new Promise((res) => {
        const img = new Image();
        img.src = fileName;
        img.onload = () => res({ img, ratio: img.height / img.width });
        img.onerror = () => res(null);
      });
    })
  ).then(arr => arr.filter(Boolean));
}

// Get a random image not in excludeIndices
function getNextImage(excludeIndices = []) {
  const allUsed = usedIndices.size >= images.length;

  let tries = 0;
  while (tries < 100) {
    const index = Math.floor(Math.random() * images.length);
    if (
      (allUsed || !usedIndices.has(index)) &&
      !excludeIndices.includes(index)
    ) {
      if (!allUsed) usedIndices.add(index);
      const img = images[index];
      return { img: img.img, ratio: img.ratio, index };
    }
    tries++;
  }

  // Fallback
  const fallback = images[Math.floor(Math.random() * images.length)];
  return { img: fallback.img, ratio: fallback.ratio, index: 0 };
}

function initColumns() {
  columns = [];
  usedIndices.clear();
  numCols = Math.ceil(width / (imageWidth + padding)) + colBuffer;
  const targetHeight = height * verticalStacks;

  for (let gx = -2; gx < numCols - 2; gx++) {
    const col = {
      gridX: gx,
      tiles: [],
      offsetY: -Math.random() * height,
    };

    let totalHeight = 0;
    let prevIndex = -1;
    let row = 0;

    while (totalHeight < targetHeight) {
      const leftCol = columns[columns.length - 1];
      const horizontalIndex = leftCol?.tiles[row]?.index ?? -1;
      const topLeftIndex = leftCol?.tiles[row - 1]?.index ?? -1;
      const bottomLeftIndex = leftCol?.tiles[row + 1]?.index ?? -1;

      const exclude = [prevIndex, horizontalIndex, topLeftIndex, bottomLeftIndex];

      const t = getNextImage(exclude);
      const h = t.ratio * imageWidth;

      col.tiles.push({ img: t.img, ratio: t.ratio, height: h, index: t.index });
      totalHeight += h + padding;
      prevIndex = t.index;
      row++;
    }

    columns.push(col);
  }
}

function recycle() {
  const hBuffer = (imageWidth + padding) * 2;
  const vBuffer = height * verticalStacks * 0.5;

  columns.forEach(col => {
    const x = col.gridX * (imageWidth + padding) + offsetX;

    if (x + imageWidth < -hBuffer) col.gridX += numCols;
    if (x > width + hBuffer) col.gridX -= numCols;

    let baseY = offsetY + col.offsetY;

    // Remove tiles above
    while (col.tiles.length) {
      const t = col.tiles[0];
      if (baseY + t.height < -vBuffer) {
        col.tiles.shift();
        usedIndices.delete(t.index);
        col.offsetY += t.height + padding;
        baseY += t.height + padding;
      } else break;
    }

    // Remove tiles below
    let cumH = baseY;
    col.tiles.forEach((t, i) => {
      cumH += t.height + (i > 0 ? padding : 0);
    });
    while (col.tiles.length && cumH > height + vBuffer) {
      const t = col.tiles.pop();
      usedIndices.delete(t.index);
      cumH -= t.height + padding;
    }

    // Add to top
    let prevIndexTop = col.tiles[0]?.index ?? -1;
    while (baseY > -vBuffer) {
      const topRow = 0;
      const leftCol = columns.find(c => c.gridX === col.gridX - 1);
      const horizontalIndex = leftCol?.tiles[topRow]?.index ?? -1;
      const topLeftIndex = leftCol?.tiles[topRow - 1]?.index ?? -1;
      const bottomLeftIndex = leftCol?.tiles[topRow + 1]?.index ?? -1;

      const exclude = [prevIndexTop, horizontalIndex, topLeftIndex, bottomLeftIndex];

      const t = getNextImage(exclude);
      const h = t.ratio * imageWidth;
      col.tiles.unshift({ img: t.img, ratio: t.ratio, height: h, index: t.index });
      col.offsetY -= h + padding;
      baseY -= h + padding;
      prevIndexTop = t.index;
    }

    // Add to bottom
    let prevIndexBottom = col.tiles[col.tiles.length - 1]?.index ?? -1;
    while (cumH < height + vBuffer) {
      const bottomRow = col.tiles.length;
      const leftCol = columns.find(c => c.gridX === col.gridX - 1);
      const horizontalIndex = leftCol?.tiles[bottomRow]?.index ?? -1;
      const topLeftIndex = leftCol?.tiles[bottomRow - 1]?.index ?? -1;
      const bottomLeftIndex = leftCol?.tiles[bottomRow + 1]?.index ?? -1;

      const exclude = [prevIndexBottom, horizontalIndex, topLeftIndex, bottomLeftIndex];

      const t = getNextImage(exclude);
      const h = t.ratio * imageWidth;
      col.tiles.push({ img: t.img, ratio: t.ratio, height: h, index: t.index });
      cumH += h + padding;
      prevIndexBottom = t.index;
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  columns.forEach(col => {
    const baseX = col.gridX * (imageWidth + padding) + offsetX + padding / 2;
    let y = col.offsetY + offsetY + padding / 2;
    col.tiles.forEach(tile => {
      ctx.drawImage(tile.img, baseX, y, imageWidth, tile.height);
      y += tile.height + padding;
    });
  });
}

function onPointerDown(e) {
  if (mainglass.classList.contains("coverall")) shrinkGlass();
  isDragging = true;
  dragStart.x = e.clientX;
  dragStart.y = e.clientY;
  velocityX = velocityY = 0;
}

function onPointerMove(e) {
  if (!isDragging) return;
  const dx = e.clientX - dragStart.x;
  const dy = e.clientY - dragStart.y;
  offsetX += dx;
  offsetY += dy;
  velocityX = dx;
  velocityY = dy;
  dragStart.x = e.clientX;
  dragStart.y = e.clientY;
}

function onPointerUp() {
  isDragging = false;
}

function onWheel(e) {
  e.preventDefault();
  if (mainglass.classList.contains("coverall") && Math.abs(offsetX + offsetY) > 2) {
    shrinkGlass();
  }
  offsetX -= e.deltaX * 0.3;
  offsetY -= e.deltaY * 0.3;
  velocityX = -e.deltaX * 0.3;
  velocityY = -e.deltaY * 0.3;
}

function shrinkGlass() {
  mainglass.classList.remove("coverall");
  title.classList.add("headpiece");
  canvas.classList.add("grab");
  setTimeout(() => {
    exit.style.left = "40px";
    question.style.left = "calc(100vw - 41px + 1px)";
    question.style.opacity = 1;
  }, 2000);
  document.querySelectorAll(".info").forEach((i) => {
    i.classList.add("hide");
  });
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * devicePixelRatio;
  canvas.height = height * devicePixelRatio;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(devicePixelRatio, devicePixelRatio);
  initColumns();
}

function animate() {
  if (!isDragging) {
    offsetX += velocityX * speedFactor;
    offsetY += velocityY * speedFactor;
    velocityX *= friction;
    velocityY *= friction;
    if (Math.abs(velocityX) < 0.01) velocityX = 0;
    if (Math.abs(velocityY) < 0.01) velocityY = 0;
  }

  recycle();
  draw();
  requestAnimationFrame(animate);
}

async function init() {
  images = await loadImages(filesCount);
  resize();
  window.addEventListener("resize", resize);
  canvas.style.touchAction = "none";
  canvas.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("wheel", onWheel, { passive: false });
  animate();
  mainglass.classList.remove("opaque");
}

init();

// UI interactions
question.addEventListener("click", () => {
  questionBox.classList.toggle("open");
});

closeButton.addEventListener("mouseenter", () => {
  closeButton.innerHTML = "<u>close</u>&nbsp;&nbsp;->&nbsp;&nbsp;";
});

closeButton.addEventListener("mouseleave", () => {
  closeButton.innerHTML = "close&nbsp;&nbsp;->&nbsp;&nbsp;";
});

closeButton.addEventListener("click", () => {
  questionBox.classList.remove("open");
});

function shrinkToFit(element, maxFontSize = 700, minFontSize = 10) {
  element.style.fontSize = maxFontSize + '%';
  requestAnimationFrame(() => {
    let fontSize = maxFontSize;
    while (element.scrollWidth > element.parentElement.clientWidth && fontSize > minFontSize) {
      fontSize -= 1;
      element.style.fontSize = fontSize + '%';
    }
  });
}

window.addEventListener('resize', shrinkToFit);
window.addEventListener('load', shrinkToFit);
