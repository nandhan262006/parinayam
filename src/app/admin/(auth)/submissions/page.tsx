"use client";

import { useEffect, useState } from "react";

interface Submission {
  id: string; name: string; email?: string; phone?: string; message?: string; eventType?: string; eventDate?: string; createdAt: string;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/submissions", { credentials: "include" })
      .then((res) => res.json())
      .then(setSubmissions)
      .finally(() => setLoading(false));
  }, []);

  const clearAll = async () => {
    if (!confirm("Delete ALL submissions?")) return;
    await fetch("/api/admin/submissions", { method: "DELETE", credentials: "include" });
    setSubmissions([]);
  };

  if (loading) return <div className="py-20 text-center text-gray-500">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Submissions ({submissions.length})</h1>
        {submissions.length > 0 && <button onClick={clearAll} className="text-red-500 text-sm hover:underline">Clear All</button>}
      </div>

      {submissions.length === 0 && <p className="text-gray-500 text-center py-10">No submissions yet.</p>}

      <div className="space-y-3">
        {submissions.map((s) => (
          <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-900">{s.name}</p>
              <span className="text-xs text-gray-500">{new Date(s.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
              {s.email && <p>Email: {s.email}</p>}
              {s.phone && <p>Phone: {s.phone}</p>}
              {s.eventType && <p>Event: {s.eventType}</p>}
              {s.eventDate && <p>Date: {s.eventDate}</p>}
            </div>
            {s.message && <p className="text-gray-500 text-sm mt-1">{s.message}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
