import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";

export async function groupRemoveByName(groupdeleted: string) {
  try {
    const storedGroups = await groupsGetAll();

    const groups = storedGroups.filter((group) => group !== groupdeleted);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));

    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupdeleted}`);
  } catch (error) {
    throw error;
  }
}
