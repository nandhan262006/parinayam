"use client";

import { useEffect, useState, useCallback } from "react";

interface Submission {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string | null;
  eventType: string | null;
  eventDate: string | null;
  createdAt: string;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [clearing, setClearing] = useState(false);

  const fetchSubmissions = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/submissions");
      const data = await res.json();
      setSubmissions(data);
    } catch {
      setError("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleClearAll = async () => {
    if (!confirm("Delete all submissions? This cannot be undone.")) return;
    setClearing(true);
    try {
      await fetch("/api/admin/submissions", { method: "DELETE" });
      setSubmissions([]);
    } catch {
      setError("Failed to clear submissions");
    } finally {
      setClearing(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Submissions</h1>
        {submissions.length > 0 && (
          <button
            onClick={handleClearAll}
            disabled={clearing}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {clearing ? "Clearing..." : "Clear All"}
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {error}
        </div>
      )}

      {submissions.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
          <p className="text-gray-500">No submissions yet.</p>
        </div>
      )}

      {submissions.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-medium">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-medium">
                    Contact
                  </th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-medium">
                    Event
                  </th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-medium">
                    Message
                  </th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-medium">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {submissions.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{s.name}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-0.5">
                        {s.email && (
                          <p className="text-gray-600 text-xs">{s.email}</p>
                        )}
                        {s.phone && (
                          <p className="text-gray-600 text-xs">{s.phone}</p>
                        )}
                        {!s.email && !s.phone && (
                          <p className="text-gray-400 text-xs">—</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-0.5">
                        {s.eventType && (
                          <p className="text-gray-900 text-xs font-medium">
                            {s.eventType}
                          </p>
                        )}
                        {s.eventDate && (
                          <p className="text-gray-500 text-xs">
                            {s.eventDate}
                          </p>
                        )}
                        {!s.eventType && !s.eventDate && (
                          <p className="text-gray-400 text-xs">—</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-600 text-xs max-w-xs line-clamp-2">
                        {s.message || "—"}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-400 text-xs whitespace-nowrap">
                        {formatDate(s.createdAt)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
