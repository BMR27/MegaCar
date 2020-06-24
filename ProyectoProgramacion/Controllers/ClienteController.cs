using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProyectoProgramacion.Controllers
{
    public class ClienteController : Controller
    {
        // GET: Cliente
        public ActionResult RegistroCliente()
        {
            return View();
        }
    }
}