$(function () {
    ValidarInicioSesion();
});

function ValidarInicioSesion() {
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