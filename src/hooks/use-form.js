import { useEffect, useState } from 'react';

const useForm = (callback, validate, initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    if (isValid && isSubmitting) {
      setIsSubmitting(false);
      callback(values);
    }
  }, [errors, values, isSubmitting, callback, isValid]);

  const submitHandler = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    if (!isValid) {
      event.preventDefault();
      event.stopPropagation();
    }
    setIsSubmitting(true);
  };

  const changeHandler = (event) => {
    setIsSubmitting(false);
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const resetHandler = () => {
    setIsSubmitting(false);
    setValues(initialValues);
  };

  return {
    submitHandler,
    changeHandler,
    resetHandler,
    values,
    errors,
  };
};

export default useForm;
