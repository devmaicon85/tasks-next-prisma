import Modal from "react-modal";
import { useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { Button, ModalBase, TextArea } from "@/components/Index";

type PropsType = {
    handleFinally: () => void;
    setIsOpen: (open: boolean) => void;
    isOpen: boolean;
};
export function NewTaskModal({ handleFinally, setIsOpen, isOpen }: PropsType) {
    const [title, setTitle] = useState("");
    const [saving, setSaving] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setSaving(true);
        try {
            const response = await axios.post("/tasks", {
                title,
            });

            if (response) {
                setTitle("");
                handleFinally();
                toast.success(`Nova tarefa cadastrada`);
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
                title="Incluir Novo"
                icon={<FaTasks className=" text-3xl " />}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <form onSubmit={handleSubmit}>
                    <TextArea
                        autoFocus
                        rows={4}
                        required
                        placeholder="digite aqui uma nova tarefa para hoje.."
                        onChange={(e) => setTitle(e.target.value)}
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
