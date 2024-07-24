import { StatusBar } from "expo-status-bar";
import MainNavigator from "./navigation/MainNavigator";
import { useEffect, useState } from "react";
import { init } from "./util/db";
import AppLoading from "expo-app-loading";

export default function App() {
  const [dbInitialized, setdbInitialized] = useState(false);
  useEffect(() => {
    async function initializeDb() {
      try {
        await init();
      } catch (error) {
        console.log(error);
      }
      setdbInitialized(true);
    }

    initializeDb();
  }, []);

  if (!dbInitialized) {
    <AppLoading />;
  }

  return (
    <>
      <StatusBar style="auto" />

      <MainNavigator />
    </>
  );
}
