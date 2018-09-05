'use strict';

var MOCK_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Виктор', 'Кристоф', 'Люпита', 'Юлия', 'Вашингтон'];
var MOCK_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var MOCK_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var MOCK_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_NUMBERS = 4;

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var getRandomIntFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomFromArray = function (array) {
  return array[getRandomIntFromInterval(0, array.length)];
};

var getRandomWizard = function () {
  return {
    name: getRandomFromArray(MOCK_FIRST_NAMES) + ' ' + getRandomFromArray(MOCK_SECOND_NAMES),
    coatColor: getRandomFromArray(MOCK_COAT_COLORS),
    eyesColor: getRandomFromArray(MOCK_EYES_COLORS)
  };
};

var getWizardsArray = function (numbers) {
  var result = [];
  for (var i = 0; i < numbers; i++) {
    result[i] = getRandomWizard();
  }
  return result;
};

var getWizardElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

document.querySelector('.setup').classList.remove('hidden');

var wizardsArray = getWizardsArray(WIZARD_NUMBERS);
var wizardElementsList = document.createDocumentFragment();
for (var i = 0; i < WIZARD_NUMBERS; i++) {
  wizardElementsList.appendChild(getWizardElement(wizardsArray[i]));
}

document.querySelector('.setup-similar-list').appendChild(wizardElementsList);
document.querySelector('.setup-similar').classList.remove('hidden');
