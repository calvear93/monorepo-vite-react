import { describe, afterEach, test, expect } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Button } from './Button';

describe(Button.name, () => {
	afterEach(cleanup);

	test('renders text', () => {
		const btnText = 'Sample';
		render(<Button text={btnText} />);

		const btn = screen.getByText(btnText);

		expect(btn.tagName).toBe('BUTTON');
	});
});
