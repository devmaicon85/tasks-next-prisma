import { Header } from "@/components/Header";
import { InputAndButton } from "@/components/InputAndButton";
import { CrudModal, TypeSubmitCrud } from "@/components/modals/CrudModal";
import { Faq } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
    AiFillCopy,
    AiFillEdit,
    AiOutlineLoading,
    AiOutlinePlusCircle,
} from "react-icons/ai";
import { CgSearch } from "react-icons/cg";
import { FaTrash } from "react-icons/fa";
import { MdOutlineManageSearch, MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import axios from "../../lib/axios";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     // const session = await getSession({ req: context.req });
//     // if (!session) {
//     //     return {
//     //         redirect: {
//     //             destination: "/login",
//     //             permanent: false,
//     //         },
//     //     };
//     // }
//     // return {
//     //     props: { session },
//     // };
// };

export type DataFaqType = {
    id: string | null;
    title: string | null;
    description: string | null;
    isPublic: boolean | false;
    keywords: string | null;
};

export default function App() {
    const { data: session } = useSession();

    const [searchText, setSearchText] = useState("");
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [search, setSearch] = useState(true);
    const [data, setData] = useState<Faq[]>([]);

    const searchParams = new URLSearchParams(
        typeof window === "undefined" ? "" : window.location.search
    );

    const [dataEdit, setDataEdit] = useState<DataFaqType>({
        id: "",
        title: "",
        description: "",
        keywords: "",
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
                const response = await axios.get(`/faq?search=${searchText}`);
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
        data: DataFaqType = {
            id: "",
            title: "",
            description: "",
            isPublic: false,
            keywords: "",
        }
    ) {
        // abre o modal com os dados
        setTypeSubmit(type);
        setDataEdit(data);
        setIsOpenModal(true);
    }

    return (
        <>
            <CrudModal
                endPoint="/faq"
                typeSubmit={typeSubmit}
                data={dataEdit}
                setIsOpen={setIsOpenModal}
                isOpen={isOpenModal}
                handleFinally={() => {
                    setSearch(true);
                }}
            >
                <>
                    <input // title
                        disabled={typeSubmit === "delete"}
                        autoFocus
                        required
                        placeholder="título do registro..."
                        onChange={(e) =>
                            setDataEdit({
                                ...dataEdit,
                                title: String(e.target.value),
                            })
                        }
                        className="input input-primary"
                        value={String(dataEdit?.title)}
                    />
                    <div className="h-2"></div>
                    <textarea // description
                        className="input input-primary"
                        rows={4}
                        disabled={typeSubmit === "delete"}
                        required
                        placeholder="descrição do registro..."
                        onChange={(e) =>
                            setDataEdit({
                                ...dataEdit,
                                description: String(e.target.value),
                            })
                        }
                        value={String(dataEdit.description)}
                    />
                    <div className="h-4"></div>
                    <div className="flex items-center gap-2 text-sm ">
                        <input
                            type="checkbox"
                            className="input input-primary checkbox"
                            defaultChecked={dataEdit.isPublic}
                            onChange={(e) =>
                                setDataEdit({
                                    ...dataEdit,
                                    isPublic: Boolean(!dataEdit.isPublic),
                                })
                            }
                        />
                        É público?{" "}
                        <div className="text-xs">
                            será exibido na busca da api pública
                        </div>
                    </div>
                </>
            </CrudModal>
            <div className="flex flex-col w-screen ">
                <Header />
                <Toaster position="bottom-center" />

                <div className="w-screen max-w-4xl px-5 mx-auto mt-10 ">
                    <div className="mb-5">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => openModalCrud("new")}
                        >
                            <AiOutlinePlusCircle className="text-2xl" /> Inserir
                            Novo
                        </button>
                    </div>
                    <form className="mb-5" onSubmit={handleSearchSubmit}>
                        <InputAndButton
                            iconInput={<MdOutlineManageSearch />}
                            iconButton={
                                search ? (
                                    <AiOutlineLoading className="text-xl animate-spin" />
                                ) : (
                                    <CgSearch />
                                )
                            }
                            titleButton={`${search ? "Buscando" : "Buscar"}`}
                            placeholder="Buscar Registros"
                            onChange={(e) => setSearchText(e.target.value)}
                            disabled={search}
                        />
                    </form>
                    {data.length > 0 && (
                        <div className="flex justify-end w-full mb-3 text-sm">
                            <Link
                                href={`${searchParams}/api/public/faq?key=${session?.user.id}&per_page=3&search=`}
                                passHref
                            >
                                <a target="_blank" className="hover:underline">
                                    Acessar api pública para acesso externo
                                </a>
                            </Link>
                        </div>
                    )}
                    {data &&
                        data.map((faq, index) => (
                            <div key={index}>
                                <div className="justify-center rounded-lg dark:bg-slate-800 bg-slate-200 ">
                                    <div>
                                        <div className="flex ">
                                            <input
                                                disabled
                                                className="input input-primary"
                                                value={faq.title}
                                            />
                                            <div className="flex items-center justify-center w-10 h-auto text-gray-500 bg-transparent">
                                                {faq.isPublic ? (
                                                    <MdOutlinePublic title="público" />
                                                ) : (
                                                    <RiGitRepositoryPrivateLine title="privado" />
                                                )}
                                            </div>
                                        </div>
                                        <textarea
                                            cols={1}
                                            disabled
                                            className="border-0 input input-primary"
                                            value={faq.description ?? ""}
                                        ></textarea>
                                    </div>

                                    <div className="flex justify-between p-2 mb-2 text-base ">
                                        <span className="text-xs opacity-50">
                                            {faq.createdAt &&
                                                new Intl.DateTimeFormat(
                                                    "pt-BR",
                                                    {
                                                        dateStyle: "full",
                                                        timeStyle: "short",
                                                    }
                                                ).format(
                                                    new Date(faq.createdAt)
                                                )}
                                        </span>

                                        <div className="flex">
                                            <button
                                                title="Copiar"
                                                className="border-0 hover:text-green-500 btn btn-mini btn-default"
                                                onClick={() =>
                                                    handleCopyText(
                                                        String(faq.description)
                                                    )
                                                }
                                            >
                                                <AiFillCopy className="text-base" />
                                            </button>

                                            <button
                                                title="Alterar"
                                                className="border-0 hover:text-blue-500 btn btn-mini btn-default"
                                                onClick={() =>
                                                    openModalCrud("edit", faq)
                                                }
                                            >
                                                <AiFillEdit className="text-xl" />
                                            </button>

                                            <button
                                                title="Deletar"
                                                className="border-0 hover:text-red-500 btn btn-mini btn-default"
                                                onClick={() =>
                                                    openModalCrud("delete", faq)
                                                }
                                            >
                                                <FaTrash className="text-sm" />
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
