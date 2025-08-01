import { NavBar } from '@/components/nav-bar';
import { StatCards } from '@/components/stats-cards';
import { TasksArea } from '@/components/task-area';

export default function Home() {
  return (
    <div className='poppins bg-secondary h-100vh min-h-screen'>
      <NavBar />

      <StatCards />

      <TasksArea />
    </div>
  );
}
