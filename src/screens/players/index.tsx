import { Header } from "@components/header";
import { Container, Form } from "./styles";
import { Highlight } from "@components/highlight";
import { ButtonIcon } from "@components/buttonIcon";
import { Input } from "@components/input";

export function Players() {
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Nome da turma"
        subTitle="Adicione a galera e separe os times"
      />
      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>
    </Container>
  );
}
