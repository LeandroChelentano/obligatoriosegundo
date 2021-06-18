var propiedades = new Array();
var personas = new Array();

function loadAllPropiedades() {
    console.log(window.localStorage.getItem('propiedades').length)
    if (window.localStorage.getItem('propiedades').length == null) {
        window.localStorage.setItem('propiedades', '');
    } else {
        loadPropiedades();
        showProperties(); // Mostrar en base de datos
    }
    if (window.localStorage.getItem('personas').length == null) {
        window.localStorage.setItem('personas', '');
    } else {
        loadPersonas();
    }
}

function loadAllPersonas() {
    if (window.localStorage.getItem('personas').length == null) {
        window.localStorage.setItem('personas', '');
    } else {
        loadPersonas();
        showPersonas(); // Mostrar en base de datos
    }
}

function savePropiedades() { // guardar en ls
    window.localStorage.removeItem('propiedades');
    window.localStorage.setItem('propiedades', JSON.stringify(propiedades));
}

function savePersonas() { // guardar en ls
    window.localStorage.removeItem('personas');
    window.localStorage.setItem('personas', JSON.stringify(personas));
}

function loadPropiedades() {
    propiedades = JSON.parse(window.localStorage.getItem('propiedades'));
}

function loadPersonas() {
    personas = JSON.parse(window.localStorage.getItem('personas'));
}

function cls() {
    window.localStorage.clear();
}