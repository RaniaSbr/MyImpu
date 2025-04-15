// src/routes/hooks/useChartData.ts
import { useEffect, useState } from 'react';

// Définissons des interfaces pour nos données
interface ChartItem {
  label: string;
  value: number;
}

interface ChargesData {
  mois: number;
  annee: number;
  series: { label: string; value: number }[];
}

interface ProductionData {
  labels: string[];
  series: { name: string; data: number[] }[];
}

// Interface pour l'état
interface ChartDataState {
  charges: ChargesData | null;
  coefficients: ChartItem[] | null;
  differences: ChartItem[] | null;
  production: ProductionData | null;
  isLoading: boolean;
  lastUpdate: number;
}

// Paramètre optionnel pour forcer le rechargement
export default function useChartData(forceReload = false) {
  const [data, setData] = useState<ChartDataState>({
    charges: null,
    coefficients: null,
    differences: null,
    production: null,
    isLoading: true,
    lastUpdate: 0,
  });

  // Fonction pour recharger les données
  const reloadData = async () => {
    setData(prev => ({ ...prev, isLoading: true }));
    
    try {
      console.log("Chargement des données des graphiques...");
      
      // Ajout d'un paramètre cache-buster pour éviter la mise en cache
      const timestamp = new Date().getTime();
      
      const [chargesRes, coeffRes, diffRes, prodRes] = await Promise.all([
        fetch(`http://localhost:5000/api/charts/charges?_t=${timestamp}`),
        fetch(`http://localhost:5000/api/charts/coefficients?_t=${timestamp}`),
        fetch(`http://localhost:5000/api/charts/differences?_t=${timestamp}`),
        fetch(`http://localhost:5000/api/charts/production?_t=${timestamp}`),
      ]);
      
      // Vérifiez si les réponses sont OK
      if (!chargesRes.ok || !coeffRes.ok || !diffRes.ok || !prodRes.ok) {
        console.error("Erreur API:", { 
          charges: chargesRes.status, 
          coeff: coeffRes.status,
          diff: diffRes.status,
          prod: prodRes.status
        });
        throw new Error("Une des API a retourné une erreur");
      }

      const [charges, coefficients, differences, production] = await Promise.all([
        chargesRes.json(),
        coeffRes.json(),
        diffRes.json(),
        prodRes.json(),
      ]);
      
      console.log("Données des graphiques reçues:", { charges, coefficients, differences, production });
      
      setData({ 
        charges, 
        coefficients, 
        differences, 
        production, 
        isLoading: false,
        lastUpdate: timestamp
      });
    } catch (error) {
      console.error("Erreur détaillée de chargement des graphiques:", error);
      setData(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Effet pour charger les données au montage et lorsque forceReload change
  useEffect(() => {
    reloadData();
    
    // Configurez un intervalle pour actualiser les données toutes les 5 minutes
    const intervalId = setInterval(() => {
      reloadData();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [forceReload]);

  // Fonction pour recharger manuellement les données
  const refreshData = () => reloadData();

  return {
    ...data,
    refreshData // Exposer la fonction de rechargement
  };
}