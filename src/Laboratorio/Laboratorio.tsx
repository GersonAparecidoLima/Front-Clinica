import { useState } from 'react';

// --- COMPONENTE FILHO (Baseado em Props) ---
interface BoxInfoProps {
  titulo: string;
  valor: number;
  cor: string;
}

const BoxInfo = ({ titulo, valor, cor }: BoxInfoProps) => {
  return (
    <div style={{ 
      border: `2px solid ${cor}`, 
      padding: '10px', 
      borderRadius: '8px',
      margin: '10px 0' 
    }}>
      <h3>{titulo}: <span style={{ color: cor }}>{valor}</span></h3>
    </div>
  );
};

// --- COMPONENTE PAI (O Dono do State) ---
export const Laboratorio = () => {
  // 1. Criamos o Estado aqui no Pai
  const [contador, setContador] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🧪 Laboratório de React</h1>
      <p>O estado vive no componente Pai, mas é enviado para os filhos via Props.</p>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => setContador(contador + 1)}>Aumentar (+1)</button>
        <button onClick={() => setContador(contador - 1)}>Diminuir (-1)</button>
        <button onClick={() => setContador(0)}>Resetar</button>
      </div>

      <hr />

      {/* 2. Passando o Estado para os Filhos como Props */}
      <BoxInfo titulo="Total Positivo" valor={contador} cor="green" />
      <BoxInfo titulo="Alerta de Valor" valor={contador} cor="orange" />
      
      {/* Aqui você vê que o Filho não muda o valor, ele só reflete o que o Pai manda */}
    </div>
  );
};