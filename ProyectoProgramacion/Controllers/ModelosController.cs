using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;
namespace ProyectoProgramacion.Controllers
{
    public class ModelosController : Controller
    {
        #region INSTANCIAS
        programacionBDEntities ModeloDB = new programacionBDEntities();
        #endregion
        // GET: Modelos
        public ActionResult ModeloVehiculo()
        {
            return View();
        }
        //CONSULTA LOS MODELOS DE VEHICULOS
        [HttpPost]
        public ActionResult MostrarModelos()
        {
            List<SP_RETORNA_MODELO_Result> ListaModelos =
                this.ModeloDB.SP_RETORNA_MODELO(null).ToList();

            return Json(new
            {
                resultado = ListaModelos
            });
        }

        /* REGISTRA LA MODELO DE VEHICULO */
        [HttpPost]
        public ActionResult RegistrarModelo(SP_RETORNA_MODELO_Result ModeloVista)
        {
            string mensaje = "";
            int filas = 0;
            try
            {
                filas = this.ModeloDB.SP_REGISTRAR_MODELO(ModeloVista.C_ID_MARCA,
                                                          ModeloVista.C_NOMBRE_MODELO);
            }
            catch (Exception error)
            {

                mensaje = error.Message;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Exito al registrar el modelo";
                }
                else
                {
                    mensaje = "No se pudo registrar el modelo, posiblemente ya exista en la base de datos";
                }
            }
            return Json(new
            {
                resultado = mensaje
            });
        }

        /*MODIFICAR MODELO VEHICULO*/
        public ActionResult ModificarModelo(SP_RETORNA_MODELO_Result ModeloVista)
        {
            string mensaje = "";
            int filas = 0;
            try
            {
                filas = this.ModeloDB.SP_MODIFICAR_MODELO(ModeloVista.C_ID_MODELO,
                                                          ModeloVista.C_ID_MARCA,
                                                          ModeloVista.C_NOMBRE_MODELO);
            }
            catch (Exception error)
            {

                mensaje = error.Message;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Exito al Modificar el modelo";
                }
                else
                {
                    mensaje = "No se pudo Modificar el modelo";
                }
            }

            return Json(new
            {
                resultado = mensaje
            });
        }
    }
}