const params = new URLSearchParams(window.location.search);
const idProduct = params.get('id');

ninjaFetch(ENDPOINT + idProduct)
.then(res => {
    displaySingleProduct(res);
    removeSpinner('#single-product-container')
})

const displaySingleProduct = (res) => {
    document.querySelector('.single-product-card').innerHTML = /* HTML */ `
    <div class="card-img card-img--single">
        <img src="${res.imageUrl}" class="w-100 h-100 object-fit-cover img-fluid">
    </div>
    <div class="card-body d-flex flex-column justify-items-between h-100 ">
        <h4 class="card-title mb-2">${res.name}</h4>
        <span class="card-subtitle text-secondary mb-3">${res.brand}</span>
        <div class="card-text">
            <p class="">${res.description}</p>
            <div class="card-buttons d-flex justify-content-between align-items-center ">
                <span class="product-price text-dark-emphasis small">${res.price}</span>
                <a class="btn btn-dark flex-grow-0 small" href="product.html?id=${res._id}">Buy</a>
            </div>
        </div>
    </div>
    `;
}