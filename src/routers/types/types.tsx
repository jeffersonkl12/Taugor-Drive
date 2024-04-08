import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootParamList = {
  Entry: undefined;
  Login: undefined;
  Cadastro: undefined;
  "Esqueci-Senha": undefined;
  "Reset-Senha": undefined;
  Home: undefined;
  Upload: undefined;
  Stack: undefined;
};

export type RootStackScreenProps<T extends keyof RootParamList> = {
  navigation: NativeStackNavigationProp<RootParamList, T>;
  route: RouteProp<RootParamList, T>;
};

export type DrawerScreenProps<T extends keyof RootParamList> = {
  navigation: DrawerNavigationProp<RootParamList, T>;
  route: RouteProp<RootParamList, T>;
};
