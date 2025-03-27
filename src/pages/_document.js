import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

// Custom Document class extending Next.js's Document
export default class MyDocument extends Document {
  // Overriding the getInitialProps method to customize the initial props
  static async getInitialProps(ctx) {
    // Create an instance of ServerStyleSheet to collect styles from components
    const sheet = new ServerStyleSheet();
    // Store the original renderPage function
    const originalRenderPage = ctx.renderPage;

    try {
      // Override the renderPage function to collect styles from the app's components
      ctx.renderPage = () =>
        originalRenderPage({
          // Enhance the App component to collect styles
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      // Get the initial props from the Document
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        // Combine the initial styles with the collected styles
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      // Seal the stylesheet to prevent further modifications
      sheet.seal();
    }
  }

  // Render method to define the structure of the HTML document
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
