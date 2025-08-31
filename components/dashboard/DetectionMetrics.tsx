
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Mock data for detection types
const detectionTypeData = [
  { name: 'Dumping', value: 38 },
  { name: 'Suspicious Activity', value: 22 },
  { name: 'Floating Debris', value: 18 },
  { name: 'Other', value: 12 },
];

// Color codes for the chart
const COLORS = ['#0ea5e9', '#f97316', '#a855f7', '#64748b'];

const DetectionMetrics: React.FC = () => {
  return (
    <Card className="border-2 border-riverguard-200/50">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Detection Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={detectionTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {detectionTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} incidents`, 'Count']}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  border: '1px solid #eee'
                }}
              />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetectionMetrics;
