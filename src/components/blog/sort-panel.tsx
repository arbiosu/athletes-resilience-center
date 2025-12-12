'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

const sortOptions = [
  { label: 'newest', value: 'desc' },
  { label: 'oldest', value: 'asc' },
];

export default function SortPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    params.set('page', '0');

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const currentSort = searchParams.get('sort') || 'desc';

  return (
    <div data-pending={isPending ? '' : undefined} className='mb-4'>
      <label className='hidden'>sort by:</label>
      <select
        className='w-full truncate rounded px-4 text-lg tracking-[-0.04em] text-gray-400'
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
      >
        <option value=''>-- Select --</option>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
