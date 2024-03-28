const inputFields = document.querySelectorAll('input');
inputFields.forEach(field => field.addEventListener('input', () => {
    if (field.id !== 'product-img'){
        const targetEl = document.querySelector(field.getAttribute('data-g-target'));
        targetEl.innerHTML = field.value;
        targetEl.classList.remove('placeholder');
        
        if (targetEl.innerHTML === 0) {
            targetEl.classList.add('placeholder')
        }
    }
}))

const productImgField = document.querySelector('#product-img')
productImgField.addEventListener('change', () => {
    const targetEl = document.getElementById('product-img-preview');
    targetEl.setAttribute('src', productImgField.value);
    targetEl.classList.remove('d-none')
    document.querySelector('.card-img-container').classList.remove('placeholder');
})


document.getElementById('add-item-btn').addEventListener('click', () => {
    //let [brand, description, imageUrl, name, price ] = document.querySelectorAll('input');

    let product = {
        name: document.querySelector('#product-name').value,
        description: document.querySelector('#product-desc').value,
        brand: document.querySelector('#product-brand').value,
        imageUrl: document.querySelector('#product-img').value,
        price: Number(document.querySelector('#product-price').value),
      }

    ninjaFetch(ENDPOINT, {method: 'POST', body: product})
    .then(res => {
        if (res) showAlert('.alert-section', 'success')
    })
    .catch(err => {
        console.error(err)
        showAlert('.alert-section', 'danger')
    })
    .finally(setTimeout(() => {
        location.reload()
    }, 2000));
})
