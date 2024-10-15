import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "ID", type: "text" },
        passwd: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.id || !credentials?.passwd) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { id: credentials.id },
        });

        if (user && (await bcrypt.compare(credentials.passwd, user.passwd))) {
          return {
            userNo: user.user_no.toString(),
            name: user.name,
            id: user.id,
            image: user.img_url,
            isAdmin: user.is_admin,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userNo = user.userNo;
        token.id = user.id;
        token.name = user.name;
        token.image = user.image;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.userNo = token.userNo;
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
