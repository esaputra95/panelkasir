import { FiLogOut } from "react-icons/fi";
import { navGroups } from "./navGroups";
import { useNavigate } from "react-router";

export default function SidebarContent({ collapsed }: { collapsed: boolean }) {
  const navigation = useNavigate();
  return (
    <>
      {/* Profile card */}
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-sky-600 text-white text-lg font-bold">
          DP
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate font-semibold">DPIP</p>
            <p className="truncate text-xs text-slate-500">
              danapensiun@dpip.com
            </p>
          </div>
        )}
      </div>

      {/* Nav groups */}
      <nav className="space-y-6">
        {navGroups.map((g, gi) => (
          <div key={gi}>
            {!collapsed && (
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {g.label}
              </p>
            )}
            <ul className="space-y-1">
              {g.items.map((it, ii) => (
                <li onClick={() => navigation(it.path)} key={ii}>
                  <a
                    className={`group hover:cursor-pointer flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                      it.active
                        ? "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <it.icon
                      className={it.active ? "text-sky-600" : "text-slate-400"}
                    />
                    {!collapsed && <span className="truncate">{it.label}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Footer */}
        <div className="pt-2">
          <button className="flex w-full items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50">
            <FiLogOut />
            {!collapsed && <span>Keluar</span>}
          </button>
        </div>
      </nav>

      {/* Login / Device card */}
      {!collapsed && (
        <div className="mt-6 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <span>Login Terakhir</span>
            <span className="text-slate-400">02 Jul 2025, 21:45 WIB</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span>Perangkat</span>
            <span className="text-slate-400">iPhone 14 Pro (iOS17.5)</span>
          </div>
        </div>
      )}
    </>
  );
}
