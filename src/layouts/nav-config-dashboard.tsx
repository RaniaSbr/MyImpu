import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Tableau De Bord',
    path: '/',
icon: <img src="/assets/icons/navbar/statisctics.png" alt="dashboard" width={24} height={24} />,
  },
  {
    title: 'Calculateur ',
    path: '/new-user',
    icon: <img src="/assets/icons/navbar/calculator.png" alt="calculator" width={24} height={24} />,
  },
   {
    title: 'Mes informations',
    path: '/user',
    icon: <img src="/assets/icons/navbar/checklist.png" alt="checklist" width={24} height={24} />,
  },
  
  {
    title: 'Documentation',
    path: '/products',
    icon: icon('ic-cart'),
   
    
  }
  // {
  //   title: 'Documentation',
  //   path: '/docs',
  //   icon: icon('ic-blog'),
  // },
 
];
