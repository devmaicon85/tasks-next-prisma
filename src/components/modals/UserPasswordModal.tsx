import axios from "@/lib/axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillSave } from "react-icons/ai";
import { HiAdjustments } from "react-icons/hi";
import { ModalBase } from "./ModalBase";

type PropsType = {
    handleFinally: () => void;
    setIsOpen: (open: boolean) => void;
    isOpen: boolean;
};
export function UserPasswordModal({
    handleFinally,
    setIsOpen,
    isOpen,
}: PropsType) {
    const [password, setPassword] = useState("");
    const [saving, setSaving] = useState(false);
    const [msgError, setMsgError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setMsgError("");

        if (password.trim() === "") {
            setMsgError("Senha não informada");
            return;
        }

        setSaving(true);
        try {
            const response = await axios.put("/user", {
                password,
            });

            if (response) {
                handleFinally();

                toast.success(`Senha alterada com sucesso`);
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
                title="Alterar Senha"
                icon={<HiAdjustments className=" text-3xl " />}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <form onSubmit={handleSubmit}>
                    <input
                        autoFocus
                        className="input input-primary"
                        required
                        type="password"
                        placeholder="informa nova senha"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div>{msgError}</div>

                    <div className="mt-4 flex justify-end">
                        <div>
                            <button type="submit" className="btn btn-primary">
                                <AiFillSave />
                                {!saving ? "Salvar" : "Salvando..."}
                            </button>
                        </div>
                    </div>
                </form>
            </ModalBase>
        </>
    );
}
