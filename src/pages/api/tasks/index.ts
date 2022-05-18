import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

async function create(req: NextApiRequest, res: NextApiResponse) {
    const { title } = req.body;

    const { method } = req;

    if (method === "GET") {
        const task = await prisma.task.create({
            data: {
                title,
                isDone: false,
            },
        });
        return res.status(200).json(task);
    }

    res.status(404).json({ message: "Página não encontrada" });
}
export default create;
