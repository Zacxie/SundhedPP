import React from 'react';
import {fireEvent, render, screen, within} from '@testing-library/react';
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
        expect(screen.getByText(/gustav kirkholt \(s164765\) \- gustav kauman \(s195396\) \- sebastian bjerre \(s163526\) \- mikkel blomsterberg \(s172133\)/i));
        expect(screen.getByRole('grid'));
        expect(screen.getByRole('columnheader', {name: /patient/i}));
        expect(screen.getByRole('columnheader', {name: /start date/i}));
        expect(screen.getByRole('columnheader', {name: /end date/i}));
    });

    test('render searchbar', () => {
        render(<App/>);
        expect(screen.getByRole('textbox', {name: /søg patient/i}));
    });

})

describe("Search for patients and list prescriptions", () => {

    test('Search for patient', async () => {
        render(<App/>);
        const autocomplete = screen.getByTestId("autocomplete");
        const input = within(autocomplete).getByRole("textbox");
        const delay = ms => new Promise(res => setTimeout(res, ms));

        autocomplete.click();
        autocomplete.focus();

        fireEvent.change(await input, {target: {value: "Mikkel"}});
        await delay(1000);

        fireEvent.keyDown(await autocomplete, {key: 'ArrowDown'})
        fireEvent.keyDown(await autocomplete, {key: 'Enter'})
        await delay(1000);

        expect(input.value).toEqual("Mikkel Jensen: 170390-2839")
    });

    test('Show patient prescriptions', async () => {
        render(<App/>);
        const autocomplete = screen.getByTestId("autocomplete");
        const input = within(autocomplete).getByRole("textbox");
        const delay = ms => new Promise(res => setTimeout(res, ms));

        autocomplete.click();
        autocomplete.focus();

        fireEvent.change(await input, {target: {value: "Mikkel"}});
        await delay(1000);

        fireEvent.keyDown(await autocomplete, {key: 'ArrowDown'})
        fireEvent.keyDown(await autocomplete, {key: 'Enter'})
        await delay(2000);

        expect(screen.getByRole('cell', {name: /fri nov 05 2021/i}))
        expect(screen.getByRole('cell', {name: /sun dec 05 2021/i}))

        expect(screen.getByRole('cell', {name: /sun oct 17 2021/i}))
        expect(screen.getByRole('cell', {name: /thu mar 03 2022/i}))
    });
})



