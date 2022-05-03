import Form from 'react-bootstrap/Form';

const FormGroup = ({
  type,
  label,
  name,
  className,
  value,
  error,
  onChange,
}) => {
  const controlId = 'form' + name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <Form.Group
      className={`d-flex justify-content-between mb-4${
        error ? ' invalid' : ''
      }`}
      controlId={`${controlId}`}
    >
      <Form.Label className='align-self-center mb-0 me-1 w-25'>
        {label}
      </Form.Label>
      <div className='w-75'>
        <Form.Control
          type={type}
          name={name}
          autoComplete={className === 'password' ? 'off' : 'auto'}
          className={className !== undefined ? className : ''}
          value={value || ''}
          onChange={onChange}
        />
        {error && <Form.Text className='error-text ms-2'>{error}</Form.Text>}
      </div>
    </Form.Group>
  );
};

export default FormGroup;
