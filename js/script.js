const ENDPOINT = 'https://striveschool-api.herokuapp.com/api/product/'
const APIKEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjAxYzgwN2QwYjM3MTAwMWFhODk0YTEiLCJpYXQiOjE3MTEzOTI3NzUsImV4cCI6MTcxMjYwMjM3NX0.1BTHaAMMIpj2R6AucR4R3NoKqKY_8vUzwsMVcbd5mkM'

const ninjaFetch = async (endpoint, options = {}) => {
    const reqOptions = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : APIKEY
      }, ...options
    }
  
    if (reqOptions.body) {
      reqOptions.body = JSON.stringify(options.body);
    }
  
    try {
      const response = await fetch(endpoint, reqOptions );
      
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