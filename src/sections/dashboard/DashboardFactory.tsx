import React from "react";

import { config } from "../../devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import { Dashboard } from "./Dashboard";
import { useRepositoryWidgetContext } from "./repositoryWidget/RepositoryWidgetContextProvider";
import { LocalStorageRepositoryWidgetRepository } from "../../infrastructure/LocalStorageRepositoryWidgetRepository";

const gitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(
	config.github_access_token
);

const repositoryWidgetRepository = new LocalStorageRepositoryWidgetRepository();

export function DashboardFactory() {
	const { repositoryWidgets } = useRepositoryWidgetContext();
	return (
		<Dashboard
			gitHubRepositoryRepository={gitHubRepositoryRepository}
			repositoryWidgetRepository={repositoryWidgetRepository}
			repositoryWidgets={repositoryWidgets}
		/>
	);
}
