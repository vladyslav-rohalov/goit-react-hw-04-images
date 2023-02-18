import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled';

export default function Searchbar({ onFormSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    onFormSubmit(data.input);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Button type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </Button>
        <Input
          {...register('input', { required: true })}
          placeholder="Search images and photos"
        />
        {errors.exampleRequired && <span>This field is required</span>}
      </Form>
    </Header>
  );
}

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func,
};
