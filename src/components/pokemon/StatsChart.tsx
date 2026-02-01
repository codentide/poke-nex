'use client'

import { PokeStat } from '@/types'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props {
  stats: PokeStat[]
  hue: string
}

export const hueToHex: Record<string, string> = {
  red: '#dc2626',
  blue: '#2563eb',
  green: '#16a34a',
  yellow: '#ca8a04',
  cyan: '#0891b2',
  orange: '#ea580c',
  purple: '#9333ea',
  amber: '#d97706',
  indigo: '#4f46e5',
  pink: '#db2777',
  lime: '#65a30d',
  stone: '#57534e',
  violet: '#7c3aed',
  slate: '#475569',
  rose: '#e11d48',
  zinc: '#52525b',
  white: '#ffffff',
}

export const StatsChart = ({ stats, hue }: Props) => {
  const series: ApexNonAxisChartSeries = [
    {
      name: 'Estadísticas Base', // El nombre de la leyenda
      data: stats.map((stat) => stat.value), // Los números puros
    },
  ]

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'radar',
      fontFamily: 'Rajdhani',
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 16,
        color: `var(--color-${hue}-600)`,
        opacity: 1,
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      labels: {
        offsetY: 5,
        show: true,
        style: {
          fontSize: '16px',
          fontFamily: 'Rajdhani',
          fontWeight: 400,
        },
      },
      categories: stats.map((stat) => `${stat.name}`),
    },
    yaxis: {
      show: false,
      min: -64,
      max: 275,
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: `var(--color-zinc-900)`,
          connectorColors: `var(--color-zinc-800)`,
          fill: {
            colors: [
              'color-mix(in oklab, var(--color-zinc-900) 20%, transparent)',
            ],
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      background: {
        enabled: true,
        borderRadius: 4,
        borderWidth: 0,
        backgroundColor: `${hueToHex[hue]}`,
        padding: 6,
        opacity: 0.9,
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Rajdhani',
        fontWeight: 600,
        colors: ['#fff'],
      },
      offsetY: 0,
    },
    stroke: {
      width: 0.8,
      colors: [`color-mix(in oklab, var(--color-${hue}-400) 80%, transparent)`],
      dashArray: 3,
    },
    fill: {
      colors: [`color-mix(in oklab, var(--color-${hue}-600) 12%, transparent)`],
    },
    markers: {
      size: 0,
    },
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <h3 className="text-4xl font-rajdhani font-semibold uppercase text-center text-white/60">
        Base Stats
      </h3>
      <Chart type="radar" series={series} options={options} height={520} />
    </div>
  )
}
