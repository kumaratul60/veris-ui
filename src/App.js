// antd icon
import {
  ClockCircleFilled,
  CalendarFilled,
  GlobalOutlined,
} from "@ant-design/icons";

// antd components
import { Button, message, Modal } from "antd";
import React, { useRef, useState } from "react";

import "./App.css";

function App() {
  const [popup, setPopup] = useState(false);
  const [Details, setDetails] = useState({ name: "", email: "", comment: "" });

  // assign initial ref value
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const commentRef = useRef(null);

  // for message toast config with antd
  const [messageApi, contextHolder] = message.useMessage();

  const handleForm = (e) => {
    const nameInput = nameRef.current;
    const emailInput = emailRef.current;
    const commentInput = commentRef.current;
    if (nameInput.value === "") {
      nameInput.focus();
      messageApi.open({
        type: "error",
        content: `${nameInput.name} should not be empty`,
      });
      return false;
    }
    if (emailInput.value === "") {
      emailInput.focus();
      messageApi.open({
        type: "error",
        content: `${emailInput.name} should not be empty`,
      });
      return false;
    }

    setDetails((pre) => {
      return {
        ...pre,
        name: nameInput.value,
        email: emailInput.value,
        comment: commentInput.value,
      };
    });

    setPopup(true);
  };
  const handlePopupClose = (status) => {
    if (status) {
      nameRef.current.value = "";
      emailRef.current.value = "";
      commentRef.current.value = "";
    }

    setPopup(false);
  };
  return (
    <React.Fragment>
      {contextHolder}
      <Modal
        centered
        open={popup}
        onOk={() => handlePopupClose(1)}
        onCancel={() => handlePopupClose(0)}
        className="container__modal"
      >
        <div className="top-section h-5">Meeting Details</div>

        <div className="center-section">
          <div className="h-4">Name : {Details.name}</div>
          <div className="h-4">Email : {Details.email}</div>
          <div className="h-4">Comment : {Details.comment}</div>
        </div>
      </Modal>
      <div className="container">
        <div className="container__card">
          <div className="container__details">
            <div className="details h-5">Gaurav Garg</div>
            <div className="details h-2">15 Minute Meeting </div>
            <div className="container__time-details">
              <div className="h-5">
                <ClockCircleFilled /> 15 Min
              </div>
              <div className="h-5">
                <CalendarFilled /> 9:30am - 9:45am, Friday, September
                <br />
                16, 2022
              </div>
              <div className="h-5">
                <GlobalOutlined /> India Standard Time
              </div>
            </div>
          </div>
          <div className="container__form">
            <div className="details h-3">Enter Details</div>
            <form ref={formRef} className="form-section">
              <div>
                <label className="h-4">Name *</label>
                <input
                  ref={nameRef}
                  placeholder="Enter Full Name"
                  className="form-input"
                  name="Name"
                  type="text"
                />
              </div>
              <div>
                <label className="h-4">Email *</label>
                <input
                  placeholder="Enter Email Address"
                  className="form-input"
                  ref={emailRef}
                  name="Email"
                />

                <Button className="addGuest-btn">Add Guests</Button>
              </div>
              <div>
                <label className="h-4">
                  Please share anything that will help prepare for our meeting.
                </label>
                <textarea
                  rows={3}
                  ref={commentRef}
                  placeholder="Enter Email Address"
                  className="form-input"
                  name="Comment"
                  type="text"
                />
              </div>
              <div>
                <Button
                  type="primary"
                  onClick={handleForm}
                  className="addGuest-btn"
                >
                  Schedule Event
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
