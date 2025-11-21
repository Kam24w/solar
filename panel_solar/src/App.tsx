import { useState } from "react";
import "./App.css";

function App() {
  const [consumo, setConsumo] = useState<number | "">("");
  const [resultados, setResultados] = useState<any>(null);

  const calcular = () => {
    if (!consumo || consumo <= 0) return;

    // Datos según las diapositivas
    const HSP = 3.9;
    const costoKwh = 926;
    const costoPorPanel = 2100000;
    const potenciaPanelKW = 0.55;
    const areaPorPanel = 2.3;

    // Cálculos
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
    <div style={styles.container}>
      <h1 style={styles.title}>Calculadora de Sistema Solar</h1>

      <div style={styles.card}>
        <label style={styles.label}>Consumo mensual (kWh/mes)</label>
        <input
          type="number"
          value={consumo}
          onChange={(e) => setConsumo(e.target.value ? Number(e.target.value) : "")}
          style={styles.input}
          placeholder="Ej: 4125"
        />

        <button onClick={calcular} style={styles.button}>
          Calcular
        </button>
      </div>

      {resultados && (
        <div style={styles.resultsCard}>
          <h2 style={styles.resultsTitle}>Resultados</h2>

          <p><strong>Consumo diario:</strong> {resultados.consumoDiario.toFixed(2)} kWh/día</p>
          <p><strong>Potencia necesaria:</strong> {resultados.potencia.toFixed(2)} kW</p>
          <p><strong>Número de paneles (550W):</strong> {resultados.numPaneles}</p>
          <p><strong>Ahorro mensual:</strong> ${resultados.ahorroMensual.toLocaleString()}</p>
          <p><strong>Costo del sistema:</strong> ${resultados.costoTotal.toLocaleString()}</p>
          <p><strong>Retorno de inversión:</strong> {resultados.retorno.toFixed(2)} años</p>
          <p><strong>Área total:</strong> {resultados.areaTotal.toFixed(2)} m²</p>
        </div>
      )}
    </div>
  );
}

const styles: any = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    background: "#f4f7fa",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "32px",
  },
  card: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "25px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  resultsCard: {
    maxWidth: "500px",
    margin: "30px auto",
    padding: "25px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
  },
  resultsTitle: {
    marginBottom: "15px",
  },
};

export default App;
