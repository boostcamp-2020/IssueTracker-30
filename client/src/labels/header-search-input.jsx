import React from "react";
import styled from "styled-components";

const StyledSearchBar = styled.div`
    display: flex;
    align-items: center;

    width: 350px;

    border-radius: 5px;
    box-shadow: 0 0 2px 0 rgb(36, 41, 46);

    background-color: rgb(250, 251, 252);
`;

const StyledSearchIcon = styled.svg.attrs({
    viewBox: "0 0 16 16",
    version: "1.1",
    width: "16",
    height: "16",
    ariaHidden: "true",
})`
    margin: 0 10px;
`;

const StyledTextInput = styled.input.attrs({
    placeholder: "Search all labels",
    autocomplete: "off",
})`
    width: 100%;
    height: 25px;

    border: 0;
    background-color: rgb(250, 251, 252);
    color: rgb(88, 96, 105);

    &:focus {
        outline: none;
    }
`;

const SearchBar = ({ filterText, setFilterText }) => {
    const onFilterTextInputChange = (e) => {
        setFilterText(e.currentTarget.value);
    };
    return (
        <StyledSearchBar>
            <StyledSearchIcon>
                <path
                    fillRule="evenodd"
                    d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"
                />
            </StyledSearchIcon>
            <StyledTextInput
                value={filterText}
                onChange={onFilterTextInputChange}
            />
        </StyledSearchBar>
    );
};

export default SearchBar;
