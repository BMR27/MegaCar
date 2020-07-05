using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;

namespace ProyectoProgramacion.Controllers
{
    public class ClienteController : Controller
    {

        programacionBDEntities modeloBD = new programacionBDEntities();
        // GET: Cliente
        public ActionResult RegistroCliente()
        {
            this.AgregaProvinciasViewBag();
            return View();
        }

        private void AgregaProvinciasViewBag()
        {
            this.ViewBag.ListaProvincias = this.modeloBD.RetornaProvincias("").ToList();
        }

        [HttpPost]
        public ActionResult RegistroCliente(sp_RetornaCliente_Result   modeloVista)
        {

            int cantRegistrosAfectados = 0;
            string resultado = "";

            try
            {
                cantRegistrosAfectados =
                    this.modeloBD.
                    sp_Registrar_Cliente(
                        Convert.ToString(modeloVista.C_ID_CLIENTE),
                        modeloVista.C_APELLIDO1,
                        modeloVista.C_APELLIDO2,
                        modeloVista.C_NOMBRE_CLIENTE,
                        modeloVista.C_TELEFONO,
                        modeloVista.C_CORREO,
                        modeloVista.id_Provincia,
                        modeloVista.id_Canton1,
                        modeloVista.id_Distrito,
                        modeloVista.C_DIRECCION               
                        );
            }
            catch (Exception error)
            {
                resultado = "Ocurrió un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados > 0)
                    resultado = "Registro insertado";
                else
                    resultado += "No se pudo insertar";
            }

            Response.Write("<script language=javascript>alert('" + resultado + "');</script>");
            this.AgregaProvinciasViewBag();
            return View();
        }

        //---------------------------------------------------------------------------------------------

  
        
        public JsonResult RetornaProvincias()
        {
            List<RetornaProvincias_Result> provincias =
                this.modeloBD.RetornaProvincias(null).ToList();
            return Json(provincias, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// Retorna los cantones tomando en cuenta el id de la provincia.
        /// </summary>
        /// <returns></returns>
        public ActionResult RetornaCantones(int id_Provincia)
        {
            List<RetornaCantones_Result> cantones =
                this.modeloBD.RetornaCantones(null, id_Provincia)
                .ToList();

            return Json(cantones);
        }
        /// <summary>
        /// Retorna los distritos tomando en cuenta el id del cantón.
        /// </summary>
        /// <returns></returns>
        public ActionResult RetornaDistritos(int id_Canton)
        {
            List<RetornaDistrito_Result> distritos =
                this.modeloBD.RetornaDistrito(null, id_Canton).ToList();

            return Json(distritos);
        }
    }
}