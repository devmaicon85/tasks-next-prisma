import Modal from "react-modal";
import { useEffect } from "react";
import { MdClose } from "react-icons/md";

type PropsType = {
    setIsOpen: (open: boolean) => void;
    isOpen: boolean;
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
};
export function ModalBase({
    children,
    title,
    icon,
    setIsOpen,
    isOpen,
}: PropsType) {
    useEffect(() => {
        Modal.setAppElement("#root_modal");
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <div className="py-12 bg-gray-700 bg-opacity-50 transition duration-1000 ease-in-out z-20 absolute top-0 right-0 bottom-0 left-0">
                <div className="container mx-auto w-full md:w-2/3 max-w-3xl">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded-2xl border border-gray-400">
                        <div className="flex flex-row h-14 gap-4 items-center text-gray-600 mb-5">
                            {icon}
                            <div className="text-gray-600 text-xl font-bold tracking-normal">
                                {title}
                            </div>
                        </div>

                        <button
                            className=" cursor-pointer absolute text-2xl hover:scale-110 top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                            aria-label="close modal"
                            role="button"
                            onClick={() => setIsOpen(false)}
                            title="Fechar"
                        >
                            <MdClose />
                        </button>
                        <div>{children}</div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
