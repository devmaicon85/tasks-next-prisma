import { NextApiRequest, NextApiResponse } from "next";
import { editTask } from "../../../lib/db/tasks";
import prisma from "../../../lib/prisma";

async function edit(req: NextApiRequest, res: NextApiResponse) {
    const { title, isDone } = req.body;
    const { id }: any = req;
    const { method } = req;

    if (method === "PUT") {
        const task = await editTask({
            id,
            title,
            isDone,
        });
        return res.status(200).json(task);
    }
    res.status(404).json({ message: "página não encontrada" });
}
export default edit;
