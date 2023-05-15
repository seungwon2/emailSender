import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function App() {
  const [products, setProducts] = useState([]);

  const handler = (id) => {
    console.log(id);
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://anycompany-alb-1145759004.ap-northeast-2.elb.amazonaws.com/api/products/list"
      )
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(response) {
        console.log(response);
      });
  };
  const db = {
    products: [
      {
        id: 1,
        image: "https://i.postimg.cc/6qvvh2kY/Ben.png",
        name: "벤",
        price: 105900,
        stock: true,
      },
      {
        id: 2,
        image: "https://i.postimg.cc/yNLrZxCD/Dalman.png",
        name: "달만이",
        price: 500,
        stock: true,
      },
      {
        id: 3,
        image: "https://i.postimg.cc/4NFdBbvP/No1.png",
        name: "1호",
        price: 389000,
        stock: false,
      },
    ],
  };
  const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
  `;

  const Title = styled.h1`
    text-align: center;
    font-weight: 900;
    font-size: 90px;
    margin: 40px;
  `;
  const InnerWrapper = styled.div`
    display: flex;
    justify-content: space-around;
  `;

  return (
    <Wrapper>
      <Title>ANYCOMPANY</Title>
      <InnerWrapper>
        {db.products.map((product) => (
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.price}원</Card.Text>
              <Button variant="primary" onClick={handler(product.id)}>
                <a onClick={() => alert("주문 완료!")}>구매하기</a>
              </Button>
            </Card.Body>
          </Card>
        ))}
      </InnerWrapper>
    </Wrapper>
  );
}

export default App;
