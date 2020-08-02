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
           
            return Json(new
            {
                resultado = ListaMarcas
            });
        }
        /* CONSULTAMOS LAS MARCAS */
        [HttpPost]
        public ActionResult ListaPais(SP_RETORNA_PAIS_ID_Result ModeloVista)
        {
            List<SP_RETORNA_PAIS_ID_Result> ListaPais =
                this.ModeloDB.SP_RETORNA_PAIS_ID(null).ToList();

            return Json(ListaPais);
        }

        [HttpPost]
        public ActionResult RegistrarMarca(SP_RETORNA_MARCA_Result ModeloVista)
        {
            string mensaje = "";
            int filas = 0;
            try
            {
                filas = this.ModeloDB.SP_REGISTRAR_MARCA(ModeloVista.C_NOMBRE_MARCA,
                                                         ModeloVista.C_FK_FABRICANTE);
            }
            catch (Exception error)
            {

                mensaje = error.Message;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Exito al registrar la marca";
                }
                else
                {
                    mensaje = "No se pudo registrar la marca, posiblemente ya exista en la base de datos";
                }
            }
            return Json(new
            {
                resultado = mensaje
            });
        }

        /* METODO MODIFICA EL NOMBRE Y FABRICANTE DE LAS MARCAS */
        [HttpPost]
        public ActionResult ModificarMarca(SP_RETORNA_MARCA_Result ModeloVista)
        {
            string mensaje = string.Empty;
            int filas = 0;
            try
            {
                filas = this.ModeloDB.SP_MODIFICAR_MARCA(ModeloVista.C_ID_MARCA,
                                                         ModeloVista.C_ID_FABRICANTE,
                                                         ModeloVista.C_NOMBRE_MARCA);
            }
            catch (Exception error)
            {

                mensaje = error.Message;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Exito al Modificar la marca";
                }
                else
                {
                    mensaje = "No se pudo registrar la marca, posiblemente ya exista en la base de datos";
                }
            }
            return Json(new
            {
                resultado = mensaje
            });
        }
    }
}