const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const height = parseInt(document.querySelector('#height').value);
  const weight = parseInt(document.querySelector('#weight').value);

  const results = document.querySelector('#results');

  if (
    (height || weight) === '' ||
    (height || weight) < 0 ||
    isNaN(height || weight)
  ) {
    results.innerHTML =
      "<p class='error'>Please give a valid height(in cm) and weight(in kg)</p>";
  } else {
    const BMI = (weight / (height ** 2 / 10000)).toFixed(2);
    //show result
    results.innerHTML = `<span>BMI: ${BMI}</span>`;
  }
});
