import { auth } from "@/lib/auth";

interface AccessGateProps {
  children: React.ReactNode;
  allowedRoles?: string[];   // Lista de Roles permitidos
  allowedSetores?: string[]; // Lista de Setores permitidos
  allMustMatch?: boolean;    // Se TRUE, precisa ter Role E Setor. Se FALSE, Role OU Setor.
}

export default async function AccessGate({
  children,
  allowedRoles = [],
  allowedSetores = [],
  allMustMatch = false
}: AccessGateProps) {
  const session = await auth();
  const user = session?.user as any;

  if (!user) return null;

  // Se as listas estiverem vazias, consideramos que aquele critério está "aberto"
  const hasAllowedRole = allowedRoles.length === 0 || allowedRoles.includes(user.role);
  const hasAllowedSetor = allowedSetores.length === 0 || allowedSetores.includes(user.setor);

  // Lógica de validação
  const canAccess = allMustMatch
    ? hasAllowedRole && hasAllowedSetor
    : hasAllowedRole || hasAllowedSetor;

  if (!canAccess) return null;

  return <>{children}</>;
}