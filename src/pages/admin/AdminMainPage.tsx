import type React from "react";
import { Receipt } from "lucide-react";
import AdminBadge from "../../components/admin/AdminBadge";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <AdminBadge className="mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Admin Oversikt</h1>
          <p className="text-online-blue-200">
            Godkjenn kvitteringer og behandle foresporsler
          </p>
        </div>

        {/* Action Cards */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            <AdminCard
              title="Kvitteringer"
              description="Se og godkjenn innsendte kvitteringer"
              icon={<Receipt className="h-6 w-6" />}
              href="/admin/kvittering"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface AdminCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function AdminCard({ title, description, icon, href }: AdminCardProps) {
  return (
    <a
      href={href}
      className="block group relative overflow-hidden rounded-xl p-6 bg-online-blue-600/30 backdrop-blur-sm border border-online-blue-500/30 hover:bg-online-blue-600/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-center mb-3">
        <div className="p-3 rounded-lg mr-4 bg-online-orange text-online-blue-900">
          {icon}
        </div>
        <h3 className="font-bold text-xl text-white">{title}</h3>
      </div>
      <p className="text-online-blue-200">{description}</p>
      <div className="absolute bottom-0 right-0 h-24 w-24 -mb-8 -mr-8 rounded-full bg-gradient-to-tr from-transparent to-online-orange/10 group-hover:to-online-orange/20 transition-all duration-300" />
    </a>
  );
}
