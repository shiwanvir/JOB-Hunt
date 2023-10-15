import LoginScreen from "./src/Components/Screens/loginScreen";
import { NavigationContainer } from "@react-navigation/native";
import ReactNavigationBottomTabs from "./src/Components/Navigation/tab";
import { StateProvider, useStateContext } from "./src/context/StateContext";

export default function App() {
  return (
    <StateProvider>
      <AppNavigator />
    </StateProvider>
  );
}
function AppNavigator() {
  const { authenticatedUser, loading } = useStateContext();
  console.log("AULOGIN", authenticatedUser, loading);
  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      {authenticatedUser ? <ReactNavigationBottomTabs /> : <LoginScreen />}
    </NavigationContainer>
  );
}
