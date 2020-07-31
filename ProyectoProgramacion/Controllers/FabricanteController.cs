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
        /* INSTANCIAS DE CLASE */
        #region INSTANCIAS DE CLASE
        programacionBDEntities ModeloDB = new programacionBDEntities();
        #endregion

        /* METODOS DE LA CLASE */
        #region METODOS
        /* METODO CONSULTA LOS FABRICANTES QUE EXISTEN */
        public void pc_MostrarFabricante(SP_RETORNAR_FABRICANTES_Result ModeloVista)
        {
            this.ViewBag.ListaFabricante =
                this.ModeloDB.SP_RETORNAR_FABRICANTES(ModeloVista.C_FK_PAIS).ToList();
        }

        /* METODO CONSULTA LOS FABRICANTES POR ID */
        public void pc_MostrarFabricantesId(SP_RETORNAR_FABRICANTES_Result ModeloVista)
        {
            this.ViewBag.ListaFabricanteId =
                this.ModeloDB.SP_RETORNAR_FABRICANTES(ModeloVista.C_ID_FABRICANTE).ToList();

        }
        #endregion

        /* METODOS DE ACTIONRESULT */
        // GET: Fabricantes
        /* MOSTRAMOS LA LISTA DE LOS FABRICANTES */
        public ActionResult MostrarListaFabricantes(SP_RETORNAR_FABRICANTES_Result ModeloVista)
        {
            pc_MostrarFabricante(ModeloVista);
            return View();
        }

        public ActionResult RegistrarFabricante()
        {
            return View();
        }
        /* REGISTRAR UN FABRICANTE */
        [HttpPost]
        public ActionResult RegistrarFabricante(SP_RETORNAR_FABRICANTES_Result ModeloVista)
        {
            string mensaje = string.Empty;
            int filas = 0;
            try
            {
               // filas = this.ModeloDB.SP_REGISTRAR_FABRICANTE(ModeloVista.C_ID_FABRICANTE);
            }
            catch (Exception error)
            {

                mensaje = "Error: " + error.Message;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Registro de Fabricante con exito";
                }
                else
                {
                    mensaje = "No se pudo registrar";
                }
                Response.Write("<script language=javascript>alert('" + mensaje + "');</script>");
            }
            return View();
        }
    }
}