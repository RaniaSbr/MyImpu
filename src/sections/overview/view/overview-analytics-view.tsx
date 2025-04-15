import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import useChartData from 'src/routes/hooks/useChartData';

import { DashboardContent } from 'src/layouts/dashboard';
// Tri des imports selon ESLint perfectionist
import { _timeline, _timeline2, _timeline3 } from 'src/_mock';

// Tri alphabétique des imports de composants
import { AnalyticsAreaIncome } from '../analytics-conversion-area';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';

// Interface pour définir la structure des données
interface ChartItem {
  label: string;
  value: number;
}

export function OverviewAnalyticsView() {
  const { charges, coefficients, differences, production } = useChartData();

  // Fonction utilitaire pour convertir un mois français en numéro de mois (0-11)
  const getMonthNumber = (frenchMonth: string): number => {
    const months: Record<string, number> = {
      'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5,
      'juillet': 6, 'août': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
    };
    return months[frenchMonth.toLowerCase()] || 0;
  };

  // Fonction utilitaire pour convertir un numéro de mois en nom français capitalisé
  const getMonthName = (monthNumber: number): string => {
    const months = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    const monthName = months[monthNumber] || months[0];
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  };

  // Fonction pour déterminer dynamiquement le dernier mois disponible
  const getLastAvailableMonth = (): string => {
    // Combinons toutes les données disponibles pour trouver le mois le plus récent
    const allDateLabels: string[] = [];
    
    // Collecter toutes les étiquettes de date de toutes les sources de données
    if (coefficients && coefficients.length > 0) {
      allDateLabels.push(...coefficients.map(item => item.label));
    }
    
    if (differences && differences.length > 0) {
      allDateLabels.push(...differences.map(item => item.label));
    }
    
    if (production && production.labels && production.labels.length > 0) {
      allDateLabels.push(...production.labels);
    }
    
    // Si aucune donnée n'est disponible, utiliser le mois précédent comme fallback
    if (allDateLabels.length === 0) {
      const now = new Date();
      now.setMonth(now.getMonth() - 1);
      return `${getMonthName(now.getMonth())} ${now.getFullYear()}`;
    }
    
    // Convertir les étiquettes en objets Date pour pouvoir les comparer
    const dateObjects: { original: string; date: Date }[] = allDateLabels.map(label => {
      let date = new Date();
      
      // Gestion de différents formats possibles
      // Format: "Mois AAAA" (ex: "Juin 2025")
      if (label.includes(' ') && !label.includes('/')) {
        const parts = label.split(' ');
        if (parts.length === 2) {
          const monthName = parts[0].toLowerCase();
          const year = parseInt(parts[1], 10);
          if (!isNaN(year)) {
            date = new Date(year, getMonthNumber(monthName));
          }
        }
      }
      // Format: "MM/AAAA" (ex: "06/2025")
      else if (label.includes('/')) {
        const parts = label.split('/');
        if (parts.length === 2) {
          const month = parseInt(parts[0], 10) - 1; // Ajustement car les mois en JS vont de 0-11
          const year = parseInt(parts[1], 10);
          if (!isNaN(month) && !isNaN(year)) {
            date = new Date(year, month);
          }
        }
      }
      
      return { original: label, date };
    });
    
    // Trier les dates par ordre décroissant
    dateObjects.sort((a, b) => b.date.getTime() - a.date.getTime());
    
    // Si nous avons au moins une date valide, utiliser la plus récente
    if (dateObjects.length > 0) {
      const mostRecentDate = dateObjects[0].date;
      return `${getMonthName(mostRecentDate.getMonth())} ${mostRecentDate.getFullYear()}`;
    }
    
    // Si tout échoue, revenir au mois actuel - 1
    const fallback = new Date();
    fallback.setMonth(fallback.getMonth() - 1);
    return `${getMonthName(fallback.getMonth())} ${fallback.getFullYear()}`;
  };

  const lastMonthWithYear = getLastAvailableMonth();

  if (!charges || !coefficients || !differences || !production) {
    return (
      <DashboardContent maxWidth="xl">
        <Typography variant="h5" sx={{ textAlign: 'center', py: 10 }}>
          Chargement des données...
        </Typography>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent maxWidth="xl">
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        Tableau De Bord 📊
      </Typography>

      {/* Section des timelines */}
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        flexWrap: 'wrap',
        marginBottom: '32px'
      }}>
        <div style={{ flex: '1 1 30%' }}>
          <AnalyticsOrderTimeline 
            title={`Données du mois de ${lastMonthWithYear}`} 
            list={_timeline} 
            sx={{ height: '100%', boxShadow: 2, borderRadius: 2 }}
          />
        </div>

        <div style={{ flex: '1 1 30%' }}>
          <AnalyticsOrderTimeline 
            title={`Charges imputées du mois de ${lastMonthWithYear}`} 
            list={_timeline2} 
            sx={{ height: '100%', boxShadow: 2, borderRadius: 2 }}
          />
        </div>

        <div style={{ flex: '1 1 30%' }}>
          <AnalyticsOrderTimeline 
            title={`Coûts de production du mois de ${lastMonthWithYear}`} 
            list={_timeline3} 
            sx={{ height: '100%', boxShadow: 2, borderRadius: 2 }}
          />
        </div>
      </div>

      <Grid container spacing={4} sx={{ px: { xs: 0, md: 2 } }}>
        <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 5' } }}>
          <AnalyticsCurrentVisits
            title="Charges de ce mois"
            chart={{
              series: charges.series,
            }}
            sx={{ 
              height: 420,
              boxShadow: 2,
              borderRadius: 2,
              '& .apexcharts-canvas': { 
                margin: '0 auto',
                maxWidth: '100%'
              } 
            }}
          />
        </Grid>

        <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 12', lg:'12' } }}>
        {/* Coefficient d'imputation (ligne) */}
          <AnalyticsWebsiteVisits
            title="Coefficient d'imputation rationnelle"
            subheader="Données des 8 derniers mois"
            chart={{
              categories: coefficients.map((item) => item.label),
              series: [
                {
                  name: 'CIR',
                  data: coefficients.map((item) => item.value),
                },
              ],
            }}
            sx={{ 
              height: 420,
              boxShadow: 2,
              borderRadius: 2
            }}
          />
        </Grid>

        {/* Deuxième rangée: graphiques pleine largeur */}
        <Grid sx={{ gridColumn: 'span 12' }}>
          {/* Différence d'imputation (barres) */}
          <AnalyticsConversionRates
            title="Différences d'imputation des charges fixes"
            subheader="Données des 8 derniers mois"
            chart={{
              categories: differences.map((item) => item.label),
              series: [
                {
                  name: 'DICF',
                  data: differences.map((item) => item.value),
                },
              ],
            }}
            sx={{ 
              height: 450,
              boxShadow: 2,
              borderRadius: 2
            }}
          />
        </Grid>

        <Grid sx={{ gridColumn: 'span 12' }}>
          {/* Production réelle vs normale (aire) */}
          <AnalyticsAreaIncome
            title="Production réelle vs Production normale"
            subheader="Comparaison des 8 derniers mois"
            chart={{
              categories: production.labels,
              series: production.series,
            }}
            sx={{ 
              height: 450,
              boxShadow: 2,
              borderRadius: 2
            }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}