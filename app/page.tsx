import { NavBar } from '@/components/nav-bar';
import { StatCards } from '@/components/stats-cards';

export default function Home() {
  return (
    <div className='poppins bg-secondary h-100vh min-h-screen'>
      <NavBar />

      <StatCards />
    </div>
  );
}
