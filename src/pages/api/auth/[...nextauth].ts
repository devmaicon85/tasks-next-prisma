import NextAuth from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../lib/prisma";

export default NextAuth({
    // adapter: PrismaAdapter(prisma),

    providers: [
        // EmailProvider({
        //   server: process.env.EMAIL_SERVER,
        //   from: process.env.EMAIL_FROM,
        // }),

        // FacebookProvider({
        //   clientId: process.env.FACEBOOK_ID,
        //   clientSecret: process.env.FACEBOOK_SECRET,
        // }),

        GoogleProvider({
            clientId: String(process.env.GOOGLE_ID),
            clientSecret: String(process.env.GOOGLE_SECRET),
        }),

        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            const { email, name, image } = user;

            if (!email || !name) {
                return false;
            }

            try {
                const userBD = await prisma.user.findFirst({
                    where: { email },
                });

                if (!userBD) {
                    await prisma.user.create({
                        data: { email, name, image, emailVerified: new Date() },
                    });

                    return true;
                }

                await prisma.user.update({
                    data: { email, name, image },
                    where: { email },
                });

                return true;
            } catch (error) {
                return false;
            }
        },
    },

    // callbacks: {
    //     async jwt({ token }) {
    //         token.userRole = "admin";
    //         return token;
    //     },
    // },
});
