import { useState } from "react";
import { FaTasks } from "react-icons/fa";
import { Button, ModalBase, TextArea } from "@/components/Index";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { TypeSubmitCrud } from "pages/dashboard";

type PropsType = {
    handleFinally: () => void;
    setIsOpen: (open: boolean) => void;
    isOpen: boolean;
    data?: any;
    // setData: (data: any) => void;
    typeSubmit: TypeSubmitCrud;
    endPoint: string;
    children: React.ReactElement;
};
export function CrudModal({
    handleFinally,
    setIsOpen,
    isOpen,
    data,
    // setData,
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
            ? "Inserindo Registro"
            : typeSubmit === "edit"
            ? "Editando Registro"
            : "Deseja excluir esse registro?";

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
                            <Button
                                type="submit"
                                className={
                                    typeSubmit === "delete"
                                        ? "bg-theme-light-danger"
                                        : ""
                                }
                            >
                                {nameButton} {loading && "..."}
                            </Button>
                        </div>
                    </div>
                </form>
            </ModalBase>
        </>
    );
}
