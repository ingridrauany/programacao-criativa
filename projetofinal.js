const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane')

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const params = {
  cols: 10,
  rows: 10,
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
    //background
    const gradient = context.createLinearGradient(0, 0, 0, width / 2);
    gradient.addColorStop(0, "#874384");
    gradient.addColorStop(1, "#f284fb");

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    //sun
    context.beginPath();
    const sunWidth = 180;
    const gradientSun = context.createLinearGradient(0, 0, 0, sunWidth / 2);
    gradientSun.addColorStop(0, "#EE7600");
    gradientSun.addColorStop(1, "#FFD700");
    context.arc(width * 0.5, height * 0.5, sunWidth, 0, Math.PI * 2, true);
    context.fillStyle = gradientSun;
    context.strokeStyle = "transparent";
    context.fill();
    context.stroke();

    //seagull
    context.beginPath();
    // seagull - head
    context.arc(width * 0.5, height * 0.2, 20, 0, Math.PI * 2, true);
    context.fillStyle = 'white';
    context.strokeStyle = "transparent";
    context.fill();
    context.stroke();

    // seagull - body]
    context.beginPath();
    context.ellipse(width * 0.55, height * 0.2, 20, 45, Math.PI / 2, 0, 2 * Math.PI);
    context.fillStyle = 'white';
    context.strokeStyle = "transparent";
    context.fill();
    context.stroke();

    //waves
    /*const cols = params.cols;
    const rows = params.rows;
    const newCells = cols * rows;

    const gridw = width;
    const gridh = height;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    context.strokeStyle = "blue";

    for(let i = 0; i < newCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;

      const w = cellw;
      const h = cellh;

      const f = params.animate ? frame : params.frame;

      const n = random.noise3D(x, y, f * 10, params.freq);
      const angle = n * Math.PI * params.amp;
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5);
      context.rotate(angle);

      context.lineWidth = scale;
      context.lineCap = params.lineCap;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);

      context.stroke();
      context.restore();
    }*/
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({ title: 'Grid'});
  folder.addInput(params, 'lineCap', {
    options: {
      butt: 'butt',
      round: 'round',
      square: 'square'
    }
  });
  folder.addInput(params, 'cols', { min: 2, max: 50, step: 1});
  folder.addInput(params, 'rows', { min: 2, max: 50, step: 1});
  folder.addInput(params, 'scaleMin', { min: 2, max: 100});
  folder.addInput(params, 'scaleMax', { min: 2, max: 100});

  folder = pane.addFolder({ title: 'Noise'});
  folder.addInput(params, 'freq', { min: -0.01, max: 0.01});
  folder.addInput(params, 'amp', { min: 0, max: 1});
  folder.addInput(params, 'animate');
  folder.addInput(params, 'frame', { min: 0, max: 999});
}

//createPane();
canvasSketch(sketch, settings);
