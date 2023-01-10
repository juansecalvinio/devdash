import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mock } from "jest-mock-extended";
import { LocalStorageRepositoryWidgetRepository } from "../../../src/infrastructure/LocalStorageRepositoryWidgetRepository";
import { AddRepositoryWidgetForm } from "../../../src/sections/dashboard/repositoryWidget/AddRepositoryWidgetForm";
import { RepositoryWidget } from "../../../src/domain/RepositoryWidget";

const mockRepository = mock<LocalStorageRepositoryWidgetRepository>();

describe("AddWidgetForm", () => {
	it("show widget form when add button is clicked", async () => {
		render(<AddRepositoryWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", {
			name: new RegExp("Añadir", "i"),
		});

		userEvent.click(button);

		const url = screen.getByLabelText(/Url del repositorio/i);

		expect(url).toBeInTheDocument();
	});

	it("save new widget when form is submitted", async () => {
		const newWidget: RepositoryWidget = {
			id: "newWidgetId",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};

		render(<AddRepositoryWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});
		userEvent.click(button);

		const id = screen.getByLabelText(/Id/i);
		userEvent.type(id, newWidget.id);

		const url = screen.getByLabelText(/Url del repositorio/i);
		userEvent.type(url, newWidget.repositoryUrl);

		const submitButton = await screen.findByRole("button", {
			name: /Añadir/i,
		});
		userEvent.click(submitButton);

		const addAnotherRepositoryFormButton = await screen.findByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});

		expect(addAnotherRepositoryFormButton).toBeInTheDocument();
		expect(mockRepository.save).toHaveBeenCalledWith(newWidget);
	});
});
