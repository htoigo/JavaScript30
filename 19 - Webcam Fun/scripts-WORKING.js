const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error('Oh no! error getting user video.', err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  const intervalID = setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // Grab the pixels from the canvas
    let pixels = ctx.getImageData(0, 0, width, height);

    // Apply some effect to the pixel array
    // pixels = redEffect(pixels);
    // pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.1;
    // pixels = greenScreen(pixels);

    // Put pixels back into the canvas
    ctx.putImageData(pixels, 0, 0);
  }, 16);

  return intervalID;
}

function takePhoto() {
  // Play camera shutter sound.
  snap.currentTime = 0.0;
  snap.play();

  // Take a snapshot of the canvas as a data URL.
  const data = canvas.toDataURL('image/jpeg');

  // Create a link to the image & put it in the photo strip.
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'photo');
  link.innerHTML = `<img src="${data}" alt="still image">`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100;    // Red value
    pixels.data[i + 1] = pixels.data[i + 1] - 100;     // Green value
    pixels.data[i + 2] = pixels.data[i + 2] - 100;     // Blue value
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 500] = pixels.data[i + 0];    // Red value
    pixels.data[i + 250] = pixels.data[i + 1];    // Green value
    pixels.data[i + 100] = pixels.data[i + 2];    // Blue value
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};
  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (let i = 0; i < pixels.data.length; i += 4) {
    const red = pixels.data[i + 0];
    const green = pixels.data[i + 1];
    const blue = pixels.data[i + 2];
    const alpha = pixels.data[i + 3];

    if (red >= levels.rmin && red <= levels.rmax &&
        green >= levels.gmin && green <= levels.gmax &&
        blue >= levels.bmin && blue <= levels.bmax) {
      pixels.data[i + 3] = 0;    // make this pixel fully transparent.
    }
  }

  return pixels;
}

getVideo();
video.addEventListener('canplay', paintToCanvas);
