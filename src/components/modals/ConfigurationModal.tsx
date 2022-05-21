import Modal from "react-modal";
import { useEffect, useState } from "react";
import { TextArea } from "../TextArea";
import { Button } from "../Button";
import { FaTasks } from "react-icons/fa";
import axios from "@/lib/axios";
import { ModalBase } from "../ModalBase";
import { HiAdjustments } from "react-icons/hi";
import { Input } from "../Input";
import toast from "react-hot-toast";

type PropsType = {
    handleFinally: () => void;
    setIsOpen: (open: boolean) => void;
    isOpen: boolean;
};
export function ConfigurationModal({
    handleFinally,
    setIsOpen,
    isOpen,
}: PropsType) {
    const [password, setPassword] = useState("");
    const [saving, setSaving] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setSaving(true);
        try {
            const response = await axios.post("/user", {
                password,
            });

            if (response) {
                handleFinally();

                toast.success(`Configurações salvas com sucesso`);
                setPassword("");
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
                title="Configurações"
                icon={<HiAdjustments className=" text-3xl " />}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <form onSubmit={handleSubmit}>
                    <Input
                        autoFocus
                        required
                        placeholder="digite sua nova senha caso deseja alterar"
                        onChange={(e) => setPassword(e.target.value)}
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
