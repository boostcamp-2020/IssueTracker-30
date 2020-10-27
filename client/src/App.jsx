import React, { useState, useEffect } from "react";

const App = () => {
    const [template, setTemplate] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/hello")
            .then((res) => res.json())
            .then((data) => setTemplate(data.message));
    }, [])

    return (
        <div>
            {template}
        </div>
    );
};

export default App;
