import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { createTask } from "../../../lib/dbPrisma/tasks";
import { getUserByEmail } from "../../../lib/dbPrisma/users";
import getUserAuthenticated from "../users/getUserAuthenticated";

async function create(req: NextApiRequest, res: NextApiResponse) {
    // cadastra a task no usuario logado
    const { title } = req.body;
    const { method } = req;

    console.log("task:create:method::", method);

    if (method === "POST") {
        try {
            const { id: userId } = await getUserAuthenticated(req);
            const task = await createTask({ title, userId });
            return res.status(200).json(task);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
}
export default create;