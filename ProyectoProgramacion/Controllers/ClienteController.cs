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
        #region INSTANCIAS DE CLASE
        programacionBDEntities modeloBD = new programacionBDEntities();
        #endregion
        // GET: Cliente
        public ActionResult RegistroCliente()
        {

            return View();
        }

        /* RETORNA LA LISTA DE LAS PROVINCIAS */
        public ActionResult RetornarProvincias()
        {
            List<RetornaProvincias_Result> Provincias =
                this.modeloBD.RetornaProvincias(null).ToList();

            return Json(Provincias, JsonRequestBehavior.AllowGet);
        }

        /* RETORNA LA LISTA DE CANTONES */
        public ActionResult RetornaCantones(int id_Provincia)
        {
            List<RetornaCantones_Result> Cantones =
                this.modeloBD.RetornaCantones(null, id_Provincia).ToList();
            return Json(Cantones);
        }

        public ActionResult RetornarDistritos(int id_Canton)
        {
            List<RetornaDistrito_Result> Distritos =
                this.modeloBD.RetornaDistrito(null, id_Canton).ToList();
            return Json(Distritos);
        }





        [HttpPost]
        public ActionResult RegistroCliente(sp_RetornaCliente_Result modeloVista)
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
                        modeloVista.id_Canton,
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

            return View("RegistroCliente");
        }
    }

}

        //---------------------------------------------------------------------------------------------

  
        
       