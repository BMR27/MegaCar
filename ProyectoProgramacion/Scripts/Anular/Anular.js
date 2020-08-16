$(function () {
    /* RETORNAMOS LAS FACTURAS */
    RetornarFacturas();
    /* OCULTAMOS LA ALERTA */
    OcultarAlerta();
});
/* OCULTAR ALERTA */
function OcultarAlerta() {
    $("#divAlerta").hide();
}
/* RETORNA LAS FACTURAS */
function RetornarFacturas() {
    var url = '/Anular/RetornarFacturas'
    var parametros = {};
    var funcion = ProcesarRetornarFacturas;
    ejecutaAjax(url, parametros,funcion)
}
function ProcesarRetornarFacturas(data) {
    $("#divListaFacturas").kendoGrid({
        dataSource: {
            data: data,
            pageSize: 15
        },
        pageable: true,
        columnMenu: true,
        sortable: true,
        selectable: "multiple",
        toolbar: ["search"],
        columns: [
            {
                field: 'C_ID_ENCABEZADO_FACTURA',
                title: 'Id '
            },
            {
                field: 'C_FECHA',
                title: 'Fecha'
            },
            {
                field: 'NOMBRE',
                title: 'Nombre'
            },
            {
                field: 'C_TOTAL',
                title: 'Total Factura'
            },
            {
                field: 'ESTADO',
                title: 'Estado'
            }
        ]


    });
}