const currentMonth= currentDate[5] + currentDate[6];
const currentDay = currentDate[8] + currentDate[9];
const currentYear = currentDate[0] + currentDate[1] + currentDate[2] + currentDate[3];

console.log(currentYear, currentMonth, currentDay);

function createCards(){
    let cardText = "";
    let day = "";
    let month = "";
    let year = "";
    for (const event of events ){
        month += event.date[5] + event.date[6];
        day += event.date[8] + event.date[9];
        year += event.date[0] + event.date[1] + event.date[2] + event.date[3];

        let compareYear = year < currentYear;
        let compareMonth = year <= currentYear && month <= currentMonth;
        let compareDay = compareMonth && day <= currentDay;

        if(compareYear || compareMonth || compareDay) {
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