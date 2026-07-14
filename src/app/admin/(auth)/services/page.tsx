"use client";

import { useEffect, useState, useCallback } from "react";

interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
}

const emptyForm = { title: "", description: "", imageUrl: "" };

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchServices = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/services", { credentials: "include" });
      if (!res.ok) throw new Error("Failed");
      setServices(await res.json());
    } catch {
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const resetForm = () => { setForm(emptyForm); setEditingId(null); setShowForm(false); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId ? `/api/admin/services/${editingId}` : "/api/admin/services";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed");
      resetForm();
      fetchServices();
    } catch {
      setError("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (s: Service) => {
    setForm({ title: s.title, description: s.description, imageUrl: s.imageUrl });
    setEditingId(s.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    await fetch(`/api/admin/services/${id}`, { method: "DELETE", credentials: "include" });
    fetchServices();
  };

  if (loading) return <div className="py-20 text-center text-gray-500">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-[#111] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#222]">
          Add Service
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-gray-900">{editingId ? "Edit" : "New"} Service</h2>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-gold" required />
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-gold" required />
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Image URL</label>
            <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-gold" placeholder="/gallery1.png" />
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="bg-gold text-white px-6 py-2 rounded-lg text-sm hover:bg-gold/90 disabled:opacity-50">{saving ? "Saving..." : editingId ? "Update" : "Create"}</button>
            <button type="button" onClick={resetForm} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg text-sm hover:bg-gray-200">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {services.length === 0 && <p className="text-gray-500 text-center py-10">No services yet.</p>}
        {services.map((s) => (
          <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            <img src={s.imageUrl} alt="" className="w-16 h-16 object-cover rounded-lg" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900">{s.title}</h3>
              <p className="text-gray-500 text-sm truncate">{s.description}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => handleEdit(s)} className="text-gray-500 hover:text-gray-700 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-100">Edit</button>
              <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-700 text-xs px-3 py-1.5 rounded-lg hover:bg-red-50">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
