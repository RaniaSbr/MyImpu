import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useTheme, alpha as hexAlpha } from '@mui/material/styles';

import { Chart, useChart } from 'src/components/chart';

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart: {
    categories?: string[]; // les années 2004, 2005, etc.
    series: {
      name: string;       // "California" ou "US"
      data: number[];     // données de revenus annuels
    }[];
    colors?: string[];
    options?: ChartOptions;
  };
};

export function AnalyticsAreaIncome({ title, subheader, chart, sx, ...other }: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    theme.palette.primary.main,
    theme.palette.warning.main,
  ];

  const chartOptions = useChart({
    chart: { type: 'area', toolbar: { show: false } },
    colors: chartColors,
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
    xaxis: { categories: chart.categories },
    yaxis: { title: { text: 'Production' } },
    tooltip: {
      y: {
        formatter: (value: number) => `${value.toLocaleString()}`,
      },
    },
    ...chart.options,
  });

  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Chart
        type="area"
        series={chart.series}
        options={chartOptions}
        slotProps={{ loading: { p: 2.5 } }}
        sx={{ pl: 1, py: 2.5, pr: 2.5, height: 360 }}
      />
    </Card>
  );
}
