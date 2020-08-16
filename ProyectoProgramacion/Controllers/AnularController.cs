using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;
namespace ProyectoProgramacion.Controllers
{
    public class AnularController : Controller
    {
        #region INSTANCIAS
        programacionBDEntities ModeloDB = new programacionBDEntities();
        #endregion

        #region ACTIONRESULT
        // GET: Anular
        public ActionResult AnularFormulario()
        {
            return View();
        }
        /* RETORNA LAS FACTURAS */
        #endregion

    }
}