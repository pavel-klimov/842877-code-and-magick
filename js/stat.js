'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var FONT_GAP = 4;
var FONT_SIZE = 16;
var fontLength = FONT_SIZE + FONT_GAP;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;
var START_POSITION = 10;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomFromInterval = function (min, max) {
  return Math.random() * (max - min) + min;
}

window.renderStatistics = function (ctx, players, times) {
  var inputPosition = START_POSITION;
  var pointPixelCost = BAR_HEIGHT / getMaxElement(times);

  // Рисуем облако с тенью:
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // Настраиваем стиль текста:
  ctx.fillStyle = '#000';
  ctx.font = FONT_SIZE + 'px PT Mono';

  // Выводим первые строки текста:
  inputPosition += fontLength;
  ctx.fillText('Ура вы победили!', CLOUD_X + fontLength, CLOUD_Y + inputPosition);
  inputPosition += fontLength;
  ctx.fillText('Список результатов:', CLOUD_X + fontLength, CLOUD_Y + inputPosition);
  inputPosition += FONT_GAP;

  // Рисуем колонки гистограммы:
  for (var i = 0; i < players.length; i++) {
    // Настраиваем высоту и положение текущей колонки:
    var columnHeigth = pointPixelCost * times[i];
    var xPosition = CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i;
    var yPosition = CLOUD_Y + inputPosition + FONT_GAP + fontLength + BAR_HEIGHT - columnHeigth;

    // Выводим легенду выбранной колонки:
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), xPosition, yPosition - FONT_GAP);
    ctx.fillText(players[i], xPosition, yPosition + columnHeigth + fontLength);

    // Переключаем цвет колонки и выводим её:
    ctx.fillStyle = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + getRandomFromInterval(25, 50) + '%, ' + getRandomFromInterval(25, 50) + '%)';
    ctx.fillRect(xPosition, yPosition, BAR_WIDTH, columnHeigth);
  }
};
