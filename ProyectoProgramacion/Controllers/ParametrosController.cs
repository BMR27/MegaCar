using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;

namespace ProyectoProgramacion.Controllers
{
    public class ParametrosController : Controller
    {
        #region INSTANCIAS
        programacionBDEntities ModeloDB = new programacionBDEntities();
        #endregion
        // GET: Parametros
        public ActionResult Parametros()
        {
            return View();
        }
        //CONSULTA LOS PARAMETROS
        [HttpPost]
        public ActionResult MostrarParametros()
        {
            List<SP_RETORNA_PARAMETROS_Result> ListaParametros =
                this.ModeloDB.SP_RETORNA_PARAMETROS().ToList();

            return Json(new
            {
                resultado = ListaParametros
            });
        }

        /* REGISTRA EL PARAMETRO */
        [HttpPost]
        public ActionResult RegistrarParametros(SP_RETORNA_PARAMETROS_Result ModeloVista)
        {
            string mensaje = "";
            int filas = 0;
            try
            {
                filas = this.ModeloDB.SP_REGISTRAR_PARAMETROS(ModeloVista.C_NOMBRE_ORGANIZACION,
                                                              ModeloVista.C_CORREO_APERTURA,
                                                              ModeloVista.C_CORREO_CIERRE,
                                                              ModeloVista.C_MONTO_MINIMO);
            }
            catch (Exception error)
            {

                mensaje = error.Message;
            }
            finally


            {
                if (filas > 0)
                {
                    mensaje = "Exito al registrar los parametros";
                }
                else
                {
                    mensaje = "No se pudo registrar los parametros, posiblemente ya exista en la base de datos";
                }
            }
            return Json(new
            {
                resultado = mensaje
            });
        }

        /*MODIFICAR PARAMETRO*/
        public ActionResult ModificarParametro(SP_RETORNA_PARAMETROS_Result ModeloVista)
        {
            string mensaje = "";
            int filas = 0;
            try
            {
                filas = this.ModeloDB.SP_MODIFICAR_PARAMETROS(ModeloVista.C_ID_PARAMETROS,
                                                              ModeloVista.C_NOMBRE_ORGANIZACION,
                                                              ModeloVista.C_CORREO_APERTURA,
                                                              ModeloVista.C_CORREO_CIERRE,
                                                              ModeloVista.C_MONTO_MINIMO
                                                            );
            }
            catch (Exception error)
            {

                mensaje = error.Message;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Exito al Modificar el parametro";
                }
                else
                {
                    mensaje = "No se pudo Modificar el parametro";
                }
            }

            return Json(new
            {
                resultado = mensaje
            });
        }

    }

}