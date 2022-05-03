import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Centered from '../components/UI/Centered';
import FormGroup from '../components/UI/FormGroup';

import useForm from '../hooks/use-form';
import { addPet, selectStatus } from '../app/action-creators/pet';

const AddPet = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);

  const addNewPet = useCallback(
    (values) => {
      dispatch(addPet({ ...values }));
    },
    [dispatch]
  );

  const validate = () => {
    let errors = {};

    if (!values.name) {
      errors.name = 'Mandatory Field';
    }

    if (!values.age) {
      errors.age = 'Mandatory Field';
    } else if (
      isNaN(values.age) ||
      Number(values.age) < 0 ||
      Number(values.age) > 99
    ) {
      errors.age = 'Age should be 0 and 99 years';
    }

    if (!values.place) {
      errors.place = 'Mandatory Field';
    }

    return errors;
  };

  const { submitHandler, changeHandler, resetHandler, values, errors } =
    useForm(addNewPet, validate);

  if (status.loading === 'pending') {
    return (
      <Centered>
        <LoadingSpinner />
      </Centered>
    );
  }

  if (status.loading === 'success') {
    return (
      <Centered>
        <h3>You are successfully add pet</h3>
      </Centered>
    );
  }

  return (
    <div className='d-flex justify-content-center mt-4'>
      <Form onSubmit={submitHandler} className='w-50'>
        <FormGroup
          type='text'
          label='Name'
          name='name'
          value={values.name}
          error={errors.name}
          onChange={changeHandler}
        />
        <FormGroup
          type='text'
          label='Age'
          name='age'
          value={values.age}
          error={errors.age}
          onChange={changeHandler}
        />
        <FormGroup
          type='text'
          label='Place'
          name='place'
          value={values.place}
          error={errors.place}
          onChange={changeHandler}
        />
        {status.loading === 'failed' && (
          <Form.Group
            className={`d-flex justify-content-center mb-4${
              status.error ? ' invalid' : ''
            }`}
          >
            <Form.Text className='error-text ms-2'>{status.error}</Form.Text>
          </Form.Group>
        )}
        <Form.Group className='d-flex'>
          <Button
            variant='primary-pet-peers'
            type='submit'
            className='w-25 me-2'
          >
            Save
          </Button>
          <Button
            variant='primary-pet-peers'
            type='button'
            className='w-25 me-2'
            onClick={resetHandler}
          >
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default AddPet;
