import { Button, Form, Input, message, Space } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Register = () => {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const [same, setSame] = useState(false);

  //check apakah password sama
  useEffect(() => {
    if (inputData.password === inputData.password2) {
      setSame(true);
    } else {
      setSame(false);
    }
  }, [inputData]);

  const handleRegister = (e) => {
    fetch("http://localhost:5000/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(inputData),
      body: JSON.stringify({
        email: inputData.email,
        password: inputData.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // alert(data);
        if (data.accessToken) {
          message.success("berhasil register");
          router.push("login");
        } else {
          alert(data);
        }
      });
  };

  useEffect(() => {
    //tampung nilai cookie storage bernama isLogin
    const isLogin = Cookies.get("isLogin");

    //apabila nilai isLogin TRUE maka kembalikan dia ke page HOME
    if (isLogin) {
      router.push("home");
    }
  }, [router]);

  const onRegisterFailed = () => {
    message.error("Register Error!");
  };

  return (
    <>
      <Form
        className="register"
        layout="vertical"
        onFinish={handleRegister}
        onFinishFailed={onRegisterFailed}
        autoComplete="off"
      >
        <h1 className="register_title fontWhite">Register</h1>
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
        <Form.Item
          name="password2"
          label={<p style={{ color: "white" }}>Ulangi Password</p>}
          className="fontWhite"
        >
          <Input
            placeholder="masukan password"
            type="password"
            onChange={(e) => {
              setInputData({
                ...inputData, //copy semua property yang ada
                password2: e.target.value, //edit property yang di inginkan
              });
              // console.log(inputData);
            }}
          />
        </Form.Item>
        {same === false ? (
          <small
            style={{ color: "red", marginTop: "-30px", fontWeight: "bold" }}
          >
            password harus sama
          </small>
        ) : null}

        <Form.Item>
          <Space direction="vertical" align="center">
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <small className="fontWhite">
              Already Have Account, <Link href="/login">Login Here..</Link>
            </small>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default Register;
