import styled from 'styled-components';
import { space, border } from 'styled-system';
import { Input } from '@rebass/forms';

const InputField = styled(Input)`
  && {
    border: 2px solid ${({ theme }) => theme.colors.lightDark};
    border-radius: 4px;
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }

    &:disabled {
      border-color: ${({ theme }) => theme.colors.light};
    }

    ${border};
    ${space};
  }
`;

export default InputField;
