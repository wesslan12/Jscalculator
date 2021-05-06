class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.readyToReset = false;
    this.clear()
  }
  clear() {
    this.currentOperand = '0'
    this.previousOperand = ''
    this.operation = undefined

  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)

  }
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
  changeSign(){
        if(this.currentOperand.includes('-')){
            this.currentOperand = this.currentOperand.slice(1)
        }
        else{
            this.currentOperand = '-'+ this.currentOperand
        }

    }

  chooseOperation(operation) {
    //if (this.currentOperand === '')return
    //this overrides previous operation
    if (this.currentOperand === '' && operation !== '-') {
      this.operation = operation
      console.log("im triggered")
      return
    } else if (this.currentOperand === '' && operation === '-') {
      this.currentOperand = '-' + this.currentOperand
      console.log("minus is triggered")
      return
    }
    //if (this.currentOperand === '' && operation === '-') {
    //  this.currentOperand = '-' + this.currentOperand
    //  return
    //}
    else if (this.currentOperand === '-' && operation === '+') {
      this.operation = operation
      this.currentOperand = '' 
      console.log("change minus is triggered")
      return
    }

    else if (this.previousOperand !== '') {
      console.log("normal operaton")
      this.compute()
    }






    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
    //this.currentOperand = this.currentOperand.toString() + operation.toString()


    //this.operation = this.operation.toString() + operation.toString()

  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.readyToReset = true
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''

  }
  getDisplaynumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0})
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplaynumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
      `${this.getDisplaynumber(this.previousOperand)} ${this.operation}`
      console.log(this.operation)
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}






const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const changeButton = document.querySelector('[data-change]')
const previousOperandTextElement = document.querySelector
('[data-previous-operand]')
const currentOperandTextElement = document.querySelector
('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement,
currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log("Operator click")
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  console.log("equals")
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

changeButton.addEventListener('click', button => {
    calculator.changeSign()
    calculator.updateDisplay()
})
