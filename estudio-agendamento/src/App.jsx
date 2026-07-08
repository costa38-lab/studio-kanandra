import { useState, useEffect, useCallback } from "react";
import { COLORS } from "./constants/colors";
import { DEFAULT_SERVICES, DEFAULT_HOURS, ADMIN_PASSCODE } from "./constants/defaults";
import { safeGet, safeSet } from "./utils/storage";
import Header from "./components/Header";
import ClientBooking from "./components/client/ClientBooking";
import AdminArea from "./components/admin/AdminArea";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState("cliente");
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [hours, setHours] = useState(DEFAULT_HOURS);
  const [blockedDates, setBlockedDates] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [adminAuthed, setAdminAuthed] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [passError, setPassError] = useState(false);

  useEffect(() => {
    (async () => {
      const [svc, hrs, blocked, appts] = await Promise.all([
        safeGet("services", DEFAULT_SERVICES),
        safeGet("business-hours", DEFAULT_HOURS),
        safeGet("blocked-dates", []),
        safeGet("appointments", []),
      ]);
      setServices(svc);
      setHours(hrs);
      setBlockedDates(blocked);
      setAppointments(appts);
      setLoaded(true);
    })();
  }, []);

  const persistAppointments = useCallback(async (next) => {
    setAppointments(next);
    await safeSet("appointments", next);
  }, []);
  const persistServices = useCallback(async (next) => {
    setServices(next);
    await safeSet("services", next);
  }, []);
  const persistHours = useCallback(async (next) => {
    setHours(next);
    await safeSet("business-hours", next);
  }, []);
  const persistBlocked = useCallback(async (next) => {
    setBlockedDates(next);
    await safeSet("blocked-dates", next);
  }, []);

  if (!loaded) {
    return (
      <div style={{ padding: "3rem", textAlign: "center", color: COLORS.softText, fontFamily: "sans-serif" }}>
        Carregando estúdio...
      </div>
    );
  }

  return (
    <div
      className="app-root"
      style={{
        "--wine": COLORS.wine,
        "--wineDark": COLORS.wineDark,
        "--blush": COLORS.blush,
        "--cream": COLORS.cream,
        "--gold": COLORS.gold,
        "--charcoal": COLORS.charcoal,
        "--softText": COLORS.softText,
        "--line": COLORS.line,
      }}
    >
      <Header tab={tab} setTab={setTab} />
      <div className="studio-container">
        {tab === "cliente" ? (
          <ClientBooking
            services={services}
            hours={hours}
            blockedDates={blockedDates}
            appointments={appointments}
            onBook={(appt) => persistAppointments([...appointments, appt])}
          />
        ) : (
          <AdminArea
            authed={adminAuthed}
            passInput={passInput}
            setPassInput={setPassInput}
            passError={passError}
            onTryAuth={() => {
              if (passInput === ADMIN_PASSCODE) {
                setAdminAuthed(true);
                setPassError(false);
              } else {
                setPassError(true);
              }
            }}
            services={services}
            hours={hours}
            blockedDates={blockedDates}
            appointments={appointments}
            onServicesChange={persistServices}
            onHoursChange={persistHours}
            onBlockedChange={persistBlocked}
            onAppointmentsChange={persistAppointments}
          />
        )}
      </div>
    </div>
  );
}
