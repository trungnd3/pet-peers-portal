import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Centered from '../components/UI/Centered';
import FormGroup from '../components/UI/FormGroup';

import useForm from '../hooks/use-form';
import { addUser, selectStatus } from '../app/action-creators/auth';
import { Link } from 'react-router-dom';

const Registration = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);

  const register = useCallback(
    (values) => {
      dispatch(addUser({ ...values }));
    },
    [dispatch]
  );

  const validate = () => {
    let errors = {};

    if (!values.username) {
      errors.username = 'Mandatory Field';
    } else {
    }

    if (!values.password) {
      errors.password = 'Mandatory Field';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Mandatory Field';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const { submitHandler, changeHandler, values, errors } = useForm(
    register,
    validate
  );

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
        <h3>
          You are successfully registered. Please <Link to='/'>sign in</Link>
        </h3>
      </Centered>
    );
  }

  return (
    <div className='d-flex justify-content-center mt-4'>
      <Form onSubmit={submitHandler} className='w-50'>
        <FormGroup
          type='text'
          label='Username'
          name='username'
          value={values.username}
          error={errors.username}
          onChange={changeHandler}
        />
        <FormGroup
          type='text'
          label='Password'
          name='password'
          className='password'
          value={values.password}
          error={errors.password}
          onChange={changeHandler}
        />
        <FormGroup
          type='text'
          label='Confirm Password'
          name='confirmPassword'
          className='password'
          value={values.confirmPassword}
          error={errors.confirmPassword}
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
            Submit
          </Button>
          <Button
            variant='primary-pet-peers'
            type='submit'
            className='w-25 me-2'
          >
            Reset
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Registration;
