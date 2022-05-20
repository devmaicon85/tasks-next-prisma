import { GetServerSideProps } from "next";
import { getSession, signIn, useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { FaGithub, FaGoogle, FaLock } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Router from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req });

    return {
        props: {},
    };
};

export default function Login() {
    const { data: session, status } = useSession();

    // if (status === "authenticated") {
    //     Router.push("/dashboard");
    // }
    function SignInGitHub() {
        signIn("github");
    }

    function SignInGoogle() {
        signIn("google");
    }

    return (
        <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                    Efetue o Login
                </div>
                {status === "authenticated" && <p>você já está autenticado</p>}

                <div className="mt-8">
                    <form action="#" autoComplete="off">
                        <div className="flex flex-col mb-2">
                            <div className="flex relative ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <MdOutlineAlternateEmail />
                                </span>
                                <input
                                    type="text"
                                    id="sign-in-email"
                                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    placeholder="E-mail"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <div className="flex relative ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <FaLock />
                                </span>
                                <input
                                    type="password"
                                    id="sign-in-email"
                                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div className="flex items-center mb-6 -mt-4">
                            <div className="flex ml-auto">
                                <a
                                    href="#"
                                    className="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white"
                                >
                                    Esqueceu a senha?
                                </a>
                            </div>
                        </div>
                        <div className="flex w-full">
                            <button
                                type="submit"
                                className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                            >
                                Entrar
                            </button>
                        </div>
                    </form>
                </div>

                <div className="gap-4 grid grid-cols-1  md:grid-cols-2 item-center mt-6">
                    <button
                        onClick={SignInGitHub}
                        type="button"
                        className="py-2 px-4 flex justify-center items-center  bg-slate-600 hover:bg-slate-700 focus:ring-slate-500 focus:ring-offset-slate-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                        <FaGithub className="text-2xl mx-2" />
                        GitHub
                    </button>

                    <button
                        onClick={SignInGoogle}
                        type="button"
                        className="py-2 px-4 flex justify-center items-center  bg-slate-600 hover:bg-slate-700 focus:ring-slate-500 focus:ring-offset-slate-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                        <FcGoogle className="text-2xl mx-2" />
                        Google
                    </button>
                </div>

                <div className="flex items-center justify-center mt-6">
                    <a
                        href="#"
                        target="_blank"
                        className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
                    >
                        {/* <span className="ml-2">Criar uma nova conta agora</span> */}
                    </a>
                </div>
            </div>
        </div>
    );
}
