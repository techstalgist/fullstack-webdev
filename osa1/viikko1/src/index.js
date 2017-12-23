import React from 'react';
import ReactDOM from 'react-dom';

//TODO Continue from JSX header on https://mluukkai.github.io/osa1/
const App = () => {
    const now = new Date()
    const a = 10
    const b = 20
    return (
        <div>
         <p>Hello world, it is {now.toString()}</p>
         <p>{a} plus {b} is {a + b}</p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

