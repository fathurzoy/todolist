import { useState } from "react";
import { Badge, Button, Card, message, Popconfirm } from "antd";

const NoteCard = ({ id, title, body, actiontrigger, status }) => {
  const [trigger, setTrigger] = actiontrigger;
  //kita buat togler view untuk form edit
  const [showEditForm, setShowEditForm] = useState(false);

  const [defaultValue, setDefaultValue] = useState({
    id: id,
    title: title,
    body: body,
    status: status,
  });

  const handleDelete = (args) => {
    fetch(`http://localhost:5000/notes/${args}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTrigger(trigger + 1);
  };

  const handleEdit = (e) => {
    // agar url tetap
    e.preventDefault();
    // alert(`
    //   user_email : ${addNote.user_email}
    //   title: ${addNote.title}
    //   body: ${addNote.body}
    // `)
    fetch(`http://localhost:5000/notes/${id}`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: defaultValue.title,
        body: defaultValue.body,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        message.info("berhasil update note");
        e.preventDefault();
        setTrigger(trigger + 1);
        setShowEditForm(false);
      });
  };

  const handleDone = () => {
    fetch(`http://localhost:5000/notes/${id}`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "done",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        message.success("done note");
        setTrigger(trigger + 1);
        setShowEditForm(false);
      });
  };

  const handleTodo = () => {
    fetch(`http://localhost:5000/notes/${id}`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "todo",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        message.success("Add Todo");
        setTrigger(trigger + 1);
        setShowEditForm(false);
      });
  };

  return (
    <>
      <Badge.Ribbon
        text={status === "todo" ? "TODO" : "Done"}
        color={status === "done" && "green"}
      >
        <section className="note_card">
          <div className="actionNote">
            {status === "todo" && (
              <Popconfirm
                title="Yakin ingin Done?"
                okText="Ya"
                cancelText="Tidak"
                onConfirm={() => {
                  handleDone();
                }}
              >
                <Button type="primary" className="buttonDone">
                  Done
                </Button>
              </Popconfirm>
            )}
            <Popconfirm
              title="Yakin ingin hapus?"
              okText="Ya"
              cancelText="Tidak"
              onConfirm={() => {
                handleDelete(id);
              }}
            >
              <i className="fa fa-trash del_icon"></i>
            </Popconfirm>

            <i
              className="fa fa-edit edit_icon"
              onClick={() => {
                setShowEditForm(!showEditForm);
              }}
            ></i>
          </div>

          {showEditForm === true ? (
            <form className="form_edit" onSubmit={handleEdit}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={defaultValue.title}
                onChange={(e) => {
                  e.preventDefault();
                  setDefaultValue({
                    ...defaultValue,
                    title: e.target.value,
                  });
                }}
              />

              <label htmlFor="body">Note</label>
              <textarea
                name="body"
                id="body"
                value={defaultValue.body}
                onChange={(e) => {
                  e.preventDefault();
                  setDefaultValue({
                    ...defaultValue,
                    body: e.target.value,
                  });
                }}
              ></textarea>
              <Button type="primary" htmlType="submit">
                Simpan
              </Button>
              {status === "done" && (
                <Button
                  onClick={() => {
                    handleTodo();
                  }}
                >
                  Set Todo
                </Button>
              )}
            </form>
          ) : (
            <>
              <h3 className="note_title">{title}</h3>
              <p
                className="note_body"
                dangerouslySetInnerHTML={{ __html: body }}
              ></p>
            </>
          )}
        </section>
      </Badge.Ribbon>
    </>
  );
};

export default NoteCard;
