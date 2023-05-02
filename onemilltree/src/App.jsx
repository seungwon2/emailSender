import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Button, message, Upload, Input, Space, Image } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import styled, { keyframes } from "styled-components";

export default function App() {
  const { Dragger } = Upload;

  const sendMail = (e) => {
    e.preventDefault();
    console.log("inputRef: ", inputRef.current);
    message.success("메일 전송 완료!");

    var templateParams = {
      email: inputRef.current,
      image: imageURL,
    };

    emailjs
      .send(
        "service_t15qmne",
        "template_ifsj8mq",
        templateParams,
        "rIACVJGwVfmY6hTr3"
      )
      .then(
        function(response) {
          console.log("SUCCESS!", response.status, response.text);
          message.success("메일 전송 완료!");
        },
        function(error) {
          console.log("FAILED...", error);
        }
      );
  };
  const props = {
    name: "file",
    multiple: true,
    showUploadList: true,
    onChange(info) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImage(info.file.originFileObj);
        setImageURL(reader.result);
      };
      reader.readAsDataURL(info.file.originFileObj);
      message.success("업로드 완료!");
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [email, setEmail] = useState("");
  const inputRef = useRef("");

  const onChangeText = (e) => {
    inputRef.current = e.target.value;
    console.log(inputRef.current);
  };
  const Wrapper = styled.div`
    // flex-wrap: wrap;
    justify-content: space-between;
    display: flex;
    background-color: #282c34;
    color: #ffffff;
    // min-height: 100vh;
    height: 100vh;
    padding: 10vh;
  `;

  const Col = styled.div`
    background-color: #282c34;
    flex-direction: column;
    align-content: space-between;
    max-width: 50%;
  `;
  const Col2 = styled.div`
    background-color: #282c34;
    position: relative;
  `;
  const Row = styled.div`
    margin-bottom: 10vh;
    color: #ffffff;
    font-weight: 500;
  `;
  const Bg = styled.div`
    display: flex;
    flex-direction: column;
    align-content: space-between;
    z-index: 1;
    left: 0;
  `;
  const Lunie = styled.img`
    width: 65vh;
    z-index: 5;
    position: absolute;
    left: 0;
  `;

  const flow = keyframes`{
    0% {padding-top: 0px;}
    50% {padding-top: 100px;}
    100% {padding-top: 0px;}
}`;

  const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${flow} 5s linear infinite;
    z-index: 5;
    margin-top: -600px;
  `;

  const Text = styled.img`
    z-index: 1;
    position: absolute;
  `;

  const QR = styled.img`
    margin-bottom: 0px;
    z-index: 2;
    padding-top: 600px;
  `;

  const Back = styled.div`
    color: #ffffff !important;
    background: #ffffffed;
    border-radius: 10px;
  `;

  return (
    <Wrapper>
      <Col2>
        <Bg>
          <Text
            src="/one_million_trees.svg"
            width="400vh"
            position="absolute"
          />
          <QR src="QRCodeImg.jpg" width="20%" />
          <Box>
            <span>
              <Lunie src="/lunie.png" />
            </span>
          </Box>
        </Bg>
      </Col2>
      <Col>
        <Row>
          <p>Photo Upload</p>
          {imageURL === null && (
            <Back>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
            </Back>
          )}
          {imageURL && <Image width={500} src={imageURL} />}
        </Row>
        <Row>
          <p>Email</p>
          <Input
            placeholder="이메일을 입력해주세요"
            size="large"
            inputRef={inputRef}
            // value={email}
            onChange={onChangeText}
          />
        </Row>
        <Row>
          <Space style={{ width: "100%" }} direction="vertical">
            <Button type="primary" onClick={sendMail} block>
              Send
            </Button>
          </Space>
        </Row>
      </Col>
    </Wrapper>
  );
}
