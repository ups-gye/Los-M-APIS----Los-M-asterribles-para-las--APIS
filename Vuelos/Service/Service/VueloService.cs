using Repository.Dao;
using Service.DataContract;
using Repository.Excepcion;
using System;
using System.Collections.Generic;
using System.Linq;
using Service.Mapper;
using Repository;


namespace Service
{
    public class VueloService
    {
        private readonly VueloDAO vueloDAO = new VueloDAO();

        public void CrearVuelo(VueloData vueloData)
        { 
            vueloDAO.CrearVuelo(VueloMapper.GetEntityFromData(vueloData));
        }

        public void ModificarVuelo(VueloData vueloData) 
        {
            vueloDAO.ModificarVuelo(VueloMapper.GetEntityFromData(vueloData));
        }


        public List<VueloData> ObtenerVuelos()
        {
            List <VueloData> vuelos = new List<VueloData>();
            vueloDAO.ObtenerVuelos().ForEach(vuelo => vuelos.Add(VueloMapper.GetDataFromEntity(vuelo)));
            return vuelos;
        }


        public VueloData ObtenerVueloOrigenDestino(string Origen, string Destino)
        { 
            Vuelo vuelo = vueloDAO.ObtenerVueloOrigenDestino(Origen, Destino);
            return VueloMapper.GetDataFromEntity(vuelo);
        }

    }
}
