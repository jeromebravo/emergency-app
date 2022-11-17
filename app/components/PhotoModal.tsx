import React from 'react';
import { Image, Modal } from 'native-base';

interface PhotoModalProps {
  onClose: () => void;
  uri: string;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ onClose, uri }) => (
  <Modal isOpen={uri.length > 0} onClose={onClose}>
    <Modal.Content maxWidth={300}>
      <Image
        alt='photo'
        size={300}
        source={{ uri }}
      />
    </Modal.Content>
  </Modal>
);

export default PhotoModal;