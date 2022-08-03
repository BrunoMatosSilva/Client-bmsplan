import styled from "styled-components";

export const TaskModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    outline : none;
    position : absolute;
    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);
    width: 50%;
    height: 80%;
    gap: 0.75rem;
    background-color: ${({theme}) => theme.background};
    padding: 1rem;
    -webkit-box-shadow: 10px 10px 17px -6px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 17px -6px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 17px -6px rgba(0,0,0,0.75);

    header {
      display: flex;
      justify-content: flex-end;

      svg {
        cursor: pointer;
      }
    }

    input {
      font-size: 2rem;
      font-weight: bold;
      color: ${({ theme }) => theme.primary};
      border: none;
      background: transparent;

      &:focus {
        outline: none;
      }
    }

    timer {
      font-size: 0.75rem;
      font-weight: bold;

      span {
        color: ${({theme}) => theme.icon};
      }
    }

    .editorContainer{
      overflow: hidden;
      overflow-y: auto;
    }
`