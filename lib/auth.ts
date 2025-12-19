import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

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
      // Adiciona o ID do utilizador à sessão para usares em consultas ao banco
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth", // Aponta para a tua página de login personalizada
  },
});
