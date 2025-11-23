import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configurações",
  description: "Configurações",
};

export default async function SettingsPage() {
  return (
    <section className="w-full h-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Configurações</h1>
      <p className="text-sm text-gray-500">
        Bem-vindo aos configurações do sistema.
      </p>
    </section>
  );
}
