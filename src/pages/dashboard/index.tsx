import { GetServerSideProps } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { Task } from "@prisma/client";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch, FaTrash } from "react-icons/fa";
import Header from "@/components/Header";
import Link from "next/link";
import Button from "@/components/Button";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { SearchCircleIcon } from "@heroicons/react/outline";
import { MdOutlineManageSearch } from "react-icons/md";
import InputButton from "@/components/InputButton";

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
    const [searchTitle, setSearchTitle] = useState("");

    const { data: session } = useSession();

    const [deleting, setDeleting] = useState(false);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState(false);

    const [tasks, setTasks] = useState<Task[]>([]);

    const router = useRouter();

    useEffect(() => {
        setSearch(true);
    }, []);
    useEffect(() => {
        async function getSearchTasks() {
            if (search === false) {
                return false;
            }

            try {
                const response = await axios.get(
                    `/tasks?search=${searchTitle}`
                );
                setTasks(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setSearch(false);
            }
        }

        getSearchTasks();
    }, [search, searchTitle]);

    async function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSearch(true);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setSaving(true);
        try {
            const response = await axios.post("/tasks", {
                title,
            });

            if (response) {
                setSearch(true);
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
                setSearch(true);
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
                setSearch(true);
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

            <Header />

            <div className="flex flex-col h-full w-screen ">
                <div className="max-w-4xl p-4 mx-auto w-screen mt-32 ">
                    <form className="mb-5" onSubmit={handleSearchSubmit}>
                        <InputButton
                            titleButton="Buscar"
                            placeholder="Buscar Tarefas"
                            onChange={(e) => setSearchTitle(e.target.value)}
                        />
                        <span className="text-sm opacity-70 w-full flex justify-center p-3">
                            {search && "Buscando..."}
                        </span>
                    </form>

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

                                    <div className=" flex justify-between mb-6 p-4 space-x-2 text-slate-400 text-base ">
                                        <span className="text-xs">
                                            {task.createdAt &&
                                                new Intl.DateTimeFormat(
                                                    "pt-BR",
                                                    {
                                                        dateStyle: "full",
                                                        timeStyle: "short",
                                                    }
                                                ).format(
                                                    new Date(task.createdAt)
                                                )}
                                        </span>

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

                    <div className="relative">
                        <form onSubmit={handleSubmit}>
                            <TextArea
                                rows={4}
                                required
                                placeholder="digite aqui uma nova tarefa para hoje.."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <span className="absolute mt-3 h-8 font-mono text-sm flex w-full items-center justify-center">
                                {saving && "Salvando..."}
                            </span>
                            <span className="right-0 absolute mt-3">
                                <Button type="submit">Salvar Tarefa</Button>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
