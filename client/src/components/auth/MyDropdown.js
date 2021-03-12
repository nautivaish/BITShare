import React from "react";
import { Dropdown } from "semantic-ui-react";

const hostels = [
    {
        key: "Valmiki",
        value: "Valmiki",
        text: "Valmiki"
    },
    {
        key: "Budh",
        value: "Budh",
        text: "Budh"
    },
    // {
    //     key: "Valmiki",
    //     value: "Valmiki",
    //     text: "Valmiki"
    // }
];

function MyDropdown() {
    return <Dropdown
    placeholder="Select your hostel"
    fluid
    selection
    options={hostels}
  />;
};

export default MyDropdown;