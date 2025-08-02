import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const PaginationSelection = () => {
  return (
    <div className='flex items-center gap-2'>
      <span className='text-sm font-medium'>Rows per page</span>

      <Select
      // value={PaginationSelection.pageSize.toString()}
      // onValueChange={(value) => setPagination((prev) => ({ ...prev, pageSize: Number(value) }))}
      >
        <SelectTrigger className='w-[90px]'>
          <SelectValue placeholder='10' />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value='10'>10</SelectItem>
          <SelectItem value='15'>15</SelectItem>
          <SelectItem value='25'>25</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
