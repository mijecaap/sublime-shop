import styled from "styled-components";
import theme from "../../../../styled-components/theme";
import { getStatusColor } from "../../../../utilities";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  background-color: ${theme.colors.primary};
  color: #fff;
  padding: 12px;
  text-align: left;
  font-weight: bold;

  &:nth-child(2) {
    display: none;
  }

  &:nth-child(3) {
    display: none;
  }

  @media (min-width: ${theme.breakpoints.small}) {
    &:nth-child(2) {
      display: table-cell;
    }

    &:nth-child(3) {
      display: table-cell;
    }
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  &:nth-child(2) {
    display: none;
  }

  &:nth-child(3) {
    display: none;
  }

  @media (min-width: ${theme.breakpoints.small}) {
    &:nth-child(2) {
      display: table-cell;
    }

    &:nth-child(3) {
      display: table-cell;
    }
  }
`;

export const LabelStatus = styled.span`
  color: ${({ status }) => getStatusColor(status)};
`;
