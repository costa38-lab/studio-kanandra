import { Sparkles, Lock } from "lucide-react";

export default function Header({ tab, setTab }) {
  return (
    <div className="studio-header">
      <div className="studio-container" style={{ paddingBottom: 0 }}>
        <p className="studio-title">
          <Sparkles size={20} style={{ verticalAlign: "-3px", marginRight: 8 }} />
          Estúdio Cílios & Unhas
        </p>
        <p className="studio-sub">Agende seu horário em poucos passos</p>
        <div className="tab-row">
          <button className={`tab-btn ${tab === "cliente" ? "active" : ""}`} onClick={() => setTab("cliente")}>
            Agendar
          </button>
          <button className={`tab-btn ${tab === "admin" ? "active" : ""}`} onClick={() => setTab("admin")}>
            <Lock size={12} style={{ verticalAlign: "-1px", marginRight: 5 }} />
            Estúdio
          </button>
        </div>
      </div>
    </div>
  );
}
