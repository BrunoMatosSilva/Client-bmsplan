import styled from "styled-components";

export const EmojiPickerContainer = styled.div`
position: relative;
width: 100%;

button {
    border: none;
    background: transparent;
    font-size: 2rem;

    @media (max-width: 764px) {
        font-size: 1.5rem;
    }
}
`

export const PickerModal = styled.div`
display: ${({isShowPicker}) => (isShowPicker ? 'block' : 'none')};
position: absolute;
top: 100%;
z-index: 9999;


`