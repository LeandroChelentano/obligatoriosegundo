var propiedades = new Array();
var personas = new Array();

function loadAllPropiedades() {
    try {
        window.localStorage.getItem('personas').length;
    } catch(err) {
        window.localStorage.setItem('personas', '[]');    
    }
    try {
        window.localStorage.getItem('personasBackup').length;
    } catch(err) {
        window.localStorage.setItem('personasBackup', '[]');    
    }
    loadPersonas();
    loadPersonasBackup();
    
    try {
        window.localStorage.getItem('propiedades').length;
    } catch(err) {
        window.localStorage.setItem('propiedades', '[]');
    }
    try {
        window.localStorage.getItem('propiedadesBackup').length;
    } catch(err) {
        window.localStorage.setItem('propiedadesBackup', '[]');
    }
    loadPropiedades();
    loadPropiedadesBackup();
    showProperties();
}

function loadAllPersonas() {
    try {
        window.localStorage.getItem('personas').length;
    } catch(err) {
        window.localStorage.setItem('personas', '[]');    
    }
    try {
        window.localStorage.getItem('personasBackup').length;
    } catch(err) {
        window.localStorage.setItem('personasBackup', '[]');    
    }
    loadPersonas();
    loadPersonasBackup();
    showPersonas();
}

function savePropiedades() { // guardar en ls
    window.localStorage.removeItem('propiedades');
    window.localStorage.setItem('propiedades', JSON.stringify(propiedades));   
}

function savePropiedadesBackup() { 
    window.localStorage.removeItem('propiedadesBackup');
    window.localStorage.setItem('propiedadesBackup', JSON.stringify(propiedadesBackup));
}

function savePersonas() { // guardar en ls
    window.localStorage.removeItem('personas');
    window.localStorage.setItem('personas', JSON.stringify(personas));
}

function savePersonasBackup() {
    window.localStorage.removeItem('personasBackup');
    window.localStorage.setItem('personasBackup', JSON.stringify(personasBackup));
}

function loadPropiedades() {
    propiedades = JSON.parse(window.localStorage.getItem('propiedades'));
}

function loadPropiedadesBackup() {
    propiedadesBackup = JSON.parse(window.localStorage.getItem('propiedadesBackup'));
}

function loadPersonas() {
    personas = JSON.parse(window.localStorage.getItem('personas'));
}

function loadPersonasBackup() {
    personasBackup = JSON.parse(window.localStorage.getItem('personasBackup'));
}

function cls() {
    window.localStorage.clear();
}