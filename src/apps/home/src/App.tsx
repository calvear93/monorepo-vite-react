import { StoreProvider, AppStore } from '@shared/store';
import { BrowserRouter } from '@libs/router';
import { AppRouter } from './App.router';
import './styles/app.scss';

/**
 * Here occur the initialization,
 * for routing, store and main app.
 *
 * @returns app container
 */
export const App: React.FC = (): JSX.Element => {
	return (
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<StoreProvider store={AppStore}>
				<AppRouter />
			</StoreProvider>
		</BrowserRouter>
	);
};
