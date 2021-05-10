import { cleanup, fireEvent, render, waitFor } from '@testing-library/svelte';
import List from './List.svelte';
import Form from './Form.svelte';

describe('List', () => {
    const PREDEFINED_TODOS = 2;
    afterEach(cleanup);
    function expectTodoCount(count) {
        return waitFor(() => {
            const lis = document.querySelectorAll('li');
            expect(lis.length).toBe(count);
        });
    }
    test('should add a todo', async () => {
        const { getByTestId, getByText } = render(Form);
        const input = getByTestId('todo-input');
        const value = 'buy milk';
        fireEvent.input(input, { target: { value } });
        fireEvent.click(getByText('Add'));
        await expectTodoCount(PREDEFINED_TODOS + 1);
        expect(getByText(value));
    });
});
