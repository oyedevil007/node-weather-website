


// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

//


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'Form Javascript'

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
  
    messageOne.textContent = 'Loading';
    messageTwo.textContent = '';

    if(location.length!=0){
    fetch("/weather?location=" + location + "'").then((response)=>{
    response.json().then((data)=>{
       messageOne.textContent = data.location;
       messageTwo.textContent = data.forecast;
    })

})
    }
    else{
        console.log('please provide location!')
    }
})
