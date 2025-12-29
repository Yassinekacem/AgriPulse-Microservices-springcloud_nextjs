"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type NavItem = { label: string; href: string };

type Alerte = {
  id: number;
  parcelleId?: number | null;
  type?: string | null;
  message?: string | null;
  dateEvent?: string | null;
  dateReception?: string | null;
};

const navItems: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Exploitations", href: "/exploitations" },
  { label: "Alertes", href: "/alertes" },
  { label: "Statistiques", href: "/stats" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function fmtDate(s?: string | null) {
  if (!s) return "—";
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString();
}

export default function Navbar() {
  const pathname = usePathname();

  // mobile nav
  const [open, setOpen] = useState(false);

  // notifications dropdown
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifError, setNotifError] = useState<string | null>(null);
  const [alertes, setAlertes] = useState<Alerte[]>([]);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

  const notifRef = useRef<HTMLDivElement | null>(null);

  const items = useMemo(
    () =>
      navItems.map((it) => ({
        ...it,
        active: pathname ? isActive(pathname, it.href) : false,
      })),
    [pathname]
  );

  const badgeCount = alertes.length;

  async function loadNotifications() {
    try {
      setNotifLoading(true);
      setNotifError(null);

      const res = await fetch(`${apiBase}/notification/api/alertes`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
      const data = (await res.json()) as Alerte[];

      setAlertes(Array.isArray(data) ? data : []);
    } catch (e) {
      setNotifError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setNotifLoading(false);
    }
  }

  // Charger les notifs au premier affichage (et quand on ouvre)
  useEffect(() => {
    if (notifOpen) loadNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifOpen]);

  // Fermer dropdown au clic dehors + ESC
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!notifOpen) return;
      const target = e.target as Node;
      if (notifRef.current && !notifRef.current.contains(target)) setNotifOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setNotifOpen(false);
    }

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [notifOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="Agriculture" width={44} height={50} priority />
          <div className="leading-tight">
            <div className="text-base font-semibold text-green-800">Agriculture</div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-2 md:flex">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              aria-current={it.active ? "page" : undefined}
              className={[
                "rounded-full px-3 py-2 text-sm font-medium transition",
                it.active ? "bg-green-600 text-white" : "text-green-900 hover:bg-green-50",
              ].join(" ")}
            >
              {it.label}
            </Link>
          ))}
        </div>

        {/* Right side: notifications + mobile button */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setNotifOpen((v) => !v)}
              className="relative inline-flex items-center justify-center rounded-xl border border-green-100 bg-white p-2 text-green-900 shadow-sm transition hover:bg-green-50"
              aria-label="Notifications"
              aria-haspopup="menu"
              aria-expanded={notifOpen}
              aria-controls="notif-menu"
            >
              {/* Bell icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 22a2.2 2.2 0 0 0 2.2-2.2h-4.4A2.2 2.2 0 0 0 12 22Z"
                  fill="currentColor"
                  opacity="0.9"
                />
                <path
                  d="M18 16.5H6c.8-1 .9-1.8.9-2.7V10a5.1 5.1 0 0 1 10.2 0v3.8c0 .9.1 1.7.9 2.7Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 6.7a3.4 3.4 0 0 1 6 0"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>

              {/* Badge */}
              {badgeCount >= 1 && (
                <span className="absolute -right-1 -top-1 inline-flex min-w-[18px] items-center justify-center rounded-full bg-red-600 px-1.5 py-0.5 text-[11px] font-bold leading-none text-white">
                  {badgeCount > 99 ? "99+" : badgeCount}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {notifOpen && (
              <div
                id="notif-menu"
                role="menu"
                className="absolute right-0 mt-2 w-[340px] overflow-hidden rounded-2xl border border-green-100 bg-white shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-green-100 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-green-900">Notifications</p>
                    <p className="text-xs text-green-700">
                      {badgeCount} alerte(s)
                    </p>
                  </div>

                  <button
                    onClick={() => loadNotifications()}
                    className="rounded-lg border border-green-200 bg-white px-3 py-1.5 text-xs font-medium text-green-900 hover:bg-green-50"
                    disabled={notifLoading}
                  >
                    {notifLoading ? "..." : "Rafraîchir"}
                  </button>
                </div>

                <div className="max-h-80 overflow-auto">
                  {notifLoading && (
                    <div className="px-4 py-4 text-sm text-green-800">Chargement...</div>
                  )}

                  {notifError && (
                    <div className="px-4 py-4 text-sm text-red-700">Erreur: {notifError}</div>
                  )}

                  {!notifLoading && !notifError && alertes.length === 0 && (
                    <div className="px-4 py-6 text-sm text-green-800">
                      Aucune notification.
                    </div>
                  )}

                  {!notifLoading && !notifError && alertes.length > 0 && (
                    <ul className="divide-y divide-green-100">
                      {alertes.slice(0, 10).map((a) => (
                        <li key={a.id} role="menuitem" className="px-4 py-3 hover:bg-green-50">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-green-900">
                                {a.type ?? "ALERTE"}
                                {a.parcelleId != null ? ` • Parcelle ${a.parcelleId}` : ""}
                              </p>
                              <p className="mt-1 line-clamp-2 text-sm text-green-800">
                                {a.message ?? "—"}
                              </p>
                              <p className="mt-1 text-xs text-green-700">
                                {fmtDate(a.dateEvent ?? a.dateReception)}
                              </p>
                            </div>
                            <span className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-red-500" />
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="border-t border-green-100 px-4 py-3">
                  <Link
                    href="/alertes"
                    onClick={() => setNotifOpen(false)}
                    className="block rounded-lg bg-green-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-700"
                  >
                    Voir toutes les alertes
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-green-900 hover:bg-green-50 md:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-green-100 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                aria-current={it.active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={[
                  "rounded-lg px-3 py-2 text-sm font-medium transition",
                  it.active ? "bg-green-600 text-white" : "text-green-900 hover:bg-green-50",
                ].join(" ")}
              >
                {it.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
