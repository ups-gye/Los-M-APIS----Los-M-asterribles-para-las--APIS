using System;
using System.ComponentModel;
using System.Runtime.Serialization;

namespace Repository.Excepcion
{
    public class CustomException: Exception
    {
        public CustomException(string mensaje, Exception ex) : base(mensaje, ex)
        {        
        }
        
        public CustomException(string mensaje) : base(mensaje)
        {
        }
    }
}
