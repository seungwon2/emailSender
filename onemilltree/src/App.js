import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  Button,
  ConfigProvider,
  theme,
  Col,
  Row,
  message,
  Upload,
  Input,
  Space,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import styled, { keyframes } from "styled-components";

export default function App() {
  const sendMail = (e) => {
    e.preventDefault();
    console.log("clicked");

    var templateParams = {
      email: email,
      image: imageURL,
    };

    emailjs
      .send(
        "service_vz6lwpf",
        "template_ifsj8mq",
        templateParams,
        "rIACVJGwVfmY6hTr3"
      )
      .then(
        function(response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function(error) {
          console.log("FAILED...", error);
        }
      );
  };

  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [email, setEmail] = useState("piepiesw@amazon.com");

  const onChangeImage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImage(file);
      setImageURL(reader.result);
    };
    reader.readAsDataURL(file);
    console.log("img", image);
    console.log("URL", imageURL);
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
  `;
  const Col2 = styled.div`
    background-color: #282c34;
    position: relative;
  `;
  const Row = styled.div``;
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
        <Row>테스트</Row>
        <Row>
          <Input placeholder="이메일을 입력해주세요" />
        </Row>
        <Row>
          <Button type="primary">Send</Button>
        </Row>
      </Col>
    </Wrapper>
  );
}
