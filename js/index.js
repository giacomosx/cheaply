window.onload = () => {
    ninjaFetch(ENDPOINT)
    .then(res => getCards(res))
}


const getCards = (res) => {
    document.querySelector('#cards-container').innerHTML = '';

    res.map(item => {
        const col = document.createElement('col');
        col.innerHTML = /* HTML */ `
            <div class="card  py-2 px-1 h-100 justify-content-between">
                <div class="card-img-container--home h-100 " >
                    <img src="${item.imageUrl} " alt="" class="w-100 h-100 object-fit-cover img-fluid ">
                </div>
                <div class="card-body">
                    <h4 class="card-title h5 mb-2">${item.name}</h4>
                    <span class="card-subtitle text-secondary mb-3 d-block">${item.brand}</span>
                    <div class="card-text ">
                        <div class="card-buttons d-flex justify-content-between align-items-center ">
                            <span class="product-price text-dark-emphasis small">${item.price}</span>
                            <a class="btn btn-dark flex-grow-0 small" href="product.html?id=${item._id}">View</a>
                        </div>
                    </div>
                </div>
            </div>
        `
        document.querySelector('#cards-container').append(col)
    })

}