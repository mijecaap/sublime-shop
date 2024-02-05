import styled from "styled-components";

export const CartModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #d9d9d9;
`;

export const ProductImage = styled.img`
  width: 64px;
  margin-right: 16px;
`;

export const ActionButton = styled.button`
  border: none;
  background-color: transparent;
  outline: none;
`;

export const BuyNowButton = styled.button`
  border: none;
  background-color: #ffb410;
  color: #fff;
  padding: 12px 20px;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ff812b;
  }
`;

export const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
