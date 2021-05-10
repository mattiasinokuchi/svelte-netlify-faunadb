import { cleanup, fireEvent, render, waitFor } from '@testing-library/svelte';
import List from './List.svelte';

describe('List', () => {
    afterEach(cleanup);
    test('should render', async () => {
        const { getByText } = render(List);
        expect(getByText('To Do'));
    });
});