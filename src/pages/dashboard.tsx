import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import axios from "../lib/axios";
import { Task } from "@prisma/client";
import toast, { Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import {
    AiFillCopy,
    AiFillEdit,
    AiOutlineFileSearch,
    AiOutlinePlusCircle,
} from "react-icons/ai";

import { RiGitRepositoryPrivateLine } from "react-icons/ri";

import { CgSearch } from "react-icons/cg";
import {
    Header,
    InputAndButton,
    Button,
    TextArea,
    ButtonMiniIcon,
    CrudModal,
    Input,
    TypeSubmitCrud,
    Checkbox,
} from "@/components/Index";
import Link from "next/link";
import { MdOutlineManageSearch, MdOutlinePublic } from "react-icons/md";

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

export type DataTasksType = {
    id: string | null;
    title: string | null;
    description: string | null;
    isPublic: boolean | false;
};

export default function App() {
    const { data: session } = useSession();

    const [searchText, setSearchText] = useState("");
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [search, setSearch] = useState(false);
    const [data, setData] = useState<Task[]>([]);

    const searchParams = new URLSearchParams(
        typeof window === "undefined" ? "" : window.location.search
    );

    const [taskEdit, setTaskEdit] = useState<DataTasksType>({
        id: "",
        title: "",
        description: "",
        isPublic: false,
    });
    const [typeSubmit, setTypeSubmit] = useState<TypeSubmitCrud>("new");

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

    async function openModalCrud(
        type: TypeSubmitCrud,
        data: DataTasksType = {
            id: "",
            title: "",
            description: "",
            isPublic: false,
        }
    ) {
        // abre o modal com os dados
        setTypeSubmit(type);
        setTaskEdit(data);
        setIsOpenModal(true);
    }

    return (
        <>
            <CrudModal
                endPoint="/tasks"
                typeSubmit={typeSubmit}
                data={taskEdit}
                setIsOpen={setIsOpenModal}
                isOpen={isOpenModal}
                handleFinally={() => {
                    setSearch(true);
                }}
            >
                <>
                    <Input // title
                        disabled={typeSubmit === "delete"}
                        autoFocus
                        required
                        placeholder="título do registro..."
                        onChange={(e) =>
                            setTaskEdit({
                                ...taskEdit,
                                title: String(e.target.value),
                            })
                        }
                        value={String(taskEdit?.title)}
                    />

                    <div className="h-2"></div>

                    <TextArea // description
                        rows={4}
                        disabled={typeSubmit === "delete"}
                        required
                        placeholder="descrição do registro..."
                        onChange={(e) =>
                            setTaskEdit({
                                ...taskEdit,
                                description: String(e.target.value),
                            })
                        }
                        value={String(taskEdit.description)}
                    />

                    <div className="h-4"></div>

                    <Checkbox
                        checked={taskEdit.isPublic}
                        onClick={(e) =>
                            setTaskEdit({
                                ...taskEdit,
                                isPublic: Boolean(!taskEdit.isPublic),
                            })
                        }
                    >
                        É público?{" "}
                        <div className="text-xs">
                            será exibido na busca da api pública
                        </div>
                    </Checkbox>
                </>
            </CrudModal>
            <div className="flex flex-col  w-screen  ">
                <Header />
                <Toaster position="bottom-center" />

                <div className="max-w-4xl px-5 mx-auto w-screen mt-10  ">
                    <div className="mb-5">
                        <Button
                            icon={<AiOutlinePlusCircle className="text-2xl" />}
                            type="button"
                            onClick={() => openModalCrud("new")}
                        >
                            Incluir Novo
                        </Button>
                    </div>
                    <form className="mb-5" onSubmit={handleSearchSubmit}>
                        <InputAndButton
                            iconInput={<MdOutlineManageSearch />}
                            iconButton={<CgSearch />}
                            titleButton={`Pesquisar ${search ? "..." : ""}`}
                            placeholder="Buscar Registros"
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </form>
                    {data.length > 0 && (
                        <div className="text-sm w-full mb-3 justify-end flex">
                            <Link
                                href={`${searchParams}/api/public/tasks?key=${session?.user.id}&search=`}
                                passHref
                            >
                                <a target="_blank" className="hover:underline">
                                    Acessar api pública para acesso externo
                                </a>
                            </Link>
                        </div>
                    )}
                    {data &&
                        data.map((task, index) => (
                            <div key={index}>
                                <div className="dark:bg-slate-800 justify-center  bg-slate-200 rounded-lg ">
                                    <div>
                                        <div className="flex ">
                                            <Input
                                                disabled
                                                className="border-0"
                                                value={task.title}
                                            />
                                            <div className=" text-theme-light-text-secondary bg-transparent h-auto w-10 flex justify-center items-center">
                                                {task.isPublic ? (
                                                    <MdOutlinePublic title="público" />
                                                ) : (
                                                    <RiGitRepositoryPrivateLine title="privado" />
                                                )}
                                            </div>
                                        </div>
                                        <TextArea
                                            cols={1}
                                            disabled
                                            className="border-0"
                                            value={task.description ?? ""}
                                        ></TextArea>
                                    </div>

                                    <div className=" flex justify-between  mb-2 p-2  text-base ">
                                        <span className="text-xs opacity-50">
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
                                            <ButtonMiniIcon
                                                title="Copiar"
                                                className="hover:text-green-500"
                                                onClick={() =>
                                                    handleCopyText(
                                                        String(task.description)
                                                    )
                                                }
                                            >
                                                <AiFillCopy className="text-base" />
                                            </ButtonMiniIcon>

                                            <ButtonMiniIcon
                                                title="Alterar"
                                                className="hover:text-blue-500"
                                                onClick={() =>
                                                    openModalCrud("edit", task)
                                                }
                                            >
                                                <AiFillEdit className="text-xl" />
                                            </ButtonMiniIcon>

                                            <ButtonMiniIcon
                                                title="Deletar"
                                                className="hover:text-red-500"
                                                onClick={() =>
                                                    openModalCrud(
                                                        "delete",
                                                        task
                                                    )
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
