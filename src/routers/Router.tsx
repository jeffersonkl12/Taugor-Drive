import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EntryScreen from "@screens/entry/EntryScreen";
import { RootParamList } from "./types/types";
import LoginScreen from "@screens/login/LoginScreen";
import SignupScreen from "@screens/signup/SignupScreen";
import ForgotPasswordScreen from "@screens/forgotPassword/ForgotPasswordScreen";
import { HeaderDrawer, HeaderStack } from "@components/header/Header";
import { useAuth } from "@context/AuthContext";
import HomeScreen from "@screens/Home/HomeScreen";
import UploadScreen from "@screens/upload/UploadScreen";
import IconCustom from "@components/iconCustom/IconCustom";
import HomeIcon from "@icons/pagina-inicial.png";
import UploadIcon from "@icons/arquivo-upload.png";
import { COLORS } from "@constants/customTheme";

const Stack = createNativeStackNavigator<RootParamList>();

const StackNavigator = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{ header: (props) => <HeaderStack {...props} /> }}
        >
          <Stack.Screen
            name="Entry"
            component={EntryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={SignupScreen} />
          <Stack.Screen name="Esqueci-Senha" component={ForgotPasswordScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </>
  );
};

const Drawer = createDrawerNavigator<RootParamList>();

const DrawerNavigator = () => {
  const { authState } = useAuth();

  return (
    <>
      <Drawer.Navigator drawerContent={(props) => <HeaderDrawer {...props} />} screenOptions={{
        drawerActiveBackgroundColor: COLORS["azul-marinho"][500],
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "black",
        drawerLabelStyle: {
          fontFamily: "Roboto-Medium",
          fontSize: 16,
          fontWeight: "bold",

          marginLeft: -25
        }
      }}>
        {authState.isAuthenticated ? (
          <Drawer.Group>
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              options={{ drawerIcon: () => <IconCustom source={HomeIcon} iconSize={22}/> }}
            />
            <Drawer.Screen
              name="Upload"
              component={UploadScreen}
              options={{ drawerIcon: () => <IconCustom source={UploadIcon} iconSize={22}/> }}
            />
          </Drawer.Group>
        ) : (
          <Drawer.Group>
            <Drawer.Screen
              name="Stack"
              component={StackNavigator}
              options={{ headerShown: false }}
            />
          </Drawer.Group>
        )}
      </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigator;
