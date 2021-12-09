import NoteCard from "./NoteCard";
import { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Space } from "antd";
import Cookies from "js-cookie";

import Link from "next/link";
import TextArea from "antd/lib/input/TextArea";
import { useRouter } from "next/router";

const NoteContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const [valueUser, setValueUser] = useState("");
  const [trigger, setTrigger] = useState(1);
  // menampung data state
  const [notes, setNotes] = useState();

  // buat nilai boolean untuk show modal
  const [modal, setModal] = useState(false);

  //buat state penampung nilai sementara dari add form
  const [addNote, setAddNote] = useState({
    user_email: Cookies.get("user"),
    title: "",
    body: "",
  });

  const GetDataNotes = () => {
    const userEmail = Cookies.get("user");
    // ambil data notes
    fetch(`http://localhost:5000/notes?user_email=${userEmail}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // kita simpan ke STATE
        setNotes(data);
        setIsModalVisible(false);
        form.resetFields();
      });
  };

  useEffect(() => {
    // tangkap user yang login
    setValueUser(Cookies.get("user"));
  }, []);

  useEffect(() => {
    GetDataNotes();
  }, [trigger]);

  const handleDataStore = (e) => {
    // alert(`
    //   user_email : ${addNote.user_email}
    //   title: ${addNote.title}
    //   body: ${addNote.body}
    // `)
    fetch("http://localhost:5000/notes", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addNote),
    })
      .then((res) => res.json())
      .then((data) => {
        message.info("Berhasil menambah data");
        setTrigger(trigger + 1);
      });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDataStoreFailed = () => {
    message.error("Data Error!");
  };

  return (
    <section className="note_container">
      {/* kita check apakah notes sudah berisi data */}
      {notes && (
        <>
          {notes.map((e) => (
            <NoteCard
              key={e.id}
              id={e.id}
              title={e.title}
              body={e.body}
              actiontrigger={[trigger, setTrigger]}
            />
          ))}
        </>
      )}

      {/* ICON MODAL */}
      <i
        className="fa fa-plus add_icon"
        onClick={() => {
          // setModal(!modal);
          showModal();
        }}
      ></i>

      <Modal
        title="Tambah Catatan"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleDataStore}
          onFinishFailed={handleDataStoreFailed}
          autoComplete="off"
        >
          <Form.Item hidden initialValue={valueUser}>
            <Input type="text" />
          </Form.Item>
          <Form.Item name="title" label={<p>Title</p>}>
            <Input
              placeholder="Masukan Title"
              type="text"
              onChange={(e) => {
                setAddNote({
                  ...addNote, //copy semua property yang ada
                  title: e.target.value, //edit property yang di inginkan
                });
              }}
            />
          </Form.Item>
          <Form.Item name="body" label={<p>Note</p>}>
            <TextArea
              placeholder="Masukan Note"
              type="text"
              onChange={(e) => {
                setAddNote({
                  ...addNote, //copy semua property yang ada
                  body: e.target.value, //edit property yang di inginkan
                });
              }}
            />
          </Form.Item>

          <Form.Item>
            <Space direction="vertical" align="center">
              <Button type="primary" htmlType="submit">
                Tambah
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
};

export default NoteContainer;
