import { render, screen } from "@testing-library/react";
import { Dashboard } from "../src/sections/dashboard/Dashboard";
import { GitHubApiGitHubRepositoryRepository } from "../src/infrastructure/GitHubApiGitHubRepositoryRepository";
import { githubApiResponses } from "../src/github_api_responses";

jest.mock("../src/infrastructure/GitHubApiGitHubRepositoryRepository.ts");

const mockRepository =
	GitHubApiGitHubRepositoryRepository as jest.Mock<GitHubApiGitHubRepositoryRepository>;

describe("Dashboard section", () => {
	it("show all widgets", async () => {
		mockRepository.mockImplementationOnce(() => {
			return {
				search: () => Promise.resolve(githubApiResponses),
			} as unknown as GitHubApiGitHubRepositoryRepository;
		});

		render(<Dashboard />);

		const firstWidgetTitle = `${githubApiResponses[0].repositoryData.organization.login}/${githubApiResponses[0].repositoryData.name}`;
		const firstWidgetHeader = await screen.findByRole("heading", {
			name: new RegExp(firstWidgetTitle, "i"),
		});

		expect(firstWidgetHeader).toBeInTheDocument();
	});
});
