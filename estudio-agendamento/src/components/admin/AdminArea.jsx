import { Lock } from "lucide-react";
import { COLORS } from "../../constants/colors";
import AdminPanel from "./AdminPanel";

export default function AdminArea(props) {
  const { authed, passInput, setPassInput, passError, onTryAuth } = props;

  if (!authed) {
    return (
      <div className="card" style={{ marginTop: 30, textAlign: "center" }}>
        <Lock size={22} color={COLORS.wine} style={{ marginBottom: 10 }} />
        <p style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, margin: "0 0 4px" }}>
          Área do estúdio
        </p>
        <p style={{ fontSize: 13, color: "var(--softText)", marginBottom: 16 }}>
          Digite a senha de acesso para gerenciar agendamentos
        </p>
        <input
          className="field-input"
          type="password"
          placeholder="Senha"
          value={passInput}
          onChange={(e) => setPassInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onTryAuth()}
        />
        {passError && <p style={{ color: "#B23A3A", fontSize: 13, marginTop: -10, marginBottom: 12 }}>Senha incorreta.</p>}
        <button className="btn-primary" onClick={onTryAuth}>
          Entrar
        </button>
      </div>
    );
  }
  return <AdminPanel {...props} />;
}
