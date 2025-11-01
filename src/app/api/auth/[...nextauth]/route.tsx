import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/users";
import bcrypt from "bcrypt";
import { NEXTAUTH_SECRET } from "@/lib/constants";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/" },
  secret: NEXTAUTH_SECRET,
  callbacks: {
    // Add id to JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // attach id to token
      }
      return token;
    },
    // Add id to session.user
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});


export { handler as GET, handler as POST };
