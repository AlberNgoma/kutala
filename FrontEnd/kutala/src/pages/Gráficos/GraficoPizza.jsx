import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import DadosGrafico from "../../services/Graficos/GraficoPizzaService";
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';


const CORES = ['#11ff00', '#ff0800', '#fffb00'];

function GraficoPizza() {
  const [nivel, setNivel] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getNivel() {
      try {
        setLoading(true)
        const resposta = await DadosGrafico();
        setNivel(resposta.data);
        console.log(resposta.data);



      } catch (error) {
        console.log("Erro ao ir buscar níveis dos alertas ", error);
      } finally {
        setLoading(false);
      }
    }
    getNivel()
  }, [])





  return (
    <>

      {loading ? (
        <div className="w-full h-30 flex items-center justify-center">
          <ClipLoader size={40} color="#041736" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={nivel} dataKey="total_de_alertas" nameKey="nivel_alerta" cx="50%" cy="50%" outerRadius={100}>
              {nivel.map((_, index) => (
                <Cell key={index} fill={CORES[index % CORES.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}

    </>
  );
}

export default GraficoPizza
