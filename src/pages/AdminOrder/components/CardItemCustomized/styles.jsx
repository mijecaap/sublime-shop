import styled from "styled-components";

export const CardContainer = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
`;

export const CardImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 16px;

  > div:nth-child(1) {
    flex-grow: 1;
  }

  > div:nth-child(2) {
    flex-grow: 0;
  }
`;

export const CardImageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

export const CardImage = styled.img`
  height: 200px;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
`;

export const CardTitle = styled.span`
  width: 100%;
  font-size: 18px;
  font-weight: bold;
`;

export const CardDescription = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: #888;
`;
