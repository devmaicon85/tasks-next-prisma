import { HttpMethod } from "@/types/http";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

import { updateCreateTask, deleteTask, searchTasks } from "@/lib/api/tasks";
import { authOptions } from "./auth/[...nextauth]";

export default async function tasks(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession({ req, res }, authOptions);
    if (!session) return res.status(401).end();

    if (!session.user.id)
        return res
            .status(500)
            .end("O servidor falhou ao obter o ID do usuário da sessão");

    const token = await getToken({ req, secret });
    if (!token) return res.status(401).end();

    switch (req.method) {
        case HttpMethod.POST:
            return await updateCreateTask(req, res, session);
        case HttpMethod.DELETE:
            return await deleteTask(req, res, session);
        case HttpMethod.GET:
            return await searchTasks(req, res, session);
        case HttpMethod.PUT:
            return await updateCreateTask(req, res, session);

        default:
            res.setHeader("Allow", [
                HttpMethod.GET,
                HttpMethod.POST,
                HttpMethod.PUT,
                HttpMethod.DELETE,
            ]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
