const NameOfRecept: HTMLInputElement = document.getElementById('name') as HTMLInputElement;
const PhotoOfRecept: HTMLInputElement = document.getElementById('photo') as HTMLInputElement;
const DescriptionOfRecept: HTMLInputElement = document.getElementById('description') as HTMLInputElement;
const terms: HTMLInputElement = document.getElementById('terms') as HTMLInputElement;
const createbutton: HTMLButtonElement = document.getElementById('button') as HTMLButtonElement;
const container: HTMLElement = document.getElementById('grid-container');
const Item: HTMLElement = document.getElementById('grid-item');
const checkboxInput: HTMLInputElement = document.getElementById('terms') as HTMLInputElement;
const backElement: HTMLElement = document.getElementById('back');

backElement.onclick = function (event: MouseEvent) {
  console.log(event.target);
};

createbutton.addEventListener('click', function () {
  const nameValue = NameOfRecept.value;
  const photoFile = PhotoOfRecept.files ? PhotoOfRecept.files[0] : undefined;
  const descriptionValue = DescriptionOfRecept.value;
  const checkboxChecked = checkboxInput.checked;

  function showAlert(message) {
    alert(message);
  }

  function validateForm() {
    if (!checkboxChecked) {
      showAlert('Please accept the terms of use.');
      return false;
    }

    if (nameValue.length < 2) {
      showAlert('Name must be longer than 2 letters.');
      return false;
    }

    if (descriptionValue.length < 10) {
      showAlert('Description must be longer than 10 letters.');
      return false;
    }

    if (descriptionValue.length > 500) {
      showAlert('Description must be shorter than 350 letters.');
      return false;
    }

    return true;
  }

  function handleImageLoad(img) {
    if (img.width > 850 || img.height > 600) {
      showAlert('Photo dimensions should not exceed 850x600 pixels.');
    } else if (validateForm()) {
      addGridItem(nameValue, img.src, descriptionValue);
    }
  }

  function handleImageError() {
    showAlert('Error loading the image. Please choose a valid image file.');
  }

  if (photoFile) {
    const img = new Image();
    img.src = URL.createObjectURL(photoFile);

    img.onload = function () {
      handleImageLoad(img);
    };

    img.onerror = function () {
      handleImageError();
    };
  } else {
    if (validateForm()) {
      addGridItem(nameValue, 'default-image.jpg', descriptionValue);
    }
  }
});
    img.onerror = function () {
      alert('Error loading the image. Please choose a valid image file.');
    };
  } else {
    addGridItem(nameValue, 'default-image.jpg', descriptionValue);
  }
};

function addGridItem(name: string, imageUrl: string, description: string) {
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

var sliderContainer: HTMLElement = document.getElementById('sliderContainer');
var slidesContainer: HTMLElement = document.querySelector('.slides') as HTMLElement;
var slides: NodeListOf<HTMLElement> = document.querySelectorAll('.slide');
var currentIndex: number = 0;

function showNextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

function updateSlider() {
  var translateValue: string = -currentIndex * 100 + '%';
  slidesContainer.style.transform = 'translateX(' + translateValue + ')';
}

setInterval(showNextSlide, 5000);

function navigateToPage(pageUrl: string) {
  window.location.href = pageUrl;
}
