import { ListChecks, Trash2 } from "lucide-react";
import { formatDatePretty, minutesToLabel, formatPrice } from "../../utils/datetime";

export default function AgendaTab({ appointments, onAppointmentsChange }) {
  const sorted = [...appointments].sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.startMinutes - b.startMinutes;
  });

  function cancelAppt(id) {
    onAppointmentsChange(appointments.filter((a) => a.id !== id));
  }

  return (
    <div className="card">
      <p className="step-label">
        <ListChecks size={14} style={{ verticalAlign: -2, marginRight: 5 }} />
        {sorted.length} agendamento(s)
      </p>
      {sorted.length === 0 && <p className="empty-note">Nenhum agendamento ainda.</p>}
      {sorted.map((a) => (
        <div className="list-row" key={a.id}>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>
              {formatDatePretty(a.date)} · {minutesToLabel(a.startMinutes)}–{minutesToLabel(a.endMinutes)}
            </p>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--softText)" }}>
              {a.clientName} · {a.clientPhone}
            </p>
            <p style={{ margin: "2px 0 0", fontSize: 12.5, color: "var(--softText)" }}>{a.services.join(", ")}</p>
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--wine)" }}>{formatPrice(a.totalPrice)}</div>
          <button className="icon-btn" onClick={() => cancelAppt(a.id)} aria-label="Cancelar">
            <Trash2 size={17} />
          </button>
        </div>
      ))}
    </div>
  );
}
