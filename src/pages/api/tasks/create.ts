import { NextApiRequest, NextApiResponse } from "next";
import { createTask } from "../../../lib/db/tasks";

async function create(req: NextApiRequest, res: NextApiResponse) {
    const { title } = req.body;

    const { method } = req;

    if (method === "POST") {
        const task = await createTask({ title });
        return res.status(200).json(task);
    }

    res.status(404).json({ message: "página não encontrada" });
}
export default create;
