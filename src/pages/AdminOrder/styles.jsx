import styled from "styled-components";
import theme from "../../styled-components/theme";

export const OrderContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${theme.breakpoints.small}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const CardOrders = styled.div`
  flex: 1;
  border-radius: 5px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CardDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const SubtitleCard = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

export const OrderListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 16px;

  @media (min-width: ${theme.breakpoints.large}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
