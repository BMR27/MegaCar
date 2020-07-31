$(function () {
    ValidarCamposInicioSesion();
   // EventoCapturaDatosLogin();
});
/* EVENTO QUE VALIDA LOS CAMPOS DE INICIO DE SESION */
function ValidarCamposInicioSesion() {
    $("#frmInicioSesion").validate(

        {
            rules: {
                C_USUARIO: {
                    required: true,
                    maxlength: 30,
                    minlength: 3
                },
                C_PASS: {
                    required: true,
                    maxlength: 30,
                    minlength:3
                }
            }

        }
    );
}

/* METODO CAPTURA LOS DATOS DEL INICIO DE SESION */

function EventoCapturaDatosLogin() {
    $("#btnIniciar").on("click", function () {
        var formulario = $("#frmInicioSesion");

        /* VALIDAMOS EL FORMULARIO */
        formulario.validate();

        if (formulario.valid()) {
            ValidarInicio();
        };

    });
}
/* METODO ENVIA LOS DATOS DEL FORMULARIO */
function ValidarInicio() {
    /* DIRECCION DONDE SE ENVIARAN LOS DATOS */
    var Direccion = '/Home/ValidarInicioSesion';
    /* PARAMETROS ENVIADOS */
    //var parametros = {
    //    pNombre: $("#NombreUsuario").val(),
    //    pPass: $("#Contrasena").val()
    //};
    var parametros = {

            C_USUARIO: $("#NombreUsuario").val(),
            C_PASS:$("#Contrasena").val()

    };
    /* PROCESA LOS DATOS RETORNADOS DESDE EL SERVIDOR */
    $.ajax({
        url: Direccion,
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(parametros),
        success: function (data, textStatus, jQxhr) {
            ProcesarDatosInicioSesion(data);
        },
        error: function (jQxhr, textStatus, errorThrown) {
            alert(errorThrown);
        },
    });

}

function ProcesarDatosInicioSesion(data) {

    /* MOSTRAMOS LOS DATOS EN LA PAGINA DE INICIO */
    $(data).each(function () {
        var DatosUsuario = this;
        alert(DatosUsuario.C_NOMBRE);
    });
}

