import { Header } from "@components/header";
import { Container } from "./styles";
import { Highlight } from "@components/highlight";

export function Players() {
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Nome da turma"
        subTitle="Adicione a galera e separe os times"
      />
    </Container>
  );
}
