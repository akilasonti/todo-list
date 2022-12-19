import "./TodoNew.css";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { InputGroup, Button, ListGroup, Modal, Alert } from "react-bootstrap";
export function TodoNew() {
  const [todoList, setTodoList] = useState([]);
  const [todoListFlag, setTodoListFlag] = useState([]);
  const [inp, setInp] = useState("");
  const [editField, updateEditField] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function toggle(index) {
    const arr = todoListFlag;
    arr.splice(index, 1, !arr[index]);
    setTodoListFlag([...arr]);
  }
  const update = function (index) {
    const arr = todoList;
    arr.splice(index, 1, editField);
    setTodoList([...arr]);
    updateEditField("");
    toggle(index);
  };
  const add = (event) => {
    //prevent to refresh the page on form submit
    event.preventDefault();

    const arr = todoList;
    if (arr.includes(inp)) {
      handleShow();
      setInp("");
      return false;
    }
    arr.push(inp);
    todoListFlag.push(true);
    setTodoList([...arr]);
    setInp("");
  };
  const deleteList = (idx) => {
    const arr = todoList;
    arr.splice(idx, 1);
    todoListFlag.splice(idx, 1);
    setTodoList([...arr]);
  };
  return (
    <div className="container1">
      <div>
        <h1>Todo-List</h1>
        <Form onSubmit={add}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Enter a Todo......"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              required
              value={inp}
              onChange={(event) => {
                setInp(event.target.value);
              }}
            />
            <Button variant="outline-primary" id="button-addon2" type="submit">
              Add
            </Button>
          </InputGroup>
        </Form>
        <div className="listDropDown">
          <ListGroup>
            {todoList.map((value, index) => {
              return (
                <ListGroup.Item key={index}>
                  {todoListFlag[index] ? (
                    <InputGroup>
                      <Form.Control
                        type="text"
                        value={value}
                        onChange={(event) => {
                          updateEditField(event.target.value);
                        }}
                        placeholder=" "
                        aria-label="Recipient's username with two button addons"
                        disabled
                      />
                      <Button
                        variant="outline-success"
                        onClick={() => {
                          toggle(index);
                          updateEditField(todoList[index]);
                        }}
                      >
                        Edit_todo
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          deleteList(index);
                        }}
                      >
                        Delete
                      </Button>
                    </InputGroup>
                  ) : (
                    <InputGroup>
                      <Form.Control
                        type="text"
                        value={editField}
                        onChange={(event) => {
                          updateEditField(event.target.value);
                        }}
                        placeholder=" "
                        aria-label="Recipient's username with two button addons"
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          update(index);
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outline-warning"
                        onClick={() => {
                          toggle(index);
                          updateEditField("");
                        }}
                      >
                        Cancel
                      </Button>
                    </InputGroup>
                  )}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </div>
      <Modal size="sm" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Duplicate Value</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert key="modal_key" variant="danger">
            Entered value already exists! Please enter a new value!
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
