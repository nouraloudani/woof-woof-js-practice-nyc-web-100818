// document.addEventListener('DOMContentLoaded', e => {
//   const domController = new DOMController
// })

// ******************* Dom Elements *****************

const dogBarDiv = document.querySelector('#dog-bar');
const dogSpan = document.querySelector('span');
const dogInfo = document.querySelector('#dog-info');
const dogAllSpan = document.querySelector('span');



// ******************* Network Requests *****************

fetch('http://localhost:3000/pups')
.then( res => res.json())
.then(dogsArray => fillDogsBar(dogsArray))

function dogInfoFetch(dogId){

  return fetch(`http://localhost:3000/pups/${dogId}`)
        .then (res => res.json())
        .then (dogObj => showDogInfo(dogObj))

}

function patchDogInfo(dogId, newValue){
  fetch(`http://localhost:3000/pups/${dogId}`, {
    method: 'PATCH',
    headers: {
        'content-Type': 'application/json',
    },
    body: JSON.stringify({
      isGoodDog: newValue
    })
} )

}



// ******************* Events Listeners *****************

// dogSpan.addEventListener('click', dogInfoFetch)


// ******************* Dom Manipulation / functions *****************
// {/* <span>Mr. Bonkers</span> */}

function fillDogsBar(dogsArray){
  dogsArray.forEach(dog => {
    dogName = document.createElement('span');

    dogName.innerText = dog.name;
    dogName.addEventListener('click', () => {
      dogInfoFetch(dog.id)
    });
  
    dogBarDiv.append(dogName);
  })
}

function showDogInfo(dogObj){
  dogInfo.innerHTML = `
  <h2>${dogObj.name}</h2>
  <img src=${dogObj.image}>
  `
  const goodDogBtn = document.createElement('button');
  goodDogBtn.innerText = !dogObj.isGoodDog ? "Bad Dog!" : "Good Dog!";
  goodDogBtn.dataset.id = dogObj.id;
  goodDogBtn.addEventListener('click', (e)=>{
    toggleDog(e);
  })
  dogInfo.append(goodDogBtn);
}


function toggleDog(e) {
  let newValue;
  if (e.target.innerText.includes("Good")){
    e.target.innerText = "Bad Dog!"
    newValue = false
  } else {
    e.target.innerText = "Good Dog!"
    newValue = true
  }
  console.log(newValue)
  patchDogInfo(e.target.dataset.id, newValue);
}





