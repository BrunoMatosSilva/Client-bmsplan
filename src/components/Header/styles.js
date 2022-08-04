import styled from 'styled-components'

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding-left: 1rem;
  padding-right: 1rem;

  @media (max-width: 764px) {
    width: 100%;
    padding-right: 0;
  }
`

export const LogoWrapper = styled.div`
  display: flex;
  width: 15rem;
  height: 4.2rem;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 764px) {
    width: 5.5rem;
  }
  > section {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    a {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      @media (max-width: 764px) {
        padding-left: 1rem;
        justify-content: center;
        gap: 0;
      }
      > img {
        height: 1.5rem;
        width: 1.5rem;
      }
      h2 {
        color: ${({ theme }) => theme.secondery};

        @media (max-width: 764px) {
          display: none;
        }
      }
    }
  }
  svg {
    margin-left: 3rem;

    @media (max-width: 764px) {
      display: none;
    }
  }
`

export const PerfilWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    cursor: pointer;
  }

  > button {
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.primary};

    &:hover {
      color: ${({ theme }) => theme.icon};
    }
  }

  section {
    display: flex;
    margin-right: 2rem;
    gap: 1.2rem;

    button {
      border: none;
      background: transparent;
      color: ${({ theme }) => theme.primary};
    }

    svg {
      cursor: pointer;
      transition: 1s color;

      &:hover {
        color: ${({ theme }) => theme.icon};
      }
    }
  }
`
