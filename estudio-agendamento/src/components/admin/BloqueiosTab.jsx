import { useState } from "react";
import { X, Plus } from "lucide-react";
import { formatDatePretty } from "../../utils/datetime";

export default function BloqueiosTab({ blockedDates, onBlockedChange }) {
  const [newDate, setNewDate] = useState("");

  function addBlocked() {
    if (!newDate || blockedDates.includes(newDate)) return;
    onBlockedChange([...blockedDates, newDate].sort());
    setNewDate("");
  }

  function removeBlocked(date) {
    onBlockedChange(blockedDates.filter((d) => d !== date));
  }

  return (
    <div className="card">
      <p className="step-label">Dias bloqueados (férias, feriados)</p>
      {blockedDates.length === 0 && <p className="empty-note">Nenhum dia bloqueado.</p>}
      {blockedDates.map((d) => (
        <div className="list-row" key={d}>
          <div style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{formatDatePretty(d)}</div>
          <button className="icon-btn" onClick={() => removeBlocked(d)} aria-label="Remover">
            <X size={17} />
          </button>
        </div>
      ))}
      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <input className="field-input" style={{ marginBottom: 0 }} type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
        <button className="btn-primary" onClick={addBlocked}>
          <Plus size={16} /> Bloquear
        </button>
      </div>
    </div>
  );
}
