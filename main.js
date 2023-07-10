console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

const baseURL = 'http://localhost:4000'

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

function getAllCharacters() {
  axios.get(`${baseURL}/characters`)
  .then(res => {
    console.log(res.data)
    let characters = res.data;
    clearCharacters();
    for(let i=0; i<characters.length;i++) {
      createCharacterCard(characters[i]);
    }
  })
  .catch(error => console.log(error))
}

getAllBtn.addEventListener('click', getAllCharacters)

function getOneCharacter(evt) {
  //console.log(evt.target)
  let name = evt.target.getAttribute('id') // to get the value
  //console.log(name)
  axios.get(`${baseURL}/character/${name}`)
  .then(res => {
    console.log(res.data);
    clearCharacters();
    createCharacterCard(res.data)
  })
  .catch(error => console.log(error))
}

for(let i=0; i<charBtns.length; i++) {
  charBtns[i].addEventListener('click', getOneCharacter)
}

getAllBtn.addEventListener('click',getOneCharacter)

function getOldCharacter(evt) {
  evt.preventDefault();
 // console.log(ageInput.value);
  let inputAge = inputAge.value

  axios.get(`${baseURL}/character?age=${inputAge}`) 
  .then (res => {
    console.log(res.data);
    let characters = res.data;
    clearCharacters();
    for(let i=0; i<characters.length;i++) {
      createCharacterCard(characters[i]);
    }
  })
  .catch(error=> console.log(error))
}

function createNewCharacter(evt) {
  evt.preventDefault();
  // console.log(firstName)
  // console.log(lastName)
  // console.log(genderDropDown)
  // console.log(age)
  // console.log(likes)

  let body = {
    firstName: newFirstInput.value,
    lastName:  newLastInput.value, 
    gender:newGenderDropDown.value,
    age:newAgeInput.value,
    likes:newLikesText.value,
  }

  axios.post(`${baseURL}/character`, body);
  .then((res) => {
    console.log(res.data)
    let characters = res.data;
    clearCharacters();
    for(let i=0; i<characters.length;i++) {
      createCharacterCard(characters[i]);
    }
  })
  .catch(error => console.log(error))
}


createForm.addEventListener('submit',createNewCharacter)
ageForm.addEventListener('submit', getOldCharacter)