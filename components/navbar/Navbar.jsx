import { Button, Dropdown, Menu, Popconfirm } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setValue(Cookies.get("user"));
  }, []);

  const handleLogout = () => {
    Cookies.remove("isLogin");
    Cookies.remove("user");
    router.push("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <i className="fa fa-user-friends" style={{ marginRight: "5px" }}></i>
        {value}
      </Menu.Item>
      <Menu.Item key="1">
        <Popconfirm
          title="Yakin ingin logout?"
          okText="Ya"
          cancelText="Tidak"
          onConfirm={handleLogout}
        >
          <Button danger type="primary" className="btn_logout">
            <i className="fa fa-close"></i>
            logout
          </Button>
        </Popconfirm>
      </Menu.Item>
      <Menu.Divider />
    </Menu>
  );

  return (
    <>
      {/* Contitional rendering */}
      {/* ketika nilai true maka munculkan  */}
      {show && (
        <div className="modal_menu">
          <Popconfirm
            title="Yakin ingin logout?"
            okText="Ya"
            cancelText="Tidak"
            onConfirm={handleLogout}
          >
            <Button danger type="primary" className="btn_logout">
              <i className="fa fa-close"></i>
              logout
            </Button>
          </Popconfirm>
        </div>
      )}

      <nav className="navbar">
        <h3 className="brand">TODOLIST</h3>
        <div
          className="user_area"
          onClick={() => {
            setShow(!show);
          }}
        >
          <i className="fa fa-user-friends"></i>
          {value}
        </div>
        <Dropdown overlay={menu} trigger={["click"]} className="mobile">
          <i className="fa fa-bars" aria-hidden="true"></i>
        </Dropdown>
      </nav>
    </>
  );
};

export default Navbar;
