import { Button, Form, Input, message, Space } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Login = () => {
  //buat sebuah state penampung nilai bernama [inputData, setInputData]
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  // buat sebuah event listener onChange pada masing masing input
  // dan store data menggunakan state setInputData()

  //buat sebuah hanldeLogin dan fetch ke api login
  const handleLogin = (e) => {
    // console.log(e);
    fetch("http://localhost:5000/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    })
      .then((res) => res.json())
      .then((data) => {
        // message.info(data);
        if (data.accessToken) {
          //kondisi ketika login berhasil
          message.success("selamat datang bro..");

          //kita set cookie storage bernama isLogin
          Cookies.set("isLogin", true);

          //kita tambahkan data user yang sedang login
          Cookies.set("user", inputData.email);

          router.push("/home");
        } else {
          alert("silakan check data login anda..");
        }
      });
  };

  useEffect(() => {
    //tampung nilai cookie storage bernama isLogin
    const isLogin = Cookies.get("isLogin");

    //apabila nilai isLogin TRUE maka kembalikan dia ke page HOME
    if (isLogin) {
      router.push("/home");
    }
  }, []);

  const onFinish = () => {
    message.success("Submit success!");
  };

  const onLoginFailed = () => {
    message.error("Login Error!");
  };

  return (
    <>
      <Form
        className="login"
        layout="vertical"
        onFinish={handleLogin}
        onFinishFailed={onLoginFailed}
        autoComplete="off"
      >
        <h1 className="login_title fontWhite">Login</h1>
        <Form.Item name="email" label={<p style={{ color: "white" }}>Email</p>}>
          <Input
            placeholder="masukan email"
            type="email"
            onChange={(e) => {
              setInputData({
                ...inputData,
                email: e.target.value,
              });
              // console.log(inputData);
            }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label={<p style={{ color: "white" }}>Password</p>}
          className="fontWhite"
        >
          <Input
            placeholder="masukan password"
            type="password"
            onChange={(e) => {
              setInputData({
                ...inputData,
                password: e.target.value,
              });
              // console.log(inputData);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Space direction="vertical" align="center">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <small className="fontWhite">
              Not Have account, <Link href={"/register"}>Register Here...</Link>
            </small>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
