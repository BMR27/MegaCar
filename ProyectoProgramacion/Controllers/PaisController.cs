using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;
using System.Data.SqlClient;
namespace ProyectoProgramacion.Controllers
{
    public class PaisController : Controller
    {
        /* INSTANCIAS DE CLASE */
        #region INSTANCIAS DE CLASE
        programacionBDEntities ModeloDB = new programacionBDEntities();
        #endregion

        /* METODOS DE LA CLASE */
        #region METODOS
        /* METODO CONSULTA LOS PAISES QUE EXISTEN */
        public void pc_MostrarPais(SP_RETORNA_PAIS_Result ModeloVista)
        {
            this.ViewBag.ListaPais =
                this.ModeloDB.SP_RETORNA_PAIS(ModeloVista.C_NOMBRE_PAIS).ToList();
        }

        /* METODO CONSULTA LOS PAISES POR ID */
        public void pc_MostrarPaisId(SP_RETORNA_PAIS_Result ModeloVista)
        {
            this.ViewBag.ListaPaisId =
                this.ModeloDB.SP_RETORNA_PAIS_ID(ModeloVista.C_ID_PAIS).ToList();

        }
        #endregion

        /* METODOS DE ACTIONRESULT */
        #region METODOS DE ACTION RESULT
        // GET: Pais
        /* MOSTRAMOS LA LISTA DE LOS PAISES */
        public ActionResult MostrarListaPaises(SP_RETORNA_PAIS_Result ModeloVista)
        {
            pc_MostrarPais(ModeloVista);
            return View();
        }

        public ActionResult RegistrarPais()
        {
            return View();
        }
        /* REGISTRAR UN PAIS */
        [HttpPost]
        public ActionResult RegistrarPais(SP_RETORNA_PAIS_Result ModeloVista)
        {
            string mensaje = string.Empty;
            int filas = 0;
            try
            {
                filas = this.ModeloDB.SP_REGISTRAR_PAIS(ModeloVista.C_NOMBRE_PAIS);
            }
            catch (Exception error)
            {

                mensaje = "Error: " + error.Message;
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
        /* ELIMINA UN PAIS */
        public ActionResult EliminarPais(SP_RETORNA_PAIS_ID_Result ModeloVista)
        {
            string mensaje = string.Empty;
            int filas = 0;
            try
            {
                filas = this.ModeloDB.SP_ELIMINAR_PAIS(ModeloVista.C_ID_PAIS);
            }
            catch (Exception error)
            {

                mensaje = "Error: " + error;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "País Eliminado con exito";
                }
                else
                {
                    mensaje = "No se pudo eliminar el país puede que este relacionado con otra tabla";
                }
                Response.Write("<script language=javascript>alert('" + mensaje + "');</script>");
            }
            return View();
        }
        /* METODO MODIFICA EL NOMBRE DEL PAIS */
        public ActionResult ModificarPais(SP_RETORNA_PAIS_Result ModeloVista)
        {
            pc_MostrarPaisId(ModeloVista);
            return View();
        }
        [HttpPost]
        public ActionResult ModificarNombrePais(SP_RETORNA_PAIS_Result ModeloVista)
        {
            string mensaje = string.Empty;
            int filas = 0;
            try
            {
                filas = this.ModeloDB.SP_MODIFICAR_PAIS(ModeloVista.C_ID_PAIS,
                                                        ModeloVista.C_NOMBRE_PAIS);
            }
            catch (Exception error)
            {

                mensaje = "Error: " + error;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "País modificado con exito";
                }
                else
                {
                    mensaje = "No se pudo modificar el nombre";
                }
                Response.Write("<script language=javascript>alert('" + mensaje + "');</script>");
            }
            pc_MostrarPaisId(ModeloVista);
            return View("ModificarPais");
        }
        #endregion

    }
}