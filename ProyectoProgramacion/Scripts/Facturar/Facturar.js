$(function () {
    //OCULTA LOS SELECTORES
    OcultarSelectores();
    //OCULTA EL BOTON DE MODIFICAR
    OcultarBotonModificar();
    //OCULTA EL BOTON CREAR FACTURA
    OcultarBotonCreaFactura();
    //MOSTRAR LOS CLIENTES EN LISTA DESPLEGABLE
    MostrarClientes();
    //DEFINIMOS EL EVENTO CHANGE
    EventoChange();
    //OCULTA LOS SERVICIOS
    OcultarServicios();
    //EVENTOS CLICK
    EventosClick();
    //MOSTRAMOS LOS SERVICIOS EN EL SELECT
    MostrarServiciosFacturar();
    //VALIDAMOS EL REGISTRO DEL SERVICIO

});
function EventosClick() {
    $("#btnCrearFactura").on("click", function () {
        CreaFactura();
    });
    $("#btnModificarPrecio").on("click", function () {
        var formulario = $("#frmFormularioServicios")
        formulario.validate();

        if (formulario.valid()) {
            ModificarPrecio();
        }
    });
}
//FUNCION OCULTAR
function OcultarSelectores() {
    $("#divPrecioServicio").hide();
    $("#divAlertaPrecio").hide();
    $("#divAlertaCrearFactura").hide();
    $("#btnAgregarServicio").hide();
}
//MOSTRAMOS ALERTA
function MostrarAlertaCreaFactura() {
    $('#divAlertaCrearFactura').fadeTo(2000, 500).slideUp(500, function () {
        $("#divAlertaCrearFactura").slideUp(500);
    }); 
}
//MOSTRAMOS ALERTA MODIFICAR PRECIO
function MostrarAlertaModificaPrecio() {
    $('#divAlertaPrecio').fadeTo(2000, 500).slideUp(500, function () {
        $("#divAlertaPrecio").slideUp(500);
    });
}
//FUNCION OCULTA LOS SERVICIOS
function OcultarServicios() {
    $("#divServicio").hide();
}
//FUNCION OCULTAR BOTON MODIFICAR
function OcultarBotonModificar() {
    $("#divModificar").hide();
}
//OCULTAR DIV ORECIO
function OcultarDivPrecio() {
    $("#divPrecioServicio").hide();
}
//FUNCION OCULTA EL BOTON DE CREAR FACTURA
function OcultarBotonCreaFactura() {
    $("#btnCrearFactura").hide();
}
//FUNCION MUESTRA BOTON MODIFICAR
function MostrarBotonModificar() {
    $("#divModificar").show();
}
//FUNCION MUESTRA EL BOTON DE CREAR FACTURA
function MostrarBotonCreaFactura() {
    $("#btnCrearFactura").show();
}
//FUNCION MUESTRA EL BOTON DE CREAR FACTURA
function MostrarServicios() {
    $("#divServicio").show();
}
//FUNCION MUESTRA EL BOTON AGREGAR SERVICIO
function MostrarBotonAgregaServicio() {
    $("#btnAgregarServicio").show();
}
//FUNCION MUESTRA EL DIV DE MODIFICAR
function MostrarDivModificar() {
    $("#divPrecioServicio").show();
    $("#divModificar").show();
}
//FUNCION MUESTRA EL DIV DE MODIFICAR
function MostrarCantidad() {
    $("#C_CANTIDAD").show();
    $("#lblCantidad").show();
}//FUNCION MUESTRA EL DIV DE MODIFICAR
function OcultarCantidad() {
    $("#C_CANTIDAD").hide();
    $("#lblCantidad").hide();
}

//FUNCION MUESTRA LOS CLIENTES
function MostrarClientes() {
    var urlMetodo = '/Factura/MostrarClientes'
    var parametros = {};
    var funcion = procesarResultadoCliente;
    ejecutaAjax(urlMetodo, parametros, funcion);
}

function procesarResultadoCliente(data) {
    var ddlCliente = $("#cliente");
    ddlCliente.empty();
    var nuevaOpción = "<option value=''>Seleccione una Cliente</option>";
    ddlCliente.append(nuevaOpción);
    $(data).each(function () {
        var ClienteActual = this;
        nuevaOpción = "<option value='" + ClienteActual.C_ID_CLIENTE + "'>" + ClienteActual.C_NOMBRE_CLIENTE +" "+ ClienteActual.C_APELLIDO1 +" "+ ClienteActual.C_APELLIDO2 + "</option>";
        ddlCliente.append(nuevaOpción);
    });
}

//EVENTO CHANGE
function EventoChange() {
    $("#cliente").change(function () {
        var idCliente = $("#cliente").val()
        MostrarVehiculoCliente(idCliente);
    });
    $("#vehiculo").change(function () {
        MostrarBotonCreaFactura();
        $("#vehiculo").prop('disabled', 'disable');
        $("#cliente").prop('disabled', 'disable');
    });
    $("#servicio").change(function () {
        ValidarPrecio();
    });
}

//FUNCION RETORNA LOS VEHICULOS POR CLIENTE
function MostrarVehiculoCliente(pIdCliente) {
    var urlMetodo = '/Factura/MostrarVehiculos'
    var parametros = {
        C_ID_CLIENTE: pIdCliente
    };
    var funcion = procesarResultadoVehiculoCliente;
    ejecutaAjax(urlMetodo, parametros, funcion);
}

function procesarResultadoVehiculoCliente(data) {
    var ddlvehiculo = $("#vehiculo");
    ddlvehiculo.empty();
    var nuevaOpción = "<option value=''>Seleccione un Vehiculo</option>";
    ddlvehiculo.append(nuevaOpción);
    $(data).each(function () {
        var vehiculoActual = this;
        nuevaOpción = "<option value='" + vehiculoActual.C_ID_VEHICULO + "'>" + vehiculoActual.C_NOMBRE_MODELO + "</option>";
        ddlvehiculo.append(nuevaOpción);
    });
}

//FUNCION RETORNA LOS SERVICIOS
function MostrarServiciosFacturar() {
    var urlMetodo = '/Factura/MostrarServicios'
    var parametros = {};
    var funcion = procesarServicios;
    ejecutaAjax(urlMetodo, parametros, funcion);
}
function procesarServicios(data) {
    var ddlServicios = $("#servicio");
    ddlServicios.empty();
    var nuevaOpción = "<option value=''>Seleccione un Servicio</option>";
    ddlServicios.append(nuevaOpción);
    $(data).each(function () {
        var serviciosActual = this;
        nuevaOpción = "<option value='" + serviciosActual.C_ID_SERVICIO + "'>" + serviciosActual.C_NOMBRE_SERVICIO + "</option>";
        ddlServicios.append(nuevaOpción);
    });
}

//FUNCION CREA UNA FACTURA
function CreaFactura() {
    var urlMetodo = '/Factura/CrearFactura'
    var parametros = {
        C_ID_CLIENTE: $("#cliente").val(),
        C_ID_VEHICULO: $("#vehiculo").val()
    };
    var funcion = ProcesarCrearFactura;
    ejecutaAjax(urlMetodo, parametros, funcion);
}
function ProcesarCrearFactura(data) {
    $("#facturaNumero").text(data[0].C_ID_ENCABEZADO_FACTURA);
    $("#mensajeCreaFactura").text("Factura creada con exito");
    MostrarAlertaCreaFactura();
    MostrarServiciosFacturar();
    OcultarBotonCreaFactura();
    MostrarServicios();
    MostrarBotonAgregaServicio();
}

//VALIDAR FORMULARIO
function ValidarRegistroServicio() {
    $("#frmFormularioServicios").validate(
        {
            rules: {
                servicio: {
                    required: true
                }
            }

        }
    );
}
//VALIDAR FORMULARIO MODIFICAR
function ValidarModificarServicio() {
    $("#frmFormularioServicios").validate(
        {
            rules: {
                C_PRECIO: {
                    required: true
                }
            }

        }
    );
}
//FUNCION RETORNA EL PRECIO DEL PRODUCTO Y VALIDA 
function ValidarPrecio() {
    var urlMetodo = '/Factura/MostrarServiciosID'
    var parametros = {
        C_ID_SERVICIO: $("#servicio").val()
    };
    var funcion = ProcesarValidarPrecio;
    ejecutaAjax(urlMetodo, parametros, funcion);
}
function ProcesarValidarPrecio(data) {
    if (data[0].C_PRECIO == 0) {
        MostrarDivModificar();
        $("#C_PRECIO").val(data[0].C_PRECIO);
        $("#mensajePrecio").text("Favor modificar el precio del producto");
        MostrarAlertaModificaPrecio();
        OcultarCantidad();
    } else {
        //VALIDAMOS QUE NO ESTE MOSTRANDO LOS DIV DE MODIFICAR Y LOS CERRAMOS
        OcultarDivPrecio();
        OcultarBotonModificar();
        MostrarBotonAgregaServicio();
        MostrarCantidad();
    }
}

//FUNCION RETORNA EL PRECIO DEL PRODUCTO Y VALIDA 
function ModificarPrecio() {
    var urlMetodo = '/Factura/ModificarPrecio'
    var parametros = {
        C_ID_SERVICIO: $("#servicio").val(),
        C_PRECIO: $("#C_PRECIO").val()
    };
    var funcion = ProcesarModificarPrecio;
    ejecutaAjax(urlMetodo, parametros, funcion);
}
function ProcesarModificarPrecio(data) {
    MostrarAlertaModificaPrecio();
    $("#mensajePrecio").text(data.resultado);
    //VALIDAMOS QUE NO ESTE MOSTRANDO LOS DIV DE MODIFICAR Y LOS CERRAMOS
    MostrarServiciosFacturar();
    OcultarDivPrecio();
    OcultarBotonModificar();
    MostrarBotonAgregaServicio();
    MostrarCantidad();
}

