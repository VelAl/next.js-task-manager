'use client';

import { FaCheckCircle, FaExclamationTriangle, FaTasks } from 'react-icons/fa';

import { T_TasksCounts, useTasksCounts } from '@/hooks/useTasksCounts ';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type T_StatOption = {
  title: string;
  key: keyof Pick<
    T_TasksCounts,
    'totalTasksCount' | 'completedTasksCount' | 'pendingTasksCount'
  >;
  icon: React.ReactNode;
};

const stats: T_StatOption[] = [
  {
    title: 'Total Tasks',
    key: 'totalTasksCount',
    icon: <FaTasks className='text-blue-500' />,
  },
  {
    title: 'Completed Tasks',
    key: 'completedTasksCount',
    icon: <FaCheckCircle className='text-green-500' />,
  },
  {
    title: 'Pending Tasks',
    key: 'pendingTasksCount',
    icon: <FaExclamationTriangle className='text-yellow-500' />,
  },
];

export const StatCards = () => {
  const counts = useTasksCounts();
  return (
    <div className='grid grid-cols-3 max-sm:grid-cols-1 mt-7 gap-4 p-4'>
      {stats.map((stat, index) => (
        <StatCard
          icon={stat.icon}
          key={index}
          title={stat.title}
          value={counts[stat.key]}
        />
      ))}
    </div>
  );
};

type T_StatCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

const StatCard = ({ title, value, icon }: T_StatCardProps) => (
  <Card className='pt-4 flex flex-col gap-2 shadow-none'>
    <CardHeader className='flex justify-between'>
      <CardTitle>{title}</CardTitle>
      {icon}
    </CardHeader>

    <CardContent className='text-2xl font-bold'>{value}</CardContent>
  </Card>
);
