const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const animate = () => {
  requestAnimationFrame(animate);
}
 
const sketch = ({ context, width, height }) => {
  const agents = [];

  for(let i = 0; i < 40; i++ ) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for(let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for(let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        context.beginPath();
        context.moveTo(agent.position.x, agent.position.y);
        context.lineTo(other.position.x, other.position.y);
        context.stroke();
      }
    }

    agents.forEach(agent => {
      agent.update(context);
      agent.draw(context);
      agent.bounce(width, height);
    })
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y) {
    this.position = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 12);
  }


  bounce(width, height) {
    if(this.position.x <= 0 || this.position.x >= width) {
      this.vel.x *= -1;
    }

    if(this.position.y <= 0 || this.position.y >= height) {
      this.vel.y *= -1;
    }
  }

  update() {
    this.position.x += this.vel.x;
    this.position.y += this.vel.y; 
  }

  draw(context) {
    context.save();
    context.translate(this.position.x, this.position.y);

    context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}