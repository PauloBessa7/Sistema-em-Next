import { auth } from "@/lib/auth";

interface AccessGateProps {
  children: React.ReactNode;
  allowedRoles?: string[];    // Roles permitidos
  allowedSetores?: string[];  // Setores permitidos
  featureKey?: string;        // Feature necessária
  requireAll?: boolean;       // true = TODOS, false = QUALQUER
}

export default async function AccessGate({
  children,
  allowedRoles,
  allowedSetores,
  featureKey,
  requireAll = false,
}: AccessGateProps) {
  const session = await auth();
  const user = session?.user;

  if (!user) return null;

  if (!allowedRoles && !allowedSetores && !featureKey) {
    return null;
  }

  const checks: boolean[] = [];

  if (allowedRoles) {
    checks.push(allowedRoles.includes(user.role ?? ""));
  }

  if (allowedSetores) {
    checks.push(allowedSetores.includes(user.setor ?? ""));
  }

  if (featureKey) {
    const userFeatures = user.features ?? [];
    checks.push(userFeatures.includes(featureKey));
  }

  // ALL ou ANY
  const canAccess = requireAll
    ? checks.every(Boolean)
    : checks.some(Boolean);

  if (!canAccess) return null;

  return <>{children}</>;
}