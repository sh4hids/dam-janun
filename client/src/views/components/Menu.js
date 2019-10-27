import styled from "styled-components";
import { space, height, width } from "styled-system";

const Menu = styled.ul`
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
  }

  ${space};
  ${height};
  ${width};
`;

export default Menu;
