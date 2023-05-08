const fileInput = document.getElementById('file');
const btnUpload = document.querySelector('.label-upload');
const btnPick = document.querySelector('.btn-pick');
const image = document.querySelector('.image');
const hexInput = document.getElementById('hex-input');
const rgbInput = document.getElementById('rgb-input');
const copyHex = document.querySelector('.copy--hex');
const copyRgb = document.querySelector('.copy--rgb');
const colorPicked = document.querySelector('.color-picked');

let eyeDropper;

window.onload = () => {
  if ('EyeDropper' in window) {
    eyeDropper = new EyeDropper();
  } else {
    alert(`Your browser doesn't support EyeDropper API`);
  }
};
// Copy to clipboard
copyHex.addEventListener('click', function (e) {
  const content = hexInput.value;
  navigator.clipboard.writeText(content);
});

copyRgb.addEventListener('click', function (e) {
  const content = rgbInput.value;
  navigator.clipboard.writeText(content);
});

const selectColor = async () => {
  try {
    const color = await eyeDropper.open().then(colorValue => {
      const hexValue = colorValue.sRGBHex;
      const rgbArr = [];
      for (let i = 1; i < hexValue.length; i += 2) {
        rgbArr.push(parseInt(hexValue[i] + hexValue[i + 1], 16));
      }
      const rgbValue = `rgb(${rgbArr})`;
      console.log(hexValue, rgbValue);
      hexInput.value = hexValue;
      rgbInput.value = rgbValue;
      colorPicked.style.backgroundColor = hexValue;
    });
  } catch (err) {
    console.error(err);
  }
};

fileInput.onchange = () => {
  const reader = new FileReader();
  reader.readAsDataURL(fileInput.files[0]);
  reader.onload = () => {
    image.setAttribute('src', reader.result);
  };
  btnPick.classList.remove('locked');
};

btnPick.addEventListener('click', selectColor);
