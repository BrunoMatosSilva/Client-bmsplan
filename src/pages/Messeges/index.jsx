import manutImg from '../../assets/manut.svg'
import { MessegesContainer } from "./styles";

export function Messeges() {
  return (
    <MessegesContainer>
      <section>
        <img src={manutImg} />
        <h2>Pagina em construção!</h2>
      </section>
    </MessegesContainer>
  )
}
