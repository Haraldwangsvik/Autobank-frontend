import { ShieldCheckIcon } from "@heroicons/react/24/solid";

interface AdminBadgeProps {
  className?: string;
}

export default function AdminBadge({ className = "" }: AdminBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium bg-online-orange/20 text-online-orange border border-online-orange/30 ${className}`}
    >
      <ShieldCheckIcon className="w-4 h-4 mr-1.5" />
      Admin
    </span>
  );
}
