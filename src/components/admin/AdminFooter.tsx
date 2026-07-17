export default function AdminFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-5">
      <div className="flex flex-col items-center justify-between gap-2 text-xs text-white/35 sm:flex-row">
        <span>© {new Date().getFullYear()} B_20 — لوحة التحكم</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          جميع الأنظمة تعمل
        </span>
      </div>
    </footer>
  );
}
