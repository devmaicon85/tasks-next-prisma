import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { createTask } from "../../../lib/dbPrisma/tasks";
import {
    createOrUpdateUser,
    getUserByEmail,
} from "../../../lib/dbPrisma/users";
import getUserAuthenticated from "../users/getUserAuthenticated";

async function create(req: NextApiRequest, res: NextApiResponse) {
    const { email, name, image } = req.body;
    const { method } = req;

    if (method === "POST") {
        try {
            const user = await createOrUpdateUser({ email, name, image });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
}
export default create;
