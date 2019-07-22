import styled from 'styled-components';
import { Box } from 'rebass';

const TopMenu = styled(Box)({
  zIndex: 1,
  padding: '0.8em 1.2em',
  display: 'flex',
  alignItems: 'center',

  justifyContent: 'space-between',
  fontWeight: 'bold',
});

TopMenu.defaultProps = {
  color: 'white',
  backgroundColor: '#24292e',
};

export default TopMenu;
