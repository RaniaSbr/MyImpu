import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { _posts, _tasks, _traffic, _timeline } from 'src/_mock';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsAreaIncome } from '../analytics-conversion-area';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Tableau De Bord      </Typography>

      <Grid container spacing={3}>
        {/* <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Weekly sales"
            percent={2.6}
            total={714000}
            icon={<img alt="Weekly sales" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid> */}

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {/* <AnalyticsWidgetSummary
            title="New users"
            percent={-0.1}
            total={1352831}
            color="secondary"
            icon={<img alt="New users" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          /> */}
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {/* <AnalyticsWidgetSummary
            title="Purchase orders"
            percent={2.8}
            total={1723315}
            color="warning"
            icon={<img alt="Purchase orders" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          /> */}
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {/* <AnalyticsWidgetSummary
            title="Messages"
            percent={3.6}
            total={234}
            color="error"
            icon={<img alt="Messages" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          /> */}
        </Grid>
<div style={{ display: 'flex', alignItems: 'center', width: '100%',gap:'20px' }}>  <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="Charges de ce mois"
            chart={{
              series: [
                { label: 'Charges fixes', value: 4500 },
                { label: 'Charges Variables', value: 9900 }
              ],
            }}
          />
        </Grid>
         <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Coefficient d'imputation rationnelle "
            chart={{
              categories: ['Oct', 'Nov','Dec','Jan','Fev','Mar','Apr','May'],
              series: [
           { name: 'CIR', data: [1.25, 0.50, 1, 0.63, 1.50, 1.25, 0.87, 1.01 ]
 },],
            }}
          />
        </Grid></div>
        

       
<div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>   <Grid size={{ xs: 10, md: 10, lg: 10 }} >
          <AnalyticsConversionRates
            title="Différences d'imputation des charges fixes"
            chart={{
              categories: ['Oct', 'Nov','Dec','Jan','Fev','Mar','Apr','May'],
              series: [
                { name: 'DICF', data: [   -1125.00, 2261.25, 0.00, 1687.50, -2250.00, -1125.00, 587.25, -28.13, 2261.25]
 }
              ],
            }}
          />
        </Grid></div>
      
        
         

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          {/* <AnalyticsCurrentSubject
            title="Coûts Unitaires"
            chart={{
              categories: ['Octobre','Decembre', 'Janvier', 'Fevrier', 'Mars', 'Avril'],
              series: [
               { name: 'Production', data: [3.3,3.3, 3.3, 3.3, 3.3, 3.3, 3.3] },
               { name: 'Variable', data: [2.5,2.5, 2.5, 2.5, 2.5, 2.5, 2.5] },
               { name: 'Fixe', data: [0.8,0.8, 0.8, 0.8, 0.8, 0.8, 0.8] },
                                                


              ],
            }}
          /> */}
        </Grid>

        {/* <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsNews title="News" list={_posts.slice(0, 5)} />
        </Grid> */}
  

        {/* <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsTrafficBySite title="Traffic by site" list={_traffic} />
        </Grid> */}
{/* 
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsTasks title="Tasks" list={_tasks} />
        </Grid> */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>  
         <Grid   size={{ xs: 20, md: 6, lg: 10 }} >
              <AnalyticsAreaIncome
               title="Production réelle vs Production normale"
               subheader=""
              chart={{
              categories: ['Oct', 'Nov','Dec','Jan','Fev','Mar','Apr','May'],
              series: [
             {
                name: 'Prod Normale',
                data: [4000, 4000, 4000, 4000, 4000, 4000, 4000,4000],
              },
              {
                name: 'Prod Réelle',
                data:   [5000, 1990, 4000, 2500, 6000, 5000, 3478, 4025]

      },
    ],
  }}
/>
            </Grid>
                        </div>

            
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsOrderTimeline title="Order timeline" list={_timeline} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
