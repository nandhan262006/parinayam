"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ services: 0, gallery: 0, reviews: 0, submissions: 0 });
  const [activeForm, setActiveForm] = useState<"gallery" | "review" | "service" | null>(null);

  const [gForm, setGForm] = useState({ title: "", category: "", imageUrl: "" });
  const [rForm, setRForm] = useState({ name: "", text: "", rating: 5, date: "" });
  const [sForm, setSForm] = useState({ title: "", description: "", imageUrl: "" });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const uploadFile = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd, credentials: "include" });
    const data = await res.json();
    return data.url;
  };

  const load = () => {
    Promise.all([
      fetch("/api/admin/services").then(r => r.json()),
      fetch("/api/admin/gallery").then(r => r.json()),
      fetch("/api/admin/reviews").then(r => r.json()),
      fetch("/api/admin/submissions").then(r => r.json()),
    ]).then(([svc, gal, rev, sub]) => {
      setStats({
        services: Array.isArray(svc) ? svc.length : 0,
        gallery: Array.isArray(gal) ? gal.length : 0,
        reviews: Array.isArray(rev) ? rev.length : 0,
        submissions: Array.isArray(sub) ? sub.length : 0,
      });
    });
  };

  useEffect(() => { load(); }, []);

  const flash = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gForm.title) return;
    setSaving(true);
    await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...gForm, featured: false, order: stats.gallery }),
      credentials: "include",
    });
    setGForm({ title: "", category: "", imageUrl: "" });
    setSaving(false);
    flash("Gallery item added!");
    load();
  };

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rForm.name || !rForm.text) return;
    setSaving(true);
    await fetch("/api/admin/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...rForm, date: rForm.date || "Recently" }),
      credentials: "include",
    });
    setRForm({ name: "", text: "", rating: 5, date: "" });
    setSaving(false);
    flash("Review added!");
    load();
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sForm.title) return;
    setSaving(true);
    await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...sForm, order: stats.services }),
      credentials: "include",
    });
    setSForm({ title: "", description: "", imageUrl: "" });
    setSaving(false);
    flash("Service added!");
    load();
  };

  const statCards = [
    { label: "Services", value: stats.services, color: "text-blue-500" },
    { label: "Gallery", value: stats.gallery, color: "text-purple-500" },
    { label: "Reviews", value: stats.reviews, color: "text-amber-500" },
    { label: "Submissions", value: stats.submissions, color: "text-green-500" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        {successMsg && <span className="text-sm text-green-600 font-medium">{successMsg}</span>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Quick Create</h2>
        <div className="flex gap-2">
          {[
            { key: "gallery" as const, label: "Gallery" },
            { key: "review" as const, label: "Review" },
            { key: "service" as const, label: "Service" },
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() => setActiveForm(activeForm === btn.key ? null : btn.key)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                activeForm === btn.key
                  ? "bg-[#111] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              + {btn.label}
            </button>
          ))}
        </div>
      </div>

      {activeForm === "gallery" && (
        <form onSubmit={handleCreateGallery} className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">New Gallery Item</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <input placeholder="Title" value={gForm.title} onChange={e => setGForm({ ...gForm, title: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm" required />
            <input placeholder="Category" value={gForm.category} onChange={e => setGForm({ ...gForm, category: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm" />
            <div className="flex items-center gap-2">
              <label className="flex items-center justify-center gap-1 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-900 transition text-xs text-gray-500">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12h14"/></svg>
                {uploading ? "Uploading..." : "Upload"}
                <input type="file" accept="image/*" onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setUploading(true);
                  const url = await uploadFile(file);
                  setGForm({ ...gForm, imageUrl: url });
                  setUploading(false);
                }} className="hidden" />
              </label>
            </div>
          </div>
          <input placeholder="Image URL (or upload above)" value={gForm.imageUrl} onChange={e => setGForm({ ...gForm, imageUrl: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm mb-3 w-full" />
          {gForm.imageUrl && <img src={gForm.imageUrl} alt="" className="mb-3 w-24 h-16 object-cover rounded-lg border" />}
          <div className="flex gap-2">
            <button type="submit" disabled={saving}
              className="bg-[#111] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#222] transition disabled:opacity-50">
              {saving ? "Adding..." : "Add Gallery Item"}
            </button>
            <button type="button" onClick={() => setActiveForm(null)}
              className="text-gray-500 px-4 py-2 rounded-lg text-sm hover:bg-gray-100">Cancel</button>
          </div>
        </form>
      )}

      {activeForm === "review" && (
        <form onSubmit={handleCreateReview} className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">New Review</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <input placeholder="Client Name" value={rForm.name} onChange={e => setRForm({ ...rForm, name: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm" required />
            <input placeholder="Date (e.g. 2 months ago)" value={rForm.date} onChange={e => setRForm({ ...rForm, date: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm" />
            <textarea placeholder="Review Text" value={rForm.text} onChange={e => setRForm({ ...rForm, text: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm resize-none md:col-span-2" rows={2} required />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <button type="button" key={n} onClick={() => setRForm({ ...rForm, rating: n })}
                    className="text-xl">{n <= rForm.rating ? "\u2605" : "\u2606"}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={saving}
              className="bg-[#111] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#222] transition disabled:opacity-50">
              {saving ? "Adding..." : "Add Review"}
            </button>
            <button type="button" onClick={() => setActiveForm(null)}
              className="text-gray-500 px-4 py-2 rounded-lg text-sm hover:bg-gray-100">Cancel</button>
          </div>
        </form>
      )}

      {activeForm === "service" && (
        <form onSubmit={handleCreateService} className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">New Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <input placeholder="Service Title" value={sForm.title} onChange={e => setSForm({ ...sForm, title: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm" required />
            <div>
              <label className="flex items-center justify-center gap-1 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-900 transition text-xs text-gray-500">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12h14"/></svg>
                {uploading ? "Uploading..." : "Upload Image"}
                <input type="file" accept="image/*" onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setUploading(true);
                  const url = await uploadFile(file);
                  setSForm({ ...sForm, imageUrl: url });
                  setUploading(false);
                }} className="hidden" />
              </label>
            </div>
            <input placeholder="Image URL (or upload above)" value={sForm.imageUrl} onChange={e => setSForm({ ...sForm, imageUrl: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm" />
            {sForm.imageUrl && <img src={sForm.imageUrl} alt="" className="w-24 h-16 object-cover rounded-lg border" />}
            <textarea placeholder="Description" value={sForm.description} onChange={e => setSForm({ ...sForm, description: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm resize-none md:col-span-2" rows={2} />
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={saving}
              className="bg-[#111] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#222] transition disabled:opacity-50">
              {saving ? "Adding..." : "Add Service"}
            </button>
            <button type="button" onClick={() => setActiveForm(null)}
              className="text-gray-500 px-4 py-2 rounded-lg text-sm hover:bg-gray-100">Cancel</button>
          </div>
        </form>
      )}

      <h2 className="text-lg font-semibold text-gray-900 mb-4 mt-6">Manage</h2>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: "Services", href: "/admin/services", desc: "Manage all services" },
          { label: "Gallery", href: "/admin/gallery", desc: "Manage gallery items" },
          { label: "Reviews", href: "/admin/reviews", desc: "Manage client reviews" },
          { label: "Submissions", href: "/admin/submissions", desc: "View contact form submissions" },
          { label: "Settings", href: "/admin/settings", desc: "Site settings & contact info" },
          { label: "View Site", href: "/", desc: "Open public website", external: true },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            target={action.external ? "_blank" : undefined}
            className="bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-400 transition group"
          >
            <p className="font-medium text-gray-900 text-sm group-hover:text-gold transition">
              {action.label}
            </p>
            <p className="text-xs text-gray-400 mt-1">{action.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
