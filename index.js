let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {

  document.body.classList.toggle("dark-mode");

}

themeButton.addEventListener("click", toggleDarkMode);

let signNowButton = document.getElementById("sign-now-button");
let count = 3;

// addSignature() function 
const addSignature = (person) => {
  const signatures = document.querySelector(".signatures");
  const newSignature = document.createElement('p');
 
  newSignature.textContent = `🖊️ ${person.name} from ${person.hometown} supports this cause.`;
  
  signatures.appendChild(newSignature);

  // Counter 
  count += 1;
  const counterP = document.getElementById("counter");
  counterP.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

  signatures.appendChild(counterP);
}
const validateForm = () => {

  let containsErrors = false;

  let petitionInputs = document.getElementById("sign-petition").elements;

  let person = {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value
  }

  for(let i = 0; i < petitionInputs.length; i++){
    if (person.hometown.length < 2) {
      containsErrors = true;
      petitionInputs[i].classList.add('error');
    }
    else{
      petitionInputs[i].classList.remove('error');
    }
  }

  // Email validation 
  const email = document.getElementById("emailAddy"); 
  if (!email.value.includes('.com')) {
    containsErrors = true;
    email.classList.add('error'); 
  } 
  else {
    email.classList.remove('error');
  }

  if (containsErrors == false){
    addSignature(person);
    toggleModal(person);
    for(let i = 0; i < petitionInputs.length; i++){
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
}

signNowButton.addEventListener('click', validateForm);

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
}

let revealableContainers = document.querySelectorAll('.revealable');

const reveal = () =>{
  for(let i = 0; i < revealableContainers.length; i++){
    let windowHeight = window.innerHeight;
    
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    
    if(topOfRevealableContainer < windowHeight - animation.revealDistance){
      revealableContainers[i].classList.add('active');
    }
    else{
      revealableContainers[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', reveal);

const toggleModal = (person) => {
  
  let modal = document.getElementById("thanks-modal");
  let modalContent = document.getElementById("thanks-modal-content");

  modalContent.textContent = `Thank you, ${person.name} from ${person.hometown}, for your support!`;
  modal.style.display = "flex";

  let intervalId = setInterval(() => {
    scaleImage();
  }, 500);

  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 4000);
}

let scaleFactor = 1;
let modalImage = document.getElementById("modal-image");

const scaleImage = () => {
  if (scaleFactor === 1) {
    scaleFactor = 0.8;
  } 
  else {
    scaleFactor = 1;
  }
  
  if (modalImage) {
    modalImage.style.transform =`scale(${scaleFactor})`;
  }
}
