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


window.onload = () => {
  ninjaFetch(ENDPOINT)
  .then(res => populateTable(res))
  .finally(() => {
    document.querySelector('main').classList.remove('d-none')
    document.querySelector('.spinner-container').classList.add('d-none')})
}



const populateTable = (data) => {   
  const table = document.querySelector('table');
  table.innerHTML = '';

  const tbody = document.createElement('tbody');

  const thead = document.createElement('thead');
  thead.classList.add('table-dark');
  thead.innerHTML = /* HTML */ `
      <tr>
          <th scope="col">Name</th>
          <th scope="col">Brand</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Actions</th>
      </tr>`;
  
  data.map(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = /* HTML */`
          <th scope="row">${item.name}</td>
          <td>${item.brand}</td>
          <td>${item.description}</td>
          <td>${item.price}</td>
          <td>
            <div class="btn-group">
                <button
                class="btn btn-sm btn-outline-dark small"
                data-bs-toggle="modal"
                data-bs-target="#editItemsModal"
                data-bs-whatever="${item._id}">Edit</button><button
                class="btn btn-sm btn-outline-danger small deleteBtn">Delete</button>
            </div>
          </td>
      `;

      tr.querySelector('.deleteBtn').addEventListener('click', () => {
        ninjaFetch(ENDPOINT + item._id, {method: 'DELETE'})
        .then(ninjaFetch(ENDPOINT).then(res => populateTable(res)))
        .catch(err => console.error(err))
      })

      tbody.append(tr);
  })
  table.append(thead, tbody);
}


// Modal
const modal = document.getElementById('editItemsModal');
if (modal) {
  modal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget;
    const id = button.getAttribute('data-bs-whatever');
    let [prodName, prodBrand, prodImg, prodPrice ] = modal.querySelectorAll('input');

    ninjaFetch(ENDPOINT + id)
    .then(res => {
      modal.querySelector('.modal-title').innerHTML = `Edit items: ${res.name}`;
      prodName.value = res.name;
      prodBrand.value = res.brand;
      prodImg.value = res.imageUrl;
      prodPrice.value = res.price;
      modal.querySelector('#product-description').value = res.description;
    })

    modal.querySelector('.modal-footer button').addEventListener('click',() => {
      let product = {
        name: prodName.value,
        description: modal.querySelector('#product-description').value,
        brand: prodBrand.value,
        imageUrl: prodImg.value,
        price: Number(prodPrice.value),
      }
  
      ninjaFetch(ENDPOINT + id, {method: 'PUT', body: product})
      .then(ninjaFetch(ENDPOINT).then(res => populateTable(res)))
      .catch(err => console.error(err))

    })

  })
}