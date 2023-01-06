// El named export es buena práctica para que se mantenga
// el mismo nombre de lo que exportamos
// Si fuese un export default el import podría tener cualquier nombre
import { config } from "./devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "./infrastructure/GitHubApiGitHubRepositoryRepository";
import { Dashboard } from "./sections/dashboard/Dashboard";

const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);

export function App() {
	return <Dashboard repository={repository} />;
}
