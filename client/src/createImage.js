const createImage = () => {
  const canvas = document.createElement('canvas');

  canvas.height = 50;
  canvas.width = 50;

  const context = canvas.getContext('2d');

  const imageData = context.createImageData(50, 50);

  const { data } = imageData;

  const color = [Math.floor(Math.random() * 255), Math.random() * 255, Math.random() * 255];

  let curX = 0;
  let tmpY = 0;
  let curY = 0;
  const area = [];

  for (let i = 0; i < 5; i += 1) {
    const tempArea = new Array(5);
    area.push(tempArea);
  }

  for (let i = 0; i < 5; i += 1) {
    for (let j = 0; j < 5; j += 1) {
      area[i][j] = Math.floor(Math.random() * 2);
    }
  }

  for (let i = 0; i < 50 * 50; i += 1) {
    if ((i + 1) % 10 === 0) {
      curX += 1;

      if (curX === 5) {
        curX = 0;

        tmpY += 1;
      }

      if (tmpY === 10) {
        tmpY = 0;
        curY += 1;
      }
    }

    if (area[curX][curY]) {
      data[i * 4 + 0] = color[0];
      data[i * 4 + 1] = color[1];
      data[i * 4 + 2] = color[2];
    } else {
      data[i * 4 + 0] = 255;
      data[i * 4 + 1] = 255;
      data[i * 4 + 2] = 255;
    }
    data[i * 4 + 3] = 255;
  }

  context.putImageData(imageData, 1, 0);

  return canvas.toDataURL();
}

export default createImage;