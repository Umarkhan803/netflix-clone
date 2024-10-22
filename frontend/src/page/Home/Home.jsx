import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const Home = () => {
  const user = false;
  return (
    <>
      <div>{user ? <HomeScreen /> : <AuthScreen />}</div>
    </>
  );
};

export default Home;
