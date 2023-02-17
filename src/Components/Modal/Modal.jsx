import PropTypes from 'prop-types';
import { Overlay, Modal, ModalImg, ButtonClose } from './Modal.styled';
import { SlClose } from 'react-icons/sl';

const svg = { fill: 'white', width: '100%', height: '100%' };

export default function openModal({ largeImage, onBtnCloseModal }) {
  return (
    <Overlay>
      <Modal>
        <ButtonClose type="button" onClick={onBtnCloseModal}>
          <SlClose style={svg} />
        </ButtonClose>
        <ModalImg src={largeImage} alt="qwe" />
      </Modal>
    </Overlay>
  );
}

openModal.propTypes = {
  largeImage: PropTypes.string,
  onBtnCloseModal: PropTypes.func,
};
