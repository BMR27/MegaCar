using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProyectoProgramacion.Modelo;
using System.Net.Mail;
namespace ProyectoProgramacion.Controllers
{
    public class CajaController : Controller
    {
        /* INSTANCIAS DE CLASE */
        #region INSTANCIAS
        programacionBDEntities ModeloDB = new programacionBDEntities();
        #endregion

        /* ACTION RESULT */
        #region ACTIONRESULT
        // GET: Caja
        public ActionResult CajaVista()
        {
            
            return View();
        }
        /* RETORNA LOS PARAMETROS DE LA CAJA */
        [HttpPost]
        public ActionResult RetornarParametros()
        {
            List<SP_RETORNA_PARAMETROS_Result> ListaParametros =
                this.ModeloDB.SP_RETORNA_PARAMETROS().ToList();
            return Json(ListaParametros);
        }

        /* REGISTRA UNA APERTURA DE CAJA */
        [HttpPost]
        public ActionResult RegistrarAperturaCaja(SP_RETORNAR_APERTURA_CAJA_FECHA_Result ModeloVista)
        {
            string mensaje = "";
            int filas = 0;
            /* VALIDAMOS SI EXISTEN REGISTROS DEL DIA */
            List<SP_RETORNAR_APERTURA_CAJA_FECHA_Result> Aperturas =
                this.ModeloDB.SP_RETORNAR_APERTURA_CAJA_FECHA().ToList();
            /* DATOS DEL USUARIO */
            sp_Validar_Inicio_Sesion_Result DatosUsuario =
                (sp_Validar_Inicio_Sesion_Result)this.Session["DatosUsuario"];
            if (Aperturas.Count == 0)
            {
                try
                {
                    filas = this.ModeloDB.SP_REGISTRAR_APERTURA_CAJA(ModeloVista.C_MONTO,
                                                                     DatosUsuario.C_ID_USUARIO);
                }
                catch (Exception error)
                {

                    mensaje = "Error: " + error.Message;
                }
                finally
                {
                    if (filas > 0)
                    {
                        mensaje = "Registro de apertura con exito";
                        /* ENVIAMOS EL CORREO DE LA APERTURA */
                        EnviarCorreoElectronico("1");
                    }
                    else
                    {
                        mensaje = "No se pudo registrar la apertura";
                    }
                }
            }
            else
            {
                mensaje = "Ya existe una apertura de caja con la fecha: " + Aperturas[0].C_FECHA;
            }
            return Json(new {
                resultado = mensaje
            });
        }
        /* REGISTRA UNA APERTURA DE CAJA */
        [HttpPost]
        public ActionResult RegistrarCierreCaja()
        {
            string mensaje = "";
            int filas = 0;
            /* VALIDAMOS SI EXISTEN REGISTROS DEL DIA */
            List<SP_RETORNAR_CIERRES_CAJA_Result> Cierre =
                this.ModeloDB.SP_RETORNAR_CIERRES_CAJA().ToList();
            /* DATOS DEL USUARIO */
            sp_Validar_Inicio_Sesion_Result DatosUsuario =
                (sp_Validar_Inicio_Sesion_Result)this.Session["DatosUsuario"];
            if (Cierre.Count == 0)
            {
                try
                {
                    filas = this.ModeloDB.SP_REGISTRAR_CIERRE_CAJA(DatosUsuario.C_ID_USUARIO);
                }
                catch (Exception error)
                {

                    mensaje = "Error: " + error.Message;
                }
                finally
                {
                    if (filas > 0)
                    {
                        mensaje = "Registro de Cierre con exito";
                        /* ENVIAMOS EL CORREO DE LA APERTURA */
                        EnviarCorreoElectronico("2");
                    }
                    else
                    {
                        mensaje = "No se pudo registrar el cierre";
                    }
                }
            }
            else
            {
                mensaje = "Ya existe un cierre de la caja con la fecha: " + Cierre[0].C_FECHA;
            }
            return Json(new
            {
                resultado = mensaje
            });
        }
        /* RETORNA LAS APERTURAS DE CAJA */
        public ActionResult RetornarAperturasDeCaja()
        {
            List<SP_RETORNAR_APERTURA_CAJA_FECHA_Result> Aperturas =
              this.ModeloDB.SP_RETORNAR_APERTURA_CAJA_FECHA().ToList();
            return Json(Aperturas);
        }
        /* RETORNA LAS CIERRES DE CAJA */
        public ActionResult RetornarCierreDeCaja()
        {
            List<SP_RETORNAR_CIERRES_CAJA_Result> Cierres =
              this.ModeloDB.SP_RETORNAR_CIERRES_CAJA().ToList();
            return Json(Cierres);
        }
        #endregion

        /* METODOS DE CLASE */
        #region METODOS
        /* ENVIAR CORREO ELECTRONICO */
        public void EnviarCorreoElectronico(string tipo)
        {
            try
            {
                /* VARIABLES */
                string Emisor = "andreyazofeifaalvarado@gmail.com";
                string Contraseña = "amsklahsf@185$%3";
                string Receptor = "";
                string Asunto = "";
                string Mensaje = "";
                string Host = "smtp.gmail.com";
                int Puerto = 25;
                /*  CONSULTAMOS LOS PARAMETROS */
                List<SP_RETORNA_PARAMETROS_Result> ListaParametros =
                   this.ModeloDB.SP_RETORNA_PARAMETROS().ToList();
                /* SETEAR VARIABLES */
                /* VALIDAMOS QUE CORREO ENVIAMOS */
                switch (tipo)
                {
                    case "1":
                        /* APERTURA */
                        Receptor = ListaParametros[0].C_CORREO_APERTURA;
                        Asunto = "Apertura de caja";
                        Mensaje = "Apertura de caja con un monto de: " + ListaParametros[0].C_MONTO_MINIMO;
                        break;
                    case "2":
                        /* CIERRE */
                        List<SP_RETORNAR_CIERRES_CAJA_Result> Cierres =
                        this.ModeloDB.SP_RETORNAR_CIERRES_CAJA().ToList();
                        Receptor = ListaParametros[0].C_CORREO_APERTURA;
                        Asunto = "Cierre de caja";
                        Mensaje = "Cierre de caja con un monto de: " + Cierres[0].C_MONTO;
                        break;
                    default:
                        break;
                }
                /* DATOS DEL CORREO */
                MailMessage Correo = new MailMessage();
                Correo.From = new MailAddress(Emisor);
                Correo.To.Add(ListaParametros[0].C_CORREO_APERTURA);
                Correo.Subject = Asunto;
                Correo.Body = Mensaje;
                Correo.IsBodyHtml = true;
                Correo.Priority = MailPriority.Normal;
                /* DATOS DEL SMTP */
                SmtpClient smtp = new SmtpClient();
                smtp.Host = Host;
                smtp.Port = Puerto;
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = new System.Net.NetworkCredential(Emisor, Contraseña);
                smtp.Send(Correo);
            }
            catch (Exception error)
            {

                string m = error.Message;
            }
        }


        #endregion
    }
}