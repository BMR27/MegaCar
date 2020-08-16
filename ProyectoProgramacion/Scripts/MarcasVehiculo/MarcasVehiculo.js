//Document ready
$(function () {
    ValidarRegistroVehiculo();
    EventoChange();
    ConsultarListaMarcas();
    ConsultarListaPais();
    ConsultarListaFabricante();
    CapturarDatosFormulario();
    OcultarAlertas();
    ObetenerDatoGrid();
});
//OCULTAMOS LAS ALERTAS
function OcultarAlertas() {
    $("#AlertaExito").hide();
    $("#btnModificarMarca").hide();
    $("#divIdMarca").hide();
    $("#divAlertaElimina").hide();
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
//VALIDAR FORMULARIO
function ValidarRegistroVehiculo() {
    $("#frmRegistroMarca").validate(
        {
            rules: {
                C_NOMBRE_MARCA: {
                    required: true,
                    maxlength: 60,
                    minlength: 1
                },
                Pais: {
                    required: true
                },
                Fabricante: {
                    required: true
                }

            }

        }
    );
}
//CAPTURAMOS LOS DATOS DEL FORMULARIO
function CapturarDatosFormulario() {
    //Activa el boton registrar en el modal
    $("#btnRegistrarMarca").on("click", function () {
        $("#btnRegistrar").show();
        $("#btnModificarMarca").hide();
        $("#btnEliminarMarca").hide();
    });

    $("#btnRegistrar").on("click", function () {
        ///asignar a la variable formulario
        ///el resultado del selector
        var formulario = $("#frmRegistroMarca");
        ///ejecutar el método de validación
        formulario.validate();
        ///si el formulario es válido, proceder a
        ///ejecutar la función invocarMetodoPost
        if (formulario.valid()) {
            //CAPTURMAOS LOS DATOS SELECCIONADOS
            var Fabricante = $("#Fabricante").val()
            var Nombre = $("#C_NOMBRE_MARCA").val()
            /////construir la dirección del método del servidor
            var urlMetodo = '/MarcaVehiculo/RegistrarMarca'
            var parametros = {
                C_NOMBRE_MARCA: Nombre,
                C_FK_FABRICANTE: Fabricante
            };
            var funcion = MostrarResultadoRegistro;
            ///ejecuta la función $.ajax utilizando un método genérico
            //para no declarar toda la instrucción siempre
            ejecutaAjax(urlMetodo, parametros, funcion);
        }
    });

    //MODIFICAR DATOS
    $("#btnModificarMarca").on("click", function () {
        ///asignar a la variable formulario
        ///el resultado del selector
        var formulario = $("#frmRegistroMarca");
        ///ejecutar el método de validación
        formulario.validate();
        ///si el formulario es válido, proceder a
        ///ejecutar la función invocarMetodoPost
        if (formulario.valid()) {
            ObtenerDatosModificarMarcas();
            ConsultarListaMarcas();
        }
    });

    //ELIMINAR DATOS MARCA
    $("#btnEliminar").on("click", function () {
        ObtenerDatosEliminaMarca();
    });
}
//MUESTRA EL RESULTADO AL REGISTRAR O MODIFICAR UNA MARCA
function MostrarResultadoRegistro(data) {
    //alert(data.resultado);
    //$("#lblMensaje").val(data.resultado);
    ConsultarListaMarcas();

    $("#lblMensaje").text(data.resultado);
    MostrarAlertaExito();
}
//MUESTRA EL RESULTADO AL ELIMINAR UNA MARCA
function MostrarResultadoElimina(data) {
    ConsultarListaMarcas();

    $("#lblElimina").text(data.resultado);
    MostrarAlertaElimina();
}


/*Eventos change*/
function EventoChange() {
    $("#Pais").change(function () {
        var pais = $("#Pais").val();
        ConsultarListaFabricante(pais);
    });
}

/*consulta la lista de marcas*/
function ConsultarListaMarcas() {
    /////construir la dirección del método del servidor
    var urlMetodo = '/MarcaVehiculo/ListaMarcas'
    var parametros = {};
    var funcion = creaGrid;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}
//Funcion para cargar el grid
function creaGrid(data) {
    $("#divListaMarcas").kendoGrid({
        dataSource: {
            data: data.resultado,    
            pageSize: 6
        },
        pageable: true,
        columnMenu: true,
        sortable: true,
        selectable: "multiple",
        toolbar: ["search"],
        columns: [
            {
                field: 'C_ID_MARCA',
                title: 'Id Marca'
            },
            {
                field: 'C_NOMBRE_MARCA',
                title:'Nombre'
            },
            {
                field: 'C_NOMBRE_FABRICANTE',
                title: 'Fabricante'
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
//FUNCION QUE CONSULTA LOS FABRICANTES
//Funcion que carga los fabricantes
function ConsultarListaFabricante(pais) {
    /////construir la dirección del método del servidor
    var urlMetodo = '/Vehiculo/RetornaFabricantes'
    var parametros = {
        C_ID_PAIS : pais
    };
    var funcion = ProcesaResultadoFabricantes;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}
function ProcesaResultadoFabricantes(data) {
    var ddlFabricantes = $("#Fabricante");
    ddlFabricantes.empty();
    var nuevaAccion = "<option value=''>Seleccione un Fabricante</option>";
    ddlFabricantes.append(nuevaAccion);
    $(data).each(function () {
        var FabricanteActual = this;
        nuevaAccion = "<option value='" + FabricanteActual.C_ID_FABRICANTE + "'>" + FabricanteActual.C_NOMBRE_FABRICANTE + "</option>";
        ddlFabricantes.append(nuevaAccion);
    });
}

//FUNCION OBTIENE EL DATO SELECCIONADO DEL GRID
function ObetenerDatoGrid() {
    $("#btnModificar").on("click", function () {
        //Apagams el boton de registrar
        $("#btnRegistrar").hide();
        //Encendemos el boton de modificar
        $("#btnModificarMarca").show();
        //ENCENDEMOS EL DIV DEL ID DE LA MARCA
        $("#divIdMarca").show();
        //CAPTURAMOS LOS DATOS DEL GRID
        var grid = $("#divListaMarcas").data("kendoGrid");
        var selectedDataItem = grid.dataItem(grid.select());
        //SELECCIONAMOS O MOSTRAMOS EL PAIS DE FABRICANTE
        $("#Pais").val(selectedDataItem.C_FK_PAIS);
        ConsultarListaFabricante(selectedDataItem.C_FK_PAIS);
        $("#Fabricante").val(selectedDataItem.C_ID_FABRICANTE);
        $("#C_NOMBRE_MARCA").val(selectedDataItem.C_NOMBRE_MARCA)
        $("#C_ID_MARCA").val(selectedDataItem.C_ID_MARCA)
    });
    
}

//FUNCION MODIFICA LOS DATOS DE LAS MARCAS
function ObtenerDatosModificarMarcas() {
    /////construir la dirección del método del servidor
    var urlMetodo = '/MarcaVehiculo/ModificarMarca'
    var parametros = {
        C_ID_MARCA: $("#C_ID_MARCA").val(),
        C_ID_FABRICANTE: $("#Fabricante").val(),
        C_NOMBRE_MARCA: $("#C_NOMBRE_MARCA").val()
    };
    var funcion = MostrarResultadoRegistro;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}

//FUNCION ELIMINA UNA MARCA
function ObtenerDatosEliminaMarca() {
    //Obtenemos los datos desde el grid
    var grid = $("#divListaMarcas").data("kendoGrid");
    var selectedDataItem = grid.dataItem(grid.select());
    /////construir la dirección del método del servidor
    var urlMetodo = '/MarcaVehiculo/EliminarMarca'
    var parametros = {
        C_ID_MARCA: selectedDataItem.C_ID_MARCA
    };
    var funcion = MostrarResultadoElimina;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}

