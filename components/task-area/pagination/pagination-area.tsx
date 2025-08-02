// import { Button } from '@/components/ui/button';

export const PaginationArea = () => {
  return (
    <div className='relative w-full overflow-hidden flex items-center justify-between mt-2'>
      <span className='text-slate-600 text-sm'>0 of 36 row(s) selected.</span>

      <div className='flex items-center gap-14'>
        {/* PAG SELECTION */}

        <div className='flex gap-6 items-center'>
          <span className='text-sm font-medium'>Page 1 of 4 </span>

          <div></div>
        </div>
      </div>
    </div>
  );
};
