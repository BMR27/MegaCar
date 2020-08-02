using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;

namespace ProyectoProgramacion.Controllers
{
    public class ServiciosController : Controller
    {
        #region INSTANCIAS
        programacionBDEntities ModeloDB = new programacionBDEntities();
        #endregion
        // GET: Servicios
        public ActionResult Servicio_Producto()
        {
            return View();
        }
        //CONSULTA LOS SERVICIOS
        [HttpPost]
        public ActionResult MostrarServicios()
        {
            List<SP_RETORNA_SERVICIOS_Result> ListaServicios =
                this.ModeloDB.SP_RETORNA_SERVICIOS(null).ToList();

            return Json(new
            {
                resultado = ListaServicios
            });
        }

        /* REGISTRA EL SERVICIO */
        [HttpPost]
        public ActionResult RegistrarServicio(SP_RETORNA_SERVICIOS_Result ModeloVista)
        {
            string mensaje = "";
            int filas = 0;
            try
            {
                filas = this.ModeloDB.SP_REGISTRAR_SERVICIO(ModeloVista.C_NOMBRE_SERVICIO,
                                                          ModeloVista.C_PRECIO);
            }
            catch (Exception error)
            {

                mensaje = error.Message;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Exito al registrar el servicio";
                }
                else
                {
                    mensaje = "No se pudo registrar el servicio, posiblemente ya exista en la base de datos";
                }
            }
            return Json(new
            {
                resultado = mensaje
            });
        }

        /*MODIFICAR SERVICIO*/
        public ActionResult ModificarServicio(SP_RETORNA_SERVICIOS_Result ModeloVista)
        {
            string mensaje = "";
            int filas = 0;
            try
            {
                filas = this.ModeloDB.SP_MODIFICAR_SERVICIO(ModeloVista.C_ID_SERVICIO,
                                                          ModeloVista.C_NOMBRE_SERVICIO,
                                                          ModeloVista.C_PRECIO);
            }
            catch (Exception error)
            {

                mensaje = error.Message;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Exito al Modificar el servicio";
                }
                else
                {
                    mensaje = "No se pudo Modificar el servicio";
                }
            }

            return Json(new
            {
                resultado = mensaje
            });
        }
    }
}