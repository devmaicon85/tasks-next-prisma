import NextAuth from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import {
    createOrUpdateUser,
    getUserByEmail,
} from "../../../lib/dbPrisma/users";
import prisma from "../../../lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export default NextAuth({
    // adapter: PrismaAdapter(prisma),

    providers: [
        // CredentialsProvider({
        //     // O nome a ser exibido no formulário de login (por exemplo, 'Fazer login com...')
        //     name: "Efetue o login",
        //     // As credenciais são usadas para gerar um formulário adequado na página de login.
        //     // Você pode especificar os campos que espera que sejam enviados.
        //     // por exemplo. domínio, nome de usuário, senha, token 2FA, etc.
        //     // Você pode passar qualquer atributo HTML para a tag <input> através do objeto.
        //     credentials: {
        //         email: {
        //             label: "E-mail",
        //             type: "text",
        //             placeholder: "digite seu e-mail",
        //         },
        //         password: { label: "Senha", type: "password" },
        //     },
        //     async authorize(credentials, req) {
        //         // Você precisa fornecer sua própria lógica aqui que leva as credenciais
        //         // submetido e retorna um objeto representando um usuário ou valor
        //         // isso é falso/nulo se as credenciais forem inválidas.
        //         // por exemplo. return { id: 1, nome: 'J Smith', e-mail: 'jsmith@example.com' }
        //         // Você também pode usar o objeto `req` para obter parâmetros adicionais
        //         // (ou seja, o endereço IP da solicitação)
        //         const res = await fetch("/users/login", {
        //             method: "POST",
        //             body: JSON.stringify(credentials),
        //             headers: { "Content-Type": "application/json" },
        //         });
        //         const user = await res.json();

        //         // If no error and we have user data, return it
        //         if (res.ok && user) {
        //             return user;
        //         }
        //         // Return null if user data could not be retrieved
        //         return null;
        //     },
        // }),
        // EmailProvider({
        //     server: process.env.EMAIL_SERVER,
        //     from: process.env.EMAIL_FROM,

        //     // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
        // }),

        // FacebookProvider({
        //   clientId: process.env.FACEBOOK_ID,
        //   clientSecret: process.env.FACEBOOK_SECRET,
        // }),

        GoogleProvider({
            clientId: String(process.env.GOOGLE_ID),
            clientSecret: String(process.env.GOOGLE_SECRET),
            // authorization: { params: { scope: "" } },
        }),

        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),

        // {
        //     id: "customProvider",
        //     name: "CustomProvider",
        //     type: "oauth",
        //     scope: "", // Make sure to request the users email address
        // },
    ],
    callbacks: {
        async jwt({ token, account }) {
            token.userRole = "admin";

            if (account) {
                console.log("jwt::account::", account);
                token.accessToken = account.access_token;
            }

            console.log("jwt::nextauth::token::", token);

            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;

            console.log("nextauth::session::session::", session);
            console.log("nextauth::session::token", token);

            return session;
        },
        async signIn({ user, account, profile }) {
            // user:: {
            //     id: '1234',
            //     name: 'Nome do Usuario',
            //     email: 'email_usuario@gmail.com',
            //     image: 'https://fotoURL'
            //   }
            //account:: {
            //     provider: 'google',
            //     type: 'oauth',
            //     providerAccountId: '1234',
            //     access_token: 'abc1234',
            //     expires_at: 1652899896,
            //     scope: 'https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile',
            //     token_type: 'Bearer',
            //     id_token: 'abc1234.......'
            //   }
            //profile:: {
            //     iss: 'https://accounts.google.com',
            //     azp: 'abc.apps.googleusercontent.com',
            //     aud: 'abc.apps.googleusercontent.com',
            //     sub: '1234',
            //     email: 'email_usuario@gmail.com',
            //     email_verified: true,
            //     at_hash: 'abc0123',
            //     name: 'Nome do usuário',
            //     picture: 'https://fotoURL',
            //     given_name: 'PrimeiroNome',
            //     family_name: 'UltimoNome',
            //     locale: 'pt-BR',
            //     iat: 1652896297,
            //     exp: 1652899897
            //   }

            const { email, name, image } = user;

            if (!email) {
                console.log("Email não existe no User autenticado");
                return false;
            }

            await createOrUpdateUser({
                name: name ?? "",
                email,
                image: image ?? null,
            });

            return true;
        },
    },
});
