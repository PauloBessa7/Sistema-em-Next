'use client';
import { updateUsername } from "@/app/actions/updateUserName";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";


export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setMessage("");

    try {
      const response = await updateUsername(formData);

      if (response.success) {
        // Atualizar a sessão localmente com o novo nome
        const newName = formData.get("name") as string;
        await update({
          ...session,
          user: {
            ...session?.user,
            name: newName,
          },
        });
        setMessage("Nome atualizado com sucesso!");
      } else {
        setMessage(response.error || "Erro ao atualizar nome");
      }
    } catch (error) {
      setMessage("Erro ao atualizar nome");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900 rounded-xl border border-gray-800 text-white">
      <div className="flex items-center gap-3 mb-6">
        <User className="text-blue-500" size={28} />
        <h1 className="text-2xl font-bold">Meu Perfil</h1>
      </div>

      <p className="text-gray-400 mb-8">
        Altere suas informações públicas abaixo.
      </p>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes("sucesso") ? "bg-green-900 text-green-200" : "bg-red-900 text-red-200"}`}>
          {message}
        </div>
      )}

      {/* Note que o form chama a Action diretamente */}
      <form action={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Nome de Exibição
          </label>
          <input
            type="text"
            name="name"
            defaultValue={session?.user?.name || ""}
            placeholder="Digite seu nome"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors shadow-lg"
        >
          {isLoading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-800 text-sm text-gray-500">
        ID da Conta: <span className="font-mono">{session?.user?.id}</span>
      </div>
    </div>
  );
}
