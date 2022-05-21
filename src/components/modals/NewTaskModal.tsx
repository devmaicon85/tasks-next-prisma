import Modal from "react-modal";
import { useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { Button, ModalBase, TextArea } from "@/components/Index";
import { DataEditType } from "pages/dashboard";

type PropsType = {
    handleFinally: () => void;
    setIsOpen: (open: boolean) => void;
    isOpen: boolean;
    data?: DataEditType;
    setData: (data: DataEditType) => void;
};
export function NewTaskModal({
    handleFinally,
    setIsOpen,
    isOpen,
    data,
    setData,
}: PropsType) {
    const [saving, setSaving] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setSaving(true);
        try {
            const response = await axios.post("/tasks", data);

            if (response) {
                handleFinally();
                toast.success(`Registro salvo com sucesso`);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
            setIsOpen(false);
        }
    }

    return (
        <>
            <ModalBase
                title={data?.id ? "Alterando Registro" : "Inserindo Registro"}
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
                        autoFocus
                        rows={4}
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
                            <Button type="submit">
                                {!saving ? "Salvar" : "Salvando..."}
                            </Button>
                        </div>
                    </div>
                </form>
            </ModalBase>
        </>
    );
}
