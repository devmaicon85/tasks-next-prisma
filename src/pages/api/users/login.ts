import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { createTask } from "../../../lib/dbPrisma/tasks";
import {
    createOrUpdateUser,
    getUserByEmail,
} from "../../../lib/dbPrisma/users";
import getUserAuthenticated from "./getUserAuthenticated";

async function login(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;
    const { method } = req;

    if (method === "POST") {
        try {
            const user = await getUserByEmail(email);
            if (user?.password === password) {
                return true;
            } else {
                return false;
            }
            res.status(200).json({ name: user?.name, email: user?.email });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
}
export default login;
