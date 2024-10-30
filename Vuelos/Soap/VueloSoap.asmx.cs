using System.Collections.Generic;
using Service;
using System.Web.Services;
using Service.DataContract;
using System;

namespace Soap
{
    
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    
    public class VueloSoap : System.Web.Services.WebService
    {
        private readonly VueloService  vueloService= new VueloService();

        [WebMethod]
        public void CrearVuelo(VueloData vueloData)
        {            
            this.vueloService.CrearVuelo(vueloData);
        }
                 
        [WebMethod]
        public void ModificarVuelo(VueloData vueloData)
        {            
            this.vueloService.ModificarVuelo(vueloData);            
        }

        [WebMethod]
        public List<VueloData> ObtenerVuelos()
        {
            return this.vueloService.ObtenerVuelos();
        }

        [WebMethod]
        public VueloData ObtenerVueloOrigenDestino(string Origen, string Destino)
        {
            return this.vueloService.ObtenerVueloOrigenDestino(Origen, Destino);
        }



    }
}
