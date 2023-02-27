const currentMonth= objEvent.currentDate[5] + objEvent.currentDate[6];
const currentDay = objEvent.currentDate[8] + objEvent.currentDate[9];
const currentYear = objEvent.currentDate[0] + objEvent.currentDate[1] + objEvent.currentDate[2] + objEvent.currentDate[3];

var currentDate = new Date(currentYear, currentMonth, currentDay);


function createCards(){
    let cardText = "";
    let day = "";
    let month = "";
    let year = "";
    for (const event of objEvent.events ){
        month += event.date[5] + event.date[6];
        day += event.date[8] + event.date[9];
        year += event.date[0] + event.date[1] + event.date[2] + event.date[3];

        var eventDate = new Date(year, month, day);
        if(currentDate > eventDate) {
            cardText += `<div class="card cardMain" style="width: 15rem;">
                        <img src="${event.image}" class="card-img-top eventImg" alt="${event.name}">
                            <div class="card-body">
                                <h5 class="card-title">${event.name}</h5>
                                <p class="card-text">${event.date}</p>
                                <p class="card-text">${event.description}</p>
                                <div class="d-flex justify-content-between align-items-end">
                                    <h6 class="cardPrice">$${event.price}</h6>
                                    <a href="../pages/details.html" class="btn btn-primary btn-showMore">Show more</a>
                                </div>
                            </div>
                    </div>`
        }
        month = "";
        day = "";
        year = "";
    }
    return cardText;
}

function addCardsPastEvents(){
    const cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = createCards();
}

addCardsPastEvents();