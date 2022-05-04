import { useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import useForm from '../../hooks/use-form';

const SearchPet = ({ show, onClose, onSearch }) => {
  const search = useCallback(
    (values) => {
      onSearch({ ...values });
    },
    [onSearch]
  );

  const { submitHandler, changeHandler, resetHandler, values } = useForm(
    search,
    () => ({})
  );

  return (
    <Modal size='lg' show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Advanced Search</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <div className='row'>
            <Form.Group
              className='col-md-4 col-12 d-flex mb-3'
              controlId='formName'
            >
              <Form.Label className='align-self-center me-2 w-50 text-end'>
                Pet name:
              </Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={values.name || ''}
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group
              className='col-md-4 col-12 d-flex mb-3'
              controlId='formAge'
            >
              <Form.Label className='align-self-center me-2 w-50 text-end'>
                Age:
              </Form.Label>
              <Form.Control
                type='text'
                name='age'
                value={values.age || ''}
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group
              className='col-md-4 col-12 d-flex mb-3'
              controlId='formPlace'
            >
              <Form.Label className='align-self-center me-2 w-50 text-end'>
                Place:
              </Form.Label>
              <Form.Control
                type='text'
                name='place'
                value={values.place || ''}
                onChange={changeHandler}
              />
            </Form.Group>
          </div>
          <Form.Group className='d-flex flex-row-reverse'>
            <Button
              type='button'
              variant='primary-pet-peers'
              className='ms-2'
              onClick={() => {
                resetHandler();
                onSearch({ name: '', place: '', age: '' });
              }}
            >
              Clear
            </Button>
            <Button type='submit' variant='primary-pet-peers'>
              Search
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SearchPet;
