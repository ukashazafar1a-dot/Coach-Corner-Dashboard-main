"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen p-6 flex-col">
      <h2 className="text-5xl mb-3">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="bg-primary text-white p-3 rounded"
      >
        Try again
      </button>
    </div>
  );
}
