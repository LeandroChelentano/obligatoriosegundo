var arrEmpty = new Array();
function empty() {
    for (let i = 0; i < arrEmpty.length; i++) {
        if (arrEmpty[i] == '') {
            arrEmpty.splice(0, arrEmpty.length);
            return true;
        }
    }
    if (arrEmpty.length > -1) {
        arrEmpty.splice(0, arrEmpty.length)
        return false;
    }
}

var arrInteger = new Array();
function integer() {
    for (let i = 0; i < arrInteger.length; i++) {
        if (isNaN(arrInteger[i])) {
            arrInteger.splice(0, arrInteger.length);
            return true;
        }
    }
    if (arrInteger.length > -1) {
        arrInteger.splice(0, arrInteger.length);
        return false;
    }
}

///////////////////////////////////////////////////////////////

var propiedades = new Array();
var idPropiedades = new Array();
var propiedadesBackup = new Array();

var tipo; //combo
var direccion;
var barrio;
var ciudad;
var metros;
var dormitorios;
var banos;
var garage; //combo
var parrillero; //combo
var wifi; //combo
var mascotas; //combo
var precio;
var propietario; //combo //Se saca el id del propietario

function getData() {
    if (document.getElementById('v1').checked) {
        tipo = 'Casa';
    } else if (document.getElementById('v2').checked) {
        tipo = 'Apartamento';
    } else {
        tipo = '';
    }
    
    direccion = document.getElementById('propertiesDireccion').value;
    barrio = document.getElementById('propertiesBarrio').value;
    ciudad = document.getElementById('propertiesCiudad').value;
    metros = document.getElementById('propertiesMetros').value;
    dormitorios = document.getElementById('propertiesDormitorios').value;
    banos = document.getElementById('propertiesBanos').value;
    
    if (document.getElementById('v3').checked) {
        garage = 'Si';
    } else if (document.getElementById('v4').checked) {
        garage = 'No'
    } else {
        garage = '';
    }

    if (document.getElementById('v5').checked) {
        parrillero = 'Si';
    } else if (document.getElementById('v6').checked) {
        parrillero = 'No'
    } else {
        parrillero = ''
    }
    
    if (document.getElementById('v7').checked) {
        wifi = 'Si';
    } else if (document.getElementById('v8').checked) {
        wifi = 'No'
    } else {
        wifi = ''
    }
    
    if (document.getElementById('v9').checked) {
        mascotas = 'Si';
    } else if (document.getElementById('v10').checked) {
        mascotas = 'No'
    } else {
        mascotas = ''
    }
    
    precio = document.getElementById('propertiesPrecio').value;

    i = document.getElementById('propertiesPropietario').selectedIndex;
    propietario = personas[i].Id;
    // propietario = 'none'
}

function getPersonas() {
    cI = document.getElementById('pCI').value;
    nombre = document.getElementById('pNombre').value;
    apellido = document.getElementById('pApellido').value;
    telefono = document.getElementById('pTelefono').value;
    email = document.getElementById('pEmail').value;
    direccion = document.getElementById('pDireccion').value;
    
    if (document.getElementById('siComprador').checked) {
        esComprador = 'Comprador';
    } else {
        esComprador = '';
    }

    if (document.getElementById('siVendedor').checked) {
        esVendedor = 'Vendedor';
    } else {
        esVendedor = '';
    }
}


function refrescarPropiedades() {
    propertiesClear();

    savePropiedades();
    savePersonas();

    loadPropiedades();
    loadPersonas();

    showProperties();
}

function refrescarPersonas() {
    clearPersonas();
    
    savePersonas();

    loadPersonas();
    loadVentas();

    showPersonas();
}

function propertiesAdd() {
    getData();
    arrEmpty.push(tipo, direccion, barrio, ciudad, metros, dormitorios, banos, garage, parrillero, wifi, mascotas, precio) //, propietario
    if (empty()) {
        alert('Hay elementos en blanco.')
    } else {
        arrInteger.push(metros, banos, dormitorios, precio)
        if (integer()) {
            alert('La extencion, cantidad de baños, dormitorios y el precio deben ser en formato numerico.')
        } else {
            var x = false;
            for(let i = 0; i < propiedades.length; i++)
            {
                if (direccion == propiedades[i].Direccion)
                {
                    alert(`La direccion ${direccion} ya se encuentra en la lista de propiedades`);
                    x = true
                }
            }
            if (x == false) {
                var newId = propiedades.length + propiedadesBackup.length;

                propiedades.push({
                    Id          : newId,
                    Tipo        : tipo,
                    Direccion   : direccion,
                    Barrio      : barrio,
                    Ciudad      : ciudad,
                    Metros      : parseInt(metros),
                    Dormitorios : parseInt(dormitorios),
                    Banos       : parseInt(banos),
                    Garage      : garage,
                    Parrillero  : parrillero,
                    Wifi        : wifi,
                    Mascotas    : mascotas,
                    Precio      : parseInt(precio),
                    Propietario : propietario,
                    Vendida     : 0 
                })

                // propietario por id
                for (let i = 0; i < personas.length; i++) {
                    if (personas[i].Id == propietario) {
                        personas[i].Uso = personas[i].Uso + 1;
                    }
                }
                

                alert('La propiedad se ingreso correctamente.')
                refrescarPropiedades()
            }
        }
    }
}

function showProperties() {
    var db = document.getElementById('dbPropiedades');
    db.innerHTML = "";
    for(var i=0 ; i < propiedades.length ; i++)
    {
        var linea = document.createElement('option');
        var indexP = 0;
        for (let x = 0; x < personas.length; x++) {
            if (personas[x].Id == propiedades[i].Propietario) {
                indexP = x;
            }
        }
        linea.text = `#${propiedades[i].Id} | ${propiedades[i].Tipo} - ${propiedades[i].Direccion} - ${propiedades[i].Barrio} - ${propiedades[i].Dormitorios} - ${propiedades[i].Banos} - ${propiedades[i].Garage} - ${propiedades[i].Parrillero} - ${propiedades[i].Wifi}  - ${ propiedades[i].Mascotas} - ${propiedades[i].Precio} | P#${personas[indexP].Id} - ${personas[indexP].Nombre} ${personas[indexP].Apellido}`;
        db.add(linea);
    }

    loadPropietario();
}

function selectP() {
    var index = document.getElementById('dbPropiedades').selectedIndex;
    if (propiedades[index].Tipo == 'Casa') {
        document.getElementById('v1').checked = true;
    } else if (propiedades[index].Tipo == 'Apartamento') {
        document.getElementById('v2').checked = true;
    }
    
    direccion = document.getElementById('propertiesDireccion').value = propiedades[index].Direccion;
    document.getElementById('propertiesBarrio').value = propiedades[index].Barrio;
    document.getElementById('propertiesCiudad').value = propiedades[index].Ciudad;
    document.getElementById('propertiesMetros').value = propiedades[index].Metros;
    document.getElementById('propertiesDormitorios').value = propiedades[index].Dormitorios;
    document.getElementById('propertiesBanos').value = propiedades[index].Banos;
    
    if (propiedades[index].Garage == 'Si') {
        document.getElementById('v3').checked = true;
    } else if (propiedades[index].Garage == 'No')  {
        document.getElementById('v4').checked = true;
    }

    if (propiedades[index].Parrillero == 'Si') {
        document.getElementById('v5').checked = true;
    } else if (propiedades[index].Parrillero == 'No') {
        document.getElementById('v6').checked = true;
    }
    
    if (propiedades[index].Wifi == 'Si') {
        document.getElementById('v7').checked = true;
    } else if (propiedades[index].Wifi == 'No') {
        document.getElementById('v8').checked = true;
    }

    if (propiedades[index].Mascotas == 'Si') {
        document.getElementById('v9').checked = true;
    } else if (propiedades[index].Mascotas == 'No') {
        document.getElementById('v10').checked = true;
    }
    
    document.getElementById('propertiesPrecio').value = propiedades[index].Precio;

    document.getElementById('propertiesPropietario').selectedIndex = propiedades[index].Propietario;
}

function propertiesRemove() 
{
    var index = document.getElementById('dbPropiedades').selectedIndex;
    if (propiedades[index].Vendida == 0) {
        // propietario por id
        for (let i = 0; i < personas.length; i++) {
            if (personas[i].Id == propietario) {
                personas[i].Uso = personas[i].Uso - 1;
            }
        }

        propiedadesBackup.push(propiedades[index]);
        propiedades.splice(index, 1);
        alert('Propiedad eliminada con exito')
        refrescarPropiedades();
    } else {
        alert('No se puede eliminar una propiedad vendida.');
    }
}


function propertiesClear()
{
    document.getElementById("formProperties").reset()
}


function propertiesModify()
{
    loadVentas();
    var index = document.getElementById('dbPropiedades').selectedIndex;
    getData();
    arrEmpty.push(tipo, direccion, barrio, ciudad, metros, dormitorios, banos, garage, parrillero, wifi, mascotas, precio) //, propietario
    if (empty()) {
        alert('Hay elementos en blanco.')
    } else {
        arrInteger.push(metros, banos, dormitorios, precio)
        if (integer()) {
            alert('La extencion, cantidad de baños, dormitorios y el precio deben ser en formato numerico.')
        } else {
            var x = false;
            for(let i = 0; i < propiedades.length; i++)
            {
                if (direccion == propiedades[i].Direccion && direccion != propiedades[index].Direccion)
                {
                    alert(`La direccion ${direccion} ya se encuentra en la lista de propiedades`);
                    x = true
                }
            }
            if (x == false) {
                var newId = idPropiedades.length;
                idPropiedades.push(newId);

                propiedades[index] = ({
                    Id          : propiedades[index].Id,
                    Tipo        : tipo,
                    Direccion   : direccion,
                    Barrio      : barrio,
                    Ciudad      : ciudad,
                    Metros      : parseInt(metros),
                    Dormitorios : parseInt(dormitorios),
                    Banos       : parseInt(banos),
                    Garage      : garage,
                    Parrillero  : parrillero,
                    Wifi        : wifi,
                    Mascotas    : mascotas,
                    Precio      : parseInt(precio),
                    Propietario : propietario,
                    Vendida     : propiedades[index].Vendida
                })
                alert('La propiedad se ha modificado correctamente.')
                refrescarPropiedades()
            }
        }
    }
}

function loadPropietario() {
    var dbPropietarios = document.getElementById('propertiesPropietario');
    dbPropietarios.innerHTML = '';
    for (let o = 0 ; o < personas.length ; o++)
    {
        var linea = document.createElement('option');
        linea.text = `Id: ${personas[o].Id} Nombre: ${personas[o].Nombre} ${personas[o].Apellido}`;
        dbPropietarios.add(linea);
    }
}


///////////////////////////////// PERSONAS

var personas = new Array();
var idPersonas = new Array();
var personasBackup = new Array();

var cI;
var nombre;
var apellido;
var telefono;
var eMail;
var esComprador;
var esVendedor;

function peopleAdd()
{
    getPersonas();
    arrEmpty.push(cI,nombre,apellido,telefono,eMail,direccion);
    if(empty())
    {
        alert('Debe seleccionar una persona en la lista')
    }
    else
    {
        arrInteger.push(telefono,cI);
        if(integer())
        {
            alert('Los valores de CI y Telefono deben ser numericos.')
        }
        else
        {
            var x = false;
            for (var i = 0; i < personas.length; i++)
            {
                if (personas[i].Ci == cI)
                {
                    alert('La cedula a registrar ya esta registrada')
                    x = true;
                } 
            }
            if (x == false)
            {
                var newId = personasBackup.length + personas.length;
                personas.push({
                    Id          :   newId,
                    Ci          :   cI,
                    Nombre      :   nombre,
                    Direccion   :   direccion,
                    Apellido    :   apellido,
                    Telefono    :   telefono,
                    Email       :   email,
                    Comprador   :   esComprador,
                    Vendedor    :   esVendedor,
                    Cartera     :   0,
                    Uso         :   0
                });
                refrescarPersonas();
            }
        }
    }
}

function peopleRemove() {
    var index = document.getElementById('dbPersonas').selectedIndex;
    if (personas[index].Uso > 0) {
        alert('La persona se encuentra en uso.')
    } else {
        personasBackup.push(personas[index]);
        personas.splice(index, 1);
        refrescarPersonas();
    }
}

function showPersonas() {
    var db = document.getElementById('dbPersonas');
    db.innerHTML = '';
    for (let i = 0; i < personas.length; i++) {
        var line = document.createElement('option');
        line.text = `${personas[i].Id} | ${personas[i].Nombre} | ${personas[i].Apellido} | ${personas[i].Ci} | ${personas[i].Direccion} | ${personas[i].Telefono} | ${personas[i].Email} | ${personas[i].Comprador} | ${personas[i].Vendedor}`;
        db.add(line);
    }
}

function selPersona() {
    var index = document.getElementById('dbPersonas').selectedIndex;

    document.getElementById('pCI').value = personas[index].Ci;
    document.getElementById('pNombre').value = personas[index].Nombre;
    document.getElementById('pApellido').value = personas[index].Apellido;
    document.getElementById('pTelefono').value = personas[index].Telefono;
    document.getElementById('pEmail').value = personas[index].Email;
    document.getElementById('pDireccion').value = personas[index].Direccion;
    
    if (personas[index].Comprador == 'Comprador') {
        document.getElementById('siComprador').checked = true;
    } else {
        document.getElementById('siComprador').checked = false;
    }

    if (personas[index].Vendedor == 'Vendedor') {
        document.getElementById('siVendedor').checked = true;
    } else {
        document.getElementById('siVendedor').checked = false;
    }

    document.getElementById('carteraBox').value = personas[index].Cartera;
}

function clearPersonas() {
    document.getElementById('pCI').value = '';
    document.getElementById('pNombre').value = '';
    document.getElementById('pApellido').value = '';
    document.getElementById('pTelefono').value = '';
    document.getElementById('pEmail').value = '';
    document.getElementById('pDireccion').value = '';
    document.getElementById('siComprador').checked = false;
    document.getElementById('siVendedor').checked = false;
    document.getElementById('carteraBox').value = '';
}

function peopleModify()
{
    var index = document.getElementById('dbPersonas').selectedIndex;
    getPersonas();
    arrEmpty.push(cI,nombre,apellido,telefono,eMail,direccion);
    if(empty()) {
        alert('Debe seleccionar una persona en la lista');
    } else {
        arrInteger.push(telefono,cI);
        if(integer()) {
            alert('Los valores de CI y Telefono deben ser numericos.');
        } else {
            var x = false;
            for (var i = 0; i < personas.length; i++) {
                if (personas[i].Ci == cI && personas[i].Ci != personas[index].Ci) {
                    alert('La cedula a registrar ya esta registrada');
                    x = true;
                } 
            }
            if (x == false) {
                let cUse = false;
                let vUse = false;
                for (let i = 0; i < ventas.length; i++) {
                    if (ventas[i].Comprador == personas[index].Id) {
                        cUse = true;
                    }
                    if (ventas[i].Vendedor == personas[index].Id) {
                        vUse = true;
                    }
                }

                if (cUse == true && esComprador == '' || vUse == true && esVendedor == '') {
                    alert('No puede quitarse la propiedad de vendedor o comprador una vez se estuvo implicado en una transaccion.')
                } else {
                    personas[index] = ({
                        Id          :   personas[index].Id,
                        Ci          :   cI,
                        Nombre      :   nombre,
                        Apellido    :   apellido,
                        Direccion   :   direccion,
                        Telefono    :   telefono,
                        Email       :   email,
                        Comprador   :   esComprador,
                        Vendedor    :   esVendedor,
                        Cartera     :   personas[index].Cartera,
                        Uso         :   personas[index].Uso
                    });
                    refrescarPersonas();
                }
            }
        }
    }
}










///////////////////////////////////////// VENTAS //////////////////////////////////////////


function ventasLoadPropiedades() {
    var db = document.getElementById('sellPropiedad');
    db.innerHTML = '';
    for (var i = 0; i < propiedades.length; i++) {
        var line = document.createElement('option');
        line.text = `${propiedades[i].Id} | ${propiedades[i].Tipo} | ${propiedades[i].Direccion} - $${propiedades[i].Precio}`
        db.add(line);
    }
}

function ventasLoadCompradores() {
    var db = document.getElementById('sellComprador');
    db.innerHTML = '';
    for (let i = 0; i < personas.length; i++) {
        if (personas[i].Comprador == 'Comprador') {
            var line = document.createElement('option');
            line.text = `${personas[i].Id} | ${personas[i].Nombre} ${personas[i].Apellido}`
            db.add(line);
        }
    }
}

function ventasLoadVendedores() {
    var db = document.getElementById('sellVendedor');
    db.innerHTML = '';
    for (let i = 0; i < personas.length; i++) {
        if (personas[i].Vendedor == 'Vendedor') {
            var line = document.createElement('option');
            line.text = `${personas[i].Id} | ${personas[i].Nombre} ${personas[i].Apellido}`
            db.add(line);
        }
    }
}

var ventas = new Array();
var idVentas = new Array();

var vFecha;
var vPropiedad;
var vMonto;
var vComprador;
var vVendedor;

function getVenta() {
    vFecha = document.getElementById('sellFecha').value;
    vPropiedad = document.getElementById('sellPropiedad').value;
    vMonto = document.getElementById('sellMonto').value;
    vComprador = document.getElementById('sellComprador').value;
    vVendedor = document.getElementById('sellVendedor').value;
}

function vender() {
    getVenta();
    arrEmpty.push(vFecha, vPropiedad, vComprador, vVendedor)
    if (empty()) {
        alert('Hay elementos vacios.');
    } else {
        var newId = idVentas.length;
        idVentas.push(newId);
        monto();
     

        var i = document.getElementById('sellPropiedad').selectedIndex;
        var p = propiedades[i].Id;

        var ii = document.getElementById('sellComprador').selectedIndex;
        let cTemp = new Array();
        for (let x = 0; x < personas.length; x++) {
            if (personas[x].Comprador == 'Comprador') {
                cTemp.push(personas[x]);
            }
        }
        // ii es index en personasCompradores
        var c = cTemp[ii].Id; //id de comprador
        cTemp.splice(0, cTemp.length);
        var xC = 0;
        for (let x = 0; x < personas.length; x++) {
            if (personas[x].Id == c) {
                xC = x;
            }
        } 
        // xC es index en personas
        

     
        var iii = document.getElementById('sellVendedor').selectedIndex;
        let vTemp = new Array();
        for (let u = 0; u < personas.length; u++)
        {
            if(personas[u].Vendedor == 'Vendedor')
            {
                vTemp.push(personas[u]);
            }
        }
        // iii es el index en personasVendedores
        var v = vTemp[iii].Id; // id del vendedor
        vTemp.splice(0, vTemp.length);
        var xV = 0;
        for (let u = 0; u < personas.length; u++) {
            if(personas[u].Id == v){
                xV = u;
            }
        }
        // xV es el index de Vendedores en Personas


        if (propiedades[i].Vendida == 0) {
            if (c == v || c == propiedades[i].Propietario) {
                alert('Algo salio mal.')
            } else {
                propiedades[i].Vendida = 1;
                propiedades[i].Propietario = c;
                personas[xV].Cartera = personas[xV].Cartera + Math.round((3 * propiedades[i].Precio) / 100);

                personas[xC].Uso = personas[xC].Uso + 1;
                personas[xV].Uso = personas[xV].Uso + 1;

                ventas.push({
                    Id: newId,
                    Fecha: vFecha,
                    Propiedad: propiedades[p].Id,
                    Monto: vMonto,
                    Comprador: personas[c].Id,
                    Vendedor: personas[v].Id
                })
                refrescarVentas();
            }
        } else {
            alert('Propiedad ya vendida.');
        }
    }
}

function SellLimpiar() {
    document.getElementById('sellPropiedad').selectedIndex = 0;
    document.getElementById('sellMonto').value = '';
    document.getElementById('sellComprador').selectedIndex = 0;
    document.getElementById('sellVendedor').selectedIndex = 0;
}

function showVentas() {
    var db = document.getElementById('dbVentas');
    db.innerHTML = '';
    for (let i = 0; i < ventas.length; i++) {
            var line = document.createElement('option');
            
            var indexVendedor = 0;
            for (let x = 0; x < personas.length; x++) {
                if (personas[x].Id == ventas[i].Vendedor) {
                    indexVendedor = x;
                }
            }
            
            var indexComprador = 0;
            for (let x = 0; x < personas.length; x++) {
                if (personas[x].Id == ventas[i].Comprador) {
                    indexComprador = x;
                }
            }

            var indexPropiedad = 0;
            for (let x = 0; x < propiedades.length; x++) {
                if (propiedades[x].Id == ventas[i].Propiedad) {
                    indexPropiedad = x;
                }
            }
            
            line.text = `V#${ventas[i].Id} | ${ventas[i].Fecha} | P#${propiedades[indexPropiedad].Id} - ${propiedades[indexPropiedad].Direccion} | Vendedor: ${personas[indexVendedor].Id} - ${personas[indexVendedor].Nombre} ${personas[indexVendedor].Apellido} | Comprador: ${personas[indexComprador].Id} - ${personas[indexComprador].Nombre} ${personas[indexComprador].Apellido} = $${ventas[i].Monto}`
            db.add(line);
    }
}




function monto() {
    var index = document.getElementById('sellPropiedad').selectedIndex;
    var box = document.getElementById('sellMonto');
    box.value = '$' + propiedades[index].Precio;
    vMonto = parseInt(propiedades[index].Precio);
}

 

// dejalo abajo
function refrescarVentas() {
    SellLimpiar();

    saveVentas();
    saveIdVentas();
    savePropiedades();
    savePersonas();

    loadVentas();
    loadIdVentas();
    loadPropiedades();
    loadPersonas();

    ventasLoadPropiedades();
    ventasLoadCompradores();
    ventasLoadVendedores();
    showVentas();
}