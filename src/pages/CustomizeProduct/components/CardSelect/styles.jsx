import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => (props.selected ? "#4caf50" : "#333333")};
  border: 1px solid ${(props) => (props.selected ? "#4caf50" : "#333333")};
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CardImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

export const CardName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: ${(props) => (props.selected ? "#333333" : "#ffffff")};
`;