import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req });

    if (!session) {
        console.log("index:: user sem sessão.");

        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    if (session) {
        return {
            // se tiver entra no app antes de aparecer tela pro usuario
            redirect: {
                destination: "/dashboard",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

export default function Index() {}
