import PropTypes from 'prop-types';
import { Button } from './Button.styled';

export default function button({ onBtnClick }) {
  return (
    <Button type="button" onClick={onBtnClick}>
      Load more
    </Button>
  );
}

button.propTypes = {
  onBtnClick: PropTypes.func,
};
