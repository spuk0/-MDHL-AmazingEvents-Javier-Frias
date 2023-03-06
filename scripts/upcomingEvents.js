/*=================Constantes-variables-cards&filter=================*/
const cardsContainer = document.getElementById("cards");
const checkboxesFilter = document.getElementById("searchBar");
const searchWriteSpace = document.getElementById("search-write-space");
const bodyPage = document.querySelector("body");
let htmlCards = ""; //String que almacenara el html "global" de las cards.

/*=================Eventos con referencias a funciones=================*/
bodyPage.addEventListener("load", allCardsUpcomingEvents()); //Al cargar la pagina genera las cartas.
searchWriteSpace.addEventListener("keyup", searchText); //Al presionar teclas dentro del input ejecuta la funcion.
checkboxesFilter.addEventListener("submit", search); //Al presionar el submit ejecuta la funcion.
checkboxesFilter.addEventListener("change", (event) => { //Al percibirse cambios ejecuta el siguiente bloque de codigo.
    let nums = [];
    let categories = event.currentTarget.querySelectorAll("input[type=checkbox]");
    for(let i=0; i < categories.length; i++){ 
        if(categories[i].checked){
            nums.push(1); //Completa un array por cada check.
        } 
    }
    if(nums.length == 0){ //Si se quita el check de todos los checkboxes se quita la clase filterCheckBoxSearch.
        objEvent.events.forEach(event => {
            const selectedCard = document.getElementById(event._id);
            if(selectedCard != null){
                selectedCard.classList.remove("filterCheckboxSearch");
            }
        });
    }
});

/*=================Funciones asignadas a eventos=================*/

/*--Es para agregar cards al contenedor de cards
        @param htmlCode - representa el codigo html que debe ir como parametro.
--*/
function addCards(htmlCode){
    cardsContainer.innerHTML = htmlCode; //agrega el string como contenido del cardsContainer
}

function allCardsUpcomingEvents(){
    const currentMonth= objEvent.currentDate[5] + objEvent.currentDate[6];
    const currentDay = objEvent.currentDate[8] + objEvent.currentDate[9];
    const currentYear = objEvent.currentDate[0] + objEvent.currentDate[1] + objEvent.currentDate[2] + objEvent.currentDate[3];
    const currentDate = new Date(currentYear, currentMonth, currentDay); //Con las constantes anteriores fijo la fecha dada en la base de datos.
    /*Variables para guardar las fechas de los eventos*/
    let day = "";
    let month = "";
    let year = "";
    for (const event of objEvent.events ){ //Por cada evento asignamos fechas
        month += event.date[5] + event.date[6];
        day += event.date[8] + event.date[9];
        year += event.date[0] + event.date[1] + event.date[2] + event.date[3];

        var eventDate = new Date(year, month, day); //Asignacion de fecha del eveto.
        if(eventDate > currentDate) { //Solo eventos pasados construiran el codigo html de la card.
            htmlCards += `<div id="${event._id}" class="card cardMain" style="width: 15rem;">
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
    addCards(htmlCards); //agrego el string.
}

/*=================Funciones asignadas a eventos=================*/
/*--Realiza una busqueda del texto insertado en el input
    @param event - representa el evento al cual esta funcion esta siendo referenciada.
--*/
function searchText(event){
    let writedText = event.target.value.toLowerCase().trim(); //Guarda en la variable lo que se este insertando en el input, y aplica metodos string.
    let countCards = 0;
    let countFiltered = 0;
    objEvent.events.forEach(event => {
        const selectedCard = document.getElementById(event._id); //Carta elegida segun ID.
        let nameEvent = event.name.toLowerCase(); //Guarda el nombre del evento de la base de datos y lo convierte a minusculas.
        if(selectedCard != null){
            if(!selectedCard.classList.contains("filterCheckboxSearch")){
                if(nameEvent.startsWith(writedText)){ //Si el evento coincide con lo escrito en el input, quita la clase filter.
                    selectedCard.classList.remove("filterInputSearch"); 
                }else{
                    selectedCard.classList.add("filterInputSearch"); //Agregamos la clase filtro que quita la carta de la vista de la pantalla.
                    countFiltered++;
                }
            }else{
                countFiltered++;
            }
            countCards++;
        }
    });
    errorMessage(countFiltered, countCards, writedText)
}

/*--Realiza una busqueda segun los checkboxes seleccionados.
    @param event - representa el evento al cual esta funcion esta siendo referenciada.
--*/
function search(event){
    event.preventDefault(); //Para que no recargue la pagina al presionar el submit.
    dataFromSearch = {
        category : (() => {
            let arrayCategories = [];
            let categories = event.target.querySelectorAll("input[type=checkbox]"); //Referencia a todos los input de type checkbox
            for(let i=0; i < categories.length; i++){
                if(categories[i].checked){ //Si esta checked entonces realiza la accion
                    arrayCategories.push(categories[i].value); //La accion es llenar el array con el nombre de la categoria.
                }
            }
            return arrayCategories; //Retorna el array de categorias que esten seleccionadas.
        })(),
        
    },
    checkbox = {
        applySearchCheckbox: ( () => {
            if(dataFromSearch.category.length == 0){ //Si al presionar submit no hay ninguna categoria seleccionada emite una alerta.
                alert("Please select a category");
            }else {
                objEvent.events.forEach(event => { //Recorre los eventos de la base de datos.
                    const selectedCard = document.getElementById(event._id); //A cada evento le asigna una referencia por ID.
                    if(selectedCard != null){
                        selectedCard.classList.add("filterCheckboxSearch"); //A cada evento le agrega la clase.
                        dataFromSearch.category.forEach(selectedCategory => { //Recorre el array de categorias que esten seleccionadas.
                            if(event.category === selectedCategory){ //Si la categoria seleccionada coincide con la del evento, le quita la clase.
                                selectedCard.classList.remove("filterCheckboxSearch");
                            }
                        });
                    }
                });
            }
        })()
    };
}

/*--Muestra un error si no se encuentra una busqueda--*/
function errorMessage(countFiltered, countCards, writedText){
    if(countCards == countFiltered){
        document.getElementById("errorMessage").innerHTML =`<h2>ERROR</h2>
                                                            <p>${writedText} not found</p>`
    }else{
        document.getElementById("errorMessage").innerHTML = "";
    }
}