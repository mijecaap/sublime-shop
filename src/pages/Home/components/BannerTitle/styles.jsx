import styled from "styled-components";
import { AiFillFilter } from "react-icons/ai";

export const BannerTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: #333;
`;

export const Text = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: #fff;
`;

export const FilterIcon = styled(AiFillFilter)`
  font-size: 24px;
  margin-left: 8px;
  color: #fff;
`;
