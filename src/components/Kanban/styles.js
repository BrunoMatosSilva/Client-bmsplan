import styled from 'styled-components'

export const AddBoardWrapper = styled.div`
width: 100%;
display: flex;
align-items: center;

  > section {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: center;
        button {
          display: flex;
          align-items: center;
          padding: 0.5rem;
          border: none;
          border-radius: 10px;
          background: ${({ theme }) => theme.icon};
          color: ${({ theme }) => theme.border};
          gap: 0.75rem;
          transition: 0.2s all;

          &:hover {
            background: ${({theme}) => theme.textPriorityHight};
          }
        }
    }
  }
`

export const ListContainer = styled.div`
display: flex;
width: 100%;

  @media (max-width: 320px) {
    display: flex;
    flex-direction: column;
  }
`

export const ListContent = styled.ul`
display: flex;
align-items: flex-start;
width: calc(100vw - 400px);
padding-top: 3rem;
overflow-x: auto;
gap: 1rem;

  @media (max-width: 764px) {
    width: 100%;
  }

li {
  display: flex;
  flex: 1;
  align-items: center;
}

  > div {
    min-width: 300px;
    display: flex;

    @media (max-width: 764px) {
      min-width: 230px;
    }

    .headerList{
      display: flex;
      max-height: 34rem;
      align-items: center;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      justify-content: space-between;
      background: ${({ theme }) => theme.backgroundList};
      border-radius: 10px;
      padding: 0.5rem;
      overflow-y: auto;

      @media (max-width: 764px) {
        width: 250px;
        max-height: 34rem;
      }

      span {
        display: flex;
        justify-content: space-between;
        width: 100%;
        flex: 1;
        align-items: center;
        border-bottom: 3px solid ${({ theme }) => theme.icon};

        .title{
          color: ${({ theme }) => theme.icon};
          padding-bottom: 0.75rem;
        }
        
          input {
          border: none;
          background: transparent;
          width: 120px;
          font-weight: bold;
          color: ${({ theme }) => theme.primary};

          &:focus {
            outline: none;
          }

          ::placeholder {
            color: ${({ theme }) => theme.primary}
          }
          }

          > section {
            display: flex;
            padding-bottom: 0.75rem;

            svg {
              cursor: pointer;
              margin-left: 1rem;
            }
          }
      }      
    } 
  }
`
export const CardContainer = styled.div`
display: flex;
flex-direction: column;
`

export const Card = styled.a`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgroundCard};
  padding: 1rem;
  margin-bottom: 1rem;
  margin-top: 0.25rem;
  border-radius: 10px;
  cursor: pointer;

   >section {
      display: flex;
      width: 240px;
      height: 80px;
      flex-direction: column;
      gap: 0.75rem;

      @media (max-width: 764px) {
      width: 180px;
    }

      .headerCard {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        
          h2{
          font-size: 1.12rem;
          color: ${({ theme }) => theme.primary};
          font-weight: semi-bold;

          @media (max-width: 764px) {
            font-size: 1rem;
          }
        }
      }

      p {
        width: 195px;
        font-size: 0.75rem;
        color: ${({ theme }) => theme.secondery};
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        @media (max-width: 764px) {
            font-size: 0.65rem;
          }
      }
    }
`