import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

const ErrorModal: React.FC<{error: string | undefined, onClear:() => void}> = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;