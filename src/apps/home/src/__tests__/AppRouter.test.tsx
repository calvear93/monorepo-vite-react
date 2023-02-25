import { beforeAll, describe, expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from '@libs/router';
import { StoreProvider, AppStore } from '@shared/store';
import { AppRouter } from '../App.router';

describe('AppRouter', () => {
	// hooks
	beforeAll(async () => {
		render(
			<MemoryRouter>
				<StoreProvider store={AppStore}>
					<AppRouter />
				</StoreProvider>
			</MemoryRouter>
		);

		// waits for lazy loading
		await waitFor(() => screen.findByText('Ir a Detail'), {
			timeout: 2500
		});
	});

	// tests
	test('has header (banner role) with content "header"', () => {
		const header = screen.getByRole('banner');

		expect(header).toHaveTextContent('header');
	});

	test('has footer (contentinfo role) with content "footer"', () => {
		const footer = screen.getByRole('contentinfo');

		expect(footer).toHaveTextContent('footer');
	});

	test('navigates to detail page', async () => {
		const anchor = screen.getByRole('link', { name: 'Ir a Detail' });

		userEvent.click(anchor);

		const asyncMessage = await waitFor(
			() => screen.findByText('Ir a Main'),
			{
				timeout: 1000
			}
		);

		expect(asyncMessage.tagName).toBe('A');
	});
});
