import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-8">
        <div className="rounded-2xl border border-emerald-100 bg-white/70 p-6 shadow-sm backdrop-blur md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Agriculture"
                  width={180}
                  height={200}
                  priority
                />
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-emerald-900 md:text-3xl">
                    Plateforme de supervision agricole multi-parcelles
                  </h1>
                  <p className="mt-1 text-sm text-emerald-700">
                    Exploitations • Parcelles • Capteurs • Météo • Alertes
                  </p>
                </div>
              </div>

              <p className="mt-6 text-emerald-900/90">
                Cette application permet de centraliser les exploitations et de
                suivre l’état des parcelles grâce aux données capteurs et météo.
                En cas d’anomalie, des alertes sont envoyées de manière
                asynchrone via Kafka vers le microservice de notification.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/exploitations"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow hover:bg-emerald-700"
                >
                  Voir les exploitations
                </Link>

                <Link
                  href="/supervision"
                  className="inline-flex items-center justify-center rounded-lg border border-emerald-200 bg-white px-5 py-3 text-sm font-medium text-emerald-900 hover:bg-emerald-50"
                >
                  Aller à la supervision
                </Link>
              </div>
            </div>

            <div className="grid w-full gap-3 md:max-w-sm">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-emerald-900">
                  Objectifs
                </p>
                <ul className="mt-2 space-y-1 text-sm text-emerald-800">
                  <li>• Vue globale des exploitations.</li>
                  <li>• Détection d’anomalies.</li>
                  <li>• Statistiques & suivi.</li>
                </ul>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-white p-4">
                <p className="text-sm font-semibold text-emerald-900">
                  Architecture
                </p>
                <ul className="mt-2 space-y-1 text-sm text-emerald-800">
                  <li>• MSExploitations (CRUD exploitations/parcelles).</li>
                  <li>• MSSupervision (capteurs/météo + règles).</li>
                  <li>• MSNotification (consomme Kafka, stocke alertes).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-emerald-900">
              Exploitations & parcelles
            </h2>
            <p className="mt-2 text-sm text-emerald-800">
              Gestion des exploitations, localisation, responsable, surfaces et
              état des parcelles.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-emerald-900">
              Données de supervision
            </h2>
            <p className="mt-2 text-sm text-emerald-800">
              Enregistrement des données capteurs et météo, filtrage par parcelle
              et suivi temporel.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-emerald-900">
              Alertes en temps réel
            </h2>
            <p className="mt-2 text-sm text-emerald-800">
              Publication d’événements d’alerte via Kafka et consultation des
              alertes enregistrées.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-emerald-100 bg-white p-5 text-sm text-emerald-800">
          <span className="font-medium text-emerald-900">Astuce :</span> si tu
          utilises Cloudinary pour les images des exploitations, pense à autoriser
          le domaine dans la config Next.js si nécessaire.
        </div>
      </section>
    </main>
  );
}
