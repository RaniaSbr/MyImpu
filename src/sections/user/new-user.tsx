import { useState } from "react";

export default function NewUser() {
  const [mois, setMois] = useState("");
  const [quantite, setQuantite] = useState("");
  const [activiteNormale, setActiviteNormale] = useState("");
  const [chargesVariables, setChargesVariables] = useState("");
  const [chargesFixes, setChargesFixes] = useState("");

  const qte = parseFloat(quantite);
  const actN = parseFloat(activiteNormale);
  const chVar = parseFloat(chargesVariables);
  const chFixes = parseFloat(chargesFixes);

  const coeff = qte && actN ? qte / actN : 0;
  const chFixesImputees = coeff && chFixes ? coeff * chFixes : 0;
  const diffImputation = chFixes - chFixesImputees;
  const maliBoni = diffImputation > 0 ? "Mali" : diffImputation < 0 ? "Boni" : "Équilibre";

  const coutProdTotal = chVar + chFixesImputees;
  const coutProdUnitaire = qte ? coutProdTotal / qte : 0;
  const coutVarUnitaire = qte ? chVar / qte : 0;
  const coutFixeUnitaire = qte ? chFixesImputees / qte : 0;

  return (
    <div
      style={{
        maxWidth: "896px",
        margin: "0 auto",
        backgroundColor: "white",
        borderRadius: "1.5rem",
        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
        padding: "2.5rem",
      }}
    >
      <h2
        style={{
          fontSize: "2.25rem",
          fontWeight: "bold",
          textAlign: "center",
          color: "#1D4ED8",
          marginBottom: "2rem",
        }}
      >
        🧲 Calculateur d’Imputation Rationnelle
      </h2>

      {/* Informations générales */}
      <section>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#991B1B",
            marginBottom: "1rem",
            borderBottom: "1px solid #ccc",
            paddingBottom: "0.5rem",
          }}
        >
          🗓️ Informations générales
        </h3>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          <div>
            <label style={{ color: "#374151", fontWeight: "500" }}>Mois :</label>
            <select
              value={mois}
              onChange={(e) => setMois(e.target.value)}
              style={{
                marginTop: "0.25rem",
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #D1D5DB",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              }}
            >
              <option value="">Sélectionner un mois</option>
              <option value="Janvier">Janvier</option>
              <option value="Février">Février</option>
              <option value="Mars">Mars</option>
              <option value="Avril">Avril</option>
              <option value="Mai">Mai</option>
              <option value="Juin">Juin</option>
              <option value="Juillet">Juillet</option>
              <option value="Août">Août</option>
              <option value="Septembre">Septembre</option>
              <option value="Octobre">Octobre</option>
              <option value="Novembre">Novembre</option>
              <option value="Décembre">Décembre</option>
            </select>
          </div>
        </div>
      </section>

      {/* Données de production */}
      <section>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#1F2937",
            marginBottom: "1rem",
            borderBottom: "1px solid #ccc",
            paddingBottom: "0.5rem",
          }}
        >
          ⚙️ Données de production
        </h3>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          <div>
            <label style={{ color: "#374151", fontWeight: "500" }}>
              Quantité réelle produite :
            </label>
            <input
              type="number"
              placeholder="Ex: 1500 unités"
              value={quantite}
              onChange={(e) => setQuantite(e.target.value)}
              style={{
                marginTop: "0.25rem",
                width: "100%",
                padding: "2rem",
                border: "1px solid #D1D5DB",
                borderRadius: "1rem",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              }}
            />
          </div>
          <div>
            <label style={{ color: "#374151", fontWeight: "500" }}>
              Activité normale :
            </label>
            <input
              type="number"
              placeholder="Ex: 2000 unités"
              value={activiteNormale}
              onChange={(e) => setActiviteNormale(e.target.value)}
              style={{
                marginTop: "0.25rem",
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #FCA5A5",
                borderRadius: "1rem",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Données financières */}
      <section>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#1F2937",
            marginBottom: "1rem",
            borderBottom: "1px solid #ccc",
            paddingBottom: "0.5rem",
          }}
        >
          💰 Données financières
        </h3>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          <div>
            <label style={{ color: "#374151", fontWeight: "500" }}>
              Charges variables réelles :
            </label>
            <input
              type="number"
              placeholder="Ex: 50000 DA"
              value={chargesVariables}
              onChange={(e) => setChargesVariables(e.target.value)}
              style={{
                marginTop: "0.25rem",
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #D1D5DB",
                borderRadius: "1rem",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              }}
            />
          </div>
          <div>
            <label style={{ color: "#374151", fontWeight: "500" }}>
              Charges fixes réelles :
            </label>
            <input
              type="number"
              placeholder="Ex: 120000 DA"
              value={chargesFixes}
              onChange={(e) => setChargesFixes(e.target.value)}
              style={{
                marginTop: "0.25rem",
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #D1D5DB",
                borderRadius: "1rem",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Résultats */}
      <section
        style={{
          backgroundColor: "#EFF6FF",
          border: "1px solid #BFDBFE",
          borderRadius: "1rem",
          padding: "1.5rem",
          marginTop: "2rem",
        }}
      >
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#1D4ED8",
            marginBottom: "1rem",
          }}
        >
          📊 Résultats
        </h3>
        <div style={{ display: "grid", gap: "1rem", color: "#374151" }}>
          <p><strong>1. Coefficient d’imputation :</strong> {coeff.toFixed(2)}</p>
          <p><strong>2. Charges fixes imputées :</strong> {chFixesImputees.toFixed(2)} DA</p>
          <p><strong>3. Différence d’imputation :</strong> {diffImputation.toFixed(2)} DA</p>
          <p><strong>4. Mali / Boni :</strong> {maliBoni}</p>
          <p><strong>5. Coût total de production :</strong> {coutProdTotal.toFixed(2)} DA</p>
          <p><strong>6. Coût unitaire de production :</strong> {coutProdUnitaire.toFixed(2)} DA</p>
          <p><strong>7. Coût variable unitaire :</strong> {coutVarUnitaire.toFixed(2)} DA</p>
          <p><strong>8. Coût fixe unitaire :</strong> {coutFixeUnitaire.toFixed(2)} DA</p>
        </div>
      </section>
    </div>
  );
}
