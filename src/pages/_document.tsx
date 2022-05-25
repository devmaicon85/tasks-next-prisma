import Document, { Head, Html, Main, NextScript } from "next/document";

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
                    <div id="root_modal"></div>
                    <script
                        async
                        data-theme="10"
                        data-title="Fale Conosco"
                        data-email="oi@widgetdev.online"
                        data-whatsapp=""
                        data-instagram=""
                        data-open="false"
                        data-screenshot="false"
                        src="https://widgetdev.online/widget.js"
                    ></script>
                </body>
            </Html>
        );
    }
}
