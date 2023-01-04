// El named export es buena práctica para que se mantenga
// el mismo nombre de lo que exportamos
// Si fuese un export default el import podría tener cualquier nombre
import { Dashboard } from "./sections/dashboard/Dashboard";

export function App() {
	return <Dashboard />;
}
