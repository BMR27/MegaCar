//Document ready
$(function () {
    ConsultarListaMarcas();
});

function ConsultarListaMarcas() {
    /////construir la dirección del método del servidor
    var urlMetodo = '/MarcaVehiculo/ListaMarcas'
    var parametros = {};
    var funcion = creaGrid;
    ///ejecuta la función $.ajax utilizando un método genérico
    //para no declarar toda la instrucción siempre
    ejecutaAjax(urlMetodo, parametros, funcion);
}

function creaGrid(data) {
    $("#divListaMarcas").kendoGrid({
        dataSource: {
            data: data.resultado,    
            pageSize: 3
        },
        pageable: true,
        columnMenu: true,
        sortable: true,
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
                title: 'Acciones',
                template: function (dataItem) {
                    return "<a href='/Vehiculo/ModificarVehiculo?C_PLACA=" + dataItem.C_PLACA + "'>Modificar</a>"
                }
            }
        ]


    });
}