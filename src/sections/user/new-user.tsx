import { useState } from "react";

export default function NewUser() {
  const [mois, setMois] = useState("");
  const [annee, setAnnee] = useState("");
  const [quantite, setQuantite] = useState("");
  const [activiteNormale, setActiviteNormale] = useState("");
  const [chargesVariables, setChargesVariables] = useState("");
  const [chargesFixes, setChargesFixes] = useState("");
  const [afficherResultats, setAfficherResultats] = useState(false);
  const [message, setMessage] = useState("");

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

  const enregistrerCalcul = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/calculations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          production: qte,
          normalActivity: actN,
          variableCost: chVar,
          fixedCost: chFixes,
          annee: parseInt(annee),
          mois: mois
        })
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Calcul enregistré avec succès !");
      } else {
        setMessage(`❌ Erreur : ${result.message}`);
      }
    } catch (error) {
      console.error("Erreur :", error);
      setMessage("❌ Une erreur est survenue lors de l’enregistrement.");
    }
  };

  const handleAfficherResultats = () => {
    if (mois && annee && quantite && activiteNormale && chargesVariables && chargesFixes) {
      setAfficherResultats(true);
      enregistrerCalcul();
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  return (
    <div style={{
      maxWidth: "896px",
      margin: "auto",
      backgroundColor: "white",
      borderRadius: "1.5rem",
      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
      padding: "2.5rem",
      marginBottom: "2rem",
    }}>
      <h2 style={{
        fontSize: "2.25rem",
        fontWeight: "bold",
        textAlign: "center",
        color: "#1D4ED8",
        marginBottom: "2rem",
      }}>
        🧲 Calculateur d’Imputation Rationnelle
      </h2>

      {/* === Infos générales === */}
      <section>
        <h3 style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          color: "#991B1B",
          marginBottom: "1rem",
          borderBottom: "1px solid #ccc",
          paddingBottom: "0.5rem",
        }}>
          🗓️ Informations générales
        </h3>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          <div>
            <label style={{ color: "#374151", fontWeight: "500" }}>Mois :</label>
            <select
  value={mois}
  onChange={(e) => setMois(e.target.value)}
  style={inputStyle}
>
  <option value="">Sélectionner un mois</option>
  <option value="1">Janvier</option>
  <option value="2">Février</option>
  <option value="3">Mars</option>
  <option value="4">Avril</option>
  <option value="5">Mai</option>
  <option value="6">Juin</option>
  <option value="7">Juillet</option>
  <option value="8">Août</option>
  <option value="9">Septembre</option>
  <option value="10">Octobre</option>
  <option value="11">Novembre</option>
  <option value="12">Décembre</option>
</select>

          </div>
          <div>
            <label style={{ color: "#374151", fontWeight: "500" }}>Année :</label>
            <input
              type="number"
              placeholder="Ex: 2025"
              value={annee}
              onChange={(e) => setAnnee(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>
      </section>

      {/* === Données production === */}
      <section>
        <h3 style={sectionTitle}>⚙️ Données de production</h3>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          <div>
            <label style={labelStyle}>Quantité réelle produite :</label>
            <input
              type="number"
              placeholder="Ex: 1500 unités"
              value={quantite}
              onChange={(e) => setQuantite(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Activité normale :</label>
            <input
              type="number"
              placeholder="Ex: 2000 unités"
              value={activiteNormale}
              onChange={(e) => setActiviteNormale(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>
      </section>

      {/* === Données financières === */}
      <section>
        <h3 style={sectionTitle}>💰 Données financières</h3>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          <div>
            <label style={labelStyle}>Charges variables réelles :</label>
            <input
              type="number"
              placeholder="Ex: 50000 DA"
              value={chargesVariables}
              onChange={(e) => setChargesVariables(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Charges fixes réelles :</label>
            <input
              type="number"
              placeholder="Ex: 120000 DA"
              value={chargesFixes}
              onChange={(e) => setChargesFixes(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>
      </section>

      {/* === Bouton === */}
      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <button onClick={handleAfficherResultats} style={buttonStyle}>
          Afficher les résultats
        </button>
      </div>

      {/* === Résultats === */}
      {afficherResultats && (
        <section style={{
          backgroundColor: "#EFF6FF",
          border: "1px solid #BFDBFE",
          borderRadius: "1rem",
          padding: "1.5rem",
          marginTop: "2rem",
        }}>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#1D4ED8",
            marginBottom: "1rem",
          }}>
            📊 Résultats pour {mois} {annee}
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

          {message && (
            <p style={{ marginTop: "1rem", color: "green", fontWeight: "bold" }}>
              {message}
            </p>
          )}
        </section>
      )}
    </div>
  );
}

// 🎨 Styles partagés
const inputStyle = {
  marginTop: "0.25rem",
  width: "100%",
  padding: "0.75rem",
  border: "1px solid #D1D5DB",
  borderRadius: "1rem",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
};

const labelStyle = {
  color: "#374151",
  fontWeight: "500"
};

const sectionTitle = {
  fontSize: "1.5rem",
  fontWeight: "600",
  color: "#1F2937",
  marginBottom: "1rem",
  borderBottom: "1px solid #ccc",
  paddingBottom: "0.5rem"
};

const buttonStyle = {
  padding: "0.75rem 1.5rem",
  backgroundColor: "#1D4ED8",
  color: "white",
  fontWeight: "600",
  borderRadius: "1rem",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s"
};
