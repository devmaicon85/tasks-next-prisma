import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: "/dashboard",
        signOut: "/login",
        error: "/error",
    },

    providers: [
        GoogleProvider({
            clientId: String(process.env.GOOGLE_ID),
            clientSecret: String(process.env.GOOGLE_SECRET),
        }),
        GitProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            // profile(profile) {
            //     return {
            //         id: profile.id.toString(),
            //         name: profile.name || profile.login,
            //         username: profile.login,
            //         email: profile.email,
            //         image: profile.avatar_url,
            //     };
            // },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
        async session({ session, token, user }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: user.id,
                },
            };
        },
        // async jwt({ token, user, account, profile, isNewUser }) {
        //     return token;
        // },
    },
    events: {
        async signIn() {},
        async signOut() {},
        async createUser() {},
        async updateUser() {},
        async linkAccount() {},
        async session() {},
    },
} as NextAuthOptions;

export default NextAuth(authOptions);
