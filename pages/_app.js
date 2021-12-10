import Head from "next/head";
import "../styles/globals.css";
import "../styles/Home.css";
import "../styles/Login.css";
import "../styles/Navbar.css";
import "../styles/NoteCard.css";
import "../styles/NoteContainer.css";
import "../styles/Page_login.css";
import "../styles/Page_register.css";
import "../styles/Register.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="Todolist App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        src="https://kit.fontawesome.com/9f1e903be8.js"
        crossOrigin="anonymous"
      ></Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
