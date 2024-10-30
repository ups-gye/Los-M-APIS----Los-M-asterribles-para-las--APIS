using Repository;
using Service.DataContract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Service.Mapper
{
    public class VueloMapper
    {
        public static Vuelo GetEntityFromData(VueloData vueloData)
        {
            Vuelo vuelo = new Vuelo
            {
                Codigo = vueloData.Codigo,
                Origen = vueloData.Origen,
                Destino = vueloData.Destino,
                NumerpPasajero = vueloData.NumerpPasajero,
                Estado = vueloData.Estado
            };

            return vuelo;
        }

        public static VueloData GetDataFromEntity(Vuelo vuelo)
        {
            VueloData vueloData = new VueloData
            {
                Codigo = vuelo.Codigo,
                Origen = vuelo.Origen,
                Destino = vuelo.Destino,
                NumerpPasajero = vuelo.NumerpPasajero,
                Estado = vuelo.Estado
            };

            return vueloData;
        }
    }
}
