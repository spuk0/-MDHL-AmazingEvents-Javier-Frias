function createCards(){
    let cardText = "";
    for (const event of events ){
        cardText += `<div class="card cardMain" style="width: 15rem;">
                        <img src="${event.image}" class="card-img-top eventImg" alt="${event.name}">
                            <div class="card-body">
                                <h5 class="card-title">${event.name}</h5>
                                <p class="card-text">${event.date}</p>
                                <p class="card-text">${event.description}</p>
                                <p class="card-text">Category: ${event.category}</p>
                                <p class="card-text">Place: ${event.place}</p>
                                <p class="card-text">Capacity: ${event.capacity}</p>
                                <p class="card-text">Assistance: ${event.assistance}</p>
                                <div class="d-flex justify-content-between align-items-end">
                                    <h6 class="cardPrice">$${event.price}</h6>
                                    <a href="./pages/details.html" class="btn btn-primary btn-showMore">Show more</a>
                                </div>
                            </div>
                    </div>`
    }
    return cardText;
}

function addCards(){
    const cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = createCards();
}

addCards();


