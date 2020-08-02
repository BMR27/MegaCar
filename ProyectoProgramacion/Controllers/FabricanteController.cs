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
        // GET: Fabricantes
        public ActionResult ListarFabricanteVehiculo()
        {
            return View();
        }
        /* CONSULTAMOS LOS FABRICANTES */
        [HttpPost]
        public ActionResult ListaFabricantes(SP_RETORNAR_FABRICANTES_Result ModeloDB)
        {
            List<SP_RETORNAR_FABRICANTES_Result> ListaFabricantes =
                this.ModeloDB.SP_RETORNAR_FABRICANTES(ModeloDB.C_FK_PAIS).ToList();

            return Json(new
            {
                resultado = ListaFabricantes
            });
        }
        /* CONSULTAMOS LOS FABRICANTES */
        [HttpPost]
        public ActionResult ListaPais(SP_RETORNA_PAIS_ID_Result ModeloVista)
        {
            List<SP_RETORNA_PAIS_ID_Result> ListaPais =
                this.ModeloDB.SP_RETORNA_PAIS_ID(null).ToList();

            return Json(ListaPais);
        }

        [HttpPost]
        public ActionResult RegistrarFabricante(SP_RETORNAR_FABRICANTES_Result ModeloVista)
        {
            string mensaje = "";
            int filas = 0;
            try
            {
                filas = this.ModeloDB.SP_REGISTRAR_FABRICANTE(Convert.ToInt32(ModeloVista.C_NOMBRE_FABRICANTE),
                                                              Convert.ToString(ModeloVista.C_FK_PAIS),
                                                              ModeloVista.C_ID_FABRICANTE);
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
                    mensaje = "No se pudo registrar el fabricante posiblemente ya exista en la base de datos";
                }
            }
            return Json(new
            {
                resultado = mensaje
            });
        }

            
    }
}