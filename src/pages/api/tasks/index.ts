import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getAllTasks } from "../../../lib/dbPrisma/tasks";
import getUserAuthenticated from "../users/getUserAuthenticated";

async function index(req: NextApiRequest, res: NextApiResponse) {
    // busca tasks somente do usuario autenticado
    const { method } = req;

    if (method === "GET") {
        try {
            const { id: userId } = await getUserAuthenticated(req);
            const task = await getAllTasks(userId);
            return res.status(200).json(task);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    res.setHeader("Allow", "GET");
    res.status(405).end("Method not allowed");
}
export default index;
