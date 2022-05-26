import { ThemeButton } from "@/components/ThemeButton";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const [loading, setLoading] = useState(false);

    return (
        <div className="flex flex-col w-screen h-screen ">
            <Head>
                <title>Faq Plataform</title>
                <link rel="icon" href="/assets/logo.png" />
            </Head>

            <div className="flex flex-col items-center p-4 m-auto transition-transform duration-1000 ease-in-out md:flex-row">
                <div className=" justify-center flex  min-w-[120px] min-h-[120px]">
                    <Image
                        width={120}
                        height={120}
                        src="/assets/logo.png"
                        alt="Faq Plataform"
                    />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex m-4 mb-0 justify-center items-center text-3xl min-w-[280px] ">
                        Faq Plataform
                        <ThemeButton className="mb-6" />
                    </div>
                    <div className="flex">
                        <Link href="/login">
                            <a
                                onClick={() => setLoading(true)}
                                className="text-base duration-1000 ease-out hover:scale-125"
                            >
                                {loading
                                    ? "Carregando..."
                                    : "Acessar Plataforma"}
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
