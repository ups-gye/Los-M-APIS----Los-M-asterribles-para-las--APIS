using System;
using System.Data.Entity.Validation;

namespace Repository.Utilitarios
{
    public class ExceptionUtil
    {
        public static void DbEntityValidationException(DbEntityValidationException exception)
        {
            foreach (var eve in exception.EntityValidationErrors)
            {
                string errorEntidad = string.Format("Tipo entidad \"{0}\" / Estado \"{1}\" Errores:",eve.Entry.Entity.GetType().Name, eve.Entry.State);
                Console.WriteLine(errorEntidad);
                foreach (var ve in eve.ValidationErrors)
                {
                    string errorPropiedad = string.Format("- Propiedad: \"{0}\", Error: \"{1}\"", ve.PropertyName, ve.ErrorMessage);
                    Console.WriteLine(errorPropiedad);
                }
            }
        }                           
    }
}
