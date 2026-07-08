import { useState } from "react";
import { Calendar, Scissors, Clock, CalendarX2 } from "lucide-react";
import AgendaTab from "./AgendaTab";
import ServicosTab from "./ServicosTab";
import HorariosTab from "./HorariosTab";
import BloqueiosTab from "./BloqueiosTab";

export default function AdminPanel({
  services,
  hours,
  blockedDates,
  appointments,
  onServicesChange,
  onHoursChange,
  onBlockedChange,
  onAppointmentsChange,
}) {
  const [subTab, setSubTab] = useState("agenda");

  return (
    <div style={{ marginTop: 20 }}>
      <div className="admin-tabs">
        <button className={`admin-tab ${subTab === "agenda" ? "active" : ""}`} onClick={() => setSubTab("agenda")}>
          <Calendar size={14} style={{ verticalAlign: -2, marginRight: 5 }} />
          Agendamentos
        </button>
        <button className={`admin-tab ${subTab === "servicos" ? "active" : ""}`} onClick={() => setSubTab("servicos")}>
          <Scissors size={14} style={{ verticalAlign: -2, marginRight: 5 }} />
          Serviços
        </button>
        <button className={`admin-tab ${subTab === "horarios" ? "active" : ""}`} onClick={() => setSubTab("horarios")}>
          <Clock size={14} style={{ verticalAlign: -2, marginRight: 5 }} />
          Horários
        </button>
        <button className={`admin-tab ${subTab === "bloqueios" ? "active" : ""}`} onClick={() => setSubTab("bloqueios")}>
          <CalendarX2 size={14} style={{ verticalAlign: -2, marginRight: 5 }} />
          Dias bloqueados
        </button>
      </div>

      {subTab === "agenda" && (
        <AgendaTab appointments={appointments} onAppointmentsChange={onAppointmentsChange} />
      )}
      {subTab === "servicos" && <ServicosTab services={services} onServicesChange={onServicesChange} />}
      {subTab === "horarios" && <HorariosTab hours={hours} onHoursChange={onHoursChange} />}
      {subTab === "bloqueios" && (
        <BloqueiosTab blockedDates={blockedDates} onBlockedChange={onBlockedChange} />
      )}
    </div>
  );
}
