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
        public ActionResult RetornarFacturas()
        {
            List<SP_RETORNAR_FACTURAS_Result> ListaFacturas =
                this.ModeloDB.SP_RETORNAR_FACTURAS().ToList();
            return Json(ListaFacturas);
        }

        /* ANULAR UNA FACTURA */
        [HttpPost]
        public ActionResult AnularFactura(SP_RETORNAR_FACTURAS_Result ModeloVista)
        {
            string mensaje = string.Empty;
            int filas = 0;
            /* CONSULTAMOS PRIMERO PARA VERIFICAR LA FECHA */
            List<SP_RETORNAR_FACTURAS_ID_Result> Factura =
                this.ModeloDB.SP_RETORNAR_FACTURAS_ID(ModeloVista.C_ID_ENCABEZADO_FACTURA).ToList();
            try
            {
                if (Factura.Count > 0)
                {

                    filas = this.ModeloDB.SP_ANULAR_FACTURA(ModeloVista.C_ID_ENCABEZADO_FACTURA);
                }
                else
                {
                    mensaje = "Factura No se puede eliminar tiene mas de 15 días de facturada";
                }
            }
            catch (Exception error)
            {

                mensaje = error.Message;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Factura Anulada con exito";
                }
            }
            return Json(new
            {
                resultado = mensaje
            });
        }
        #endregion

    }
}