import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/layouts/Header';
import { useUser } from '../context/user';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../context/user', () => ({
    useUser: jest.fn()
}));

describe('Auth', () => {
    test('login', () => {
        useUser.mockReturnValue({
            user: null,
            login: jest.fn(),
            logout: jest.fn()
        });
        render(<Header />, { wrapper: BrowserRouter });

        const loginButton = screen.getByRole('button', { name: /login/i });
        fireEvent.click(loginButton);

        expect(useUser().login).toHaveBeenCalledTimes(1);
    });
    test('logout', () => {
        useUser.mockReturnValue({
            user: 'exist',
            login: jest.fn(),
            logout: jest.fn()
        });
        render(<Header />, { wrapper: BrowserRouter });

        const loginButton = screen.getByRole('button', { name: /logout/i });
        fireEvent.click(loginButton);

        expect(useUser().logout).toHaveBeenCalledTimes(1);
    });
});
