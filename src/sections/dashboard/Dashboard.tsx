import { useEffect, useState } from "react";

import { config } from "../../devdash_config";
import { GitHubRepository } from "../../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { ReactComponent as Brand } from "./brand.svg";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";
import { useGitHubRepositories } from "./useGitHubRepositories";

const gitHubRepositoryUrls = config.widgets.map((widget) => widget.repository_url);

export function Dashboard({ repository }: { repository: GitHubRepositoryRepository }) {
	const { repositoryData } = useGitHubRepositories(repository, gitHubRepositoryUrls);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>
			{repositoryData.length === 0 ? (
				<div className={styles.empty}>
					<span>No hay widgets configurados.</span>
				</div>
			) : (
				<section className={styles.container}>
					{repositoryData.map((widget) => (
						<GitHubRepositoryWidget
							key={`${widget.id.organization}/${widget.id.name}`}
							widget={widget}
						/>
					))}
				</section>
			)}
		</>
	);
}
