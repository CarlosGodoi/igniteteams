import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { Alert, FlatList } from "react-native";

import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { ButtonIcon } from "@components/buttonIcon";
import { Input } from "@components/input";
import { Filter } from "@components/filter";
import { PlayerCard } from "@components/playerCard";
import { ListEmpty } from "@components/listEmpty";
import { Button } from "@components/button";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { AppError } from "@utils/appError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";

import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";

type RouteParams = {
  group: string;
};

export function Players() {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  const route = useRoute();
  const { group } = route.params as RouteParams;

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova Pessoa",
        "Informe o nome da pessoa para adicionar."
      );
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova Pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova Pessoa", "Não foi possível adicionar.");
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playerByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playerByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Pessoas",
        "Não foi possível carregar as pessoas do time selecionado."
      );
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subTitle="Adicione a galera e separe os times" />
      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas neste time" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />
      <Button title="Remover turma" type="SECUNDARY" />
    </Container>
  );
}
