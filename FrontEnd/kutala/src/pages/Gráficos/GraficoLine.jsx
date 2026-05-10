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
        setAlertas(resposta.data);


      } catch (error) {
        console.log("Erro ao ir buscar bairros de acordo ao dia ", error);
      } finally {
        setLoading(false);
      }
    }
    getAlertas()
  }, []);







  return (
    <>
      {loading ? (
        <div className="w-full h-30 flex items-center justify-center">
          <ClipLoader size={40} color="#041736" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={193}>
          <LineChart data={alertas}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total_de_alertas" stroke="#ee0707" />
          </LineChart>
        </ResponsiveContainer>
      )}

    </>
  );
}

export default GraficoLinhas;
