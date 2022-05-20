import Modal from "react-modal";
import { FormEvent, useState } from "react";
import { GrClose } from "react-icons/gr";
import TextArea from "./TextArea";
import Button from "./Button";
import axios from "@/lib/axios";
import { FaTasks } from "react-icons/fa";
import { MdClose } from "react-icons/md";

Modal.setAppElement("#root_modal");

type PropsType = {
    handleSetSearch: () => void;
};
export function NewTaskModal({ handleSetSearch }: PropsType) {
    const [title, setTitle] = useState("");
    const [saving, setSaving] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setSaving(true);
        try {
            const response = await axios.post("/tasks", {
                title,
            });

            if (response) {
                //setSearch(true);
                handleSetSearch();

                //toast.success(`Tarefa foi salva com sucesso`);
                setTitle("");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
            setIsOpen(false);
        }
    }

    function onRequestClose() {
        setIsOpen(false);
    }
    return (
        <>
            <Button type="button" onClick={() => setIsOpen(true)}>
                Incluir Novo
            </Button>

            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                overlayClassName="react-modal-overlay"
                className="react-modal-content"
            >
                <div className="py-12 bg-gray-700 bg-opacity-50 transition duration-1000 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0">
                    <div className="container mx-auto w-full md:w-2/3 max-w-lg">
                        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded-2xl border border-gray-400">
                            <div className="flex flex-row h-14 gap-4 items-center text-gray-600 mb-5">
                                <FaTasks className=" text-3xl " />
                                <div className="text-gray-600 text-xl font-bold tracking-normal">
                                    Incluir Novo
                                </div>
                            </div>

                            <button
                                className=" cursor-pointer absolute text-2xl hover:scale-110 top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                                aria-label="close modal"
                                role="button"
                                onClick={onRequestClose}
                                title="Fechar"
                            >
                                <MdClose />
                            </button>
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <TextArea
                                        rows={4}
                                        required
                                        placeholder="digite aqui uma nova tarefa para hoje.."
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />

                                    <div className="mt-4 flex justify-end">
                                        <div>
                                            <Button type="submit" className="">
                                                {!saving
                                                    ? "Salvar Tarefa"
                                                    : "Salvando..."}
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <div id="root_modal"></div>
        </>
    );
}
