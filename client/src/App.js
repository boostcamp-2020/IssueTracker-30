import React from "react";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            message: "",
        };
    }

    componentDidMount() {
        // fetch("/hello")
        fetch("http://localhost:3000/hello")
            .then((res) => res.json())
            .then((data) => this.setState({ message: data.message }));
    }

    render() {
        return <h1>{this.state.message}</h1>;
    }
}

export default App;
