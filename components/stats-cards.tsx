import { FaTasks, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

type T_SingleCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

const stats: T_SingleCardProps[] = [
  {
    title: 'Total Tasks',
    value: 120,
    icon: <FaTasks className='text-blue-500' />,
  },
  {
    title: 'Completed Tasks',
    value: 80,
    icon: <FaCheckCircle className='text-green-500' />,
  },
  {
    title: 'Pending Tasks',
    value: 40,
    icon: <FaExclamationTriangle className='text-yellow-500' />,
  },
];

export const StatCards = () => {
  return (
    <div className='grid grid-cols-3 max-sm:grid-cols-1 mt-7 gap-4 p-4'>
      {stats.map((stat, index) => (
        <SingleCard key={index} {...stat} />
      ))}
    </div>
  );
};

const SingleCard = ({ title, value, icon }: T_SingleCardProps) => (
  <Card className='pt-4 flex flex-col gap-2 shadow-none'>
    <CardHeader className='flex justify-between'>
      <CardTitle>{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent className='text-2xl font-bold'>{value}</CardContent>
  </Card>
);
