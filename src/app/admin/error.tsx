"use client";

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <p className="text-red-500 text-lg font-semibold mb-2">Something went wrong</p>
        <p className="text-gray-500 text-sm mb-4">{error.message || "Failed to load admin"}</p>
        <button onClick={reset} className="btn-primary !text-xs">
          Try Again
        </button>
      </div>
    </div>
  );
}
