"use client";

import { useEffect, useState } from "react";

const fields = [
  { key: "heroDesktop", label: "Hero Image (Desktop)" },
  { key: "heroMobile", label: "Hero Image (Mobile)" },
  { key: "phone", label: "Phone Number" },
  { key: "whatsapp", label: "WhatsApp Number" },
  { key: "email", label: "Email" },
  { key: "address", label: "Address" },
  { key: "mapsUrl", label: "Google Maps URL" },
  { key: "instagram", label: "Instagram URL" },
  { key: "facebook", label: "Facebook URL" },
  { key: "aboutBio", label: "About Bio (short)" },
  { key: "ogImage", label: "OG Image URL" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings", { credentials: "include" })
      .then((res) => res.json())
      .then(setSettings)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
        credentials: "include",
      });
      if (res.ok) setMessage("Settings saved!");
      else setMessage("Save failed");
    } catch { setMessage("Error saving"); }
    finally { setSaving(false); setTimeout(() => setMessage(""), 3000); }
  };

  if (loading) return <div className="py-20 text-center text-gray-500">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <button onClick={handleSave} disabled={saving} className="bg-gold text-white px-4 py-2 rounded-lg text-sm hover:bg-gold/90 disabled:opacity-50">
          {saving ? "Saving..." : "Save All"}
        </button>
      </div>
      {message && <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3 mb-4">{message}</div>}
      <form onSubmit={handleSave} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">{f.label}</label>
            <input
              value={settings[f.key] || ""}
              onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-gold"
              placeholder={f.label}
            />
          </div>
        ))}
      </form>
    </div>
  );
}
