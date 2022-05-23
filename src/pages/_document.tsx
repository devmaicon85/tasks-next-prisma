import { Button } from "@/components/Button";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="shortcut icon"
                        href="/assets/logo.png"
                        type="image/png"
                    />
                    <link rel="icon" href="/assets/logo.png" />
                </Head>
                <body className="text-slate-700 dark:bg-slate-900 dark:text-white ">
                    <Main />
                    <NextScript />
                    <div id="root_modal"></div>
                </body>
            </Html>
        );
    }
}
