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

createbutton.onclick = function () {
  const nameValue: string = NameOfRecept.value;
  const photoFile: File | undefined = PhotoOfRecept.files ? PhotoOfRecept.files[0] : undefined;
  const descriptionValue: string = DescriptionOfRecept.value;
  const checkboxChecked: boolean = checkboxInput.checked;

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

      if (nameValue.length < 2) {
        alert('Name must be longer than 2 letters');
        return;
      }

      if (descriptionValue.length < 10) {
        alert('Description must be longer than 10 letters');
        return;
      }

      if (descriptionValue.length > 500) {
        alert('Description must be shorter than 350 letters');
        return;
      } else {
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
