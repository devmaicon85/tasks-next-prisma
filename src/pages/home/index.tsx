import { DarkTheme } from "@/components/DarkTheme";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const [loading, setLoading] = useState(false);

    return (
        <div className=" flex h-screen w-screen  flex-col">
            <Head>
                <title>Tasks Plataform</title>
                <link rel="icon" href="/assets/logo.png" />
            </Head>

            <div className="flex flex-col md:flex-row m-auto p-4 items-center transition-transform ease-in-out duration-1000">
                <div className=" justify-center flex  min-w-[120px] min-h-[120px]">
                    <Image
                        width={120}
                        height={120}
                        src="/assets/logo.png"
                        alt="Tasks Plataform"
                    />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex m-4 mb-0 justify-center items-center text-3xl min-w-[280px] ">
                        Tasks Plataform
                        <DarkTheme className="mb-6" />
                    </div>
                    <div className="flex">
                        <Link href="/login">
                            <a
                                onClick={() => setLoading(true)}
                                className="text-base hover:scale-125 ease-out duration-1000"
                            >
                                {loading ? "Carregando..." : "Efetuar login"}
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
