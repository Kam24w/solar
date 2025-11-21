import { useState } from "react";
import "./App.css";

function App() {
  const [consumo, setConsumo] = useState<number | "">("");
  const [resultados, setResultados] = useState<any>(null);

  const calcular = () => {
    if (!consumo || consumo <= 0) return;

    const HSP = 3.9;
    const costoKwh = 926;
    const costoPorPanel = 2100000;
    const potenciaPanelKW = 0.55;
    const areaPorPanel = 2.3;

    const consumoDiario = consumo / 30;
    const potencia = consumoDiario / HSP;
    const numPaneles = Math.ceil(potencia / potenciaPanelKW);
    const ahorroMensual = consumo * costoKwh;
    const costoTotal = numPaneles * costoPorPanel;
    const retorno = costoTotal / ahorroMensual;
    const areaTotal = numPaneles * areaPorPanel;

    setResultados({
      consumoDiario,
      potencia,
      numPaneles,
      ahorroMensual,
      costoTotal,
      retorno,
      areaTotal,
    });
  };

  return (
    <div className="solar-container">
      <h1 className="solar-title">
        Calculadora de Sistema Solar
      </h1>

      <div className="solar-card">
        <label>Consumo mensual (kWh/mes)</label>
        <input
          type="number"
          value={consumo}
          onChange={(e) =>
            setConsumo(e.target.value ? Number(e.target.value) : "")
          }
          placeholder="Ej: 4125"
        />

        <button onClick={calcular}>Calcular</button>
      </div>

      {resultados && (
        <div className="solar-results">
          <h2>Resultados</h2>

          <div className="result-grid">
            <div className="result-item"><strong>Consumo diario:</strong> {resultados.consumoDiario.toFixed(2)} kWh/día</div>
            <div className="result-item"> <strong>Potencia requerida:</strong> {resultados.potencia.toFixed(2)} kW</div>
            <div className="result-item"> <strong>Paneles (550W):</strong> {resultados.numPaneles}</div>
            <div className="result-item"> <strong>Ahorro mensual:</strong> ${resultados.ahorroMensual.toLocaleString()}</div>
            <div className="result-item"> <strong>Costo total:</strong> ${resultados.costoTotal.toLocaleString()}</div>
            <div className="result-item"><strong>Retorno:</strong> {resultados.retorno.toFixed(2)} años</div>
            <div className="result-item"> <strong>Área requerida:</strong> {resultados.areaTotal.toFixed(2)} m²</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

