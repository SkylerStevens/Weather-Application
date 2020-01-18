console.log('Hi, I am app.js')


//
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')



weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  fetch('/weather?address=' + location).then((response)=> {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = 'Error'
        messageTwo.textContent = data.error
      } else {
        messageOne.textContent = location
        messageTwo.textContent = 'The current temperature is ' + data.temperature + '°F and the forecast is ' + data.summary
      }

    })
  })

})
