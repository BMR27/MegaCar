//Document ready
$(function () {
    ConsultarListaServicios();
    OcultarAlertasBotones();
    CapturarDatosFormulario();
    ConsultarListaCliente();
    ObetenerDatoGrid();
});

//OCULTAR ALERTAS Y BOTONES
function OcultarAlertasBotones() {
    $("#AlertaExito").hide();
    $("#divIdServicio").hide();
    $("#divAlertaElimina").hide();
}


//VALIDAR FORMULARIO
function ValidarRegistroCliente() {
    $("#frmReportes_Servicios").validate(
        {
            rules: {
                C_NOMBRE_CLIENTE: {
                    required: true,
                    maxlength: 60,
                    minlength: 1
                }
                
                }

            

        }
    );
}


/*consulta la lista de paises*/
function ConsultarListaServicios() {
    /////construir la dirección del método del servidor
    var urlMetodo = '/Reporte_ServicioCliente/MostrarServicios'
    var parametros = {};
    var funcion = creaGrid;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}
//Funcion para cargar el grid
function creaGrid(data) {
    $("#divListaServicios").kendoGrid({
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
                field: 'C_ID_SERVICIO',
                title: 'Id Servicio'
            },
            {
                field: 'C_NOMBRE_CLIENTE',
                title: 'Nombre'
            }
            
        ]


    });
}

