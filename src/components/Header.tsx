import { Disclosure, Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import imageLogoUrl from "../../public/assets/logo.png";
import { UserPasswordModal } from "./modals/UserPasswordModal";
import { ThemeButton } from "./ThemeButton";
import { MdClose, MdMenu } from "react-icons/md";
import { HiBell } from "react-icons/hi";

const navigation = [
    { name: "Home", href: "/admin" },
    { name: "Faq", href: "/admin/faq" },
    { name: "Integração", href: "/admin/integration" },
];

export function Header() {
    const router = useRouter();

    const { data: session } = useSession();

    const [isOpenModalPassword, setIsOpenModalPassword] = useState(false);

    function Logoff() {
        signOut({ redirect: true });
    }

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <UserPasswordModal
                        handleFinally={() => { }}
                        setIsOpen={setIsOpenModalPassword}
                        isOpen={isOpenModalPassword}
                    />
                    <div className="z-10 px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <MdClose
                                            className="block w-6 h-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <MdMenu
                                            className="block w-6 h-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                                <div className="flex items-center flex-shrink-0">
                                    <Image
                                        src={imageLogoUrl}
                                        width={40}
                                        height={40}
                                        alt="logo"
                                    />
                                </div>
                                <div className="justify-center hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4 justify-center mt-[2px]">
                                        {navigation.map((item) => (
                                            <Link
                                                href={item.href}
                                                passHref
                                                key={item.name}
                                                className={`
                                                      ${router.asPath ===
                                                        item.href
                                                        ? "bg-gray-900 text-white"
                                                        : "text-gray-300 hover:bg-gray-700"
                                                    } hover:text-white 
                                                            px-3 py-2 rounded-md text-sm font-medium"
                                                      
                                                      `}
                                            >

                                                {item.name}

                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                >
                                    <span className="sr-only">
                                        View notifications
                                    </span>
                                    <HiBell
                                        className="w-6 h-6"
                                        aria-hidden="true"
                                    />
                                </button>
                                <ThemeButton className="w-8 h-8 p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" />

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">
                                                Open user menu
                                            </span>
                                            {session?.user?.image && (
                                                <Image
                                                    className="rounded-full"
                                                    src={session?.user?.image}
                                                    alt="Usuário"
                                                    width={40}
                                                    height={40}
                                                />
                                            )}
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-20 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        className={`${active
                                                            ? "bg-gray-100"
                                                            : ""
                                                            }
                                                            block px-4 py-2 text-sm text-gray-700`}
                                                    >
                                                        Meu Perfil (
                                                        {session?.user.email})
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link href="" onClick={() =>
                                                        setIsOpenModalPassword(
                                                            true
                                                        )
                                                    }
                                                        className={`
                                                    ${active
                                                                ? "bg-gray-100"
                                                                : ""
                                                            }
                                                    block px-4 py-2 text-sm text-gray-700`}>

                                                        Alterar Senha

                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link href={""} onClick={Logoff}
                                                        className={`
                                                    ${active
                                                                ? "bg-gray-100"
                                                                : ""
                                                            }
                                                    block px-4 py-2 text-sm text-gray-700`}>

                                                        Sair
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Link href={item.href} passHref key={item.name}
                                        className={`
                                        ${router.asPath === item.href
                                                ? "bg-gray-900 text-white"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                            }
                                        block px-3 py-2 rounded-md text-base font-medium`}
                                    >
                                        {item.name}
                                </Link>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
