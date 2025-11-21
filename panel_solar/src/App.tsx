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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
  };

  const buildSummaryLines = () => {
    if (!resultados) return [];
    return [
      `Calculadora de Sistema Solar - ${new Date().toLocaleString()}`,
      `Consumo diario: ${resultados.consumoDiario.toFixed(2)} kWh/día`,
      `Potencia requerida: ${resultados.potencia.toFixed(2)} kW`,
      `Paneles (550W): ${resultados.numPaneles}`,
      `Ahorro mensual: ${formatCurrency(resultados.ahorroMensual)}`,
      `Costo total: ${formatCurrency(resultados.costoTotal)}`,
      `Retorno: ${resultados.retorno.toFixed(2)} años`,
      `Área requerida: ${resultados.areaTotal.toFixed(2)} m²`,
    ];
  };

  const exportResults = () => {
    if (!resultados) return;
    const lines = buildSummaryLines();
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resultados-solar-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const shareResults = async () => {
    if (!resultados) return;
    const lines = buildSummaryLines();
    const text = lines.join('\n');
    // Web Share API
    if ((navigator as any).share) {
      try {
        await (navigator as any).share({
          title: 'Resultados sistema solar',
          text,
        });
      } catch (err) {
        // usuario canceló o falló
        console.error('Compartir falló', err);
      }
      return;
    }

    // Fallback: copiar al portapapeles
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        alert('Resultados copiados al portapapeles. Puedes pegarlos en un mensaje.');
      } catch (err) {
        console.error('Copiar al portapapeles falló', err);
        alert('No se pudo compartir automáticamente. Por favor descarga los resultados.');
      }
      return;
    }

    // Último recurso: forzar descarga
    exportResults();
  };

  return (
    <div className="solar-container">
      <div className="sun-animation" aria-hidden="true"></div>
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
          <div className="actions">
            <button className="btn btn-primary" onClick={exportResults}>Exportar resultados</button>
            <button className="btn btn-secondary" onClick={shareResults}>Compartir</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

