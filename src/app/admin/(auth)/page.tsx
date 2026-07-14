import { db } from "@/lib/db";

export default async function AdminDashboard() {
  let services = 0, gallery = 0, reviews = 0, submissions = 0;
  try {
    [services, gallery, reviews, submissions] = await Promise.all([
      db.service.count(),
      db.gallery.count(),
      db.review.count(),
      db.submission.count(),
    ]);
  } catch {}

  const stats = [
    { label: "Services", value: services, color: "text-blue-500" },
    { label: "Gallery", value: gallery, color: "text-purple-500" },
    { label: "Reviews", value: reviews, color: "text-amber-500" },
    { label: "Submissions", value: submissions, color: "text-green-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
