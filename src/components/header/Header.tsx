import ClickableText from "@components/clickableText/ClickableText";
import IconCustom from "@components/iconCustom/IconCustom";
import GoBackIcon from "@icons/go-back-white.png";
import {
  NativeStackHeaderProps,
} from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import LogoutIcon from "@icons/sair.png";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { useAuth } from "@context/AuthContext";
import Divider from "@components/divider/Divider";

export const HeaderStack = ({ navigation }: NativeStackHeaderProps) => {
  const onPressIconGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerStackContent}>
          <IconCustom
            source={GoBackIcon}
            iconSize={20}
            onPress={onPressIconGoBack}
          />
        </View>
      </View>
    </>
  );
};

export const HeaderDrawer = (props: DrawerContentComponentProps) => {
  const { logout } = useAuth();

  const onPressButtonLogout = () => {
    logout();
    props.navigation.closeDrawer();
    props.navigation.navigate("Stack", { screen: "Login" });
  };

  return (
    <>
      <View style={styles.headerDrawerContent}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <Divider style={styles.containerDivider} />
        <View style={styles.ContainerLogout}>
          <IconCustom
            source={LogoutIcon}
            iconSize={22}
            onPress={onPressButtonLogout}
          />
          <ClickableText
            onPress={onPressButtonLogout}
            style={styles.logoutText}
          >
            Log out
          </ClickableText>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStackContent: {
    flex: 1,
    alignContent: "center",
    paddingHorizontal: "10%",
    paddingVertical: 40,
  },
  headerDrawerContent: {
    flex: 1,
  },
  containerDivider: {
    marginBottom: 20,
  },
  logoutText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  ContainerLogout: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingBottom: 30,
  },
});
