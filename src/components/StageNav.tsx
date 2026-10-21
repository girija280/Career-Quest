import { useLocation, Link } from "react-router";

const stages = [
  { path: "/intake", label: "Profile", num: 0 },
  { path: "/quiz", label: "Quiz", num: 1 },
  { path: "/branches", label: "Branch", num: 2 },
  { path: "/courses", label: "Course", num: 3 },
  { path: "/colleges", label: "College", num: 4 },
  { path: "/careers", label: "Career", num: 5 },
  { path: "/advice", label: "Report", num: 6 },
];

export default function StageNav() {
  const loc = useLocation();
  const currentIdx = stages.findIndex(s => loc.pathname.startsWith(s.path));

  return (
    <nav
      style={{
        background: "rgba(2,16,34,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(125,211,252,0.08)",
        padding: "12px 24px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "#06b6d4", fontWeight: 800, fontSize: 15, marginRight: 16, whiteSpace: "nowrap" }}>
          ⚔ Career Quest
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 4, overflowX: "auto" }}>
          {stages.map((s, i) => {
            const status = i < currentIdx ? "done" : i === currentIdx ? "active" : "pending";
            return (
              /* CHANGED THIS DIV TO A LINK */
              <Link 
                to={s.path} 
                key={s.path} 
                style={{ display: "flex", alignItems: "center", gap: 4, textDecoration: "none" }}
              >
                <div className={`stage-dot ${status}`}>
                  {status === "done" ? "✓" : s.num}
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 600, whiteSpace: "nowrap",
                  color: status === "active" ? "#06b6d4" : status === "done" ? "#22c55e" : "#475569"
                }}>
                  {s.label}
                </span>
                {i < stages.length - 1 && (
                  <div style={{ width: 20, height: 1, background: i < currentIdx ? "rgba(34,197,94,0.4)" : "rgba(71,85,105,0.3)", marginLeft: 2 }} />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}