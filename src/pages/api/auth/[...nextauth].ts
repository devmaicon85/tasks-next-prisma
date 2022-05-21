import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import axios from "@/lib/axios";
import { compare } from "bcryptjs";
import prismaClient from "@/lib/prismaClient";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: "/dashboard",
        signOut: "/login",
        error: "/login",
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
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "E-mail",
                    type: "text",
                    placeholder: "seuemail@gmail.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;

                if (!email || !email.includes("@") || !password) {
                    throw new Error("E-mail ou Senha inválidos");
                }

                try {
                    const user = await prismaClient.user.findUnique({
                        where: {
                            email,
                        },
                    });
                    if (!user) {
                        throw new Error("Usuário não encontrado");
                    }
                    if (!user.password) {
                        throw new Error("Usuário sem senha definida");
                    }

                    const checkPassword = await compare(
                        password,
                        user.password
                    );

                    if (checkPassword) {
                        return {
                            email: user.email,
                            name: user.name,
                            image: user.image,
                        };
                    } else {
                        throw new Error("Senha inválida");
                    }
                } catch (error) {
                    throw new Error(`${error}`);
                }
            },
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,
    session: {
        jwt: true,
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days * 2
        updateAge: 24 * 60 * 60, // 24 hours
    },
    authoptions: {
        useSecureCookies: false,
    },

    debug: process.env.NODE_ENV === "development",
    events: {
        async signIn() {},
        async signOut() {},
        async createUser() {},
        async updateUser() {},
        async linkAccount() {},
        async session() {},
    },
    // jwt: {
    //     secret: process.env.NEXTAUTH_SECRET,
    // },
    // callbacks: {
    //     async signIn({ user, account, profile, email, credentials }) {
    //         return true;
    //     },
    //     async redirect({ url, baseUrl }) {
    //         return baseUrl;
    //     },
    //     async jwt({ token, user }) {
    //         console.log("nextAuth:jwt::", token);
    //         console.log("nextAuth:jwt:user:", user);
    //         if (user) {
    //             token.jwt = user.jwt ?? "";
    //             token.user = user.user;
    //             token.accessToken = user?.accessToken ?? "";
    //         }
    //         return Promise.resolve(token);
    //     },
    //     async session({ session, token, user }) {
    //         console.log("nextAuth:session::", session);
    //         console.log("nextAuth:session:token::", token);
    //         return {
    //             ...session,
    //             jwt: token?.jwt ?? "",
    //             accessToken: token?.accessToken ?? "",
    //             user: {
    //                 ...session.user,
    //                 id: user.id,
    //             },
    //         };
    //     },
    // },
} as NextAuthOptions;

export default NextAuth(authOptions);
