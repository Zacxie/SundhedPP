import {render, screen} from "@testing-library/react";
import Loginpage from "./loginPage";
import React from "react";
import '@testing-library/jest-dom'
import "@testing-library/jest-dom/extend-expect";


describe("Render components on login page", () => {

    test('login screen', () => {
        render(<Loginpage/>);
        expect(screen.getByRole('textbox', {name: /username/i}));
        expect(screen.getByLabelText(/password/i));
        expect(screen.getByRole('button', {name: /login/i}));

    });

})



