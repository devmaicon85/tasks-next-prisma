import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { getUserByEmail } from "../../../lib/dbPrisma/users";

async function getUserAuthenticated(req: NextApiRequest) {
    const session = await getSession({ req });

    if (!session) {
        throw new Error("usuário não esta autenticado?");
    }

    const email = session?.user?.email;
    if (!email) {
        throw new Error("usuário logado não tem email?");
    }

    const user = await getUserByEmail(email);

    if (!user) {
        throw new Error("usuário autenticado não encontrado");
    }

    return user;
}
export default getUserAuthenticated;
