using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;

namespace ProyectoProgramacion.Controllers
{
    public class Reporte_VehiculoCliente_Controller : Controller
    {
        #region INSTANCIAS
        programacionBDEntities ModeloDB = new programacionBDEntities();
        #endregion
        // GET: Reporte_VehiculoCliente
        public ActionResult Reportes_VehiculoCliente()
        {
            return View();
        }

        //CONSULTA LOS VEHICULOS
        [HttpPost]
        public ActionResult MostrarVehiculos(sp_RetornaCliente_Result ModeloVista)
        {

            List<SP_REPORTE_VEHICULO_CLIENTE_Result> ListaVehiculos =
                this.ModeloDB.SP_REPORTE_VEHICULO_CLIENTE(ModeloVista.C_ID_CLIENTE).ToList();

            return Json(new
            {
                resultado = ListaVehiculos
            });
        }
    }
}