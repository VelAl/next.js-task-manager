'use client';

import { useState } from 'react';
import { BiTransferAlt } from 'react-icons/bi';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Table } from '@tanstack/react-table';

import { T_Task } from '@/app-types';
import { Badge } from '@/components/ui/badge'; // используем для бейджей
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { columnsIdsToTitles } from '../task-area/columns';

// Sortable item component
const SortableItem = ({ id }: { id: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Badge
      ref={setNodeRef}
      variant={'sky'}
      {...attributes}
      {...listeners}
      className='cursor-grab select-none mx-1'
      style={style}
    >
      {columnsIdsToTitles[id] || id}
    </Badge>
  );
};

export const ReorderColumnsDropdown = ({ table }: { table: Table<T_Task> }) => {
  const columnOrder = table.getState().columnOrder;
  const initialColumnsOrder = table.getAllColumns().map((col) => col.id);

  const [items, setItems] = useState(
    columnOrder.length ? columnOrder : initialColumnsOrder
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(String(active.id));
      const newIndex = items.indexOf(String(over?.id));

      const newOrder = arrayMove(items, oldIndex, newIndex);
      setItems(newOrder);
      table.setColumnOrder(newOrder);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='h-11 px-8 popppins' variant='default'>
          <BiTransferAlt className='mr-2' />
          <span>Order</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-auto min-w-[300px] p-3'>
        <DropdownMenuLabel>Reorder Columns</DropdownMenuLabel>
        <DropdownMenuSeparator className='mb-6' />

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext
            items={items}
            strategy={horizontalListSortingStrategy}
          >
            <div className='flex flex-wrap gap-2'>
              {items.map((columnId) => (
                <SortableItem id={columnId} key={columnId} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
