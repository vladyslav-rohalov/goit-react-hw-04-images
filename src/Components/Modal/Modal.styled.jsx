import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const Modal = styled.div`
  position: relative;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

export const ButtonClose = styled.button`
  position: absolute;
  top: -32px;
  right: -32px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const ModalImg = styled.img`
  max-width: calc(100vw - 148px);
  max-height: calc(100vh - 124px);
`;
