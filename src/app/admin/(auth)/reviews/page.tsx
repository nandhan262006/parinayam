"use client";

import { useEffect, useState, useCallback } from "react";

interface Review { id: string; name: string; text: string; rating: number; date: string; }

const emptyForm = { name: "", text: "", rating: 5, date: "Recently" };

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/reviews");
      setReviews(await res.json());
    } catch { setError("Failed to load"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const url = editingId ? `/api/admin/reviews/${editingId}` : "/api/admin/reviews";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed");
      setForm(emptyForm); setEditingId(null); fetchReviews();
    } catch { setError("Save failed"); }
    finally { setSaving(false); }
  };

  const handleEdit = (r: Review) => {
    setForm({ name: r.name, text: r.text, rating: r.rating, date: r.date });
    setEditingId(r.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    await fetch(`/api/admin/reviews/${id}`, { method: "DELETE", credentials: "include" });
    fetchReviews();
  };

  if (loading) return <div className="py-20 text-center text-gray-500">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h1>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 mb-6 space-y-4">
        <h2 className="font-semibold text-gray-900">{editingId ? "Edit Review" : "Add New Review"}</h2>
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-gold" required />
        </div>
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Review Text</label>
          <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-gold" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Rating (1-5)</label>
            <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-gold">
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Star{n>1?'s':''}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Date</label>
            <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-gold" />
          </div>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={saving} className="bg-gold text-white px-6 py-2 rounded-lg text-sm">{saving ? "Saving..." : editingId ? "Update" : "Create"}</button>
          {editingId && <button type="button" onClick={() => { setForm(emptyForm); setEditingId(null); }} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg text-sm">Cancel</button>}
        </div>
      </form>

      <div className="space-y-3">
        {reviews.length === 0 && <p className="text-gray-500 text-center py-10">No reviews yet.</p>}
        {reviews.map((r) => (
          <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-semibold text-gray-900">{r.name}</p>
                <p className="text-xs text-gray-500">{r.date}</p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(r.rating)].map((_, i) => <span key={i} className="text-amber-400">★</span>)}
                {[...Array(5 - r.rating)].map((_, i) => <span key={i} className="text-gray-300">★</span>)}
              </div>
            </div>
            <p className="text-gray-600 text-sm">{r.text}</p>
            <div className="flex gap-1 mt-3">
              <button onClick={() => handleEdit(r)} className="text-gray-500 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-100">Edit</button>
              <button onClick={() => handleDelete(r.id)} className="text-red-500 text-xs px-3 py-1.5 rounded-lg hover:bg-red-50">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
