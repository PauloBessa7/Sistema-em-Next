import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      setor?: string;
      features?: string[];
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" }, // OBRIGATÓRIO para parar de chamar o banco toda hora
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: { params: { prompt: "consent" } },
    }),
  ],
  callbacks: {
    // 1. O JWT roda no login. Aqui buscamos tudo no banco UMA vez.
    async jwt({ token, user }) {
      if (user) {
        try {
          const dbUser = await buscarFeaturesNoBanco(user.id ?? "");

          // Guardamos tudo dentro do Token (criptografado)
          token.id = user.id;
          token.role = dbUser?.role?.name;
          token.setor = dbUser?.setor?.name;

          const featureKeys = dbUser?.subscriptions.flatMap((sub) =>
            sub.plan.features.map((f) => f.key)
          ) || [];

          token.features = [...new Set(featureKeys)];

          console.log("🚀 JWT Gerado com sucesso para o usuário:", user.id);
        } catch (error) {
          console.error("❌ Erro ao buscar dados para o JWT:", error);
          token.features = [];
        }
      }
      return token;
    },

    // 2. A Session agora apenas repassa o que já está no Token.
    // Zero chamadas ao banco de dados aqui!
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.setor = token.setor as string;
        session.user.features = token.features as string[];
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
});

// Ajuste na função para receber apenas o ID (mais seguro e limpo)
async function buscarFeaturesNoBanco(userId: string) {
  if (!userId) {
    throw new Error("User ID is required to fetch user data.");
  }
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      role: true,
      setor: true,
      subscriptions: {
        where: {
          status: "ACTIVE",
          endDate: { gte: new Date() },
        },
        include: {
          plan: {
            include: {
              features: true,
            },
          },
        },
      },
    },
  });
}