import { cleanup, fireEvent, render, waitFor } from '@testing-library/svelte';
import App from './App.svelte';

describe('App', () => {
    afterEach(cleanup);
    test('should render', async () => {
        const { getByText } = render(App);
        expect(getByText('To Do'));
    });
});