import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Carousel from 'components/ui/Carousel';

describe('Carousel', () => {
    const mockImages = [
        'https://iso.500px.com/wp-content/uploads/2020/02/Christophe-Josse-Finale-By-Milton-Tan.jpeg',
        'https://images.unsplash.com/photo-1531685250784-7569952593d2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ];
    test('renders a carousel component', () => {
        render(<Carousel images={mockImages} />);
        const images = screen.getAllByRole('img');
        expect(images.length).toBe(5);
    });

    describe('when the user clicks the next button', () => {
        test('renders carousel buttons', () => {
            render(<Carousel images={mockImages} />);

            const nextButton = screen.getByRole('button', {
                name: 'prev'
            });
            const prevButton = screen.getByRole('button', {
                name: 'next'
            });

            expect(nextButton).toBeInTheDocument();
            expect(prevButton).toBeInTheDocument();
        });

        test('clicking the next button displays the next image', async () => {
            render(<Carousel images={mockImages} />);

            const nextButton = screen.getByRole('button', {
                name: 'next'
            });

            await userEvent.click(nextButton);

            const image = screen.getByRole('img', {
                current: true
            });

            expect(image).toHaveAttribute('src', mockImages[1]);
        });

        test('clicking the prev button displays the prev image', async () => {
            render(<Carousel images={mockImages} />);

            const prevButton = screen.getByRole('button', {
                name: 'prev'
            });

            await userEvent.click(prevButton);

            const image = screen.getByRole('img', {
                current: true
            });

            expect(image).toHaveAttribute(
                'src',
                mockImages[mockImages.length - 1]
            );
        });

        test('check infinite loop about Carousel', async () => {
            render(<Carousel images={mockImages} />);

            const nextButton = screen.getByRole('button', {
                name: 'next'
            });
            const prevButton = screen.getByRole('button', {
                name: 'prev'
            });

            mockImages.forEach(async () => {
                await userEvent.click(prevButton);
            });

            await waitFor(
                () => {
                    const image = screen.getByRole('img', {
                        current: true
                    });
                    expect(image).toHaveAttribute('src', mockImages[0]);
                },
                { timeout: 1000 }
            );

            mockImages.forEach(async () => {
                await userEvent.click(nextButton);
            });

            await waitFor(
                () => {
                    const image = screen.getByRole('img', {
                        current: true
                    });
                    expect(image).toHaveAttribute('src', mockImages[0]);
                },
                { timeout: 1000 }
            );
        });
    });
});
