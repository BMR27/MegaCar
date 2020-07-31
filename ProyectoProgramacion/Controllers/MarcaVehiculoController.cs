using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;
namespace ProyectoProgramacion.Controllers
{
    public class MarcaVehiculoController : Controller
    {
        #region INSTANCIAS DE CLASE
        programacionBDEntities ModeloDB = new programacionBDEntities();
        #endregion
        // GET: MarcaVehiculo
        public ActionResult ListarMarcaVehiculo()
        {
            return View();
        }
        /* CONSULTAMOS LAS MARCAS */
        [HttpPost]
        public ActionResult ListaMarcas(SP_RETORNA_MARCA_Result ModeloDB)
        {
            List<SP_RETORNA_MARCA_Result> ListaMarcas =
                this.ModeloDB.SP_RETORNA_MARCA(ModeloDB.C_FK_FABRICANTE).ToList();
            this.ModeloDB.sp_regis
           
            return Json(new
            {
                resultado = ListaMarcas
            });
             

        }

    }
}