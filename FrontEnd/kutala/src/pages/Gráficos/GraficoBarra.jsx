import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import DadosGrafico from "../../services/Graficos/GraficoBarraService"
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';




function GraficoBarras() {
  const [municipio, setMunicipio] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getBairros() {
      try {
        setLoading(true)

        const resposta = await DadosGrafico();
        const dadosTratados = resposta.data.map(item => ({
          nome: item.municipio.nome,
          Alertas: item.Total_de_Alertas
        }))
        setMunicipio(dadosTratados);

      } catch (error) {
        console.log("Erro ", error)
      } finally {
        setLoading(false)
      }
    }
    getBairros()
  }, [])





  return (
    <>

      <div className='flex flex-col'>

        {loading ? (
          <div className="w-full h-50 flex items-center justify-center">
            <ClipLoader size={40} color="#041736" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={193}>
            <BarChart data={municipio}>
              <CartesianGrid strokeDasharray="1" /> {/* as linhas de fundo */}
              <XAxis dataKey="nome" />                 {/* eixo horizontal */}
              <YAxis fill='blue' />                               {/* eixo vertical */}
              <Tooltip />                             {/* o popup ao passar o rato */}
              <Bar dataKey="Alertas" fill="blue" radius={[10, 10, 0, 0]} /> {/* as barras em si */}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

    </>

  );
}

export default GraficoBarras