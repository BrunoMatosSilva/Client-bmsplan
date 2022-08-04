import styled from 'styled-components'

export const SidebarContainer = styled.aside`
  display: block;
  width: 16rem;
  height: calc(100vh - 4.3rem);
  border-right: 1px solid ${({ theme }) => theme.border};
  justify-content: space-between;

      @media (max-width: 425px) {
          width: 6.5rem;
          height: 100%;
          position: sticky;
          left:0 ;
          z-index: 5;
          background: ${({ theme }) => theme.background};
      }

      @media (max-width: 760px) {
          width: 6.5rem;
          position: sticky;
          left:0 ;
          z-index: 5;
          background: ${({ theme }) => theme.background};
      }

  ul {
    margin: 2rem;
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;
    gap: 1.12rem;

    li {
      display: flex;
      flex: 1;
      align-items: center;

      a {
        display: flex;
        align-items: center;
        font-size: 1rem;
        color: ${({ theme }) => theme.primary};
        cursor: pointer;
        transition: 1s color;

        p {
          @media (max-width: 764px) {
          display: none;
        }
        }

        &.active {
          color: ${({ theme }) => theme.icon};
        }
        
        svg {
          margin-right: 1rem;
        }

        &:hover {
          color: ${({ theme }) => theme.icon};
        }
      }
    }
  }
`


export const ProjetosTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
  gap: 2;
  border-top: 1px solid ${({ theme }) => theme.border};

  header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    h3 {
      font-size: 0.75rem;
      text-transform: uppercase;
      margin-bottom: 1rem;
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

export const FavoritoWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    button {
      display: flex;
      text-align: left;
      align-items: center;
      justify-content: space-between;
      border: none;
      border-radius: 0.37rem;
      padding-left: 0.5rem;
      padding-right: 0.25rem;
      padding-bottom: 0.25rem;
      margin-bottom: 1rem;
      cursor: pointer;
      color: ${({ theme }) => theme.primary};
      background: none;
      font-size: 1rem;
      transition: 1s all;
      overflow: hidden;

      &:hover {
        color: ${({ theme }) => theme.icon};
        background: rgb(153, 102, 255, 0.2);
      }
      span {
        font-size: 1rem;
        margin-right: 0.5rem;
      }
    }
  }
`

export const ProjetosWrapper = styled.ul`
  width: 100% !important;
  height: 25rem;
  display: flex;
  justify-content: space-between;
  margin: 0 !important;
  overflow-y: auto;
  
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


