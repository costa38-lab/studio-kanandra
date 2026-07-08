import { WEEK_KEYS, WEEK_LABELS } from "../../constants/week";

export default function HorariosTab({ hours, onHoursChange }) {
  function updateDay(key, patch) {
    onHoursChange({ ...hours, [key]: { ...hours[key], ...patch } });
  }

  return (
    <div className="card">
      <p className="step-label">Horário de funcionamento</p>
      {WEEK_KEYS.map((key) => {
        const d = hours[key];
        return (
          <div className="day-toggle-row" key={key}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, width: 110, fontSize: 14, fontWeight: 600 }}>
              <input type="checkbox" checked={!d.closed} onChange={(e) => updateDay(key, { closed: !e.target.checked })} />
              {WEEK_LABELS[key]}
            </label>
            {!d.closed && (
              <>
                <input
                  className="mini-input"
                  type="time"
                  value={d.open}
                  onChange={(e) => updateDay(key, { open: e.target.value })}
                />
                <span style={{ color: "var(--softText)" }}>às</span>
                <input
                  className="mini-input"
                  type="time"
                  value={d.close}
                  onChange={(e) => updateDay(key, { close: e.target.value })}
                />
              </>
            )}
            {d.closed && <span style={{ fontSize: 13, color: "var(--softText)" }}>Fechado</span>}
          </div>
        );
      })}
    </div>
  );
}
