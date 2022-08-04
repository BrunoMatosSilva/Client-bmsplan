import styled from 'styled-components'

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;

  @media (max-width: 320px) {
    margin: 0;
    flex-direction: column;
  }
`

export const BoardHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  @media (max-width: 320px) {
    width: 10rem;
  }

`

export const BoardTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  
  align-items: center;
  
  .title {
    display: flex;
    align-items: center;

    input {
      font-size: 2rem;
      padding-left: 0.5rem;
      font-weight: bold;
      color: ${({ theme }) => theme.primary};
      border: none;
      background: transparent;

      @media (max-width: 764px) {
        font-size: 1.25rem;
      }

      &:focus {
        outline: none;
      }
    }
  }
   .favorites {
    display: flex;
    gap: 2rem;

    button {
      background: transparent;
      border: none;
      padding-top: 0.1rem;

      svg {
      font-size: 1.5rem;
      font-weight: bold;
      cursor: pointer;
      transition: 0.2s all;

      &:hover {
        color: ${({ theme }) => theme.icon};
        }
      }
    }
   }
`

export const SubtitleBoard = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1rem;

  .subtitle {
    display: flex;

    textarea {
      width: 20rem;
      height: 5rem;
      font-size: 0.85rem;
      border: none;
      color: ${({ theme }) => theme.primary};
      background: transparent;
      resize: none;
      overflow: hidden;
      
      &:focus {
        outline: none;
      }
    }
  }
`
