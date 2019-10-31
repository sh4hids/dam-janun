import React from 'react';
import styled from 'styled-components';
import { space, height, width } from 'styled-system';

const MenuContainer = styled.ul`
  margin: 0;
  padding: 0;
  text-align: right;

  li {
    display: inline-block;

    a {
      line-height: 60px;
      text-decoration: none;
      color: ${({ theme }) => theme.colors.light};
      padding: 0 16px;
    }

    &:last-child {
      a {
        padding-right: 0;
      }
    }
  }

  ${space};
  ${height};
  ${width};
`;

const Menu = () => (
  <MenuContainer>
    <li>
      <a href="https://github.com/sh4hids/dam-janun">গিটহাব</a>
    </li>
  </MenuContainer>
);

export default Menu;
