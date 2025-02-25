import "./App.scss";
import { PageFilters } from "./pages/filters";
import { OrdersButton } from './components/OrdersButton/OrdersButton';
import { WorldClock } from './components/WorldClock/WorldClock';

function App() {
  return (
    <div>
      <PageFilters />
      <OrdersButton />
      <WorldClock />
    </div>
  );
}

export default App;
