window.onload = () => {
  ninjaFetch(ENDPOINT)
  .then(res => {
    populateTable(res)
    calcAnalitycs(res)
  })
  .finally(removeSpinner('main'))
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
          <td class="tb-price">${item.price}</td>
          <td>
            <div class="btn-group">
                <button
                class="btn btn-sm btn-outline-dark small"
                data-bs-toggle="modal"
                data-bs-target="#editItemsModal"
                data-bs-whatever="${item._id}"><i class="bi bi-pencil-square"></i></button><button
                class="btn btn-sm btn-outline-danger small deleteBtn"><i class="bi bi-trash"></i></button>
            </div>
          </td>
      `;

      tr.querySelector('.deleteBtn').addEventListener('click', () => {
        if (confirm('Are you sure?')) {
          ninjaFetch(ENDPOINT + item._id, {method: 'DELETE'})
          .then(res => {
            if (res) location.reload()
          })
          .catch(err => console.error(err)) 
        }
      })

      tbody.append(tr);
  })
  table.append(thead, tbody);
}


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
      .then(ninjaFetch(ENDPOINT).then(res => {
        populateTable(res);
        calcAnalitycs(res)
      }))
      .catch(err => console.error(err))

    })

  })
}

const calcAnalitycs = (res) => {
  document.querySelector('.card__total-store-value').innerHTML = res.reduce((partial, items) => items.price + partial, 0) + ' $';
  document.querySelector('.card__total-items').innerHTML = res.length;
} 