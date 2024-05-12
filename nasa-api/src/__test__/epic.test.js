import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Epic from "../pages/Epic";
import axios from 'axios';

jest.mock('axios');

test('renders Epic component', () => {
    render(<Epic />);
    const headingElement = screen.getByText('Earth Polychromatic Imaging Camera');
    expect(headingElement).toBeInTheDocument();
});

test('renders loading spinner when data is loading', () => {
    render(<Epic />);
    const loadingSpinner = screen.getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
});


