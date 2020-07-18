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
        public ActionResult RetornaCantones(int C_FK_PROVINCIA)
        {
            List<RetornaCantones_Result> cantones =
                this.modeloBD.RetornaCantones(null, C_FK_PROVINCIA).ToList();
            return Json(cantones);
        }
        /* RETORNA LA LISTA DE DISTRITOS */
        public ActionResult RetornarDistritos(int C_FK_CANTON)
        {
            List<RetornaDistrito_Result> distritos =
                this.modeloBD.RetornaDistrito(null, C_FK_CANTON).ToList();
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
                List<sp_RetornaCliente_ID_Result> Id =
                    this.modeloBD.sp_RetornaCliente_ID(modeloVista.C_CEDULA).ToList();
                if (Id.Count > 0)
                {
                    mensaje = "Este cliente ya se encuentra registrado";
                }
                else
                {

                    filas = this.modeloBD.sp_Registrar_Cliente(modeloVista.C_CEDULA,
                                                               modeloVista.C_NOMBRE_CLIENTE,
                                                               modeloVista.C_APELLIDO1,
                                                               modeloVista.C_APELLIDO2,
                                                               modeloVista.C_TELEFONO,
                                                               modeloVista.C_CORREO,
                                                               modeloVista.C_FK_PROVINCIA,
                                                               modeloVista.C_FK_CANTON,
                                                               modeloVista.C_FK_DISTRITO,
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

  
        
       