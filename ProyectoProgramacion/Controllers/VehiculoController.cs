using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProyectoProgramacion.Controllers
{
    public class VehiculoController : Controller
    {
        // GET: Vehiculo
        public ActionResult RegistraVehiculo()
        {
            return View();
        }

        //[HttpPost]
        //public ActionResult RegistraVehiculo()
        //{
        //    return View();
        //}
    }
}