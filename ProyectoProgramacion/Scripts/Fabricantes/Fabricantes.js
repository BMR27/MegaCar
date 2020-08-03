//Document ready
$(function () {
    ConsultarListaServicios();
    OcultarAlertasBotones();
    CapturarDatosFormulario();
    ValidarRegistroServicio();
    ObetenerDatoGrid();
});

//OCULTAR ALERTAS Y BOTONES
function OcultarAlertasBotones() {
    $("#AlertaExito").hide();
    $("#btnModificarServicio").hide();
    $("#divIdServicio").hide();
    $("#divAlertaElimina").hide();
}

//VALIDAR FORMULARIO
function ValidarRegistroServicio() {
    $("#frmRegistroServicio").validate(
        {
            rules: {
                C_NOMBRE_SERVICIO: {
                    required: true,
                    maxlength: 60,
                    minlength: 1
                },
                C_PRECIO: {
                    required: true
                }

            }

        }
    );
}
//CAPTURAMOS LOS DATOS DEL FORMULARIO
function CapturarDatosFormulario() {
    //Activa el boton registrar en el modal
    $("#btnRegistrarServicio").on("click", function () {
        $("#btnRegistrar").show();
        $("#btnModificarServicio").hide();
        $("#divListaServicios").hide();
    });

    $("#btnRegistrar").click(function () {
        //CAPTURAMOS LOS DATOS SELECCIONADOS
        var Pais = $("#Pais").val()
        var Nombre = $("#C_NOMBRE_FABRICANTE").val()
        /////construir la dirección del método del servidor
        var urlMetodo = '/Fabricante/RegistrarFabricantes'
        var parametros = {
            C_NOMBRE_FABRICANTE: Nombre,
            C_ID_PAIS: Pais
        };
        var funcion = MostrarResultadoRegistro;
        ///ejecuta la función $.ajax utilizando un método genérico
        //para no declarar toda la instrucción siempre
        ejecutaAjax(urlMetodo, parametros, funcion);
    });
    //MODIFICAR DATOS
    $("#btnModificarFabricante").on("click", function () {
        ///asignar a la variable formulario
        ///el resultado del selector
        var formulario = $("#frmRegistroFabricante");
        ///ejecutar el método de validación
        formulario.validate();
        ///si el formulario es válido, proceder a
        ///ejecutar la función invocarMetodoPost
        if (formulario.valid()) {
            ObtenerDatosModificarModelo();
        }
    });

    //ELIMINAR DATOS MARCA
    $("#btnEliminar").on("click", function () {
        ObtenerDatosEliminaMarca();
    });
}
function MostrarResultadoRegistro(data) {
    alert(data.resultado);
}


/*Eventos change*/
function EventoChange() {
    $("#Pais").change(function () {
        var pais = $("#Pais").val();
        ConsultarListaFabricante(pais);
    });
}

/*consulta la lista de paises*/
function ConsultarListaFabricantes() {
    /////construir la dirección del método del servidor
    var urlMetodo = '/Fabricante/ListaFabricantes'
    var parametros = {};
    var funcion = creaGrid;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}
//Funcion para cargar el grid
function creaGrid(data) {
    $("#divListaFabricantes").kendoGrid({
        dataSource: {
            data: data.resultado,
            pageSize: 3
        },
        pageable: true,
        columnMenu: true,
        sortable: true,
        selectable: "multiple",
        toolbar: ["search"],
        columns: [
            {
                field: 'C_ID_FABRICANTE',
                title: 'Id Fabricante'
            },
            {
                field: 'C_NOMBRE_FABRICANTE',
                title: 'Nombre'
            },
            {
                field: 'C_NOMBRE_PAIS',
                title: 'Nombre Pais'
            }
        ]


    });
}

//Funcion que carga los fabricantes
function ConsultarListaPais() {
    /////construir la dirección del método del servidor
    var urlMetodo = '/MarcaVehiculo/ListaPais'
    var parametros = {};
    var funcion = procesarResultadoPais;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}

function procesarResultadoPais(data) {
    ///mediante un selector nos posicionamos sobre la lista de provincias
    var ddlPais = $("#Pais");
    ///"limpiamos" todas las opciones de la lista de provincias
    ddlPais.empty();

    ///empezamos a trabajar con los datos que nos retorna el servidor
    ///creamos la primera opción de la lista, con un valor vacío y el texto de "Seleecione un valor"
    var nuevaOpción = "<option value=''>Seleccione una Pais</option>";
    ///agregamos la opción al dropdownlist
    ddlPais.append(nuevaOpción);
    ///empezamos a recorerrer cada uno de los registros obtenidos
    $(data).each(function () {
        ///obtenemos el objeto de tipo Provincia haciendo uso de la claúsula "this"                        
        //ahora podemos acceder a todas las propiedades
        ///por ejemplo provinciaActual.nombre nos retorna el nombre de la provincia
        var paisActual = this;
        ///creamos la opción de la lista, con el valor del id de provioncia y el texto con el nomnbre
        nuevaOpción = "<option value='" + paisActual.C_ID_PAIS + "'>" + paisActual.C_NOMBRE_PAIS + "</option>";
        ///agregamos la opción al dropdownlist
        ddlPais.append(nuevaOpción);
    });
}


//FUNCION ELIMINA UNA MARCA
function ObtenerDatosEliminaMarca() {
    //Obtenemos los datos desde el grid
    var grid = $("#divListaFabricantes").data("kendoGrid");
    var selectedDataItem = grid.dataItem(grid.select());
    /////construir la dirección del método del servidor
    var urlMetodo = '/Fabricante/EliminarFabricante'
    var parametros = {
        C_ID_FABRICANTE: selectedDataItem.C_ID_FABRICANTE
    };
    var funcion = MostrarResultadoElimina;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}

//MUESTRA EL RESULTADO AL REGISTRAR O MODIFICAR UNA MARCA
function MostrarResultadoRegistro(data) {
    //alert(data.resultado);
    //$("#lblMensaje").val(data.resultado);
    $("#lblMensaje").text(data.resultado);
    MostrarAlertaExito();
}
//MUESTRA EL RESULTADO AL ELIMINAR UNA MARCA
function MostrarResultadoElimina(data) {

    $("#lblElimina").text(data.resultado);
    MostrarAlertaElimina();
}

//MOSTRAMOS ALERTA
function MostrarAlertaExito() {
    $('#AlertaExito').fadeTo(2000, 500).slideUp(500, function () {
        $("#AlertaExito").slideUp(500);
    }); //muestro mediante id
}
//MOSTRAMOS ELIMINA
function MostrarAlertaElimina() {
    $('#divAlertaElimina').fadeTo(2000, 500).slideUp(500, function () {
        $("#divAlertaElimina").slideUp(500);
    }); //muestro mediante id
}

//FUNCION OBTIENE EL DATO SELECCIONADO DEL GRID
function ObetenerDatoGrid() {
    $("#btnModificar").on("click", function () {
        //Apagams el boton de registrar
        $("#btnRegistrar").hide();
        //Encendemos el boton de modificar
        $("#btnModificarFabricante").show();
        //ENCENDEMOS EL DIV DEL ID DE LA MARCA
        $("#divIdFabricante").show();
        //CAPTURAMOS LOS DATOS DEL GRID
        var grid = $("#divListaFabricantes").data("kendoGrid");
        var selectedDataItem = grid.dataItem(grid.select());
        //SELECCIONAMOS O MOSTRAMOS EL PAIS DE FABRICANTE
        $("#Pais").val(selectedDataItem.C_ID_PAIS);
        $("#C_NOMBRE_FABRICANTE").val(selectedDataItem.C_NOMBRE_FABRICANTE)
        $("#C_ID_FABRICANTE").val(selectedDataItem.C_ID_FABRICANTE)
    });

}


//FUNCION MODIFICA LOS DATOS DE LAS MARCAS
function ObtenerDatosModificarModelo() {
    /////construir la dirección del método del servidor
    var urlMetodo = '/Fabricante/ModificarFabricante'
    var parametros = {
        C_ID_FABRICANTE: $("#C_ID_FABRICANTE").val(),
        C_ID_PAIS: $("#Pais").val(),
        C_NOMBRE_FABRICANTE: $("#C_NOMBRE_FABRICANTE").val()
    };
    var funcion = MostrarResultadoRegistro;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}