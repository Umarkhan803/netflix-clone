import { useAuthStore } from "../../store/authUser";

const HomeScreen = () => {
  const { logout } = useAuthStore();

  return (
    <>
      This is Home screen refreshdacasc
      <img src="/netflix-logo.png" alt="logo" className="w-52" />
      <br />
    </>
  );
};

export default HomeScreen;
