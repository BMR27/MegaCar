﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;

namespace ProyectoProgramacion.Controllers
{
    public class ClienteController : Controller
    {
        #region INSTANCIAS DE CLASE
        programacionBDEntities modeloBD = new programacionBDEntities();
        #endregion
        // GET: Cliente
        public ActionResult RegistroCliente()
        {

            return View();
        }

        /* RETORNA LA LISTA DE LAS PROVINCIAS */
        public ActionResult RetornarProvincias()
        {
            List<RetornaProvincias_Result> provincias =
                this.modeloBD.RetornaProvincias(null).ToList();

            return Json(provincias);
        }

        /* RETORNA LA LISTA DE CANTONES */
        public ActionResult RetornaCantones(int C_FK_PROVINCIA)
        {
            List<RetornaCantones_Result> cantones =
                this.modeloBD.RetornaCantones(null, C_FK_PROVINCIA).ToList();
            return Json(cantones);
        }
        /* RETORNA LA LISTA DE DISTRITOS */
        public ActionResult RetornarDistritos(int C_FK_CANTON)
        {
            List<RetornaDistrito_Result> distritos =
                this.modeloBD.RetornaDistrito(null, C_FK_CANTON).ToList();
            return Json(distritos);
        }

        [HttpPost]
        public ActionResult RegistroCliente(sp_RetornaCliente_Result modeloVista)
        {

            string mensaje = string.Empty;
            int filas = 0;
            try
            {
                /* CONSULTAMOS SI EXISTEN DATOS DEL CLIENTE */
                List<sp_RetornaCliente_ID_Result> Id =
                    this.modeloBD.sp_RetornaCliente_ID(modeloVista.C_CEDULA).ToList();
                if (Id.Count > 0)
                {
                    mensaje = "Este cliente ya se encuentra registrado";
                }
                else
                {
                    filas = this.modeloBD.sp_Registrar_Cliente(modeloVista.C_CEDULA,
                                                               modeloVista.C_NOMBRE_CLIENTE,
                                                               modeloVista.C_APELLIDO1,
                                                               modeloVista.C_APELLIDO2,
                                                               modeloVista.C_TELEFONO,
                                                               modeloVista.C_CORREO,
                                                               modeloVista.C_FK_PROVINCIA,
                                                               modeloVista.C_FK_CANTON,
                                                               modeloVista.C_FK_DISTRITO,
                                                               modeloVista.C_DIRECCION);
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
                    mensaje = "Exito al registrar el cliente";
                }
                Response.Write("<script language=javascript>alert('" + mensaje + "');</script>");
            }

            return View("RegistroCliente");
        }




        //--------------------------------------------------------------------------------------------

        /* METODO MODIFICA LOS DATOS DEL CLIENTE */
        public ActionResult ModificarCliente(sp_RetornaCliente_Result modeloVista)
        {

            sp_RetornaCliente_ID_Result listaCliente = new sp_RetornaCliente_ID_Result();
            listaCliente = this.modeloBD.sp_RetornaCliente_ID(modeloVista.C_CEDULA).FirstOrDefault();
            CrearListaProvincias();
            CrearListaCantones(listaCliente.id_Provincia);
            CrearListaDistritos(listaCliente.id_Canton);
            return View(listaCliente);
        }
        /* METODO CONSULTA LOS PROVINCIAS*/
        public void CrearListaProvincias()
        {
            this.ViewBag.ListaProvincias =
                 this.modeloBD.RetornaProvincias(null);
        }
        /* METODO CONSULTA LOS CANTONES*/
        public void CrearListaCantones(int fkProvincia)
        {
            this.ViewBag.ListaCantones =
                 this.modeloBD.RetornaCantones(null, fkProvincia);
        }
        public void CrearListaDistritos(int fkCanton)
        {
            this.ViewBag.ListaDistritos =
                 this.modeloBD.RetornaDistrito(null, fkCanton);
        }
        /* METODO CONSULTA LOS CLIENTES */
        public void CrearListaClientes(sp_RetornaCliente_Result modeloVista)
        {
           this.ViewBag.ListaCliente =
                this.modeloBD.sp_RetornaCliente_ID(modeloVista.C_CEDULA);
        }
        public ActionResult MostrarCliente(sp_RetornaCliente_Result modeloVista)
        {
            CrearListaClientes(modeloVista);
            return View();
        }

        /* METODO ELIMINA UN CLIENTE */
        public ActionResult EliminarCliente(sp_RetornaCliente_Result modeloVista)
        {
            string mensaje = string.Empty;
            int filas = 0;
            try
            {
                filas = this.modeloBD.sp_Eliminar_Cliente(modeloVista.C_CEDULA);
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
            return View("MostrarCliente");
        }
        /* METODO MODIFICA LOS DATOS DEL CLIENTE */
        [HttpPost]
        public ActionResult MofificarDatosCliente(sp_RetornaCliente_ID_Result ModeloVista)
        {
            string mensaje = "";
            int filas = 0;
            try
            {
                filas = this.modeloBD.SP_MODIFICAR_CLIENTE(ModeloVista.C_NOMBRE_CLIENTE,
                                                           ModeloVista.C_APELLIDO1,
                                                           ModeloVista.C_APELLIDO2,
                                                           ModeloVista.C_CEDULA,
                                                           ModeloVista.C_CORREO,
                                                           ModeloVista.C_DIRECCION,
                                                           ModeloVista.C_TELEFONO,
                                                           ModeloVista.C_FK_PROVINCIA,
                                                           ModeloVista.C_FK_CANTON,
                                                           ModeloVista.C_FK_DISTRITO);
            }
            catch (Exception error)
            {

                mensaje = error.Message;
            }
            finally
            {
                if (filas > 0)
                {
                    mensaje = "Exito al Modificar el El cliente";
                }
                else
                {
                    mensaje = "No se pudo Modificar el Cliente";
                }
            }

            return Json(new
            {
                resultado = mensaje
            });
        }
    }

}



  
        
       