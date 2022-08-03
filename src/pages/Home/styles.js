import styled from 'styled-components'

export const HomeContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 100%;

> button {
  padding: 1rem;
  border-radius: 10px;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  transition: 0.2s all;

  &:hover {
  color: ${({ theme }) => theme.icon};
  border: 1px solid ${({ theme }) => theme.icon};
  }
}
`
