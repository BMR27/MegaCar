//------------------------------------------------------------------------------
// <auto-generated>
//    Este código se generó a partir de una plantilla.
//
//    Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//    Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ProyectoProgramacion.Modelo
{
    using System;
    using System.Collections.Generic;
    
    public partial class TBL_USUARIOS
    {
        public TBL_USUARIOS()
        {
            this.TBL_APERTURA_CIERRE_CAJA = new HashSet<TBL_APERTURA_CIERRE_CAJA>();
            this.TBL_INGRESOS_USUARIOS = new HashSet<TBL_INGRESOS_USUARIOS>();
        }
    
        public int C_ID_USUARIO { get; set; }
        public string C_NOMBRE { get; set; }
        public string C_APELLIDO1 { get; set; }
        public string C_APELLIDO2 { get; set; }
        public string C_USUARIO { get; set; }
        public string C_PASS { get; set; }
        public int C_FK_TIPO { get; set; }
        public bool C_ESTADO { get; set; }
    
        public virtual ICollection<TBL_APERTURA_CIERRE_CAJA> TBL_APERTURA_CIERRE_CAJA { get; set; }
        public virtual ICollection<TBL_INGRESOS_USUARIOS> TBL_INGRESOS_USUARIOS { get; set; }
        public virtual TBL_TIPO_USUARIO TBL_TIPO_USUARIO { get; set; }
    }
}
