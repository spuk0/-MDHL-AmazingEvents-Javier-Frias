const eventsStatistics = document.getElementById("eventStatistics");
const upcomingEventStatistics = document.getElementById("upcomingEvents");
const pastEventStatistics = document.getElementById("pastEvents");
/*--Consume los datos de la API para rellenar la tabla.--*/
async function getData() {
    try {
        let response = await fetch("https://mindhub-xj03.onrender.com/api/amazing");
        let data = await response.json();
        eventStatistics(data);
    }catch (error){
        console.log(error);
    }
}

/*=================MAIN-TABLE=================*/
/*--Funcion main donde se rellenara cada tabla--*/
function eventStatistics(data) {
    let eventsWithAssistance = data.events.filter(event => event.assistance!=null);
    completeEventStatistics(eventsWithAssistance);
    completeUpcomingEvents(upcomingEvents(data));
    completePastEvents(pastEvents(data));
}

/*--Top 3 de eventos con mayor porcentaje de asistencias--*/
function completeEventStatistics(events){
    let array = completeHighestAttendance(events);
    let array2 = completeLowestAttendance(events);
    let array3 = completeLargerCapacity(events);
    for(let i=0;i<3;i++){
        eventsStatistics.innerHTML += `   <tr>
                                                <td>${array[i].name} (${array[i].percentage.toFixed(2)}%)</td>
                                                <td>${array2[i].name} (${array2[i].percentage.toFixed(2)}%)</td>
                                                <td>${array3[i].name} (${array3[i].capacity} people)</td>
                                            </tr>`;
    }

}

function completeHighestAttendance(events) {
    const highestEvents = events.sort((a, b) =>  (b.assistance / b.capacity) - (a.assistance / a.capacity));
    let array = [];
    for(let i=0;i<3;i++){
        obj = {
            percentage: (100 * highestEvents[i].assistance)/highestEvents[i].capacity,
            name: highestEvents[i].name,
        }
        array.push(obj);
    }

    return array;
}

function completeLowestAttendance(events){
    let sortEvents = events.sort((b,a) =>  (b.assistance / b.capacity) - (a.assistance / a.capacity));
    let array = [];
    for(let i=0;i<3;i++){
        obj = {
            percentage: (100 * sortEvents[i].assistance)/sortEvents[i].capacity,
            name: sortEvents[i].name,
        }
        array.push(obj);
    }
    return array;
}

function completeLargerCapacity(events){
    let sortEvents = events.sort((b,a) => a.capacity - b.capacity);
    let array = [];
    for(let i=0;i<3;i++){
        obj = {
            name: sortEvents[i].name,
            capacity: sortEvents[i].capacity,
        }
        array.push(obj);
    }
    return array;
}


/*=================UPCOMING-EVENTS-TABLE=================*/
/*--Eventos pasados--*/
function pastEvents(data){
    const currentMonth= data.currentDate[5] + data.currentDate[6];
    const currentDay = data.currentDate[8] + data.currentDate[9];
    const currentYear = data.currentDate[0] + data.currentDate[1] + data.currentDate[2] + data.currentDate[3];
    const currentDate = new Date(currentYear, currentMonth, currentDay); //Con las constantes anteriores fijo la fecha dada en la base de datos.
    /*Variables para guardar las fechas de los eventos*/
    let day = "";
    let month = "";
    let year = "";
    let pastEvents=[];

    for (const event of data.events ){ //Por cada evento asignamos fechas
        month += event.date[5] + event.date[6];
        day += event.date[8] + event.date[9];
        year += event.date[0] + event.date[1] + event.date[2] + event.date[3];

        var eventDate = new Date(year, month, day); //Asignacion de fecha del eveto.
        if(currentDate > eventDate) { //Solo eventos pasados construiran el codigo html de la card.
            pastEvents.push(event);
        }
        month = "";
        day = "";
        year = "";
    }
    return pastEvents;
}


/*=================UPCOMING-EVENTS-TABLE=================*/
/*--Eventos futuros--*/
function upcomingEvents(data){
    const currentMonth= data.currentDate[5] + data.currentDate[6];
    const currentDay = data.currentDate[8] + data.currentDate[9];
    const currentYear = data.currentDate[0] + data.currentDate[1] + data.currentDate[2] + data.currentDate[3];
    const currentDate = new Date(currentYear, currentMonth, currentDay); //Con las constantes anteriores fijo la fecha dada en la base de datos.
    /*Variables para guardar las fechas de los eventos*/
    let day = "";
    let month = "";
    let year = "";
    let upcomingEvents=[];

    for (const event of data.events ){ //Por cada evento asignamos fechas
        month += event.date[5] + event.date[6];
        day += event.date[8] + event.date[9];
        year += event.date[0] + event.date[1] + event.date[2] + event.date[3];

        var eventDate = new Date(year, month, day); //Asignacion de fecha del eveto.
        if(currentDate < eventDate) { //Solo eventos pasados construiran el codigo html de la card.
            upcomingEvents.push(event);
        }
        month = "";
        day = "";
        year = "";
    }
    return upcomingEvents;
}

function completeUpcomingEvents(events){
    let ue = "";
    let categories=[];
    events.forEach(event => {
        if(!categories.includes(event.category)){
            categories.push(event.category);
        }
    })

    for(i=0; i<categories.length; i++){
        let percentage=0;
        let revenues=0;
        let estimate=0;
        let capacity=0;
        events.forEach(event => {
            if(categories[i] === event.category){
                revenues += event.price * event.estimate;
                estimate += event.estimate;
                capacity += event.capacity;
            }

        })
        percentage = (estimate * 100)/capacity;

        ue += `                             <tr>
                                                <td>${categories[i]}</td>
                                                <td>$${revenues}</td>
                                                <td>${percentage.toFixed(2)}%</td>
                                            </tr>`;
    }

    upcomingEventStatistics.innerHTML = ue;

}

function completePastEvents(events){
    let ue = "";
    let categories=[];
    events.forEach(event => {
        if(!categories.includes(event.category)){
            categories.push(event.category);
        }
    })

    for(i=0; i<categories.length; i++){
        let percentage=0;
        let revenues=0;
        let assistance=0;
        let capacity=0;
        events.forEach(event => {
            if(categories[i] === event.category){
                revenues += event.price * event.assistance;
                assistance += event.assistance;
                capacity += event.capacity;
            }

        })
        percentage = (assistance * 100)/capacity;

        ue += `                             <tr>
                                                <td>${categories[i]}</td>
                                                <td>$${revenues}</td>
                                                <td>${percentage.toFixed(2)}%</td>
                                            </tr>`;
    }

    pastEventStatistics.innerHTML = ue;

}

getData();
