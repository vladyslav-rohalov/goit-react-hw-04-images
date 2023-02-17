import { Component } from 'react';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    qeury: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.qeury.trim() === '') {
      return;
    }
    this.props.onFormSubmit(this.state.qeury);
    this.setState({ qeury: '' });
  };

  handleChange = e => {
    this.setState({ qeury: e.currentTarget.value });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <ButtonLabel>Search</ButtonLabel>
          </Button>

          <Input
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.qeury}
            onChange={this.handleChange}
          />
        </Form>
      </Header>
    );
  }
}
