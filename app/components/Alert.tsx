import React from 'react';
import { Button, Modal, Text } from 'native-base';

interface AlertProps {
  description: string;
  isOpen: boolean;
  onPress: () => void;
  title: string;
}

const Alert: React.FC<AlertProps> = ({
  description,
  isOpen,
  onPress,
  title
}) => (
  <Modal isOpen={isOpen}>
    <Modal.Content maxWidth='400px'>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <Text>{description}</Text>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button
            backgroundColor='blue.500'
            onPress={onPress}
          >
            Okay
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
);

export default Alert;