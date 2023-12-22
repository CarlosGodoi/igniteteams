import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { Container } from "./styles";

export function Groups() {
  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subTitle="Jogue com a sua turma" />
    </Container>
  );
}
