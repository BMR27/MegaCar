using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;

namespace ProyectoProgramacion.Controllers
{
    public class FabricanteController : Controller
    {
        #region INSTANCIAS DE CLASE
        programacionBDEntities ModeloDB = new programacionBDEntities();
        #endregion
        // GET: FabricanteVehiculo
        public ActionResult ListarFabricanteVehiculo()
        {
            return View();
        }
        /* CONSULTAMOS LOS FABRICANTES */
        [HttpPost]
        public ActionResult ListaFabricantes(SP_RETORNAR_FABRICANTES_Result ModeloDB)
        {
            List<SP_RETORNAR_FABRICANTES_Result> ListaFabricantes =
                this.ModeloDB.SP_RETORNAR_FABRICANTES(null).ToList();

            return Json(new
            {
                resultado = ListaFabricantes
            });
        }
        /* CONSULTAMOS LOS PAISES */
        [HttpPost]
        public ActionResult ListaPais(SP_RETORNA_PAIS_ID_Result ModeloVista)
        {
            List<SP_RETORNA_PAIS_ID_Result> ListaPais =
                this.ModeloDB.SP_RETORNA_PAIS_ID(null).ToList();

            return Json(ListaPais);
        }
        /* REGISTRA EL FABRICANTE DEL VEHICULO */
        [HttpPost]
        public ActionResult RegistrarFabricantes(SP_RETORNAR_FABRICANTES_Result ModeloVista)
        {
            string mensaje = "";
            int filas = 0;
            try
            {
                filas = this.ModeloDB.SP_REGISTRAR_FABRICANTE(ModeloVista.C_NOMBRE_FABRICANTE,
                                                         ModeloVista.C_FK_PAIS);
            }
            catch (Exception error)
            {

                mensaje = error.Message;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Exito al registrar el fabricante";
                }
                else
                {
                    mensaje = "No se pudo registrar el fabricante, posiblemente ya exista en la base de datos";
                }
            }
            return Json(new
            {
                resultado = mensaje
            });
        }

        /* METODO MODIFICA EL NOMBRE Y PAIS DE LOS FABRICANTES */
        [HttpPost]
        public ActionResult ModificarFabricante(SP_RETORNAR_FABRICANTES_Result ModeloVista)
        {
            string mensaje = string.Empty;
            int filas = 0;
            try
            {
                filas = this.ModeloDB.SP_MODIFICAR_FABRICANTE(ModeloVista.C_ID_FABRICANTE,
                                                         ModeloVista.C_FK_PAIS,
                                                         ModeloVista.C_NOMBRE_FABRICANTE);
            }
            catch (Exception error)
            {

                mensaje = error.Message;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Exito al Modificar el fabricante";
                }
                else
                {
                    mensaje = "No se pudo registrar el fabricante, posiblemente ya exista en la base de datos";
                }
            }
            return Json(new
            {
                resultado = mensaje
            });
        }

        /* METODO ELIMINA UN FABRICANTE */
        [HttpPost]
        public ActionResult EliminarFabricante(SP_RETORNAR_FABRICANTES_Result ModeloVista)
        {
            string mensaje = string.Empty;
            int filas = 0;
            try
            {
                filas = this.ModeloDB.SP_ELIMINAR_FABRICANTE(ModeloVista.C_ID_FABRICANTE);
            }
            catch (Exception error)
            {

                mensaje = error.Message;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Exito al Eliminar el fabricante";
                }
                else
                {
                    mensaje = "No se pudo Eliminar el fabricante, posiblemente tenga datos relacionados en la base de datos";
                }
            }
            return Json(new
            {
                resultado = mensaje
            });
        }
    }
}