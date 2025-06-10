import { useState } from "react";

const questions = [
  {
    id: 1,
    text: "¿Quién asume los costos de transporte principal (marítimo, aéreo, terrestre internacional)?",
    options: { A: "El vendedor", B: "El comprador" },
  },
  {
    id: 2,
    text: "¿Quién contrata y paga el seguro de transporte internacional?",
    options: { A: "El vendedor", B: "El comprador", C: "No se contrata seguro" },
  },
  {
    id: 3,
    text: "¿El vendedor entrega la mercancía en el país del comprador?",
    options: { A: "Sí, en un punto acordado (almacén, terminal, etc.)", B: "No, entrega en su propio país" },
  },
  {
    id: 4,
    text: "¿Quién realiza los trámites de exportación?",
    options: { A: "El vendedor", B: "El comprador" },
  },
  {
    id: 5,
    text: "¿Quién realiza los trámites de importación (aduana en destino)?",
    options: { A: "El vendedor", B: "El comprador" },
  },
  {
    id: 6,
    text: "¿El transporte principal es exclusivamente marítimo?",
    options: { A: "Sí", B: "No, es multimodal o terrestre/aéreo" },
  },
  {
    id: 7,
    text: "¿Dónde se considera entregada la mercancía?",
    options: {
      A: "Cuando se carga en el transporte principal",
      B: "Cuando se descarga en destino",
      C: "Cuando se entrega en el almacén del comprador",
      D: "Cuando se pone a disposición del comprador en origen",
    },
  },
];

const incotermPatterns = [
  { pattern: "1A2A3A4A5A6B7C", incoterm: "DDP – Delivered Duty Paid", description: "El vendedor asume todos los costos y riesgos hasta la entrega en el lugar del comprador, incluyendo aduana en destino." },
  { pattern: "1A2B3A4A5B6B7B", incoterm: "DAP – Delivered at Place", description: "El vendedor entrega la mercancía en el país del comprador, pero el comprador se encarga de la importación y sus costos." },
  { pattern: "1A2A3A4A5B6B7B", incoterm: "DPU – Delivered at Place Unloaded", description: "El vendedor entrega la mercancía ya descargada en el país de destino, pero el comprador realiza la importación." },
  { pattern: "1A2B3B4A5B6B7A", incoterm: "FCA – Free Carrier", description: "El vendedor entrega la mercancía al transportista designado por el comprador en un lugar convenido. El comprador asume transporte y riesgos posteriores." },
  { pattern: "1B2C3B4B5B6B7D", incoterm: "EXW – Ex Works", description: "El comprador asume todos los costos y riesgos desde el lugar del vendedor. El vendedor sólo pone la mercancía a disposición." },
  { pattern: "1A2B3B4A5B6B7A", incoterm: "CPT – Carriage Paid To", description: "El vendedor paga el transporte hasta el destino, pero el riesgo se transfiere al comprador cuando la mercancía es entregada al transportista." },
  { pattern: "1A2A3B4A5B6B7A", incoterm: "CIP – Carriage and Insurance Paid To", description: "Similar a CPT, pero el vendedor también contrata el seguro hasta el destino." },
  { pattern: "1A2B3B4A5B6A7A", incoterm: "FOB – Free On Board", description: "El vendedor entrega la mercancía a bordo del buque en el puerto de carga convenido. El comprador asume riesgos y costos a partir de allí." },
  { pattern: "1A2A3B4A5B6A7A", incoterm: "CFR – Cost and Freight", description: "El vendedor paga el transporte marítimo hasta el destino, pero el riesgo se transfiere cuando la mercancía está a bordo." },
  { pattern: "1A2A3B4A5B6A7A", incoterm: "CIF – Cost, Insurance and Freight", description: "Similar a CFR, pero el vendedor también contrata el seguro marítimo internacional." }
];

export default function App() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleSelect = (qid, option) => {
    setAnswers({ ...answers, [qid]: option });
  };

  const calculateResult = () => {
    const userPattern = questions.map(q => `${q.id}${answers[q.id] || ""}`).join("");
    const match = incotermPatterns.find(p => p.pattern === userPattern);

    if (match) {
      setResult({ incoterm: match.incoterm, description: match.description });
    } else {
      setResult({
        incoterm: "No identificado",
        description: "Las respuestas no coinciden con un patrón completo de un Incoterm específico. Revisa o ajusta las respuestas."
      });
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "2rem" }}>
      <h1>Test para identificar Incoterm</h1>
      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
          <p><strong>{q.id}. {q.text}</strong></p>
          {Object.entries(q.options).map(([key, label]) => (
            <label key={key} style={{ display: "block", marginBottom: "4px" }}>
              <input
                type="radio"
                name={`q${q.id}`}
                value={key}
                checked={answers[q.id] === key}
                onChange={() => handleSelect(q.id, key)}
              /> {label}
            </label>
          ))}
        </div>
      ))}
      <button onClick={calculateResult}>Calcular Incoterm</button>
      {result && (
        <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid green", backgroundColor: "#f0fff0", borderRadius: "8px" }}>
          <h2>Resultado:</h2>
          <p><strong>{result.incoterm}</strong></p>
          <p>{result.description}</p>
        </div>
      )}
    </div>
  );
}
