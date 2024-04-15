import Routing from "./routing/routing.tsx";
import ToastService from "@/services/toast/ToastService.tsx";

const App = () => {
  return (
    <>
      <Routing />
      <ToastService />
    </>
  );
};

export default App;
