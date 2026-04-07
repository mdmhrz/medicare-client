import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';


interface PieChartData {
    status: string;
    count: number
}


interface AppointmentPieChartProps {
    data: PieChartData[];
    title?: string;
    description?: string;
}

const CHART_COLORS = [
    "oklch(0.646 0.222 41.116)",  //chart-1- orange
    "oklch(0.6 0.118 184.704)",  // chart-2 teal
    "oklch(0.398 0.07 227.392)",  // chart-3 blue
    "oklch(0.828 0.189 84.429)",  // chart-4 lime
    "oklch(0.769 0.188 70.08)"   // chart-5 orange    
]


const AppointmentPieChart = ({ data, title, description }: AppointmentPieChartProps) => {

    if (!data || !Array.isArray(data)) {
        return (
            <Card className='col-span-2'>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    {description && (
                        <CardDescription>{description}</CardDescription>
                    )}
                </CardHeader>
                <CardContent>
                    <div className='flex items-center justify-center h-full'>
                        <p className='text-muted-foreground'>Invalid data provided for the chart</p>
                    </div>
                </CardContent>
            </Card>
        )
    }


    const formattedData = data.map((item, index) => ({
        name: item.status
            .replace(/_/g, ' ') // replace underscore with space
            .toLowerCase()
            .replace(/\b\w/g, l => l.toUpperCase()), // capitalize first letter of each word    
        value: Number(item.count),
        color: CHART_COLORS[index % CHART_COLORS.length]
    }))

    if (!formattedData.length || formattedData.every((item) => item.value === 0)) {
        return (
            <Card className='col-span-2'>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    {description && (
                        <CardDescription>{description}</CardDescription>
                    )}
                </CardHeader>
                <CardContent>
                    <div className='flex items-center justify-center h-full'>
                        <p className='text-muted-foreground'>No appointment data available to display for this period</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className='col-span-2'>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && (
                    <CardDescription>{description}</CardDescription>
                )}
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={formattedData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            cornerRadius={8}
                            stroke="none"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                        >
                            {
                                formattedData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                                    />
                                ))
                            }

                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

export default AppointmentPieChart