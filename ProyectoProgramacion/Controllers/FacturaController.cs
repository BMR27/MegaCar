using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;
namespace ProyectoProgramacion.Controllers
{
    public class FacturaController : Controller
    {
        #region INSTANCIAS DE CLASE
        programacionBDEntities ModeloDB = new programacionBDEntities();
        #endregion

        #region ACTION RESULT
        // GET: Factura
        public ActionResult FacturarServicio()
        {
            return View();
        }
        /* CONSULTA LA LISTA DE LOS CLIENTES */
        [HttpPost]
        public ActionResult MostrarClientes()
        {
            List<sp_RetornaCliente_ID_Result> ListaCliente =
                this.ModeloDB.sp_RetornaCliente_ID(null).ToList();
            return Json(ListaCliente);
        }
        /* CONSULTA LA LISTA DE VEHICULOS POR CLIENTE */
        [HttpPost]
        public ActionResult MostrarVehiculos(SP_RETORNA_VEHICULO_POR_CLIENTE_Result ModeloVista)
        {
            List<SP_RETORNA_VEHICULO_POR_CLIENTE_Result> ListaVehiculo =
                this.ModeloDB.SP_RETORNA_VEHICULO_POR_CLIENTE(ModeloVista.C_ID_CLIENTE).ToList();
            return Json(ListaVehiculo);
        }

        /* CONSULTAMOS LOS SERVICIOS */
        [HttpPost]
        public ActionResult MostrarServicios()
        {
            List<SP_RETORNA_SERVICIOS_Result> ListaServicios =
                this.ModeloDB.SP_RETORNA_SERVICIOS(null).ToList();
            return Json(ListaServicios);
        }
        /* CREAR FACTURA */
        [HttpPost]
        public ActionResult CrearFactura(SP_RETORNA_VEHICULO_POR_CLIENTE_Result ModeloVista)
        {
           List<SP_CREAR_FACTURA_Result> Lista = this.ModeloDB.SP_CREAR_FACTURA(ModeloVista.C_ID_CLIENTE,
                                                               ModeloVista.C_ID_VEHICULO).ToList();
            return Json(Lista);
        }

        /* RETORNA LOS SERVICIOS POR ID PARA VALIDAR EL PRECIO */
        [HttpPost]
        public ActionResult MostrarServiciosID(SP_RETORNA_SERVICIOS_ID_Result ModeloVista)
        {
            List<SP_RETORNA_SERVICIOS_ID_Result> ListaServicios =
                this.ModeloDB.SP_RETORNA_SERVICIOS_ID(ModeloVista.C_ID_SERVICIO).ToList();
            return Json(ListaServicios);


        }

        /* MODIFICAMOS EL PRECIO DEL PRODUCTO */
        [HttpPost]
        public ActionResult ModificarPrecio(SP_RETORNA_SERVICIOS_ID_Result ModeloVista)
        {
            string mensaje = string.Empty;
            int filas = 0;
            try
            {
                if (ModeloVista.C_PRECIO > 0)
                {
                    filas = this.ModeloDB.SP_MODIFICAR_SERVICIO(ModeloVista.C_ID_SERVICIO,
                                                            ModeloVista.C_NOMBRE_SERVICIO,
                                                            ModeloVista.C_PRECIO);
                }
                else
                {
                    filas = -10;
                    mensaje = "El precio debe ser mayor a 0";
                }
            }
            catch (Exception error)
            {

                mensaje =  error.Message;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Precio Modificado con exito";
                }
                else if(filas == 0)
                {
                    mensaje = "No se pudo modificar el precio";
                }
            }
            return Json(new {
                resultado = mensaje
            });
        }
        #endregion

    }
}