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
            List<RetornaProvincias_Result> provincias =
                this.modeloBD.RetornaProvincias(null).ToList();

            return Json(provincias);
        }

        /* RETORNA LA LISTA DE CANTONES */
        public ActionResult RetornaCantones(int id_Provincia)
        {
            List<RetornaCantones_Result> cantones =
                this.modeloBD.RetornaCantones(null, id_Provincia).ToList();
            return Json(cantones);
        }
        /* RETORNA LA LISTA DE DISTRITOS */
        public ActionResult RetornarDistritos(int id_Canton)
        {
            List<RetornaDistrito_Result> distritos =
                this.modeloBD.RetornaDistrito(null, id_Canton).ToList();
            return Json(distritos);
        }



        [HttpPost]
        public ActionResult RegistroCliente(sp_RetornaCliente_Result modeloVista)
        {

            string mensaje = string.Empty;
            int filas = 0;
            try
            {
                /* CONSULTAMOS SI EXISTEN DATOS DEL CLIENTE */
                List<sp_RetornaCliente_Result> Nombre =
                    this.modeloBD.sp_RetornaCliente(modeloVista.C_APELLIDO1, modeloVista.C_APELLIDO2, modeloVista.C_NOMBRE_CLIENTE).ToList();
                if (Nombre.Count > 0)
                {
                    mensaje = "Este cliente ya se ecuentra registrado";
                }
                else
                {
                    filas = this.modeloBD.sp_Registrar_Cliente(modeloVista.C_CEDULA,
                                                                modeloVista.C_NOMBRE_CLIENTE,
                                                                modeloVista.C_APELLIDO1,
                                                                modeloVista.C_APELLIDO2,
                                                                modeloVista.C_TELEFONO,
                                                                modeloVista.C_CORREO,
                                                                modeloVista.id_Provincia,
                                                                modeloVista.id_Canton,
                                                                modeloVista.id_Distrito,
                                                                modeloVista.C_DIRECCION);
                }
            }
            catch (Exception error)
            {

                mensaje = "Error: " + error.Message;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Exito al registrar el cliente";
                }
                Response.Write("<script language=javascript>alert('" + mensaje + "');</script>");
            }

            return View("RegistroCliente");
        }

    }

}

        //---------------------------------------------------------------------------------------------

  
        
       