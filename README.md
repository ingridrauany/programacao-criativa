# Curso de desenvolvimento de peças visuais com Javascript

## Ferramentas

- Ter nodejs e npm instalados
- Canvas Sketch 
    - Para instalar: `npm install canvas-sketch-cli -g`
    - Para criar novo arquivo: `canvas-sketch nomedoarquivo.js --new`
    - Para abrir arquivo no navegador: `canvas-sketch nomedoarquivo.js`
    
## Comandos

- `context.fillRect(coordenada x, coordenada y, altura, largura)`
    - Desenha um retângulo
    - Altura e largura em pixels
- `context.beginPath()`
    - Inicia um novo caminho ou reseta o atual
- `context.stroke()`
    - Desenha o caminho que foi definido
- `context.rect(coordenada x, coordenada y, altura, largura)`
    - Desenha um retângulo
    - Diferente do `fillRect` 
- `context.strokeStyle`
    - Define a cor utilizada para os traços