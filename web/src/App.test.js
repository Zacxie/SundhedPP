import React from 'react';
import {render, screen, waitForElement} from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';
import "@testing-library/jest-dom/extend-expect";
import {createHashHistory} from "history";

describe("Render components on main page", () => {

    test('render menu elements', () => {
        render(<App/>);
        expect(screen.getByText('Sundhed++')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getAllByText('Dashboard'));
        expect(screen.getAllByText('Log out'));
    });

    test('render mainlayout elements', () => {
        render(<App/>);
        expect(screen.getByText('Footer')).toBeInTheDocument();
        expect(screen.getByText('Nav')).toBeInTheDocument();
        expect(screen.getAllByText('Dashboard'));
    });

    test('render searchbar', () => {
        render(<App/>);
        expect(screen.getAllByText('Søg patient'));
    });

})

describe("Functions related to patient", () => {

    test('search for patient', () => {
        render(<App/>);

    });

    test('list prescriptions for patient', () => {
        render(<App/>);

    });

    test('renew prescription', () => {
        render(<App/>);

    });

})

