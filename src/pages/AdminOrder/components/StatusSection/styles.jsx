import styled from "styled-components";
import { getStatusColor } from "../../../../utilities";

export const Container = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 8px;
  padding: 10px;
  background-color: ${({ status }) => getStatusColor(status)};
`;

export const StatusTitle = styled.span`
  font-weight: bold;
  color: #000;
  font-size: 18px;
  margin: 0;
`;

export const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
`;

export const Option = styled.div`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const ArrowIcon = styled.span`
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.2s ease-in-out;
`;
