/*=================Constantes-variables=================*/
const cardsContainer = document.getElementById("cards");
const checkboxesFilter = document.getElementById("searchBar");
const searchWriteSpace = document.getElementById("search-write-space");
const bodyPage = document.querySelector("body");
let htmlCard = ""; //Un string que almacenara el codigo html necesario para crear una carta.

/*=================Eventos con referencias a funciones=================*/
bodyPage.addEventListener("load", allCards()); //Al cargar la pagina genera las cartas.
searchWriteSpace.addEventListener("keyup", searchText); //Al presionar teclas dentro del input ejecuta la funcion.
checkboxesFilter.addEventListener("submit", search); //Al presionar el submit ejecuta la funcion.

/*=================Funciones asignadas a eventos=================*/

/*--Es para agregar cards al contenedor de cards
        @param htmlCode - representa el codigo html que debe ir como parametro.
--*/
function addCards(htmlCode){
    cardsContainer.innerHTML = htmlCode;
}

/*--Carga todas las cartas y las agrega al contenedor de cartas--*/
function allCards(){
    for (const event of objEvent.events ){
        htmlCard += `<div class="card cardMain" style="width: 15rem;">
                        <img src="${event.image}" class="card-img-top eventImg" alt="${event.name}">
                            <div class="card-body">
                                <h5 class="card-title">${event.name}</h5>
                                <p class="card-text">${event.date}</p>
                                <p class="card-text">${event.description}</p>
                                <div class="d-flex justify-content-between align-items-end">
                                    <h6 class="cardPrice">$${event.price}</h6>
                                    <a href="./pages/details.html" class="btn btn-primary btn-showMore">Show more</a>
                                </div>
                            </div>
                    </div>`
    }
    addCards(htmlCard);
}

/*--Realiza una busqueda del texto insertado en el input
    @param event - representa el evento al cual esta funcion esta siendo referenciada.
--*/
function searchText(event){
    htmlCard = ""; //Limpia el html de las cartas del contenedor de cartas.
    let writedText = event.target.value.toLowerCase().trim(); //Guarda en la variable lo que se este insertando en el input, y aplica metodos string.
    objEvent.events.forEach(event => { 
        let nameEvent = event.name.toLowerCase(); //Guarda el nombre del evento de la base de datos.
        if(nameEvent.startsWith(writedText)){ //Si el evento coincide con lo escrito en el input, genera el html para su correspondiente carta.
            htmlCard += `<div class="card cardMain" style="width: 15rem;">
                            <img src="${event.image}" class="card-img-top eventImg" alt="${event.name}">
                            <div class="card-body">
                                <h5 class="card-title">${event.name}</h5>
                                <p class="card-text">${event.date}</p>
                                <p class="card-text">${event.description}</p>
                                <div class="d-flex justify-content-between align-items-end">
                                    <h6 class="cardPrice">$${event.price}</h6>
                                    <a href="./pages/details.html" class="btn btn-primary btn-showMore">Show more</a>
                                </div>
                            </div>
                        </div>`
        }
    });
    addCards(htmlCard); //Todas las cartas que pudieron generarse seran agregadas al contenedor de cartas.
}


function search(event){
    event.preventDefault();
    dataFromSearch = {
        category : (() => {
            let arrayCategories = [];
            let categories = event.target.querySelectorAll("input[type=checkbox]");
            for(let i=0; i < categories.length; i++){
                if(categories[i].checked){
                    arrayCategories.push(categories[i].value);
                }
            }
            return arrayCategories;
        })()
    },
    checkbox = {
        applySearchCheckbox: ( () => {
            if(dataFromSearch.category.length == 0){
                addCards();
                alert("Please select a category or type a search");
            }else {
                objEvent.events.forEach(event => {
                    dataFromSearch.category.forEach(selectedCategory => {
                        if(event.category === selectedCategory){
                            htmlCard += `<div class="card cardMain" style="width: 15rem;">
                                            <img src="${event.image}" class="card-img-top eventImg" alt="${event.name}">
                                            <div class="card-body">
                                                <h5 class="card-title">${event.name}</h5>
                                                <p class="card-text">${event.date}</p>
                                                <p class="card-text">${event.description}</p>
                                                <div class="d-flex justify-content-between align-items-end">
                                                    <h6 class="cardPrice">$${event.price}</h6>
                                                    <a href="./pages/details.html" class="btn btn-primary btn-showMore">Show more</a>
                                                </div>
                                            </div>
                                        </div>`
                        }
                    })
                });
                addCards(htmlCard); 
            }
        })()
    };
}






