// src/Calculator.jsx
import React, { useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [memory, setMemory] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [angleMode, setAngleMode] = useState('Deg');
  const [secondFunction, setSecondFunction] = useState(false);
  const [theme, setTheme] = useState('dark');

  const handleButtonClick = (value) => {
    switch (value) {
      case 'C':
        handleClear();
        break;
      case '=':
        calculateResult();
        break;
      case 'mc':
        setMemory(0);
        break;
      case 'mr':
        setInput(memory.toString());
        break;
      case 'm+':
        setMemory(memory + parseFloat(result || input));
        break;
      case 'm-':
        setMemory(memory - parseFloat(result || input));
        break;
      case 'Rad':
        setAngleMode('Rad');
        break;
      case 'Deg':
        setAngleMode('Deg');
        break;
      case '2ⁿᵈ':
        setSecondFunction(!secondFunction);
        break;
      default:
        setInput((prev) => prev + value);
        break;
    }
  };

  const calculateResult = () => {
    try {
      let expression = input
        .replace('×', '*')
        .replace('÷', '/')
        .replace('−', '-')
        .replace('π', Math.PI)
        .replace('Rand', Math.random())
        .replace('e', Math.E)
        .replace(/(\d+)!/g, (_, n) => factorial(n))
        .replace(/sin\(([^)]+)\)/g, (_, angle) => Math.sin(toRadians(angle)))
        .replace(/cos\(([^)]+)\)/g, (_, angle) => Math.cos(toRadians(angle)))
        .replace(/tan\(([^)]+)\)/g, (_, angle) => Math.tan(toRadians(angle)))
        .replace(/sinh\(([^)]+)\)/g, (_, angle) => Math.sinh(toRadians(angle)))
        .replace(/cosh\(([^)]+)\)/g, (_, angle) => Math.cosh(toRadians(angle)))
        .replace(/tanh\(([^)]+)\)/g, (_, angle) => Math.tanh(toRadians(angle)))
        .replace(/ln\(([^)]+)\)/g, (_, value) => Math.log(value))
        .replace(/log₁₀\(([^)]+)\)/g, (_, value) => Math.log10(value))
        .replace(/e\^(\d+)/g, (_, exp) => Math.exp(exp))
        .replace(/10\^(\d+)/g, (_, exp) => Math.pow(10, exp))
        .replace(/(\d+)\^(\d+)/g, (_, base, exp) => Math.pow(base, exp))
        .replace(/(\d+)√(\d+)/g, (_, root, value) => Math.pow(value, 1 / root))
        .replace('¹/x', '1/')
        .replace(/(\d+)%/g, (_, value) => value / 100)
        .replace('+/-', '-')
        .replace(/EE/g, '*10^');
      
      const evalResult = eval(expression);
      setResult(evalResult);
      setInput(evalResult.toString());
      checkConfetti(input);
    } catch {
      setResult('Error');
    }
  };

  const checkConfetti = (input) => {
    if (/5.*6|6.*5/.test(input)) {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3000);
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  const toRadians = (angle) => {
    return angleMode === 'Deg' ? (angle * Math.PI) / 180 : angle;
  };

  const factorial = (n) => {
    if (n < 0) return 'Error';
    return n <= 1 ? 1 : n * factorial(n - 1);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const buttons = [
    '2ⁿᵈ', '(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '+/-', '%', '÷',
    'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '7', '8', '9', '×',
    '¹/x', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀', '4', '5', '6', '−',
    'x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+',
    'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', '='
  ];

  return (
    <div className={`calculator ${theme}`}>
      {confetti && <ConfettiExplosion />}
      <div className="calculator-header">
        <div className="calculator-dots">
          <div className="dot red"></div>
          <div className="dot yellow"></div>
          <div className="dot green"></div>
        </div>
        <div className="theme-switcher">
          <button onClick={toggleTheme}>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
      <div className="display">
        <div>{input}</div>
        <div>{result}</div>
      </div>
      <div className="buttons">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(btn)}
            className={isNaN(btn) && btn !== '.' && btn !== 'π' && btn !== 'Rand' ? 'operator' : 'number'}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
