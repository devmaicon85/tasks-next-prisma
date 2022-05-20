import Head from "next/head";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex h-screen w-screen bg-slate-700 flex-col">
            <Head>
                <title>Tasks Plataform</title>
                <link rel="icon" href="/assets/logo.png" />
            </Head>

            <div className="m-auto w-48">
                <Image
                    width={128}
                    height={128}
                    src="/assets/logo.png"
                    alt="Tasks Plataform"
                />
            </div>
            <h1 className="text-white text-3xl border w">Tasks Plataforms</h1>
        </div>
    );
}
