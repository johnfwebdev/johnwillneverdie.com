//Create Containging Function

(function(window, undefined) {
    var calc = {
        // Variables
        memory: [],
        inputMem: [],
        operMem: [],
        isDigit: /([0-9]|\.)$/,
        isOper: /^(\+|-|x|\/|%)/,
        isFunc: /^(v|1\/x)/,
        isMemFunc: /(MS|MC|MR|M\+|M-)/,
        isUndefined: /(undefined|null|NaN)/,
        polynomialCount: 0,
        lastType: '',
        currentInput: function() {
            var value;
            if (document.getElementsByClassName('calc-input')[0].value.match('-')) {
                value = 0 - document.getElementsByClassName('calc-input')[0].value;
            }
            return document.getElementsByClassName('calc-input')[0].value === 0 ? '' : document.getElementsByClassName('calc-input')[0].value;
        },
        currentOper: '',
        currentValue: '',
        //Build on Screen Calculator
        calcDOM: function() {
            var findBodyElement = document.body,
                makeCalcBox = document.createElement('div'), //create containg div
                display = document.createElement('input'), // create display which will double as a input
                buttonPad = document.createElement('div'), // create numPad box for the buttons
                buttonUL = document.createElement('div'),  
                buttonsList = ['MS', 'MR', 'M+', 'M-', 'v', 7, 8, 9, '/', '1/x', 4, 5, 6, 'x', '%', 1, 2, 3, '-', 'MC', '.', 0, '=', '+', 'C'];
                // ^^^ This is the button list ^^^
            findBodyElement.appendChild(makeCalcBox).appendChild(display).setAttribute('class', 'calc-input');
            makeCalcBox.appendChild(buttonPad).setAttribute('class', 'button-pad');
            display.setAttribute('maxlength', '14');
            buttonPad.appendChild(buttonUL);
            // Iterate through array to create buttons and assign characters to them identifiers
            (function(array) {
                for (var i = 0; i < array.length; i++) {
                    var button = document.createElement('button');
                    button.id = array[i];
                    buttonUL.appendChild(button).innerHTML = array[i];
                    button.setAttribute('class', 'calc-button');
                    button.addEventListener('click', calc.determineInput, false); // Assign Listener to each button
                }
            })(buttonsList);
            // Call styling method
            calc.styling(makeCalcBox, display, buttonPad, buttonUL);
            document.getElementsByClassName('calc-input')[0].value = '';
        },
        //Primary Styling for calc
        styling: function(box, input, buttonContainer, buttonBox, buttons) {
            // Main Container
            box.style.position = "fixed";
            box.style.bottom = "0";
            box.style.right = "50px";
            box.style.width = box.style.width === undefined ? box.style.width : '190px';
            box.style.height = "250px";
            box.style.backgroundColor = "rgba(139, 140, 139, 0.7)";
            // Input/Display
            input.style.width = '100%';
            input.style.height = '14%';
            input.style.minHeight = '35px';
            input.style.fontSize = '1.25em';
            input.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
            input.style.border = 'none';
            input.style.color = 'rgb(195, 195, 195)';
            input.style.outline = 'none';
            input.style.padding = '0 7px';
            input.style.textAlign = 'right';
            input.style.margin = '3px auto';
            // Button Container
            buttonContainer.style.height = '86%';
            // UL Tag
            buttonBox.style.height = '100%';
            //Basic hover
            function hoverButton(event) {
                if (this.style.backgroundColor === 'rgba(120, 115, 120, 0.6)') {
                    this.style.backgroundColor = 'rgba(120, 130, 129, 0.7)';
                } else {
                    this.style.backgroundColor = 'rgba(120, 115, 120, 0.6)';
                }
            }
            // Iterate through all buttons to style them
            for (i = 0; i < buttonBox.children.length; i++) {
                buttonBox.children[i].style.float = 'left';
                buttonBox.children[i].style.width = '20%';
                buttonBox.children[i].style.height = '20%';
                buttonBox.children[i].style.textAlign = 'center';
                buttonBox.children[i].style.backgroundColor = 'rgba(120, 130, 129, 0.7)';
                buttonBox.children[i].style.listStyle = 'none';
                buttonBox.children[i].style.lineHeight = '43px';
                buttonBox.children[i].style.cursor = 'pointer';
                buttonBox.children[i].style.outline = '0 solid transparent';
                buttonBox.children[i].onmouseover = hoverButton;
                buttonBox.children[i].onmouseout = hoverButton;
            }
            return true;
        },
        //Determin User input and branch out to dependencies
        determineInput: function() {
            // Is this a Digit being entered?
            if (this.id.match(calc.isDigit) && document.getElementsByClassName('calc-input')[0].value.length < 14) {
                if (calc.lastType === 'operator') {
                    calc.clearScreen();
                    calc.currentValue = '';
                }
                calc.postNumber(calc.currentInput(), this.id);
                calc.lastType = 'digit';
                calc.memory[0] = calc.currentValue;
            // Or is this an Operator?
            } else if (this.id.match(calc.isOper)) {
                calc.memManipulation.memPush.oper(this.id);
                calc.memManipulation.memPush.digi(calc.memory[0]);
                calc.lastType = 'operator';
                calc.polynomialCount++;
            // Or is this a Math Func (such as Squareroot or Reciprical)
            } else if (this.id.match(calc.isFunc)) {
            // Or is this a Memory Function?
            } else if (this.id.match(calc.isMemFunc)) {
                var currentMemVal;
                if (document.getElementsByClassName('calc-input')[0].value.length > 0) {
                    currentMemVal = calc.currentInput();
                } else {
                    currentMemVal = calc.memManipulation.memPull.digi();
                }
                calc.memFunction(this.id);
            // Or is this the Equal Key
            } else if (this.id.match('=')) {
                var value = calc.calculation(calc.currentInput());
                document.getElementsByClassName('calc-input')[0].value = value;
            // Or is this the Clear Key
            } else if (this.id.match('C')) {
                calc.clearScreen();
            // Or if it's not anything, don't do anything.
            } else {
                // do nothing
            }
        },
        // Post number if multiple digit
        postNumber: function(currentInput, newInput) {
            currentInput += newInput;
            parseFloat(currentInput);
            document.getElementsByClassName('calc-input')[0].value = currentInput;
            calc.currentValue = currentInput;
        },
        memManipulation: {
            memPush: {
                oper: function(item) {
                    calc.operMem[0] = item;
                },
                digi: function(item) {
                    if (calc.inputmem === undefined) {
                        calc.inputMem[0] = item;
                    } else {
                        calc.inputMem.push(item);
                    }
                }
            },
            memPull: {
                oper: function(item) {
                    return calc.operMem[calc.operMem.length - 1];
                },
                digi: function(item) {
                    return calc.inputMem[calc.inputMem.length - 1];
                }
            }
        },
        calculation: function(number, operType) {
            var tempNumber = Math.round(number * 100000000),
                tempMemItem = Math.round(calc.memManipulation.memPull.digi() * 100000000),
                result;
            operType = calc.memManipulation.memPull.oper();
            console.log('Stage 1');
            console.log(tempMemItem);
            Number(tempMemItem);
            console.log(tempNumber);
            console.log(operType);
            this.adding = function(a, b) {
                return a + b;
            };
            this.subtract = function(a, b) {
                return a - b;
            };
            this.multiply = function(a, b) {
                return a * b;
            };
            this.divide = function(a, b) {
                return a / b;
            };
            this.modulus = function(a, b) {
                return a % b;
            };
            this.reciprocal = function(a, b) {
                if (b === null) {
                    return 1 / a;
                } else {
                    return 1 / b;
                }
            };
            this.square = function(a, b) {
                return;
            }
            if (operType === '+') {
                result = this.adding(tempMemItem, tempNumber);
                console.log(result);
                return result / 100000000;
            } else if (operType === '-') {
                result = this.subtract(tempMemItem, tempNumber);
                return result / 100000000;
            } else if (operType === 'x') {
                console.log('Stage 2');
                result = this.multiply(tempMemItem, tempNumber);
                result /= 10000000000000000;
                return result;
            } else if (operType === '/') {
                result = this.divide(tempMemItem, tempNumber);
                return result;
            } else if (operType === '%') {
                result = this.modulus(tempMemItem, tempNumber);
                return result / 100000000;
            } else if (operType === '1/x') {
                result = this.reciprocal(tempMemItem, tempNumber);
                return result /= 10000000000000000;
            } else {
                //displayError('Cannot complete this calculation!');
            }
        },
        memFunction: function (funcType, item) {
            if (funcType === 'MS') {
                calc.memManipulation.memPush.digi(item);
            } else if (funcType === 'MR') {
                calc.memManipulation.memPull.digi();
            } else if (funcType === 'M+' || funcType === 'M-') {
                calc.calculation(-1, 'x');
            } else {}
        },
        clearScreen: function() {
            document.getElementsByClassName('calc-input')[0].value = '';
            calc.lastType = 'cleared';
            calc.polynomialCount = 0;
        }
    };
    calc.calcDOM();
    window.calc = calc;
})(this);