window.onload = () => {
    ninjaFetch(ENDPOINT)
    .then(res => getCards(res))
}


const getCards = (res) => {
    document.querySelector('#cards-container').innerHTML = '';

    res.map(item => {
        const col = document.createElement('col');
        col.innerHTML = /* HTML */ `
            <div class="card  p-2">
                <div class="card-img-container--home" >
                    <img src="${item.imageUrl} " alt="" class="w-100 h-100 object-fit-cover">
                </div>
                <div class="card-body">
                    <h4 class="card-title h5 mb-2">${item.name}</h4>
                    <span class="card-subtitle text-secondary mb-3 d-block">${item.brand}</span>
                    <div class="card-text ">
                        <p class="description text-truncate ">${item.description}</p>
                        <div class="card-buttons d-flex justify-content-between align-items-center ">
                            <span class="product-price text-dark-emphasis ">${item.price}</span>
                            <a class="btn btn-dark flex-grow-0 " href="/product.html?id=${item._id}">View</a>
                        </div>
                    </div>
                </div>
            </div>
        `
        document.querySelector('#cards-container').append(col)
    })

}