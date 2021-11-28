import React from 'react';
import {fireEvent, getByLabelText, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';
import "@testing-library/jest-dom/extend-expect";

describe("Render components on main page", () => {

    test('render menu elements', () => {
        render(<App/>);
        expect(screen.getByRole('heading', {name: /sundhed\+\+/i}));
        expect(screen.getByRole('link', {name: /create patient/i}));
        expect(screen.getByRole('link', {name: /create prescription/i}));
        expect(screen.getByRole('link', {name: /log out/i}));
    });

    test('render mainlayout elements', () => {
        render(<App/>);
        // expect(screen.getByRole('navigation'));
        expect(screen.getByText(/gustav kirkholt \(s164765\) \- gustav kauman \(s195396\) \- sebastian bjerre \(s163526\) \- mikkel blomsterberg \(s172133\)/i));
        expect(screen.getByRole('heading', {name: /dashboard/i}));
        expect(screen.getByRole('grid'));
        expect(screen.getByRole('columnheader', {  name: /patient/i}));
        expect(screen.getByRole('columnheader', {  name: /start date/i}));
        expect(screen.getByRole('columnheader', {  name: /end date/i}));
    });

    test('render searchbar', () => {
        render(<App/>);
        expect(screen.getByRole('textbox', {name: /søg patient/i}));
    });

})

test('list prescriptions for patient', () => {
    render(<App/>);
    /*const inputField = screen.getByRole('textbox', {  name: /søg patient/i});

    fireEvent.change(inputField, {target: {value: 'Mikkel'}});
    expect(inputField).toBe('Mikkel');*/
});

test('renew prescription', () => {
    render(<App/>);

});
