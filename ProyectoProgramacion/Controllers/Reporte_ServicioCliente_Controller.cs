using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;

namespace ProyectoProgramacion.Controllers
{
    public class Reporte_ServicioCliente_Controller : Controller
    {

        #region INSTANCIAS
        programacionBDEntities ModeloDB = new programacionBDEntities();
        #endregion
        // GET: Reporte_ServicioCliente
        public ActionResult Reportes_ServicioCliente()
        {
            return View();
        }

        //CONSULTA LOS SERVICIOS
        [HttpPost]
        public ActionResult MostrarServicios(sp_RetornaCliente_Result ModeloVista)
        {
            
    
            List<SP_REPORTE_SERVICIO_CLIENTE_Result> ListaServicios =
                this.ModeloDB.SP_REPORTE_SERVICIO_CLIENTE(ModeloVista.C_ID_CLIENTE).ToList();

            return Json(new
            {
                resultado = ListaServicios
            });
        }
    }
}