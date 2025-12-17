import { useNavigate } from "react-router-dom";

const DashboardTabs = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <button
          onClick={() => navigate("/dashboard")}
          className="apple-card p-6 hover:scale-[1.02] transition"
        >
          <h3 className="text-lg font-semibold">Distribuzione</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Analisi per provincia, età e amministrazione
          </p>
        </button>

        <button
          onClick={() => navigate("/dashboard?dataset=accessi")}
          className="apple-card p-6 hover:scale-[1.02] transition"
        >
          <h3 className="text-lg font-semibold">Accessi</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Accessi ai servizi nel tempo
          </p>
        </button>

        <button
          onClick={() => navigate("/dashboard?dataset=attivazioni")}
          className="apple-card p-6 hover:scale-[1.02] transition"
        >
          <h3 className="text-lg font-semibold">Attivazioni</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Nuove attivazioni mensili
          </p>
        </button>

        <button
          onClick={() => navigate("/dashboard?dataset=spesa")}
          className="apple-card p-6 hover:scale-[1.02] transition"
        >
          <h3 className="text-lg font-semibold">Spesa</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Analisi della spesa aggregata
          </p>
        </button>

      </div>
    </section>
  );
};

export default DashboardTabs;
