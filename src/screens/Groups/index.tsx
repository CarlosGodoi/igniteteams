import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { GroupCard } from "@components/gorupCard";
import { ListEmpty } from "@components/listEmpty";
import { Button } from "@components/button";
import { Container } from "./styles";
import { useState } from "react";
import { FlatList } from "react-native";

export function Groups() {
  const [groups, setGroups] = useState(["Galera da rocket"]);
  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subTitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
      />

      <Button title="Criar nova turma" />
    </Container>
  );
}
