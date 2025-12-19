import { auth } from "@/lib/auth"; // Importa a função auth que configuramos no auth.ts

export default auth((req) => {
  const isLoggedIn = !!req.auth; // Verifica se existe uma sessão ativa
  const { nextUrl } = req;

  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard") ||
                           nextUrl.pathname.startsWith("/profile");
  const isAuthRoute = nextUrl.pathname.startsWith("/auth");

  // 1. Se tentar acessar rotas protegidas sem estar logado, redireciona para o login
  if (isDashboardRoute && !isLoggedIn) {
    return Response.redirect(new URL("/auth", nextUrl));
  }

  // 2. Se já estiver logado e tentar acessar a página de login, manda para o dashboard
  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }
});

// Define quais rotas o middleware deve observar
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};