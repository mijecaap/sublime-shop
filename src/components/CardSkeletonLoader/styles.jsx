import styled, { keyframes } from "styled-components";

const shimmerAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(to right, #e0e0e0 20%, #f0f0f0 40%, #e0e0e0 60%);
  background-size: 200px 100%;
  border-radius: 8px;
  margin-bottom: 16px;
  animation: ${shimmerAnimation} 1.5s linear infinite;
`;

export const SkeletonText = styled.div`
  width: 70%;
  height: 16px;
  background: linear-gradient(to right, #e0e0e0 20%, #f0f0f0 40%, #e0e0e0 60%);
  background-size: 200px 100%;
  margin-bottom: 8px;
  animation: ${shimmerAnimation} 1.5s linear infinite;
`;

export const SkeletonPrice = styled.div`
  width: 40%;
  height: 16px;
  background: linear-gradient(to right, #e0e0e0 20%, #f0f0f0 40%, #e0e0e0 60%);
  background-size: 200px 100%;
  margin-bottom: 16px;
  animation: ${shimmerAnimation} 1.5s linear infinite;
`;

export const SkeletonButton = styled.div`
  width: 120px;
  height: 40px;
  background: linear-gradient(to right, #e0e0e0 20%, #f0f0f0 40%, #e0e0e0 60%);
  background-size: 200px 100%;
  border-radius: 4px;
  animation: ${shimmerAnimation} 1.5s linear infinite;
`;
