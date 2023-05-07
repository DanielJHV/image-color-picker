const hexInput = document.getElementById('hex-input');
const rgbInput = document.getElementById('rgb-input');
const copyHex = document.querySelector('.copy--hex');
const copyRgb = document.querySelector('.copy--rgb');

copyHex.addEventListener('click', function (e) {
  const content = hexInput.value;
  navigator.clipboard.writeText(content);
});

copyRgb.addEventListener('click', function (e) {
  const content = rgbInput.value;
  navigator.clipboard.writeText(content);
});
