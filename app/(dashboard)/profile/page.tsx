import { validateAccess } from "@/lib/auth-guard"; // ajuste o caminho

export default async function DevAdminPage() {
  // O código abaixo garante que NINGUÉM passe daqui sem ser ADMIN e do setor DEV
  const user = await validateAccess({
    allowedRoles: ["ADMIN"],
    allowedSetores: ["DEV"],
    allMustMatch: true
  });

  return (
    <div>
      <h1>Painel de Controle Crítico</h1>
      <p>Bem-vindo, {user.name}. Você tem acesso total de desenvolvedor.</p>
    </div>
  );
}