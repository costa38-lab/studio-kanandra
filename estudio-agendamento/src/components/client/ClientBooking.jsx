import { useState, useMemo } from "react";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { COLORS } from "../../constants/colors";
import { WEEK_KEYS } from "../../constants/week";
import { uid, toISODate, minutesToLabel, formatDatePretty, formatPrice } from "../../utils/datetime";
import { getAvailableSlots } from "../../utils/availability";

export default function ClientBooking({ services, hours, blockedDates, appointments, onBook }) {
  const [step, setStep] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [confirmed, setConfirmed] = useState(null);

  const selectedServices = services.filter((s) => selectedIds.includes(s.id));
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  const nextDays = useMemo(() => {
    const arr = [];
    const base = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      const iso = toISODate(d);
      const dayKey = WEEK_KEYS[d.getDay()];
      const dayHours = hours[dayKey];
      const closed = !dayHours || dayHours.closed || blockedDates.includes(iso);
      arr.push({ iso, date: d, closed });
    }
    return arr;
  }, [hours, blockedDates]);

  const slots = useMemo(() => {
    if (!selectedDate || totalDuration === 0) return [];
    return getAvailableSlots(selectedDate, totalDuration, appointments, hours, blockedDates);
  }, [selectedDate, totalDuration, appointments, hours, blockedDates]);

  function toggleService(id) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function handleConfirm() {
    const startMinutes = selectedSlot;
    const endMinutes = selectedSlot + totalDuration;
    const appt = {
      id: uid(),
      date: selectedDate,
      startMinutes,
      endMinutes,
      services: selectedServices.map((s) => s.name),
      totalDuration,
      totalPrice,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      createdAt: new Date().toISOString(),
    };
    onBook(appt);
    setConfirmed(appt);
    setStep(6);
  }

  function resetAll() {
    setStep(1);
    setSelectedIds([]);
    setSelectedDate(null);
    setSelectedSlot(null);
    setClientName("");
    setClientPhone("");
    setConfirmed(null);
  }

  const stepLabels = ["Serviços", "Data", "Horário", "Seus dados", "Confirmar"];

  return (
    <div>
      {step <= 5 && (
        <div className="step-bar">
          {stepLabels.map((_, i) => (
            <div key={i} className={`step-dot ${i + 1 < step ? "done" : i + 1 === step ? "current" : ""}`} />
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="card">
          <p className="step-label">Passo 1 de 5 · Escolha os serviços</p>
          {services.map((s) => (
            <div
              key={s.id}
              className={`swatch ${selectedIds.includes(s.id) ? "selected" : ""}`}
              onClick={() => toggleService(s.id)}
            >
              <div className={`swatch-dot ${s.category}`} />
              <div>
                <p className="swatch-name">{s.name}</p>
                <p className="swatch-meta">{s.duration} min</p>
              </div>
              <div className="swatch-price">{formatPrice(s.price)}</div>
            </div>
          ))}
          {selectedIds.length > 0 && (
            <p style={{ fontSize: 13, color: "var(--softText)", marginTop: 8 }}>
              Total: {totalDuration} min · {formatPrice(totalPrice)}
            </p>
          )}
          <div className="nav-row" style={{ justifyContent: "flex-end" }}>
            <button className="btn-primary" disabled={selectedIds.length === 0} onClick={() => setStep(2)}>
              Continuar <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <p className="step-label">Passo 2 de 5 · Escolha a data</p>
          <div className="day-scroll">
            {nextDays.map(({ iso, date, closed }) => (
              <div
                key={iso}
                className={`day-chip ${selectedDate === iso ? "selected" : ""}`}
                style={closed ? { opacity: 0.35, cursor: "not-allowed" } : {}}
                onClick={() => {
                  if (!closed) {
                    setSelectedDate(iso);
                    setSelectedSlot(null);
                  }
                }}
              >
                <span className="day-wk">{date.toLocaleDateString("pt-BR", { weekday: "short" })}</span>
                <span className="day-num">{date.getDate()}</span>
              </div>
            ))}
          </div>
          <div className="nav-row">
            <button className="btn-ghost" onClick={() => setStep(1)}>
              <ArrowLeft size={16} /> Voltar
            </button>
            <button className="btn-primary" disabled={!selectedDate} onClick={() => setStep(3)}>
              Continuar <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <p className="step-label">Passo 3 de 5 · Escolha o horário</p>
          <p style={{ fontSize: 13, color: "var(--softText)", marginTop: -6, marginBottom: 14 }}>
            {formatDatePretty(selectedDate)} · duração total {totalDuration} min
          </p>
          {slots.length === 0 ? (
            <p className="empty-note">Não há horários disponíveis nesse dia para essa combinação de serviços. Volte e escolha outra data.</p>
          ) : (
            <div className="slot-grid">
              {slots.map((m) => (
                <button
                  key={m}
                  className={`slot-btn ${selectedSlot === m ? "selected" : ""}`}
                  onClick={() => setSelectedSlot(m)}
                >
                  {minutesToLabel(m)}
                </button>
              ))}
            </div>
          )}
          <div className="nav-row">
            <button className="btn-ghost" onClick={() => setStep(2)}>
              <ArrowLeft size={16} /> Voltar
            </button>
            <button className="btn-primary" disabled={selectedSlot === null} onClick={() => setStep(4)}>
              Continuar <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="card">
          <p className="step-label">Passo 4 de 5 · Seus dados</p>
          <label className="field-label">Nome completo</label>
          <input
            className="field-input"
            placeholder="Seu nome"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
          <label className="field-label">WhatsApp</label>
          <input
            className="field-input"
            placeholder="(32) 99999-0000"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
          />
          <div className="nav-row">
            <button className="btn-ghost" onClick={() => setStep(3)}>
              <ArrowLeft size={16} /> Voltar
            </button>
            <button
              className="btn-primary"
              disabled={!clientName.trim() || !clientPhone.trim()}
              onClick={() => setStep(5)}
            >
              Continuar <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="card">
          <p className="step-label">Passo 5 de 5 · Confirme seu agendamento</p>
          <div className="summary-line">
            <span>Serviços</span>
            <span style={{ textAlign: "right" }}>{selectedServices.map((s) => s.name).join(", ")}</span>
          </div>
          <div className="summary-line">
            <span>Data</span>
            <span>{formatDatePretty(selectedDate)}</span>
          </div>
          <div className="summary-line">
            <span>Horário</span>
            <span>
              {minutesToLabel(selectedSlot)} — {minutesToLabel(selectedSlot + totalDuration)}
            </span>
          </div>
          <div className="summary-line">
            <span>Cliente</span>
            <span>{clientName}</span>
          </div>
          <div className="summary-line">
            <span>WhatsApp</span>
            <span>{clientPhone}</span>
          </div>
          <div className="summary-line" style={{ fontWeight: 700 }}>
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="nav-row">
            <button className="btn-ghost" onClick={() => setStep(4)}>
              <ArrowLeft size={16} /> Voltar
            </button>
            <button className="btn-primary" onClick={handleConfirm}>
              Confirmar agendamento <Check size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 6 && confirmed && (
        <div className="card" style={{ textAlign: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "var(--blush)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "4px auto 16px",
            }}
          >
            <Check size={26} color={COLORS.wine} />
          </div>
          <p style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, margin: "0 0 6px" }}>
            Agendamento confirmado!
          </p>
          <p style={{ fontSize: 14, color: "var(--softText)", marginBottom: 20 }}>
            {formatDatePretty(confirmed.date)} às {minutesToLabel(confirmed.startMinutes)}. Combinamos tudo pelo
            WhatsApp {confirmed.clientPhone}.
          </p>
          <button className="btn-ghost" onClick={resetAll}>
            Fazer novo agendamento
          </button>
        </div>
      )}
    </div>
  );
}
