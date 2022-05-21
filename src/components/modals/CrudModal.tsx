import { useState } from "react";
import { FaTasks } from "react-icons/fa";
import { Button, ModalBase, TextArea } from "@/components/Index";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

type PropsType = {
    handleFinally: () => void;
    setIsOpen: (open: boolean) => void;
    isOpen: boolean;
    data?: any;
    setData: (data: any) => void;
    typeSubmit: "new" | "edit" | "delete";
    endPoint: string;
};
export function CrudModal({
    handleFinally,
    setIsOpen,
    isOpen,
    data,
    setData,
    typeSubmit,
    endPoint,
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
                    <TextArea
                        rows={4}
                        disabled={typeSubmit === "delete"}
                        autoFocus
                        required
                        placeholder="descrição do registro..."
                        onChange={(e) =>
                            setData({
                                ...data,
                                title: e.target.value,
                            })
                        }
                        value={data?.title}
                    />

                    <div className="mt-4 flex justify-end">
                        <div>
                            <Button
                                type="submit"
                                color={
                                    typeSubmit === "delete" ? "red" : "green"
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
