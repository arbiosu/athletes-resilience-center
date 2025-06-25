'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='font-jetbrains p-8 text-center'>
      <h2 className='text-2xl font-bold text-red-500'>Something went wrong!</h2>
      <p className='mt-2'>{error.message}</p>
      <button
        className='mt-4 rounded-md bg-blue-600 px-4 py-2 hover:bg-blue-700'
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
