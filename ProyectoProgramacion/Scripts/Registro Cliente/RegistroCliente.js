

$(function () {
    creaValidaciones();
    ///llamamos a la función que se encargará de crear los eventos
    //que nos permitirán controlar cuando se haga una selección en las respectivas listas
    estableceEventosChange();

    ///Carga inicialmente la lista der provincias, ya que es 
    //la lista con la que iniciaremos.
    cargaDropdownListProvincias();

});

///crea las validaciones para el formulario
function creaValidaciones() {
    $("#frmRegistraCliente").validate({
        ///objeto que contiene "las condiciones" que el formulario
        ///debe cumplir para ser considerado válido
        rules: {
            C_NOMBRE_CLIENTE: {
                required: true,
                minlength: 3,
                maxlength: 7
            },
            C_APELLIDO1: {
                required: true
            },
            C_APELLIDO2: {
                required: true
            },
            C_CEDULA: {
                required: true,
                email: true
            },
            C_CORREO: {
                required: true,
                maxlength: 12
            },
            C_DIRECCION: {
                required: true
            },
            C_TELEFONO: {
                required: true
            },
            id_Provincia: {
                required: true
            },
            id_Canton: {
                required: true
            },
            id_Distrito: {
                required: true
            }
        }
    });
}



//función que registrará los eventos necesarios para "monitorear"
//cuando se ejecute el método change de las respectivas listas
function estableceEventosChange() {
    ///Evento change de la Lista de provincias
    $("#provincia").change(function () {
        ///obtenemos el id de la provincia seleccionada
        var provincia = $("#provincia").val();
        ///llamamos la función que nos permitirá cargar
        ///todos los cantones asociados a la provincia seleccionada
        cargaDropdownListCantones(provincia);
    });
}


///carga los registros de las provincias
function cargaDropdownListProvincias() {
    ///dirección a donde se enviarán los datos
    var url = '/EjemploPost/RetornaProvincias';
    ///parámetros del método, es CASE-SENSITIVE
    var parametros = {
    };
    ///invocar el método
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(parametros),
        success: function (data, textStatus, jQxhr) {
            procesarResultadoProvincias(data);
        },
        error: function (jQxhr, textStatus, errorThrown) {
            alert(errorThrown);
        },
    });
}

/*
 * toma el resultado del método RetornaProvincias
 * y lo procesa, recorriendo cada posición
 */
function procesarResultadoProvincias(data) {
    ///mediante un selector nos posicionamos sobre la lista de provincias
    var ddlProvincias = $("#provincia");
    ///"limpiamos" todas las opciones de la lista de provincias
    ddlProvincias.empty();

    ///empezamos a trabajar con los datos que nos retorna el servidor
    ///creamos la primera opción de la lista, con un valor vacío y el texto de "Seleecione un valor"
    var nuevaOpción = "<option value=''>Seleccione una Provincia</option>";
    ///agregamos la opción al dropdownlist
    ddlProvincias.append(nuevaOpción);
    ///empezamos a recorerrer cada uno de los registros obtenidos
    $(data).each(function () {
        ///obtenemos el objeto de tipo Provincia haciendo uso de la claúsula "this"                        
        //ahora podemos acceder a todas las propiedades
        ///por ejemplo provinciaActual.nombre nos retorna el nombre de la provincia
        var provinciaActual = this;
        ///creamos la opción de la lista, con el valor del id de provioncia y el texto con el nomnbre
        nuevaOpción = "<option value='" + provinciaActual.id_Provincia + "'>" + provinciaActual.nombre + "</option>";
        ///agregamos la opción al dropdownlist
        ddlProvincias.append(nuevaOpción);
    });
}

///carga los registros de los cantones
function cargaDropdownListCantones(pIdProvincia) {

    ///dirección a donde se enviarán los datos
    var url = '/EjemploPost/RetornaCantones';
    ///parámetros del método, es CASE-SENSITIVE
    var parametros = {
        id_Provincia: pIdProvincia
    };
    ///invocar el método
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(parametros),
        success: function (data, textStatus, jQxhr) {
            procesarResultadoCantones(data);
        },
        error: function (jQxhr, textStatus, errorThrown) {
            alert(errorThrown);
        },
    });
}


function procesarResultadoCantones(data) {
    ///mediante un selector nos posicionamos sobre la lista de cantones
    var ddlCantones = $("#canton");
    ///"limpiamos" todas las opciones de la lista de cantones            
    ddlCantones.empty();

    ///empezamos a trabajar con los datos que nos retorna el servidor
    ///creamos la primera opción de la lista, con un valor vacío y el texto de "Seleecione un valor"
    var nuevaOpción = "<option value=''>Seleccione un cantón</option>";
    ///agregamos la opción al dropdownlist
    ddlCantones.append(nuevaOpción);
    ///empezamos a recorerrer cada uno de los registros obtenidos
    $(data).each(function () {
        ///obtenemos el objeto de tipo Canton haciendo uso de la claúsula "this"                        
        //ahora podemos acceder a todas las propiedades
        ///por ejemplo cantonActual.nombre nos retorna el nombre del cantón
        var cantonActual = this;
        ///creamos la opción de la lista, con el valor del id de cantón y el texto con el nomnbre
        nuevaOpción = "<option value='" + cantonActual.id_Canton + "'>" + cantonActual.nombre + "</option>";
        ///agregamos la opción al dropdownlist
        ddlCantones.append(nuevaOpción);
    });
}