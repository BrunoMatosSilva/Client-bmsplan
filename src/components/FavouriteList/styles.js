import styled from "styled-components";

export const FavoritoWrapper = styled.ul`
  width: 100% !important;
  max-height: 30rem;
  display: flex;
  justify-content: space-between;
  margin: 0 !important;
  
  div {
    display: flex;
    flex-direction: column;
    a {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: none;
      border-radius: 0.37rem;
      padding-left: 0.5rem;
      padding-right: 0.25rem;
      padding-bottom: 0.25rem;
      padding-top: 0.25rem;
      margin-bottom: 1rem;
      margin-top: 0.25rem;
      color: ${({ theme }) => theme.primary};
      background: none;
      font-size: 1rem;
      transition: 1s all;
      cursor: grab;
      overflow: hidden;

      &.active {
        color: ${({ theme }) => theme.icon};
      }

      &:hover {
        color: ${({ theme }) => theme.icon};
        background: rgb(153, 102, 255, 0.2);
      }

      div {
        display: flex;
        width: 100%;
        align-items: center;
        flex-direction: row !important;
        justify-content: space-between !important;

        section {
          display: flex;

          span {
            font-size: rem;
            margin-right: 0.5rem;
          }
          p {
            overflow: hidden;
          }
        }
      }
      
    }
  }
    
`