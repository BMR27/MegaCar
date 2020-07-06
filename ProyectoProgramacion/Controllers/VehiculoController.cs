using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;
namespace ProyectoProgramacion.Controllers
{
    public class VehiculoController : Controller
    {
        #region INSTANCIAS DE CLASE
        programacionBDEntities ModeloDB = new programacionBDEntities();
        #endregion
        // GET: Vehiculo
        public ActionResult RegistraVehiculo()
        {

            return View();
        }

        public ActionResult RetornarPais()
        {
            List<SP_RETORNA_PAIS_Result> ListaPais =
                this.ModeloDB.SP_RETORNA_PAIS().ToList();

            return Json(ListaPais);
        }

        public ActionResult RetornaFabricantes(string C_ID_PAIS)
        {
            List<SP_RETORNAR_FABRICANTES_Result> ListaFabricantes =
                this.ModeloDB.SP_RETORNAR_FABRICANTES(Convert.ToInt32(C_ID_PAIS)).ToList();
            return Json(ListaFabricantes);
        }

        public ActionResult RetornaMarcas(string C_ID_MARCA)
        {
            List<SP_RETORNA_MARCA_Result> ListaMarcas =
                this.ModeloDB.SP_RETORNA_MARCA(Convert.ToInt32(C_ID_MARCA)).ToList();
            return Json(ListaMarcas);
        }

        public ActionResult RetornaModelos(string C_ID_MODELO)
        {
            List<SP_RETORNA_MODELO_Result> ListaModelo =
                this.ModeloDB.SP_RETORNA_MODELO(Convert.ToInt32(C_ID_MODELO)).ToList();
            return Json(ListaModelo);
        }

        public ActionResult RetornarTipos()
        {
            List<SP_RETORNA_TIPO_VEHICULO_Result> ListaTipos =
                this.ModeloDB.SP_RETORNA_TIPO_VEHICULO().ToList();
            return Json(ListaTipos);
        }
    }
}