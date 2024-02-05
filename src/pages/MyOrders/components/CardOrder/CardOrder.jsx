import React from "react";
import {
  Badge,
  CardContainer,
  OrderDetailLabel,
  OrderDetails,
  OrderId,
} from "./styles";

const CardOrder = ({ order }) => {
  const { id, items, itemsCustomize, timestamp, status } = order;

  return (
    <CardContainer>
      <OrderId>Orden #{id}</OrderId>
      <OrderDetails>
        <OrderDetailLabel>Productos Simples:</OrderDetailLabel>
        <span>{items.length}</span>
      </OrderDetails>
      <OrderDetails>
        <OrderDetailLabel>Productos Personalizados:</OrderDetailLabel>
        <span>{itemsCustomize.length}</span>
      </OrderDetails>
      <OrderDetails>
        <OrderDetailLabel>Fecha de creación:</OrderDetailLabel>
        <span>{new Date(timestamp.seconds * 1000).toLocaleDateString()}</span>
      </OrderDetails>
      <OrderDetails>
        <OrderDetailLabel>Estado:</OrderDetailLabel>
        <Badge status={status}>{status.toUpperCase()}</Badge>
      </OrderDetails>
    </CardContainer>
  );
};

export default CardOrder;
