import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useTheme, alpha as hexAlpha } from '@mui/material/styles';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    categories?: string[];
    series: {
      name: string;
      data: number[];
    }[];
    options?: ChartOptions;
  };
};

export function AnalyticsWebsiteVisits({ title, subheader, chart, sx, ...other }: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    hexAlpha(theme.palette.primary.dark, 0.8),
    hexAlpha(theme.palette.warning.main, 0.8),
  ];

 const chartOptions = useChart({
  colors: chartColors, // tu peux le garder si tu veux pour les légendes
  stroke: { width: 2, colors: ['transparent'] },
  xaxis: { categories: chart.categories },
  legend: { show: true },
 tooltip: {
  y: {
    formatter: (value: number) => {
      if (value < 1) return `${value} mali`;
      if (value > 1) return `${value} boni`;
      return `${value}`;
    },
  },
},

  plotOptions: {
    bar: {
      colors: {
        ranges: [
          { from: 0, to: 0.99, color: '#FF0000' }, // Rouge
          { from: 0.99, to: 1.01, color: '#FFA500' }, // Orange
          { from: 1.01, to: 1000, color: '#00C853' }, // Vert
        ],
      },
    },
  },
  ...chart.options,
});


  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Chart
        type="bar"
        series={chart.series}
        options={chartOptions}
        slotProps={{ loading: { p: 2.5 } }}
        sx={{
          pl: 1,
          py: 2.5,
          pr: 2.5,
          height: 364,
        }}
      />
    </Card>
  );
}
