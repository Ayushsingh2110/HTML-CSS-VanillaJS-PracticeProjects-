//get box
const box = document.querySelectorAll('.box');

//add eventlistner on each "box" element
box.forEach((box) => {
  box.addEventListener('click', (e) => {
    let currentBox = e.currentTarget;
    //reverse the background color
    if (currentBox.style.backgroundColor == 'green') {
      currentBox.style.backgroundColor = 'white';
    } else {
      currentBox.style.backgroundColor = 'green';
    }
  });
});
