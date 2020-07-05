$(function () {
    ValidarCamposInicioSesion();
    EventoCapturaDatosLogin();
});
/* EVENTO QUE VALIDA LOS CAMPOS DE INICIO DE SESION */
function ValidarCamposInicioSesion() {
    $("#frmInicioSesion").validate(

        {
            rules: {
                NombreUsuario: {
                    required: true,
                    maxlength: 30,
                    minlength: 3
                },
                Contraseña: {
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
        }

    })
}

/* METODO ENVIA LOS DATOS DEL FORMULARIO */
function ValidarInicio() {
    /* DIRECCION DONDE SE ENVIARAN LOS DATOS */
    var url = '/HomeController/ValidarInicioSesion';
    /* PARAMETROS ENVIADOS */
    var parametros = {
        pNombre: $("#NombreUsuario").val,
        pPass: $("#Contrasena").val
    };

    /* METODO ENCARGADO DE ENVIAR Y RECIBIR DATOS */
    $.ajax({
        url = url,
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(parametros),
        success: function (data, textStatus, jQxhr) {
            ProcesarDatosInicioSesion(data);
        },
        error: function (jQxhr, textStatus, errorThrow) {
            alert(errorThrow);
        }


    });
}

/* PROCESA LOS DATOS RETORNADOS DESDE EL SERVIDOR */

function ProcesarDatosInicioSesion(data) {
    
    /* MOSTRAMOS LOS DATOS EN LA PAGINA DE INICIO */
}