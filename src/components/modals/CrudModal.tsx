import axios from "@/lib/axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillDelete, AiFillSave } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { ModalBase } from "./ModalBase";

export type TypeSubmitCrud = "new" | "edit" | "delete";

type PropsType = {
    handleFinally: () => void;
    setIsOpen: (open: boolean) => void;
    isOpen: boolean;
    data?: any;
    typeSubmit: TypeSubmitCrud;
    endPoint: string;
    children: React.ReactElement;
};
export function CrudModal({
    handleFinally,
    setIsOpen,
    isOpen,
    data,
    typeSubmit,
    endPoint,
    children,
}: PropsType) {
    const [loading, setLoading] = useState(false);

    const nameButton =
        typeSubmit === "new" || typeSubmit === "edit"
            ? "Salvar Registro"
            : "Excluir Registro";

    const descriptionModal =
        typeSubmit === "new"
            ? "Inserindo "
            : typeSubmit === "edit"
            ? "Editando"
            : "Excluir o registro?";

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        try {
            if (typeSubmit === "new") {
                await axios.post(endPoint, data);
                toast.success(`Registro salvo com sucesso`);
            }
            if (typeSubmit === "edit") {
                await axios.put(endPoint, data);
                toast.success(`Registro alterado com sucesso`);
            }
            if (typeSubmit === "delete" && data?.id) {
                await axios.delete(`${endPoint}?id=${data.id}`);
                toast.success(`Registro excluído com sucesso`);
            }

            handleFinally();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setIsOpen(false);
        }
    }

    return (
        <>
            <ModalBase
                title={descriptionModal}
                icon={<FaTasks className=" text-3xl " />}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <form onSubmit={handleSubmit}>
                    <span
                        className={`text-sm opacity-50 mb-2 w-full flex justify-end`}
                    >
                        {data?.id}
                    </span>
                    {children}

                    <div className="mt-4 flex justify-end">
                        <div>
                            <button
                                type="submit"
                                className={` btn 
                                    ${
                                        typeSubmit === "delete"
                                            ? "btn-danger"
                                            : "btn-primary"
                                    }
                                `}
                            >
                                {typeSubmit === "new" ||
                                typeSubmit === "edit" ? (
                                    <AiFillSave />
                                ) : (
                                    <AiFillDelete />
                                )}
                                {nameButton} {loading && "..."}
                            </button>
                        </div>
                    </div>
                </form>
            </ModalBase>
        </>
    );
}
