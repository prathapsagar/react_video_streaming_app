import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { app } from "./firebase";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Navbar, Nav, Container as Cont } from "react-bootstrap";

function Upload() {
  let navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [progress, setProgress] = useState(0);
  let storage = app.storage();
  let name = sessionStorage.getItem("firstName");
  useEffect(() => {
    checkAuth();
  });

  let checkAuth = async () => {
    let token = sessionStorage.getItem("token");
    if (token) {
      let config = {
        headers: {
          token: token,
        },
      };

      let res = await axios.post(
        "https://express-video-app.herokuapp.com/users/auth",
        { purpose: "Validate Access" },
        config
      );
      if (res.data.statusCode !== 200) {
        sessionStorage.clear();
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  let upload_video = async (url_new) => {
    let reqBody = {
      image_name: title,
      image_des: des,
      image_url: url_new,
    };
    console.log(reqBody);
    console.log(reqBody);
    let res = await axios.post(
      "https://express-video-app.herokuapp.com/users/add_video",
      reqBody
    );
    if (res.data.statusCode >= 200) {
      console.log("new");
      navigate("/dashboard");
    } else {
      console.log(res.data.message);
    }
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setUrl(url);
            upload_video(url);
          });
      }
    );
  };

  return (
    <>
      <div>
        <Navbar bg="dark" variant="dark">
          <Cont>
            <div style={{ float: "left" }}>
              <Navbar.Brand href="#home">Video Streaming App</Navbar.Brand>
            </div>
            <div>
              <Nav className="me-auto">
                <Nav.Link href="#">
                  <button
                    style={{ backgroundColor: "white" }}
                    onClick={() => navigate("/dashboard")}
                  >
                    Return Back
                  </button>
                </Nav.Link>
              </Nav>
            </div>
          </Cont>
        </Navbar>
        <div className="wrapper">
          <h1
            style={{
              textAlign: "center",
              paddingTop: "5px",
              color: "white",
              backgroundColor: "#14365d",
            }}
          >
            Upload your Video
          </h1>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Upload Video</Form.Label>
              <Form.Control type="file" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter Title </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title "
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="textbox"
                placeholder="Descriptiion"
                onChange={(e) => {
                  setDes(e.target.value);
                }}
              />
            </Form.Group>

            <div style={{ textAlign: "center" }}>
              <Button variant="primary" onClick={() => handleUpload()}>
                Upload
              </Button>
            </div>
          </Form>
        </div>
        <br></br>
      </div>
    </>
  );
}

export default Upload;
