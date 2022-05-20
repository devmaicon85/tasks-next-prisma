import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { GiMagnifyingGlass } from "react-icons/gi";

import React, { useEffect, useState } from "react";
import { FaAsterisk, FaEdit, FaTrash } from "react-icons/Fa";
import axios from "../../lib/axios";
import { getAllTasks } from "../../lib/api/tasks";
import { Task } from "@prisma/client";
import { useRouter } from "next/router";

import toast, { Toaster } from "react-hot-toast";
import { FcOk, FcPlus, FcSearch } from "react-icons/fc";

export const getServerSideProps: GetServerSideProps = async ({
    req,
    params,
}) => {
    const session = await getSession({ req });

    if (!session?.user.id) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

export default function App() {
    const [title, setTitle] = useState("");

    const { data: session } = useSession();

    const [deleting, setDeleting] = useState(false);
    const [saving, setSaving] = useState(false);

    const [tasks, setTasks] = useState<Task[]>([]);

    const router = useRouter();

    async function getTasks() {
        try {
            const response = await axios.get("/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTasks();
    }, []);

    // useEffect(() => {
    //     if (session?.error === "RefreshAccessTokenError") {
    //         signIn(); // Forçar login para resolver o erro
    //     }
    // }, [session]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setSaving(true);
        try {
            const response = await axios.post("/tasks", {
                title,
            });

            if (response) {
                getTasks();
                toast.success(`Tarefa foi salva com sucesso`);
                setTitle("");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    }
    async function handleDelete(id: string) {
        setDeleting(true);
        try {
            const response = await axios.delete(`/tasks?id=${id}`);
            if (response) {
                getTasks();
                toast.success(`Tarefa foi deletada com sucesso`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setDeleting(false);
        }
    }

    async function handleAlterTask(task: Task) {
        setSaving(true);
        try {
            const response = await axios.put(`/tasks?id=${task.id}`, {
                task,
            });
            if (response) {
                getTasks();
                toast.success(`Tarefa foi alterada com sucesso`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSaving(false);
        }
    }
    return (
        <>
            <Toaster
                position="bottom-center"
                toastOptions={{
                    duration: 10000,
                }}
            />

            <div className="flex flex-col h-full w-screen ">
                <nav className="flex z-10 fixed w-full justify-center p-4 bg-gray-600">
                    <div className="text-white  flex gap-4 justify-center items-center">
                        {session?.user?.image && (
                            <Image
                                src={session.user?.image!}
                                alt="avatar"
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                        )}
                        <span className="text-base">
                            {session?.user?.email}
                        </span>
                    </div>
                </nav>
                <div className="max-w-4xl mx-auto w-screen mt-32 ">
                    <label
                        htmlFor="default-task-input"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                    >
                        Salvar Tarefa
                    </label>
                    <div className="relative mb-16">
                        {/* <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <FcPlus className="text-xl" />
                            </div> */}
                        <form onSubmit={handleSubmit}>
                            <textarea
                                rows={4}
                                id="default-task-input"
                                className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                required
                                placeholder="descreva aqui a tarefa a ser realizada..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></textarea>
                            <button
                                type="submit"
                                className="text-white flex-1 hover:scale-105 right-0 absolute mt-3 bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                                Salvar Tarefa
                            </button>
                        </form>
                    </div>

                    {tasks &&
                        tasks.map((task, index) => (
                            <div
                                key={index}
                                className="max-w-4xl w-fullp-2  rounded-lg"
                            >
                                <div className=" relative justify-center bg-slate-50 rounded-lg ">
                                    <textarea
                                        disabled
                                        value={task.title}
                                        rows={4}
                                        className="block p-4 w-full text-sm text-gray-900  rounded-md border border-gray-100 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                    ></textarea>

                                    <div className=" flex justify-end mb-6 p-4 space-x-2 text-slate-400 text-base ">
                                        {/* <button
                                            className={`hover:scale-110 hover:cursor-pointer hover:text-green-700`}
                                            onClick={() =>
                                                handleAlterTask(task)
                                            }
                                        >
                                            <FcOk className="text-xl" />
                                        </button> */}
                                        <button
                                            disabled={deleting}
                                            className={`${
                                                deleting
                                                    ? "cursor-not-allowed"
                                                    : ""
                                            } hover:scale-110 hover:cursor-pointer text-red-600`}
                                            onClick={() =>
                                                handleDelete(task.id)
                                            }
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
