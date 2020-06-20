$(function () {
    
    myfunction();
});
/*Validamos los campos del formulario*/
function ValidarRegistroVehiculo() {
    $("#frmRegistraVehiculo").validate(
        {
            rules: {
                C_PLACA: {
                    required: true,
                    maxlength: 6,
                    minlength: 6
                },
                C_CANT_PUERTAS: {
                    required: true,
                    digits: true,
                    maxlength: 1,
                    minlength: 1
                },
                C_CANT_RUEDAS: {
                    required: true,
                    digits: true,
                    maxlength: 1,
                    minlength: 1
                },
                C_YEAR: {
                    required: true,
                    digits: true,
                    maxlength: 4,
                    minlength:4
                },
                IdModelo: {
                    required: true
                },
                IdTipo: {
                    required: true
                },
                IdMarca: {
                    required: true
                }

            }

        }
    );
};

/*Agregamos un tooltip*/
function MensajeTexto() {
    $("#C_PLACA").tooltip({
        trigger: "click"
    });
};

/*Prueba de boostrapvalidate*/

function myfunction() {
    $('#frmRegistraVehiculo').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            C_PLACA: {
                validators: {
                    stringLength: {
                        min: 6,
                        message: "Debe ingresar como  minimo 6"
                    },
                    notEmpty: {
                        message:"Ingrese un número de placa"
                    }
                }
            }
        }
      
    });
};