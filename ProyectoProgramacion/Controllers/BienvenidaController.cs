using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;
namespace ProyectoProgramacion.Controllers
{
    public class BienvenidaController : Controller
    {
        // GET: Bienvenida
        public ActionResult BienvenidaUsuario()
        {
            sp_Validar_Inicio_Sesion_Result DatosUsuario =
                (sp_Validar_Inicio_Sesion_Result)this.Session["DatosUsuario"];
           
            return View(DatosUsuario);
        }
    }
}