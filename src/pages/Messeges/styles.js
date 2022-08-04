import styled from 'styled-components'

export const MessegesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem;

  >img {
    height: 80%;
    width: 80%;
  }

  h2 {
    font-size: 1.5rem;
    padding-top: 2rem;
    color: ${({theme}) => theme.icon}
  }
`
