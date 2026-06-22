export default function Loading() {
  return (
    <div className="flex mt-10 flex-col items-center justify-center gap-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold animate-pulse">Finding Waldo 👀</h1>
        <p className="mt-2 animate-pulse text-gray-500">
          Loading...
        </p>
      </div>
    </div>
  );
}