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
        /* RETORNA LA LISTA DE LOS PAISES */
        public ActionResult RetornarPais()
        {
            List<SP_RETORNA_PAIS_Result> ListaPais =
                this.ModeloDB.SP_RETORNA_PAIS(null).ToList();

            return Json(ListaPais);
        }

        /* RETORNA LA LISTA DE LOS FABRICANTES */
        [HttpPost]
        public ActionResult RetornaFabricantes(string C_ID_PAIS)
        {
            List<SP_RETORNAR_FABRICANTES_Result> ListaFabricantes =
                this.ModeloDB.SP_RETORNAR_FABRICANTES(Convert.ToInt32(C_ID_PAIS)).ToList();
            return Json(ListaFabricantes);
        }
        /* RETORNA LA LISTA DE LAS MARCAS */

        public ActionResult RetornaMarcas(string C_ID_MARCA)
        {
            List<SP_RETORNA_MARCA_Result> ListaMarcas =
                this.ModeloDB.SP_RETORNA_MARCA(Convert.ToInt32(C_ID_MARCA)).ToList();
            return Json(ListaMarcas);
        }
        /* RETORNA LA LISTA DE LOS MODELOS */

        public ActionResult RetornaModelos(string C_ID_MODELO)
        {
            List<SP_RETORNA_MODELO_Result> ListaModelo =
                this.ModeloDB.SP_RETORNA_MODELO(Convert.ToInt32(C_ID_MODELO)).ToList();
            return Json(ListaModelo);
        }

        /* RETORNA LA LISTA DE LOS TIPOS DE VEHICULOS */
        public ActionResult RetornarTipos()
        {
            List<SP_RETORNA_TIPO_VEHICULO_Result> ListaTipos =
                this.ModeloDB.SP_RETORNA_TIPO_VEHICULO(null).ToList();
            return Json(ListaTipos);
        }

        /* METODO REGISTRA LOS DATOS DE LOS VEHICULOS */
        public ActionResult RegistraVehiculoDB(SP_CONSULTAR_VEHICULOS_Result ModeloVista)
        {
            string mensaje = string.Empty;
            int filas = 0;
            try
            {
                /* CONSULTAMOS SI EXISTEN DATOS DE LA PLACA */
                List<SP_CONSULTAR_VEHICULOS_Result> Placa =
                    this.ModeloDB.SP_CONSULTAR_VEHICULOS(ModeloVista.C_PLACA).ToList();
                if (Placa.Count > 0)
                {
                    mensaje = "Esta placa de vechiculo ya se ecuentra registrada";
                }
                else
                {
                    filas = this.ModeloDB.sp_Registrar_Vehiculo(ModeloVista.C_PLACA,
                                                                ModeloVista.C_ID_MARCA,
                                                                ModeloVista.C_ID_TIPO_VEHICULO,
                                                                ModeloVista.C_ID_MODELO,
                                                                ModeloVista.C_CANT_RUEDAS,
                                                                ModeloVista.C_CANT_PUERTAS,
                                                                ModeloVista.C_YEAR);
                }
            }
            catch (Exception error)
            {

                mensaje = "Error: " + error.Message;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Exito al registrar el vehiculo";
                }
                Response.Write("<script language=javascript>alert('" + mensaje + "');</script>");
            }
            return View("RegistraVehiculo");
        }

        /* METODO MODIFICA LOS DATOS DEL VEHICULO */
        public ActionResult ModificarVehiculo(SP_CONSULTAR_VEHICULOS_Result ModeloVista)
        {
            SP_CONSULTAR_VEHICULOS_Result DatosVehiculo = new SP_CONSULTAR_VEHICULOS_Result();
            DatosVehiculo = this.ModeloDB.SP_CONSULTAR_VEHICULOS(ModeloVista.C_PLACA).FirstOrDefault();
            /* CREAMOS LA LISTA DE LOS TIPOS */
            CrearListaTipoVehiculo();
            /* CREAR LISTA PAIS */
            CrearListaPais();
            /* CREAMOS LA LISTA DE LOS FABRICANTES */
            CrearListaFabricantes(DatosVehiculo.C_ID_PAIS);
            /* CREAMOS LA LISTA DE MARCAS */
            CrearMarcaVehiculo(DatosVehiculo.C_ID_FABRICANTE);
            /* CREAMOS LA LISTA DEL MODELO */
            CrearModelo(DatosVehiculo.C_ID_MARCA);
            return View(DatosVehiculo);
        }
        public ActionResult MostrarVevhiculos(SP_CONSULTAR_VEHICULOS_Result ModeloVista)
        {
            //CrearListaVehiculos(ModeloVista);

            return View();
        }
        [HttpPost]
        public ActionResult RetornaLista(SP_CONSULTAR_VEHICULOS_Result ModeloVista)
        {
            List<SP_CONSULTAR_VEHICULOS_Result> lista =
               this.ModeloDB.SP_CONSULTAR_VEHICULOS(ModeloVista.C_PLACA).ToList();
            return Json(new
            {
                resultado = lista
            });
        }
        /* METODO ELIMINA UN VEHICULO */
        public ActionResult EliminarVehiculo(SP_CONSULTAR_VEHICULOS_Result ModeloVista)
        {
            string mensaje = string.Empty;
            int filas = 0;
            try
            {
                filas = this.ModeloDB.sp_Eliminar_Vehiculo(ModeloVista.C_PLACA);
            }
            catch (Exception error)
            {

                mensaje = "Error: " + error.Message;
            }
            if (filas > 0)
            {
                return View();
            }
            Response.Write("<script language=javascript>alert('" + mensaje + "');</script>");
            return View("MostrarVevhiculos");
        }
        [HttpPost]
        public ActionResult ModificarDatosVehiculo( SP_CONSULTAR_VEHICULOS_Result ModeloVista)
        {
            string mensaje = "";
            int filas = 0;
            try
            {
                filas = this.ModeloDB.SP_MODIFICAR_VEHICULO(ModeloVista.C_PLACA,
                                                            ModeloVista.C_CANT_PUERTAS,
                                                            ModeloVista.C_CANT_RUEDAS,
                                                            ModeloVista.C_YEAR,
                                                            ModeloVista.C_FK_TIPO,
                                                            ModeloVista.C_FK_MARCA,
                                                            ModeloVista.C_FK_MODELO);
            }
            catch (Exception error)
            {

                mensaje = error.Message;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Exito al Modificar el El Vehiculo";
                }
                else
                {
                    mensaje = "No se pudo Modificar el Vehiculo";
                }
            }

            return Json(new
            {
                resultado = mensaje
            });
        }
        #region METODOS DE CLASE
        /* METODO CONULTA LOS VECHICULOS */
        public void CrearListaVehiculos(SP_CONSULTAR_VEHICULOS_Result ModeloVista)
        {
            this.ViewBag.ListaVehiculos =
                this.ModeloDB.SP_CONSULTAR_VEHICULOS(ModeloVista.C_PLACA);
        }
        /* CREA LISTA DE TIPOS VEHICULO */
        public void CrearListaTipoVehiculo()
        {
            this.ViewBag.ListaTipos =
                this.ModeloDB.SP_RETORNA_TIPO_VEHICULO(null).ToList();
        }

        /* CREAR LISTA DE LOS FABRICANTES */
        public void CrearListaFabricantes(int pais)
        {
            this.ViewBag.ListaFabricantes =
                this.ModeloDB.SP_RETORNAR_FABRICANTES(pais).ToList();
        }

        /* CREAR LISTA DE LOS PAIS */
        public void CrearListaPais()
        {
            this.ViewBag.ListaPais =
                this.ModeloDB.SP_RETORNA_PAIS(null).ToList();
        }
        /* CREAR TIPO DE MARCA */
        public void CrearMarcaVehiculo(int fabricante)
        {
            this.ViewBag.ListaMarca =
                this.ModeloDB.SP_RETORNA_MARCA(fabricante).ToList();
        }

        /* CREAR TIPO DE MODELO */
        public void CrearModelo(int marca)
        {
            this.ViewBag.ListaModelo =
                this.ModeloDB.SP_RETORNA_MODELO(marca).ToList();
        }
        #endregion

       
    }


}