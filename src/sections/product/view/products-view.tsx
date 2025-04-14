import { AccessAlarm, Memory, Euro, TrendingUp } from '@mui/icons-material'; // Exemples d'icônes pour illustration
import { Box, Typography, Card, CardContent, Divider, Paper } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard'; // Assurez-vous que ce chemin est correct

// Définition des sections
const sections = [
  {
    id: 'q',
    title: 'Quantités réelles produites (Q)',
    description: "Nombre d'unités effectivement produites durant une période.",
    icon: <AccessAlarm sx={{ color: '#00AB55' }} /> // Icône pour la section
  },
  {
    id: 'an',
    title: 'Activité normale (AN)',
    description: 'Capacité de production théorique ou moyenne sur une période donnée.',
    icon: <Memory sx={{ color: '#00AB55' }} />
  },
  {
    id: 'cv',
    title: 'Charges variables (CV)',
    description: 'Charges proportionnelles au volume de production. Plus on produit, plus elles augmentent.',
    icon: <Euro sx={{ color: '#00AB55' }} />
  },
  {
    id: 'cf',
    title: 'Charges fixes (CF)',
    description: 'Charges qui restent constantes quel que soit le volume produit (ex : loyers, salaires fixes).',
    icon: <TrendingUp sx={{ color: '#00AB55' }} />
  },
  {
    id: 'cir',
    title: "Coefficient d'imputation rationnelle (CIR)",
    description: 'Formule : CIR = Q / AN. Permet de répartir les charges fixes selon le niveau d’activité réel.',
    icon: <AccessAlarm sx={{ color: '#00AB55' }} />
  },
  {
    id: 'cfImputees',
    title: 'Charges fixes imputées',
    description: 'Formule : CF imputées = CF réelles × CIR. Part des charges fixes réellement affectée à la production.',
    icon: <Memory sx={{ color: '#00AB55' }} />
  },
  {
    id: 'diffImputation',
    title: 'Différences d’imputation',
    description: 'Formule : Différence = CF réelles - CF imputées. Écart entre charges prévues et réellement affectées.',
    icon: <Euro sx={{ color: '#00AB55' }} />
  },
  {
    id: 'maliBoni',
    title: 'Mali / Boni',
    description: 'Mali si CF réelles > imputées (sous-activité), Boni si l’inverse (sur-activité).',
    icon: <TrendingUp sx={{ color: '#00AB55' }} />
  },
  {
    id: 'cpt',
    title: 'Coût de production total (CPT)',
    description: 'Formule : CPT = CV + CF imputées. Coût global de la production.',
    icon: <AccessAlarm sx={{ color: '#00AB55' }} />
  },
  {
    id: 'cpu',
    title: 'Coût de production unitaire (CPU)',
    description: 'Formule : CPU = CPT / Q. Coût moyen par unité produite.',
    icon: <Memory sx={{ color: '#00AB55' }} />
  },
  {
    id: 'cvu',
    title: 'Coût variable unitaire (CVU)',
    description: 'Formule : CVU = CV / Q. Part du coût variable dans chaque unité.',
    icon: <Euro sx={{ color: '#00AB55' }} />
  },
  {
    id: 'cfu',
    title: 'Coût fixe unitaire (CFU)',
    description: 'Formule : CFU = CF imputées / Q. Part des charges fixes par unité produite.',
    icon: <TrendingUp sx={{ color: '#00AB55' }} />
  },
  {
    id: 'exemple',
    title: 'Exemple illustratif',
    description: `Supposons :
    - Quantités produites (Q) = 800 unités
    - Activité normale (AN) = 1000 unités
    - Charges variables (CV) = 4000 DA
    - Charges fixes (CF) = 5000 DA

    → CIR = 800 / 1000 = 0.8  
    → CF imputées = 5000 × 0.8 = 4000 DA  
    → Différence = 5000 - 4000 = 1000 DA (mali)  
    → CPT = 4000 + 4000 = 8000 DA  
    → CPU = 8000 / 800 = 10 DA/unité  
    → CVU = 4000 / 800 = 5 DA  
    → CFU = 4000 / 800 = 5 DA`,
    icon: <TrendingUp sx={{ color: '#00AB55' }} />
  },
];

export function ProductsView() {
  return (
    <DashboardContent maxWidth="lg">
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: '#1E293B',
          }}
        >
          <Box component="span" fontSize="2rem" color="#00AB55">
            •
          </Box>{' '}
          Imputation rationnelle des charges fixes
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Cette documentation explique les concepts, formules et un exemple pour comprendre l`imputation rationnelle.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {sections.map((section) => (
          <Card
            key={section.id}
            variant="outlined"
            sx={{
              borderRadius: 4,
              background: '#F9FAFB', // Arrière-plan légèrement gris pour moderniser
              boxShadow: '0 6px 16px rgba(0,0,0,0.1)', // Ombre subtile
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              p: 3,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.03)', // Effet de zoom au survol
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)', // Ombre plus grande au survol
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {section.icon}
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 1, color: '#2D3748' }}
                >
                  {section.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ whiteSpace: 'pre-line', color: '#4A5568' }}
                >
                  {section.description}
                </Typography>
              </Box>
            </Box>
            {section.id !== 'exemple' && <Divider sx={{ my: 2 }} />} {/* Diviseur pour séparer les sections */}
          </Card>
        ))}
      </Box>
    </DashboardContent>
  );
}
