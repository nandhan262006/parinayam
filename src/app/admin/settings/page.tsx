"use client";

import { useEffect, useState } from "react";

interface SettingField {
  key: string;
  label: string;
  type?: "text" | "textarea" | "url";
}

const fields: SettingField[] = [
  { key: "heroImageDesktop", label: "Hero Image Desktop", type: "url" },
  { key: "heroImageMobile", label: "Hero Image Mobile", type: "url" },
  { key: "phoneNumber", label: "Phone Number" },
  { key: "whatsappNumber", label: "WhatsApp Number" },
  { key: "email", label: "Email" },
  { key: "address", label: "Address", type: "textarea" },
  { key: "googleMapsUrl", label: "Google Maps URL", type: "url" },
  { key: "instagramUrl", label: "Instagram URL", type: "url" },
  { key: "facebookUrl", label: "Facebook URL", type: "url" },
  { key: "aboutBio", label: "About Bio", type: "textarea" },
  { key: "ogImageUrl", label: "OG Image URL", type: "url" },
];

export default function SettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        const map: Record<string, string> = {};
        fields.forEach((f) => {
          map[f.key] = data[f.key] || "";
        });
        setValues(map);
      })
      .catch(() => setError("Failed to load settings"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSuccess("Settings saved successfully");
    } catch {
      setError("Failed to save settings");
    } finally {
      setSaving(false);
    }
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
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3 mb-4">
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-gray-200 p-6 space-y-4"
      >
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                value={values[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gold transition-colors"
              />
            ) : (
              <input
                type={field.type === "url" ? "url" : "text"}
                value={values[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gold transition-colors"
                placeholder={
                  field.type === "url" ? "https://..." : undefined
                }
              />
            )}
          </div>
        ))}

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-gold text-white px-6 py-2 rounded-lg text-sm hover:bg-gold/90 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
