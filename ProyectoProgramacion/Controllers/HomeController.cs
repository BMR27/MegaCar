using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;
namespace ProyectoProgramacion.Controllers
{
    public class HomeController : Controller
    {
        #region INSTANCIAS DE CLASE
        programacionBDEntities ModeloDB = new programacionBDEntities();
        #endregion
        public ActionResult Index()
        {
            return View();
        }
        /* METODOS DE LA CLASE */
        #region METODOS DE CLASE
        /*  */
        #endregion
        public ActionResult ValidarInicioSesion(string pNombre, string pContrasena)
        {
            sp_Validar_Inicio_Sesion_Result DatosInicioSesion =
                this.ModeloDB.sp_Validar_Inicio_Sesion(pNombre, pContrasena).FirstOrDefault();

            string NombreUsuario = DatosInicioSesion.C_NOMBRE + " " +
                                   DatosInicioSesion.C_APELLIDO1 + " " +
                                   DatosInicioSesion.C_APELLIDO2;
                                

            if (DatosInicioSesion != null)
            {
                this.Session.Add("Logueado", true);
                this.Session.Add("DatosUsuario", DatosInicioSesion);
               
            }
            else
            {
                /* MOSTRAMOS EL ERROR */
            }
            return Json(DatosInicioSesion);
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}