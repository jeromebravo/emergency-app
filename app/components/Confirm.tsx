import React from 'react';
import { Button, Modal, Text } from 'native-base';

interface ConfirmProps {
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const Confirm: React.FC<ConfirmProps> = ({
  description,
  isOpen,
  onClose,
  onConfirm,
  title
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <Modal.Content maxWidth='400px'>
      <Modal.CloseButton />
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <Text>{description}</Text>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button
            variant='ghost'
            colorScheme='blueGray'
            onPress={onClose}>
            Cancel
          </Button>
          <Button
            backgroundColor='blue.500'
            onPress={onConfirm}
          >
            Confirm
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
);

export default Confirm;