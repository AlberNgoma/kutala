import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import DadosGrafico from "../../services/Graficos/GraficoLineService";
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';


function GraficoLinhas() {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAlertas() {
      try {
        setLoading(true)
        const resposta = await DadosGrafico();
        setAlertas(resposta.data)


      } catch (error) {
        console.log("Erro ao ir buscar bairros de acordo ao dia ", error);
      } finally {
        setLoading(false);
      }
    }
    getAlertas()
  }, []);


  function formatarData(dataCerta){
    if(!dataCerta) return "";
    const [ano,mes, dia] = dataCerta.split("-");
    return `${dia}/${mes}/${ano}`
  }







  return (
    <>
      {loading ? (
        <div className="w-full h-30 flex items-center justify-center">
          <ClipLoader size={40} color="#041736" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={193}>
          <LineChart data={alertas}>
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="data" tickFormatter={formatarData}/>
            <YAxis />
            <Tooltip labelFormatter={formatarData} />
            <Line type="monotone" dataKey="total_de_alertas" stroke="blue" activeDot={{ r: 6 }} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}

    </>
  );
}

export default GraficoLinhas;
