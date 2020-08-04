using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;
namespace ProyectoProgramacion.Controllers
{
    public class VehiculosPorClienteController : Controller
    {
        #region INSTANCIAS
        programacionBDEntities ModeloDB = new programacionBDEntities();
        #endregion
        // GET: VehiculosPorCliente
        #region ACTION_RESULT
        public ActionResult VehiculoPorCliente()
        {
            CrearListaClientes();
            CrearListaVehiculos();
            return View();
        }

        [HttpPost]
        public ActionResult RegistrarVehiculoPorCliente(SP_CONSULTAR_VEHICULO_POR_CLIENTE_Result ModeloVista)
        {
            string mensaje = string.Empty;
            int filas = 0;
            /* CONSULTAMOS SI EL VEHICULO YA SE ENCUENTRA REGISTRADO */
            SP_CONSULTAR_VEHICULO_POR_CLIENTE_Result ModeloVehiculo = new SP_CONSULTAR_VEHICULO_POR_CLIENTE_Result();
            ModeloVehiculo = this.ModeloDB.SP_CONSULTAR_VEHICULO_POR_CLIENTE(ModeloVista.C_PLACA).FirstOrDefault();
            try
            {
                if (ModeloVehiculo == null)
                {
                    filas = this.ModeloDB.SP_REGISTRAR_VEHICULO_POR_CLIENTE(ModeloVista.C_ID_CLIENTE,
                                                                            ModeloVista.C_PLACA);
                }
                else
                {
                    filas = 1000;
                }

            }
            catch (Exception error)
            {

                mensaje = error.Message;
            }
            finally
            {
                if (filas > 0 && filas != 1000)
                {
                    mensaje = "Exito al registrar el vehiculo";
                }
                else if(filas == 0)
                {
                    mensaje = "No se pudo registrar el vehiculo";
                }
                else if(filas == 1000)
                {
                    mensaje = "El vehiculo ya se encuentra registrado a nombre de: " + ModeloVehiculo.C_NOMBRE_CLIENTE + " " +
                                                                                       ModeloVehiculo.C_APELLIDO1 + " " +
                                                                                       ModeloVehiculo.C_APELLIDO2;
                }
            }
            return Json(new
            {
                resultado = mensaje
            });
        }

        [HttpPost]
        public ActionResult MosrtarVehiculosPorCliente()
        {
            List<SP_CONSULTAR_VEHICULO_POR_CLIENTE_Result> Lista =
                this.ModeloDB.SP_CONSULTAR_VEHICULO_POR_CLIENTE(null).ToList();
            return Json(new
            {
                resultado = Lista
            });
        }
        #endregion

        #region METODOS DE CLASE
        /* consulta la lista de los clientes */
        public void CrearListaClientes()
        {
            this.ViewBag.ListaCliente =
                this.ModeloDB.sp_RetornaCliente_ID(null).ToList();
        }
        /* consulta la lista de los vehiculos */
        public void CrearListaVehiculos()
        {
            this.ViewBag.ListaVehiculos =
                this.ModeloDB.SP_CONSULTAR_VEHICULO_SIN_CLIENTE().ToList();
        }
        #endregion
    }
}