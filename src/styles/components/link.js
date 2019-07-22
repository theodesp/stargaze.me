import styled from 'styled-components';
import { Link } from 'rebass';

const LinkButton = styled(Link)({
  color: 'inherit',
  fontWeight: 'bold',
  padding: '0 1em',
});

LinkButton.defaultProps = {};

export default LinkButton;
