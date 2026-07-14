"use client";

import { useEffect, useState, useCallback } from "react";

interface GalleryItem {
  id: string; title: string; category: string; imageUrl: string; featured: boolean; order: number;
}

const emptyForm = { title: "", category: "", imageUrl: "" };

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/gallery", { credentials: "include" });
      setItems(await res.json());
    } catch { setError("Failed to load"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const resetForm = () => { setForm(emptyForm); setEditingId(null); setShowForm(false); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const url = editingId ? `/api/admin/gallery/${editingId}` : "/api/admin/gallery";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed");
      resetForm(); fetchItems();
    } catch { setError("Save failed"); }
    finally { setSaving(false); }
  };

  const handleEdit = (item: GalleryItem) => {
    setForm({ title: item.title, category: item.category, imageUrl: item.imageUrl });
    setEditingId(item.id); setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE", credentials: "include" });
    fetchItems();
  };

  const toggleFeatured = async (item: GalleryItem) => {
    const res = await fetch(`/api/admin/gallery/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !item.featured }),
      credentials: "include",
    });
    if (res.ok) {
      setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, featured: !item.featured } : i));
    }
  };

  if (loading) return <div className="py-20 text-center text-gray-500">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-[#111] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#222]">Add Item</button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-gray-900">{editingId ? "Edit" : "New"} Gallery Item</h2>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-gold" required />
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Category</label>
            <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-gold" required />
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Image URL</label>
            <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-gold" placeholder="/gallery1.png" />
            {form.imageUrl && <img src={form.imageUrl} alt="" className="mt-2 w-20 h-20 object-cover rounded-lg border" />}
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="bg-gold text-white px-6 py-2 rounded-lg text-sm hover:bg-gold/90 disabled:opacity-50">{saving ? "Saving..." : editingId ? "Update" : "Create"}</button>
            <button type="button" onClick={resetForm} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg text-sm hover:bg-gray-200">Cancel</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.length === 0 && <p className="text-gray-500 text-center py-10 col-span-full">No gallery items yet.</p>}
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
            <div className="aspect-[4/3] bg-gray-100 relative">
              {item.imageUrl ? <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>}
              <button onClick={() => toggleFeatured(item)} className={`absolute top-2 right-2 p-1.5 rounded-lg transition-colors ${item.featured ? "bg-gold/90 text-white" : "bg-black/40 text-white/70 hover:bg-black/60"}`} title={item.featured ? "Featured" : "Click to feature"}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill={item.featured ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5"><path d="M10 1.5l2.25 5.27 5.75.64-4.3 3.87 1.18 5.72L10 14.25 5.12 17l1.18-5.72-4.3-3.87 5.75-.64L10 1.5z" /></svg>
              </button>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm truncate">{item.title}</h3>
              <p className="text-gray-500 text-xs mt-0.5">{item.category}</p>
              <div className="flex gap-1 mt-2">
                <button onClick={() => handleEdit(item)} className="text-gray-500 hover:text-gray-700 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-100">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 text-xs px-3 py-1.5 rounded-lg hover:bg-red-50">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
