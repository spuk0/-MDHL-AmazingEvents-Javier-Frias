const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

const theEvent = objEvent.events.find(ev => ev._id == id);

const div = document.querySelector('#cardsDetails');
div.innerHTML=`<div class="card mb-3 col-12 cardDetails align-items-center">
                    <div class="row g-5">
                    <div class="col-md-4 align-self-center">
                        <img
                        src="${theEvent.image}"
                        class="img-fluid rounded-start imageDetail"
                        alt="${theEvent.name}"
                        />
                    </div>
                    <div class="col-md-8 text-center">
                        <div class="card-body">
                        <h2 class="card-title">${theEvent.name}</h2>
                        <p class="card-text">${theEvent.date}</p>
                        <h5>Description: </h5>
                        <p class="card-text">${theEvent.description}</p>
                        <p class="card-text">Assistance: ${theEvent.assistance}</p>
                        <p class="card-text">Capacity: ${theEvent.capacity}</p>
                        <p class="card-text">Category: ${theEvent.category}</p>
                        <p class="card-text">Place: ${theEvent.place}</p>
                        <p class="card-text">Price: ${theEvent.price}</p>
                        </div>
                    </div>
                    </div>
                </div>`


