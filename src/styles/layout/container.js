import styled from 'styled-components';
import { Box } from 'rebass';

export const Container = styled(Box)({
  maxWidth: '1024px',
});

Container.defaultProps = {
  mx: 'auto',
};

export default Container;
