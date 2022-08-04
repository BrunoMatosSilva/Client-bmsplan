import styled from 'styled-components'

export const MessegesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
      >img {
      height: 80%;
      width: 80%;
    }

    h2 {
      font-size: 1.5rem;
      padding-top: 2rem;
      color: ${({theme}) => theme.icon}
    }
  }
`
