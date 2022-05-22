import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import axios from "../lib/axios";
import { Task } from "@prisma/client";
import toast, { Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { AiFillCopy, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
import {
    Header,
    InputAndButton,
    Button,
    TextArea,
    ButtonMiniIcon,
    CrudModal,
} from "@/components/Index";

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

export type DataEditType = {
    id?: string;
    title?: string;
};

export type typeSubmitCrudType = "new" | "edit" | "delete";

export default function App() {
    const [searchText, setSearchText] = useState("");
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [dataEdit, setDataEdit] = useState<DataEditType>();
    const [search, setSearch] = useState(false);
    const [data, setData] = useState<Task[]>([]);
    const [typeSubmit, setTypeSubmit] = useState<typeSubmitCrudType>("new");

    useEffect(() => {
        setSearch(true);
    }, []);
    useEffect(() => {
        async function getSearch() {
            if (search === false) {
                return false;
            }
            try {
                const response = await axios.get(`/tasks?search=${searchText}`);
                setData(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setSearch(false);
            }
        }

        getSearch();
    }, [search, searchText]);

    async function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSearch(true);
    }

    async function handleCopyText(text: string) {
        navigator.clipboard.writeText(text);
        toast.success(`Copiado para area de transferência`);
    }

    async function handleDeleteData({ id, title }: Task) {
        setTypeSubmit("delete");
        setDataEdit({ id, title });

        setIsOpenModal(true);
    }

    async function handleAlterData({ id, title }: DataEditType) {
        setTypeSubmit("edit");
        setDataEdit({ id, title });

        setIsOpenModal(true);
    }

    async function handleNewData() {
        setTypeSubmit("new");
        setDataEdit(undefined);

        setIsOpenModal(true);
    }

    return (
        <>
            <CrudModal
                endPoint="/tasks"
                typeSubmit={typeSubmit}
                data={dataEdit}
                setData={setDataEdit}
                setIsOpen={setIsOpenModal}
                isOpen={isOpenModal}
                handleFinally={() => {
                    setSearch(true);
                }}
            />
            <div className="flex flex-col  w-screen  ">
                <Header />
                <Toaster position="bottom-center" />

                <div className="max-w-4xl px-5 mx-auto w-screen mt-10  ">
                    <div className="mb-5">
                        <Button type="button" onClick={handleNewData}>
                            <AiOutlinePlus className="text-2xl" /> Incluir Novo
                        </Button>
                    </div>

                    <form className="mb-5" onSubmit={handleSearchSubmit}>
                        <InputAndButton
                            titleButton={`Pesquisar ${search ? "..." : ""}`}
                            placeholder="Buscar Registros"
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </form>

                    {data &&
                        data.map((item, index) => (
                            <div key={index}>
                                <div className="dark:bg-slate-800  bg-slate-200 rounded-lg ">
                                    <div className="m-1 p-1">
                                        <TextArea
                                            disabled
                                            className="border-0"
                                            value={item.title}
                                        ></TextArea>
                                    </div>

                                    <div className=" flex justify-between  mb-3 p-2  text-base ">
                                        <span className="text-xs opacity-50">
                                            {item.createdAt &&
                                                new Intl.DateTimeFormat(
                                                    "pt-BR",
                                                    {
                                                        dateStyle: "full",
                                                        timeStyle: "short",
                                                    }
                                                ).format(
                                                    new Date(item.createdAt)
                                                )}
                                        </span>

                                        <div className="flex">
                                            <ButtonMiniIcon
                                                title="Copiar"
                                                className="hover:text-green-500"
                                                onClick={() =>
                                                    handleCopyText(item.title)
                                                }
                                            >
                                                <AiFillCopy className="text-base" />
                                            </ButtonMiniIcon>

                                            <ButtonMiniIcon
                                                title="Alterar"
                                                className="hover:text-blue-500"
                                                onClick={() =>
                                                    handleAlterData(item)
                                                }
                                            >
                                                <AiFillEdit className="text-xl" />
                                            </ButtonMiniIcon>

                                            <ButtonMiniIcon
                                                title="Deletar"
                                                className="hover:text-red-500"
                                                onClick={() =>
                                                    handleDeleteData(item)
                                                }
                                            >
                                                <FaTrash className="text-sm" />
                                            </ButtonMiniIcon>
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
