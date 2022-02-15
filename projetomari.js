const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const Tweakpane = require("tweakpane");

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const params = {
  cols: 10,
  rows: 6,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  frame: 0,
  animate: true,
  lineCap: 'butt'
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    //céu
    const gradient = context.createLinearGradient(0, 0, 0, width / 2);
    gradient.addColorStop(0, "#FF6347");
    gradient.addColorStop(0.5, "#EE7600");
    gradient.addColorStop(1, "#FFC125");

    // gradient.addColorStop(0, "#7D26CD");
    // gradient.addColorStop(0.5, "#9B30FF");
    // gradient.addColorStop(1, "#EEAEEE");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    //codigo spotify
    const img = new Image();
    img.src = './final.png';
    context.drawImage(img, 0, 0);

    //sol
    context.beginPath();
    const sunWidth = 180;
    const gradienSun = context.createLinearGradient(0, 150, 0, height/2);
    context.arc(width * 0.5, height * 0.48, sunWidth, 0, Math.PI * 2, true);
    gradienSun.addColorStop(0, "#EE7600");
    gradienSun.addColorStop(1, "#FFC125");
    //context.fillStyle = gradienSun;
    context.fillStyle = "#FFC125";
    context.strokeStyle = "transparent";
    context.fill();
    context.stroke();

    //gaivota
    context.beginPath();
    // gaivota - cabeça
    context.arc(width * 0.5, height * 0.2, 20, 0, Math.PI * 2, true);
    context.fillStyle = "white";
    context.strokeStyle = "transparent";
    context.fill();
    context.stroke();

    // gaivota - corpo
    context.beginPath();
    context.ellipse(
      width * 0.55,
      height * 0.2,
      20,
      45,
      Math.PI / 2,
      0,
      2 * Math.PI
    );
    context.fillStyle = "white";
    context.strokeStyle = "transparent";
    context.fill();
    context.stroke();

    // gaivota - olho
    context.beginPath();
    context.arc(width * 0.50, height * 0.195, 3, 0, 2 * Math.PI);
    context.fillStyle = "#ccc";
    context.strokeStyle = "transparent";
    context.fill();
    context.stroke();

    // gaivota - asas
    context.beginPath();
    context.ellipse(
      width * 0.55,
      height * 0.18,
      20,
      30,
      Math.PI /2.5,
      0,
      2 * Math.PI
    );
    context.fillStyle = "#EEE5DE";
    context.strokeStyle = "transparent";
    context.fill();
    context.stroke();

    //gaivota - bico
    context.beginPath();
    context.moveTo(520, 210);
    context.lineTo(525, 230);
    context.lineTo(500, 220);
    context.fillStyle = "yellow";
    context.fill();
    context.stroke();
    context.restore();

    //agua
    context.beginPath();
    const gradientWater = context.createLinearGradient(0, height, 0, height/2);
    gradientWater.addColorStop(0, '#BBFFFF');
    gradientWater.addColorStop(0.3, '#8EE5EE');
    gradientWater.addColorStop(1, '#00C5CD');
    context.fillStyle = gradientWater;
    context.fillRect(0, height/2, width, height/2);

    //ondas
    const cols = params.cols;
    const rows = params.rows;
    const newCells = cols * rows;

    const gridw = width;
    const gridh = height * 0.5;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    for(let i = 0; i < newCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;

      const w = cellw * 0.9;
      const h = cellh * 0.9;

      const f = params.animate ? frame : params.frame;

      const n = random.noise3D(x, y, f * 10, params.freq);
      const angle = n * Math.PI * params.amp;
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

      context.save();
      context.translate(x, y);
      context.translate(margx, height / 2);
      context.translate(cellw * 0.5, cellh * 0.5);
      context.rotate(angle);

      context.lineWidth = scale;
      context.lineCap = params.lineCap;

      context.beginPath();
      context.strokeStyle = "#AFEEEE";
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);

      context.stroke();
      context.restore();
    }

  };
};


canvasSketch(sketch, settings);
