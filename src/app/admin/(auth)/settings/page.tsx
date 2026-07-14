"use client";

import { useEffect, useState } from "react";

const fields = [
  { key: "heroDesktop", label: "Hero Image (Desktop)", image: true },
  { key: "heroMobile", label: "Hero Image (Mobile)", image: true },
  { key: "phone", label: "Phone Number" },
  { key: "whatsapp", label: "WhatsApp Number" },
  { key: "email", label: "Email" },
  { key: "address", label: "Address" },
  { key: "mapsUrl", label: "Google Maps URL" },
  { key: "instagram", label: "Instagram URL" },
  { key: "facebook", label: "Facebook URL" },
  { key: "ogImage", label: "OG Image URL", image: true },
];

const aboutFields = [
  { key: "aboutHeading", label: "About Heading", placeholder: "The Story Behind the Lens" },
  { key: "aboutSubheading", label: "About Subheading", placeholder: "We Are Parinayam" },
  { key: "aboutImage", label: "About Page Image", image: true },
  { key: "aboutBody", label: "About Body Text", placeholder: "Parinayam means union in Sanskrit...", textarea: true },
  { key: "aboutStat1Value", label: "Stat 1 Value", placeholder: "10+" },
  { key: "aboutStat1Label", label: "Stat 1 Label", placeholder: "Years Experience" },
  { key: "aboutStat2Value", label: "Stat 2 Value", placeholder: "500+" },
  { key: "aboutStat2Label", label: "Stat 2 Label", placeholder: "Weddings Captured" },
  { key: "aboutStat3Value", label: "Stat 3 Value", placeholder: "2000+" },
  { key: "aboutStat3Label", label: "Stat 3 Label", placeholder: "Happy Clients" },
  { key: "aboutStat4Value", label: "Stat 4 Value", placeholder: "15" },
  { key: "aboutStat4Label", label: "Stat 4 Label", placeholder: "Awards Won" },
  { key: "aboutPhilosophy", label: "Philosophy Heading", placeholder: "Our Philosophy" },
  { key: "aboutPhilText", label: "Philosophy Text", placeholder: "We don't chase trends...", textarea: true },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("/api/admin/settings", { credentials: "include" })
      .then((res) => res.json())
      .then(setSettings)
      .finally(() => setLoading(false));
  }, []);

  const handleFileUpload = async (key: string, file: File) => {
    setUploading((u) => ({ ...u, [key]: true }));
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd, credentials: "include" });
      const data = await res.json();
      setSettings({ ...settings, [key]: data.url });
    } catch {}
    setUploading((u) => ({ ...u, [key]: false }));
  };

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
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">General Settings</h2>
          {fields.map((f) => (
            <div key={f.key}>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">{f.label}</label>
              {f.image && (
                <>
                  {settings[f.key] && (
                    <img src={settings[f.key]} alt="" className="mb-2 w-32 h-24 object-cover rounded-lg border" />
                  )}
                  <div className="flex gap-2 items-center mb-1">
                    <label className={`flex items-center justify-center gap-1 px-3 py-1.5 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gold hover:bg-gold/5 transition text-xs text-gray-500 ${uploading[f.key] ? "opacity-50" : ""}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12h14"/></svg>
                      {uploading[f.key] ? "Uploading..." : "Upload"}
                      <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFileUpload(f.key, file); }} className="hidden" disabled={uploading[f.key]} />
                    </label>
                  </div>
                </>
              )}
              <input
                value={settings[f.key] || ""}
                onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-gold"
                placeholder={f.label}
              />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">About Page</h2>
          {aboutFields.map((f) => (
            <div key={f.key}>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">{f.label}</label>
              {f.image && (
                <>
                  {settings[f.key] && (
                    <img src={settings[f.key]} alt="" className="mb-2 w-32 h-24 object-cover rounded-lg border" />
                  )}
                  <div className="flex gap-2 items-center mb-1">
                    <label className={`flex items-center justify-center gap-1 px-3 py-1.5 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gold hover:bg-gold/5 transition text-xs text-gray-500 ${uploading[f.key] ? "opacity-50" : ""}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12h14"/></svg>
                      {uploading[f.key] ? "Uploading..." : "Upload"}
                      <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFileUpload(f.key, file); }} className="hidden" disabled={uploading[f.key]} />
                    </label>
                  </div>
                </>
              )}
              {(f as { textarea?: boolean }).textarea ? (
                <textarea
                  value={settings[f.key] || ""}
                  onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-gold resize-none"
                  placeholder={(f as { placeholder?: string }).placeholder}
                />
              ) : (
                <input
                  value={settings[f.key] || ""}
                  onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-gold"
                  placeholder={(f as { placeholder?: string }).placeholder || f.label}
                />
              )}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
