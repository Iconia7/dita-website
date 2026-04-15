import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "@/lib/axios";
import { CredentialsSignin } from "next-auth";

class InvalidCredentialsError extends CredentialsSignin {
  code = "invalid_credentials";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        admno: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { data } = await axios.post("/auth/signin", {
            admno: credentials.admno,
            password: credentials.password,
          });

          const { token, account } = data.data;

          return {
            id: account.id,
            admno: account.admno,
            role: account.role,
            token,
          };
        } catch {
          throw new InvalidCredentialsError();
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.admno = user.admno;
        token.role = user.role;
        token.accessToken = user.token;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.admno = token.admno as string;
      session.user.role = token.role as string;
      session.user.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
