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
        [HttpPost]
        public ActionResult ValidarInicioSesion(sp_Validar_Inicio_Sesion_Result ModeloVista)
        {
            sp_Validar_Inicio_Sesion_Result DatosInicioSesion =
                this.ModeloDB.sp_Validar_Inicio_Sesion(ModeloVista.C_USUARIO, ModeloVista.C_PASS).FirstOrDefault();

            if (DatosInicioSesion != null)
            {
                this.Session.Add("Logueado", true);
                this.Session.Add("DatosUsuario", DatosInicioSesion);
                return RedirectToAction("BienvenidaUsuario", "Bienvenida");
            }
            else
            {
                Response.Write("<script language=javascript>alert('Usuario no encontrado');</script>");
                return View("Index");
            }

                      
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