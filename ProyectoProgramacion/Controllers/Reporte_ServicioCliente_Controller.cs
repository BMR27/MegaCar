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
        // GET: Reporte_ServicioCliente_
        public ActionResult Reportes_ServicioCliente()
        {
            return View();
        }

        //CONSULTA LOS SERVICIOS
        [HttpPost]
        public ActionResult MostrarServicios()
        {
            List<SP_REPORTE_SERVICIO_CLIENTE_Result> ListaServicios =
                this.ModeloDB.SP_REPORTE_VEHICULO_CLIENTE(null).ToList();

            return Json(new
            {
                resultado = ListaServicios
            });
        }
    }
}