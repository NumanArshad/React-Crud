import React, { createRef } from "react";

class Calculator extends React.Component {
    constructor() {
        super();
        this.state = {
            result: '',
            prev: { vl: "", op: "" },
            disallowOperator: ['*', '/', '%', '='],
            invalidResult: ["Error", "Infinity"],
            scale: 1
        }

    }

    node = createRef('')

    componentDidMount() {
        document.addEventListener('keyup', e => this.handleClick(e.key))
    }
    componentWillUnmount() {
        document.removeEventListener('keyup', e => this.handleClick(e.key))
    }

    handleClick = (keyPressed) => {
        const { result, prev, invalidResult, scale } = this.state
        keyPressed = keyPressed === '.' ? `0${keyPressed}` : keyPressed
        const actualScale = this.node?.parentNode.offsetWidth / this.node?.offsetWidth
        if (actualScale < 1 && scale !== actualScale) {
            this.setState({ scale: actualScale })
        }
        else if (scale < 1 && scale !== actualScale) {
            this.setState({ scale: 1 })

        }
        let previousResult = result.slice(-1)
        if (this.handleValidateInput(keyPressed, previousResult)) {
            if (keyPressed === "=") {   //key pressed apply operation and save (apply operation and last value for later apply)
                if (!prev.vl) {
                    this.setState({ prev: { vl: result.match(/[+-]?\d+(\.\d+)?/g).slice(-1), op: result.replace('.', '').match(/(\D+)/)[0] } })
                }
                this.applyOperation()
                return;
            }
            else if (keyPressed !== "=" && isNaN(keyPressed)) {   //
                this.setState({ prev: {} })
            }

            this.setState({ result: !invalidResult.includes(result) ? result + keyPressed : keyPressed })
        }
    }

    handleValidateInput = (keyPressed, last) => {
        const { result, disallowOperator } = this.state
        let isValid = true
        if (disallowOperator.find((op) => op === keyPressed) && result === "") {  //if operator is invalid (*,/,%,=)
            isValid = false
        }
        else if (isNaN(keyPressed) && (isNaN(last) && last !== "*")) {  //if current and prev are both operator except power operator
            isValid = false
        }
        return isValid
    }

    handleClear = () => {
        this.setState({ result: '', prev: {} })
    }

    applyOperation = () => {
        const { result, prev } = this.state
        let output = result
        if (prev.vl) {
            output += prev.op + prev.vl
        }
        try {
            //eslint-disable-next-line
            this.setState({ result: eval(output).toString() })
        }
        catch (err) {
            this.setState({ result: "Error" })
        }
    }

    handleback = () => {
        const { result } = this.state
        let update = result.length > 0 && result.slice(0, -1)
        this.setState({ result: update || "" })
    }


    render() {
        const { result, scale } = this.state
        return (
            <div id="wrapper">
                <div id="app">

                    <div className="calculator">
                        <div className="calculator-display">
                            <div
                                className="auto-scaling-text"
                                style={{ transform: `scale(${scale},${scale})` }}
                                ref={el => this.node = el}
                            >{result}</div>
                        </div>
                        <div className="calculator-keypad">
                            <div className="input-keys">

                                <div className="function-keys">
                                    <button className={`calculator-key`} onClick={() => this.handleClear()}>AC</button>
                                    <button className={`calculator-key`} onClick={() => this.handleback()}>C</button>
                                    <button className={`calculator-key`}>%</button>


                                </div>
                                <div className="digit-keys">

                                    <button className="calculator-key key-0" onClick={() => this.handleClick('0')}>0</button>
                                    <button className="calculator-key" onClick={() => this.handleClick('.')}>●</button>
                                    <button className="calculator-key" onClick={() => this.handleClick('1')}>1</button>
                                    <button className="calculator-key" onClick={() => this.handleClick('2')}>2</button>
                                    <button className="calculator-key" onClick={() => this.handleClick('3')}>3</button>
                                    <button className="calculator-key" onClick={() => this.handleClick('4')}>4</button>
                                    <button className="calculator-key" onClick={() => this.handleClick('5')}>5</button>
                                    <button className="calculator-key" onClick={() => this.handleClick('6')}>6</button>
                                    <button className="calculator-key" onClick={() => this.handleClick('7')}>7</button>
                                    <button className="calculator-key" onClick={() => this.handleClick('8')}>8</button>
                                    <button className="calculator-key" onClick={() => this.handleClick('9')}>9</button>
                                </div>
                            </div>
                            <div className="operator-keys">
                                <button className="calculator-key" onClick={() => this.handleClick('/')}>÷</button>
                                <button className="calculator-key" onClick={() => this.handleClick('*')}>×</button>
                                <button className="calculator-key" onClick={() => this.handleClick('-')}>−</button>
                                <button className="calculator-key" onClick={() => this.handleClick('+')}>+</button>
                                <button className="calculator-key" onClick={() => this.handleClick('=')}>=</button>
                            </div>
                        </div>
                    </div></div>
            </div>

        )
    }

}

export default Calculator