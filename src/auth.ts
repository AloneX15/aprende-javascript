import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { upsertUser } from "@/lib/db";

declare module "next-auth" {
  interface Session {
    user: { githubId: number; login: string; name?: string | null; image?: string | null };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Solo pedimos identidad: sin permisos sobre repositorios.
  providers: [GitHub({ authorization: { params: { scope: "read:user" } } })],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        const githubId = Number(profile.id);
        const login = String(profile.login);
        upsertUser({
          githubId,
          login,
          name: (profile.name as string | null) ?? null,
          avatarUrl: (profile.avatar_url as string | null) ?? null,
        });
        token.githubId = githubId;
        token.login = login;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.githubId = token.githubId as number;
      session.user.login = token.login as string;
      return session;
    },
  },
});
