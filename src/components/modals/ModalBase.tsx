import { useEffect } from "react";
import { MdClose } from "react-icons/md";
import Modal from "react-modal";

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
            // overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <div className="absolute top-0 bottom-0 left-0 right-0 z-20 py-12 transition duration-500 ease-in-out bg-gray-900 bg-opacity-70 ">
                <div className="container w-full max-w-3xl p-5 mx-auto md:w-2/3">
                    <div className="relative px-5 py-8 bg-gray-100 border-gray-400 shadow-md md:px-10 dark:bg-gray-800 rounded-2xl">
                        <button
                            className="absolute top-0 right-0 mt-4 mr-5 text-2xl text-gray-600 transition duration-150 ease-in-out rounded cursor-pointer hover:scale-110 hover:dark:text-gray-100 focus:ring-2 focus:outline-none focus:ring-gray-600"
                            aria-label="close modal"
                            role="button"
                            onClick={() => setIsOpen(false)}
                            title="Fechar"
                        >
                            <MdClose />
                        </button>
                        <div className="flex flex-row items-center gap-4 mb-2 text-gray-600 h-14 dark:text-gray-100">
                            {icon}
                            <div className="text-xl font-bold tracking-normal text-gray-600 dark:text-gray-100">
                                {title}
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </Modal>
    );
}
