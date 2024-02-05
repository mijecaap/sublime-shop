import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const InfoContainer = styled.div`
  width: 100%;
`;

export const Name = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 8px;
`;

export const Price = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: #ff6c00;
  margin-bottom: 16px;
`;

export const Button = styled.div`
  background-color: #ff6c00;
  color: #fff;
  padding: 12px 20px;
  cursor: pointer;
  text-align: center;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ff812b;
  }
`;