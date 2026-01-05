import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-10">
        <div className="rounded-2xl border border-green-100 bg-white p-8 shadow-sm md:p-12">
          
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            
            <div className="flex-1">
              <Image
                src="/logo.png"
                alt="Agripulse"
                width={160}
                height={160}
                priority
              />

              <h1 className="mt-6 text-3xl font-semibold text-green-900">
                Agripulse
              </h1>

              <p className="mt-2 text-lg text-green-700">
                Gestion simple des exploitations agricoles et des parcelles
              </p>

              <p className="mt-6 text-green-900/90">
                Agripulse vous permet de gérer facilement vos exploitations,
                organiser vos parcelles et suivre leur état en un seul endroit.
                Une solution claire pour mieux piloter votre activité agricole.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/exploitations"
                  className="rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white text-center hover:bg-green-700"
                >
                  Gérer les exploitations
                </Link>

                <Link
                  href="/parcelles"
                  className="rounded-lg border border-green-300 bg-white px-6 py-3 text-sm font-medium text-green-900 text-center hover:bg-green-50"
                >
                  Voir les parcelles
                </Link>
              </div>
            </div>

            <div className="flex-1 grid gap-4">
              <div className="rounded-xl bg-green-50 p-5 border">
                <h3 className="font-semibold text-green-900">
                  Exploitations
                </h3>
                <p className="mt-2 text-sm text-green-800">
                  Centralisez toutes vos exploitations avec leurs informations
                  principales et leur localisation.
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-5 border">
                <h3 className="font-semibold text-green-900">
                  Parcelles
                </h3>
                <p className="mt-2 text-sm text-green-800">
                  Suivez l’état de chaque parcelle, sa surface et son utilisation
                  agricole.
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-5 border">
                <h3 className="font-semibold text-green-900">
                  Suivi agricole
                </h3>
                <p className="mt-2 text-sm text-green-800">
                  Une vision claire pour mieux organiser et prendre des décisions.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
