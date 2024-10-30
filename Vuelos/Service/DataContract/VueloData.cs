using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Service.DataContract
{
    [DataContract]
    public class VueloData
    {
        [DataMember]
        public string Codigo { get; set; }

        [DataMember]
        public string Origen { get; set; }
        
        [DataMember]
        public string Destino { get; set; }

        [DataMember]
        public short NumerpPasajero { get; set; }

        [DataMember]
        public string Estado { get; set; }
    }
}
