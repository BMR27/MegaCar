using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;
namespace ProyectoProgramacion.Controllers
{
    public class TipoVehiculoController : Controller
    {
        programacionBDEntities ModeloDB = new programacionBDEntities();
        // GET: TipoVehiculo
        public ActionResult TiposVehiculos(SP_RETORNA_TIPO_VEHICULO_Result ModeloVista)
        {
            pc_MostrarListaPais(ModeloVista);
            return View();
        }
        public ActionResult RegistrarTipo()
        {
            return View();
        }
        [HttpPost]
        public ActionResult RegistrarTipo(SP_RETORNA_TIPO_VEHICULO_Result ModeloVista)
        {
            string mensaje = string.Empty;
            int filas = 0;
            try
            {

                filas = this.ModeloDB.SP_REGISTRAR_TIPO_VEHICULO(ModeloVista.C_NOMBRE_TIPO);

            }
            catch (Exception error)
            {

                mensaje = "Error: " + error.Message;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Exito al registrar el tipo de vehiculo";
                }
                Response.Write("<script language=javascript>alert('" + mensaje + "');</script>");
            }
            return View();
        }
        /* MODIFICAR UN TIPO DE VEHICULO */
        public ActionResult ModificarTipoVehiculo(SP_RETORNA_TIPO_VEHICULO_Result ModeloVista)
        {
            pc_MostrarListaPais_ID(ModeloVista);
            return View();
        }
        [HttpPost]
        public ActionResult ModificarNombreTipoVehiculo(SP_RETORNA_TIPO_VEHICULO_Result ModeloVista)
        {
            string mensaje = string.Empty;
            int filas = 0;
            try
            {

                filas = this.ModeloDB.SP_MODIFICAR_TIPO_VEHICULO(ModeloVista.C_ID_TIPO_VEHICULO,
                                                                 ModeloVista.C_NOMBRE_TIPO);

            }
            catch (Exception error)
            {

                mensaje = "Error: " + error.Message;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Exito al modiicar el tipo de vehiculo";
                }
                Response.Write("<script language=javascript>alert('" + mensaje + "');</script>");
            }
            pc_MostrarListaPais_ID(ModeloVista);
            return View("ModificarTipoVehiculo");
        }
        #region METODOS DE CLASE
        /* METODO CONSULTA LA LISTA DE LOS TIPOS DE VEHICULO */
        void pc_MostrarListaPais(SP_RETORNA_TIPO_VEHICULO_Result ModeloVista)
        {
            this.ViewBag.ListaTipos =
                this.ModeloDB.SP_RETORNA_TIPO_VEHICULO(ModeloVista.C_NOMBRE_TIPO).ToList();
        }
        /* METODO CONSULTA LA LISTA DE LOS TIPOS DE VEHICULO */
        void pc_MostrarListaPais_ID(SP_RETORNA_TIPO_VEHICULO_Result ModeloVista)
        {
            this.ViewBag.ListaTipos =
                this.ModeloDB.SP_RETORNA_TIPO_VEHICULO_ID(ModeloVista.C_ID_TIPO_VEHICULO).ToList();
        }
        #endregion
    }
}