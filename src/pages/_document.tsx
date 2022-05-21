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
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
