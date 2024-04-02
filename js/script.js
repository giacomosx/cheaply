const ENDPOINT = 'https://striveschool-api.herokuapp.com/api/product/'
const APIKEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjAxYzgwN2QwYjM3MTAwMWFhODk0YTEiLCJpYXQiOjE3MTEzOTI3NzUsImV4cCI6MTcxMjYwMjM3NX0.1BTHaAMMIpj2R6AucR4R3NoKqKY_8vUzwsMVcbd5mkM'
const searchBtn = document.querySelector('.searchbar button');

const ninjaFetch = async (endpoint, options = {}) => {
  const reqOptions = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': APIKEY
    }, ...options
  }

  if (reqOptions.body) {
    reqOptions.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(endpoint, reqOptions);

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return await response.json()

  } catch (error) {
    console.error(error)
    throw error;
  }
}


const removeSpinner = (node) => {
  document.querySelector(node).classList.remove('d-none')
  document.querySelector('.spinner-container').classList.add('d-none')
}

const addSpinner = (node) => {
  document.querySelector(node).classList.remove('d-none')
  document.querySelector('.spinner-container').classList.add('d-none')
  }


const showAlert = (node, type) => {
  document.querySelector(node).classList.remove('d-none')
  document.querySelector('.alert').classList.add(`alert-${type}`)
  type === 'success'
    ? document.querySelector('.alert-message').innerHTML = `Items correctly added!`
    : document.querySelector('.alert-message').innerHTML = `Ops! there was an error`
  }
     
searchBtn.addEventListener('click', () => {
  const query = document.querySelector('.searchbar input').value.toLowerCase();
  
  ninjaFetch(ENDPOINT)
  .then(res => {
    let results = res.filter(res => res.name.toLowerCase().includes(query))
    console.log(results)
  })
  .catch(err => console.log(err))
})