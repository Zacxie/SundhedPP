import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';
import "@testing-library/jest-dom/extend-expect";

describe("Render components on main page", () => {

    test('render menu elements', () => {
        render(<App/>);
        expect(screen.getByRole('heading', {name: /sundhed\+\+/i}));
        expect(screen.getByRole('link', {name: /home/i}));
        expect(screen.getByRole('link', {name: /profile/i}));
        expect(screen.getByRole('link', {name: /log out/i}));
    });

    test('render mainlayout elements', () => {
        render(<App/>);
        // expect(screen.getByRole('navigation'));
        expect(screen.getByRole('contentinfo', {name: /footer/i}));
        expect(screen.getByRole('heading', {name: /dashboard/i}));
        expect(screen.getByRole('grid'))
    });

    test('render searchbar', () => {
        render(<App/>);
        expect(screen.getByRole('textbox', {name: /søg patient/i}));
    });

})

test('list prescriptions for patient', () => {
    render(<App/>);

});

test('renew prescription', () => {
    render(<App/>);

});
