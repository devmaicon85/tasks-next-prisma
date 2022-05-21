import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

import axios from "../../lib/axios";
import { Task } from "@prisma/client";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { AiFillCopy } from "react-icons/ai";
import { Session } from "next-auth";
import { Header, InputButton, Button, TextArea } from "@/components/Index";
import { FcPlus } from "react-icons/fc";
import { ConfigurationModal } from "@/components/modals/ConfigurationModal";
import { NewTaskModal } from "@/components/modals/NewTaskModal";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
};

export default function App() {
    const [searchTitle, setSearchTitle] = useState("");

    // const { data: session } = useSession();

    const [deleting, setDeleting] = useState(false);
    const [search, setSearch] = useState(false);

    const [isOpenModalNewTask, setIsOpenModalNewTask] = useState(false);

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

    async function handleDelete(id: string) {
        setDeleting(true);
        try {
            const response = await axios.delete(`/tasks?id=${id}`);
            if (response) {
                setSearch(true);
                toast.success(`Registro deletado com sucesso`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setDeleting(false);
        }
    }

    async function handleCopyText(text: string) {
        navigator.clipboard.writeText(text);
        toast.success(`Copiado para area de transferência`);
    }
    return (
        <>
            <div className="flex flex-col h-screen w-screen dark:bg-slate-700 dark:text-white text-slate-700 ">
                <Toaster
                    position="bottom-center"
                    toastOptions={{
                        duration: 10000,
                    }}
                />

                <Header />

                <div className="max-w-4xl p-4 mx-auto w-screen mt-10 ">
                    <div className="mb-5">
                        <NewTaskModal
                            handleFinally={() => {
                                setSearch(true);
                            }}
                            setIsOpen={setIsOpenModalNewTask}
                            isOpen={isOpenModalNewTask}
                        />

                        <Button
                            type="button"
                            onClick={() => setIsOpenModalNewTask(true)}
                        >
                            <FcPlus className="text-xl" /> Incluir Novo
                        </Button>
                    </div>

                    <form className="mb-5" onSubmit={handleSearchSubmit}>
                        <InputButton
                            titleButton="Buscar"
                            placeholder="Buscar Registros"
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
                                <div className=" relative justify-center dark:bg-slate-800  bg-slate-200 rounded-lg ">
                                    <TextArea
                                        disabled
                                        value={task.title}
                                    ></TextArea>

                                    <div className=" flex justify-between  mb-6 p-2  text-base ">
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

                                        <div className="flex">
                                            <button
                                                title="copiar"
                                                className={`hover:scale-110 mx-3 hover:cursor-pointer text-xl hover:text-blue-500`}
                                                onClick={() =>
                                                    handleCopyText(task.title)
                                                }
                                            >
                                                <AiFillCopy />
                                            </button>

                                            <button
                                                title="deletar"
                                                disabled={deleting}
                                                className={`${
                                                    deleting
                                                        ? "cursor-not-allowed"
                                                        : ""
                                                } hover:scale-110 hover:cursor-pointer hover:text-red-600`}
                                                onClick={() =>
                                                    handleDelete(task.id)
                                                }
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
