import { auth } from "./auth";
import { redirect } from "next/navigation";

interface GuardOptions {
  allowedRoles?: string[];
  allowedSetores?: string[];
  allMustMatch?: boolean;
}

export async function validateAccess({
  allowedRoles = [],
  allowedSetores = [],
  allMustMatch = false
}: GuardOptions) {
  const session = await auth();
  const user = session?.user as any;

  // 1. Se não houver sessão, manda para o login
  if (!user) {
    redirect("/auth");
  }

  // 2. Lógica de permissões (igual ao componente anterior)
  const hasAllowedRole = allowedRoles.length === 0 || allowedRoles.includes(user.role);
  const hasAllowedSetor = allowedSetores.length === 0 || allowedSetores.includes(user.setor);

  const canAccess = allMustMatch
    ? hasAllowedRole && hasAllowedSetor
    : hasAllowedRole || hasAllowedSetor;

  // 3. Se não tiver acesso, manda para uma rota segura (ex: dashboard)
  if (!canAccess) {
    redirect("/dashboard?error=unauthorized");
  }

  // Retorna o usuário caso precise usar os dados na página
  return user;
}