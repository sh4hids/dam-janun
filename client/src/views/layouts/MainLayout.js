import React from 'react';
import { Flex, Box } from 'rebass/styled-components';

import { Image, Menu } from '../components';
import logo from '../assets/images/logo-outlined.svg';

const MainLayout = ({ children }) => (
  <>
    <Box bg="primary" height={60} mb={[3, 3, 4]}>
      <Box width={1} maxWidth={980} pr={3} pl={3} m="0 auto">
        <Flex flexWrap="wrap">
          <Box width={1 / 2}>
            <a href={window.location.pathname || '/'}>
              <Image width={40} mt={10} src={logo} alt="দাম জানুন" />
            </a>
          </Box>
          <Box width={1 / 2}>
            <Menu />
          </Box>
        </Flex>
      </Box>
    </Box>
    {children}
  </>
);

export default MainLayout;
