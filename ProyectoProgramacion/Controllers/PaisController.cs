using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;
namespace ProyectoProgramacion.Controllers
{
    public class PaisController : Controller
    {
        #region INSTANCIAS DE CLASE
        programacionBDEntities ModeloDB = new programacionBDEntities();
        #endregion
        // GET: Pais
        /* MOSTRAMOS LA LISTA DE LOS PAISES */
        public ActionResult MostrarListaPaises(SP_RETORNA_PAIS_Result ModeloVista)
        {
            pc_MostrarPais(ModeloVista);
            return View();
        }

        /* METODO CONSULTA LOS PAISES QUE EXISTEN */
        public void pc_MostrarPais(SP_RETORNA_PAIS_Result ModeloVista)
        {
            this.ViewBag.ListaPais =
                this.ModeloDB.SP_RETORNA_PAIS(ModeloVista.C_NOMBRE_PAIS).ToList();
        }

        public ActionResult RegistrarPais()
        {
            return View();
        }
        [HttpPost]
        public ActionResult RegistrarPais(SP_RETORNA_PAIS_Result ModeloVista)
        {
            string mensaje = string.Empty;
            int filas = 0;
            try
            {

            }
            catch (Exception error)
            {

                mensaje = "Error: " + error;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Registro de País con exito";
                }
                else
                {
                    mensaje = "No se pudo registrar";
                }
                Response.Write("<script language=javascript>alert('" + mensaje + "');</script>");
            }
            return View();
        }
        public ActionResult EliminarPais()
        {
            return View();
        }

        public ActionResult ModificarPais()
        {
            return View();
        }
    }
}