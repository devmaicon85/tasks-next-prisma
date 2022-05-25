import { Header } from "@/components/Header";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
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

export default function Projects() {
    return (
        <>
            <Header />
            <Toaster position="bottom-center" />

            <div className="w-screen max-w-4xl px-5 mx-auto mt-10 ">
                PÁGINA DE PROJETOS...
            </div>
        </>
    );
}
