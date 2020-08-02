$(function () {
    OcultarAlertasBotones();
    EventosClick();
    ConsultarModelos();
    EventoChange();
    ValidarFormularioModelo();
    ObetenerDatoGrid();
});
//EVENTOS CLICK
function EventosClick() {
    //Activa el boton registrar en el modal
    $("#btnRegistrarServicio").on("click", function () {
        $("#btnRegistrar").show();
        $("#btnModificarServicio").hide();
      
    });

    $("#btnRegistrar").on("click", function () {
        ///asignar a la variable formulario
        ///el resultado del selector
        var formulario = $("#frmRegistroServicio");
        ///ejecutar el método de validación
        formulario.validate();
        ///si el formulario es válido, proceder a
        ///ejecutar la función invocarMetodoPost
        if (formulario.valid()) {
            //CAPTURMAOS LOS DATOS SELECCIONADOS
            var Servicio = $("#C_NOMBRE_SERVICIO").val()
            var Precio = $("#C_PRECIO").val()
            /////construir la dirección del método del servidor
            var urlMetodo = '/Servicios/RegistrarServicio'
            var parametros = {
                C_NOMBRE_SERVICIO: Nombre,
                C_PRECIO: Precio
            };
            var funcion = MostrarResultadoRegistro;
            ///ejecuta la función $.ajax utilizando un método genérico
            //para no declarar toda la instrucción siempre
            ejecutaAjax(urlMetodo, parametros, funcion);
        }
    });

    //MODIFICAR DATOS
    $("#btnModificarServicio").on("click", function () {
        ///asignar a la variable formulario
        ///el resultado del selector
        var formulario = $("#frmRegistroServicio");
        ///ejecutar el método de validación
        formulario.validate();
        ///si el formulario es válido, proceder a
        ///ejecutar la función invocarMetodoPost
        if (formulario.valid()) {
            ObtenerDatosModificarServicio();
        }
    });

    //ELIMINAR DATOS MARCA
    $("#btnEliminar").on("click", function () {
        ObtenerDatosEliminaServicio();
    });
}

//FUNCION MODIFICA LOS DATOS DE LAS MARCAS
function ObtenerDatosModificarServicio() {
    /////construir la dirección del método del servidor
    var urlMetodo = '/Servicios/ModificarServicio'
    var parametros = {
        C_NOMBRE_SERVICIO: $("#C_NOMBRE_SERVICIO").val(),
        C_PRECIO: $("#C_PRECIO").val()
       
    };
    var funcion = MostrarResultadoRegistro;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}
//OCULTAR ALERTAS Y BOTONES
function OcultarAlertasBotones() {
    $("#AlertaExito").hide();
    $("#btnModificarServicio").hide();
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
function ValidarFormularioModelo() {
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

//FUNCION OBTIENE EL DATO SELECCIONADO DEL GRID
function ObetenerDatoGrid() {
    $("#btnModificar").on("click", function () {
        //Apagams el boton de registrar
        $("#btnRegistrar").hide();
        //Encendemos el boton de modificar
        $("#btnModificarModelo").show();
        //ENCENDEMOS EL DIV DEL ID DE LA MARCA
        $("#divIdModelo").show();
        //CAPTURAMOS LOS DATOS DEL GRID
        var grid = $("#divListaModelo").data("kendoGrid");
        var selectedDataItem = grid.dataItem(grid.select());
        //SELECCIONAMOS O MOSTRAMOS EL PAIS DE FABRICANTE
        $("#Pais").val(selectedDataItem.C_ID_PAIS);
        ConsultarListaFabricante(selectedDataItem.C_ID_PAIS);
        $("#Fabricante").val(selectedDataItem.C_ID_FABRICANTE);
        CargarListaMarcas(selectedDataItem.C_ID_MARCA);
        $("#C_ID_MARCA").val(selectedDataItem.C_ID_MARCA);//SELECCIONA LA LISTA DE MARCAS
        $("#C_NOMBRE_MODELO").val(selectedDataItem.C_NOMBRE_MODELO)
        $("#C_ID_MODELO").val(selectedDataItem.C_ID_MODELO)
    });

}
//MUESTRA EL RESULTADO AL REGISTRAR O MODIFICAR UNA MARCA
function MostrarResultadoRegistro(data) {
    $("#lblMensaje").text(data.resultado);
    MostrarAlertaExito();
}
//MUESTRA EL RESULTADO AL ELIMINAR UNA MARCA
function MostrarResultadoElimina(data) {
    $("#lblElimina").text(data.resultado);
    MostrarAlertaElimina();
}

/*consulta la lista de marcas*/
function ConsultarServicios() {
    /////construir la dirección del método del servidor
    var urlMetodo = '/Servicios/MostrarServicios'
    var parametros = {};
    var funcion = creaGrid;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}
//Funcion para cargar el grid
function creaGrid(data) {
    $("#divListaModelo").kendoGrid({
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
                field: 'C_ID_SERVICIO',
                title: 'Id Servicio'
            },
            {
                field: 'C_NOMBRE_SERVICIO',
                title: 'Nombre Servicio'
            },
            {
                field: 'C_PRECIO',
                title: 'Precio'
            }
        ]


    });
}