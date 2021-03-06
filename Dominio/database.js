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

function loadAllVentas() {
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

    try {
        window.localStorage.getItem('ventas').length;
    } catch(err) {
        window.localStorage.setItem('ventas', '[]'); 
    }
    try {
        window.localStorage.getItem('idVentas').length;
    } catch(err) {
        window.localStorage.setItem('idVentas', '[]'); 
    }
    loadVentas();
    loadIdVentas();
    refrescarVentas();
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
    loadVentas();
    showPersonas();
}



////////////////////////////////////////////////////////////////////////



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

function saveVentas() {
    window.localStorage.removeItem('ventas');
    window.localStorage.setItem('ventas', JSON.stringify(ventas));
}

function saveIdVentas() {
    window.localStorage.removeItem('idVentas');
    window.localStorage.setItem('idVentas', JSON.stringify(idVentas));
}

function loadPropiedades() {
    propiedades = JSON.parse(window.localStorage.getItem('propiedades'));
}

function loadVentas() {
    ventas = JSON.parse(window.localStorage.getItem('ventas'));
}

function loadIdVentas() {
    idVentas = JSON.parse(window.localStorage.getItem('idVentas'));
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