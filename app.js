const NameOfRecept = document.getElementById('name');
const PhotoOfRecept = document.getElementById('photo');
const DescriptionOfRecept = document.getElementById('description');
const terms = document.getElementById('terms');
const createbutton = document.getElementById('button');
const container = document.getElementById('grid-container');
const Item = document.getElementById('grid-item');
const checkboxInput = document.getElementById('terms');
const backElement = document.getElementById('back')



backElement.onclick = function (event){
  console.log(event.target)

}

createbutton.onclick = function () {
  const nameValue = NameOfRecept.value;
  const photoFile = PhotoOfRecept.files[0];
  const descriptionValue = DescriptionOfRecept.value;
  const checkboxChecked = checkboxInput.checked;
  

  if (photoFile) {
    const img = new Image();
    img.src = URL.createObjectURL(photoFile);

    img.onload = function () {
      if (img.width > 850 || img.height > 600) {
        alert('Photo dimensions should not exceed 850x600 pixels.');
      }
      if (!checkboxChecked) {
        alert('accept terms of using');
        return;
      }
    
      if(NameOfRecept.value.length < 2){
        alert('Name must be longer then 2 leters')
        return
      }
    
      if(DescriptionOfRecept.value.length < 10){
        alert('Description must be longer then 10 leters')
        return
      }
    
      if(DescriptionOfRecept.value.length > 500){
        alert('Description must be shorter then 350 leters')
        return
      }
       else {
        addGridItem(nameValue, img.src, descriptionValue);
      }
    };

    img.onerror = function () {
      alert('Error loading the image. Please choose a valid image file.');
    };
  } else {
    addGridItem(nameValue, 'default-image.jpg', descriptionValue);
  }
  
};


function addGridItem(name, imageUrl, description) {


  container.insertAdjacentHTML(
    'beforeend',
    `<div id="grid-item" >  
    <div class="card">
      <div class="front">
        <img src="${imageUrl}" alt="${name}">
        <div class="overlay">
          <p>${name}</p>
        </div>
      </div>
      <div class="back">
        <div class="back-content">
          <p>${description}</p>
          <div class="buttons">
            <button id="delete">delete</button>
            <button id="redact">redact</button>
          </div>
        </div>
      </div>
    </div>
  </div>`
  );
}

//onclick="navigateToPage('${name}.html')"


















var sliderContainer = document.getElementById('sliderContainer');
var slidesContainer = document.querySelector('.slides');
var slides = document.querySelectorAll('.slide');
var currentIndex = 0;

function showNextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

function updateSlider() {
  var translateValue = -currentIndex * 100 + '%';
  slidesContainer.style.transform = 'translateX(' + translateValue + ')';
}

setInterval(showNextSlide, 5000);

function navigateToPage(pageUrl) {
    window.location.href = pageUrl;
}
  