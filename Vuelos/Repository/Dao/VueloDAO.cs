
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using Repository.Excepcion;
using Repository.Utilitarios;

namespace Repository.Dao
{

    public class VueloDAO 
    {
        private VueloDBEntities db = new VueloDBEntities();

        public void CrearVuelo(Vuelo vuelo) 
        {
            try
            {
                db.Vuelo.Add(vuelo);
                db.SaveChanges();
            }
            catch (DbEntityValidationException ex)
            {
                ExceptionUtil.DbEntityValidationException(ex);
                throw new CustomException("Error en DB al Crear el Vuelo" + ex.Message, ex);
            }
            catch (Exception ex)
            {
                throw new CustomException("Error al Crear el Vuelo" + ex.Message, ex);
            }
        }

        public void ModificarVuelo(Vuelo vuelo)
        {
            try
            {

                using (var dbCtx = new VueloDBEntities())
                {
                    dbCtx.Entry(vuelo).State = System.Data.Entity.EntityState.Modified;
                    dbCtx.SaveChanges();                    
                }
            }
            catch (DbEntityValidationException ex)
            {
                ExceptionUtil.DbEntityValidationException(ex);
                throw new CustomException("Error en DB al Modificar el Vuelo" + ex.Message, ex);
            }
            catch (Exception ex)
            {
                throw new CustomException("Error al Modificar el Vuelo" + ex.Message, ex);
            }
        }

        public List<Vuelo> ObtenerVuelos()
        {             
            try
            {
                List<Vuelo> lista = db.Vuelo.ToList();     
                return lista;
            }
            catch (DbEntityValidationException ex)
            {
                ExceptionUtil.DbEntityValidationException(ex);
                throw new CustomException("Error en DB al Obtener el Listado de Vuelos" + ex.Message, ex);
            }
            catch (Exception ex)
            {
                throw new CustomException("Error al Obtener el Listado de Vuelos" + ex.Message, ex);
            }            
        }

        public Vuelo ObtenerVueloOrigenDestino(string Origen, string Destino)
        {
            try
            {
                List<Vuelo> vuelos = db.Vuelo.Where(e => e.Origen == Origen && e.Destino == Destino).ToList();
                Vuelo vuelo = (vuelos.Count > 0) ? vuelos[0] : null;
                return vuelo;
            }
            catch (DbEntityValidationException ex)
            {
                ExceptionUtil.DbEntityValidationException(ex);
                throw new CustomException("Error en DB al Obtener el Vuelo por Origen y Destino" + ex.Message, ex);
            }
            catch (Exception ex)
            {
                throw new CustomException("Error al Obtener Vuelo por Origen y Destino" + ex.Message, ex);
            }
        }
    }
}
