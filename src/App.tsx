import "./App.scss";
import { PageFilters } from "./pages/filters";
import { OrdersButton } from './components/OrdersButton/OrdersButton';

function App() {
  return (
    <div>
      <PageFilters />
      <OrdersButton />
    </div>
  );
}

export default App;
