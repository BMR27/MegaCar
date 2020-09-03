using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;

namespace ProyectoProgramacion.Controllers
{
    public class Reporte_CierreCaja_Controller : Controller
    {
        #region INSTANCIAS
        programacionBDEntities ModeloDB = new programacionBDEntities();
        #endregion
        // GET: Reporte_CierreCaja
        public ActionResult Reportes_CierreCaja()
        {
            return View();
        }

        //CONSULTA LOS CIERRES DE CAJA
        [HttpPost]
        public ActionResult MostrarCierres(SP_CIERRE_CAJA_Result ModeloVista)
        {

            List<SP_CIERRE_CAJA_Result> ListaCierreCaja =
                this.ModeloDB.SP_CIERRE_CAJA(null).ToList();

            return Json(new
            {
                resultado = ListaCierreCaja
            });
        }
    }
}