import styled from 'styled-components'

export const LayoutContainer = styled.div`
  .container {
    display: flex;
    width: 100%;
    max-width: 70rem;
    margin-right: auto;
    margin-left: auto;
    
  }
`

export const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 256px 1fr;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 764px) {
    grid-template-columns: 3rem 1fr;
    overflow-x: auto;
  }
`
