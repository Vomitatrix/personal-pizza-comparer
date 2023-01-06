'use strict';

const unitInput = document.querySelectorAll('.unit-input');
const sizeInput = document.querySelectorAll('.size-input');
const btn = document.querySelector('button');
const resultDiv = document.querySelector('.result-div');
const largePizzaImg = document.querySelector('.larger-pizza-img');
const largePizzaText = document.querySelector('.larger-pizza-text');
const smallPizzaImg = document.querySelectorAll('.smaller-pizza-img');
const smallPizzaText = document.querySelector('.smaller-pizza-text');
const finalVerdictDiv = document.querySelector('.final-verdict-div');
const finalVerdictText = document.querySelector('.final-verdict-text');

function checkUnit() {
    for (const unit of unitInput) if (unit.checked) return unit.value;
}

function outputResult(unit, largeDiam, largeArea, smallDiam, smallArea) {
    let diameterLarger = Math.round(largeDiam * 10) / 10;
    let areaLarger = largeArea.toFixed(2);
    let diameterSmaller = Math.round(smallDiam * 10) / 10;
    let areaSmaller = smallArea.toFixed(2);

    resultDiv.classList.remove('hidden');

    largePizzaText.textContent = `One ${diameterLarger} ${unit} pizza has an area of approximately ${areaLarger} ${unit}²`;
    smallPizzaText.textContent = `Two ${diameterSmaller} ${unit} pizzas have an area of approximately ${areaSmaller} ${unit}²`;
}

function resizeImages(largeDiam, smallDiam, largeBigger = true) {
    if (!largeBigger) {
        largePizzaImg.style.width = (50 * largeDiam) / smallDiam + '%';
        smallPizzaImg.forEach(e => (e.style.width = '50%'));
        return;
    }
    largePizzaImg.style.width = '50%';
    smallPizzaImg.forEach(e => (e.style.width = `${50 * (smallDiam / largeDiam)}%`));
}

function checkButton() {
    let diameterLarger = sizeInput[0].value;
    let diameterSmaller = sizeInput[1].value;
    let areaLarger = Math.PI * (diameterLarger / 2) ** 2;
    let areaSmaller = Math.PI * (diameterSmaller / 2) ** 2 * 2;

    const unit = checkUnit();

    // if both units missing or if no unit checked
    if ((sizeInput[0].value === '' && sizeInput[1].value === '') || !unit) {
        resultDiv.classList.add('hidden');
        finalVerdictDiv.classList.remove('hidden');
        finalVerdictText.textContent = 'Please introduce at least one value and/or select a unit.';
        return;
    }

    // if no size input is empty
    if (sizeInput[0].value === '' || sizeInput[1].value === '') {
        finalVerdictDiv.classList.add('hidden');
        areaSmaller = areaLarger;

        // only size input of large pizza given
        if (!sizeInput[1].value) {
            diameterSmaller = Math.sqrt((4 * (areaSmaller / 2)) / Math.PI);

            // only size input of small pizzas given
        } else {
            diameterLarger = Math.sqrt((4 * areaLarger) / Math.PI);
        }

        // if both sizes are given
    } else {
        let isLargeMore = areaLarger > areaSmaller;
        let areaDifference = isLargeMore
            ? (areaLarger - areaSmaller).toFixed(2)
            : (areaSmaller - areaLarger).toFixed(2);
        let pizzaDifference = Math.round((areaDifference / (areaSmaller / 2)) * 100);

        if (isLargeMore) {
            finalVerdictText.innerHTML = `One ${diameterLarger} ${unit} pizza is more pizza than two ${diameterSmaller} ${unit} pizzas.</br>The difference is ${areaDifference} ${unit}².</br>Or ${pizzaDifference}% more pizza.`;
        } else if (!isLargeMore) {
            finalVerdictText.innerHTML = `Two ${diameterSmaller} ${unit} pizzas is more pizza than one ${diameterLarger} ${unit} pizza.</br>The difference is ${areaDifference} ${unit}².</br>Or ${pizzaDifference}% more pizza.`;
        } else {
            finalVerdictText.textContent = `One ${diameterLarger} ${unit} pizza is the same amount of pizza as two ${diameterSmaller} ${unit} pizzas.`;
        }

        finalVerdictDiv.classList.remove('hidden');
    }

    outputResult(unit, diameterLarger, areaLarger, diameterSmaller, areaSmaller);
    resizeImages(diameterLarger, diameterSmaller, diameterLarger > diameterSmaller);
}

btn.addEventListener('click', checkButton);
