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
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Opcional: força a seleção de conta sempre que fizer login
      authorization: { params: { prompt: "consent" } },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Buscamos o usuário no banco incluindo as relações
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        include: { role: true, setor: true },
      });

      if (session.user && dbUser) {
        session.user.role = dbUser.role?.name;
        session.user.setor = dbUser.setor?.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth", // Aponta para a tua página de login personalizada
  },
});
