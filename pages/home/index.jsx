import { message } from "antd";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import NoteContainer from "../../components/note_container/NoteContainer";

const Home = () => {
  const [value, setValue] = useState();
  const router = useRouter();

  const handleLogin = async () => {};

  useEffect(() => {
    //tampung nilai cookie storage bernama isLogin
    setValue(Cookies.get("isLogin"));
    const userLogin = Cookies.get("isLogin");
    console.log(value);
    if (userLogin === undefined) {
      message.info("Anda harus login terlebih dahulu");
      router.push("/login");
    }
  }, []);

  return (
    <>
      {value && (
        <>
          <Navbar />
          <main className="home">
            <h1 style={{ color: "#aeaeae" }}>Wellcome Home..</h1>

            <NoteContainer />
          </main>
        </>
      )}
    </>
  );
};

export default Home;
