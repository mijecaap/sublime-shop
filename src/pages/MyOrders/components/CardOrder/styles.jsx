import styled from "styled-components";
import { getStatusColor } from "../../../../utilities";

export const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

export const OrderId = styled.h2`
  font-size: 18px;
  margin-bottom: 8px;
`;

export const OrderDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const OrderDetailLabel = styled.span`
  font-weight: bold;
`;

export const Badge = styled.span`
  background-color: ${({ status }) => getStatusColor(status)};
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 4px;
`;
