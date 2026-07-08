import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { uid, formatPrice } from "../../utils/datetime";

export default function ServicosTab({ services, onServicesChange }) {
  const [newName, setNewName] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("cilios");

  function addService() {
    if (!newName.trim() || !newDuration || !newPrice) return;
    const svc = {
      id: uid(),
      name: newName.trim(),
      category: newCategory,
      duration: Number(newDuration),
      price: Number(newPrice),
    };
    onServicesChange([...services, svc]);
    setNewName("");
    setNewDuration("");
    setNewPrice("");
  }

  function removeService(id) {
    onServicesChange(services.filter((s) => s.id !== id));
  }

  return (
    <div className="card">
      <p className="step-label">Serviços oferecidos</p>
      {services.map((s) => (
        <div className="list-row" key={s.id}>
          <div className={`swatch-dot ${s.category}`} />
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{s.name}</p>
            <p style={{ margin: "2px 0 0", fontSize: 12.5, color: "var(--softText)" }}>
              {s.duration} min · {formatPrice(s.price)}
            </p>
          </div>
          <button className="icon-btn" onClick={() => removeService(s.id)} aria-label="Remover">
            <Trash2 size={17} />
          </button>
        </div>
      ))}

      <p className="step-label" style={{ marginTop: 20 }}>Adicionar novo serviço</p>
      <label className="field-label">Nome</label>
      <input className="field-input" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Ex: Design de sobrancelhas" />
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label className="field-label">Duração (min)</label>
          <input className="field-input" type="number" value={newDuration} onChange={(e) => setNewDuration(e.target.value)} placeholder="60" />
        </div>
        <div style={{ flex: 1 }}>
          <label className="field-label">Preço (R$)</label>
          <input className="field-input" type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="90" />
        </div>
      </div>
      <label className="field-label">Categoria</label>
      <select className="field-input" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
        <option value="cilios">Cílios</option>
        <option value="unha">Unha</option>
      </select>
      <button className="btn-primary" onClick={addService}>
        <Plus size={16} /> Adicionar serviço
      </button>
    </div>
  );
}
