import { Header } from "@/components/Header";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Toaster } from "react-hot-toast";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
};

export default function Integration() {
    const { data: session } = useSession();

    const searchParams = new URLSearchParams(
        typeof window === "undefined" ? "" : window.location.search
    );

    return (
        <>
            <Header />
            <Toaster position="bottom-center" />

            <div className="w-screen max-w-4xl px-5 mx-auto mt-10 ">
                <h1 className="mb-3 text-2xl">
                    Faça a integração da nossa api com outros sistemas
                </h1>
                <div>
                    <Link
                        href={`/api/public/faq?key=${session?.user.id}&per_page=3&search=`}
                        passHref
                    >
                        <a target="_blank" className="hover:underline">
                            Clique aqui para acessar o link da Api de Integração
                        </a>
                    </Link>

                    <div className="mt-4 text-sm">
                        <p>
                            Nesse link contém todas as perguntas e respostas que
                            você cadastrou como públicas
                        </p>
                        <p>
                            Assim você pode integrar em sistemas de ajuda, web
                            sites ou blogs
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
