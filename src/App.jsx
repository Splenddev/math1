import { useContext, useState } from 'react';
import './App.css';
import { sqrt, complex } from 'mathjs';
import LinearEquation from './LinearEquation/LinearEquation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { StoreContext } from './context/StoreContext';
import ToastManager from './components/Toast/ToastManager';
// import { faL } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  // useState
  const [preferences, setPreferences] = useState('equation');
  // const [activeInput, setActiveInput] = useState('equation');
  // const [valuesToDelete, setValuesToDelete] = useState('');

  const [x1, setx1] = useState('-');
  const [x2, setx2] = useState('-');
  const [values1, setValues1] = useState('-');
  const [values2, setValues2] = useState('-');
  const [input1, setInput1] = useState(false);
  const [input2, setInput2] = useState(false);
  const [input3, setInput3] = useState(false);
  const [values3, setValues3] = useState('-');
  const demo = `${values1}x\u00B2 ${
    values2 >= 0 ? '+ ' + values2 : '- ' + -1 * values2
  }x  ${values3 >= 0 ? '+ ' + values3 : '- ' + -1 * values3} = 0`;
  function removeCoefficient(demo) {
    return demo.replace(/\b1([a-zA-Z])/g, '$1');
  }

  const inputHandler = (values) => {
    if (input1) {
      setValues1((prev) =>
        parseInt((prev + values.toString()).replace('-', ''))
      );
      console.log(values1);
    }
    if (input2) {
      setValues2((prev) =>
        parseInt((prev + values.toString()).replace('-', ''))
      );
      console.log(values2);
    }
    if (input3) {
      setValues3((prev) =>
        parseInt((prev + values.toString()).replace('-', ''))
      );
      console.log(values3);
    }
  };
  function calculate() {
    // let num = ;
    let sqrtComplex;
    let squrt;
    const negB = -1 * values2;
    const bSquare = values2 * values2;
    const fourAC = 4 * values1 * values3;
    const bMinusFourAC = bSquare - fourAC;
    if (bMinusFourAC < 0) {
      sqrtComplex = sqrt(complex(bMinusFourAC)).toString();
    } else {
      squrt = sqrt(bMinusFourAC);
    }

    const denom = 2 * values1;

    const x1Calculated = sqrtComplex
      ? negB + '+' + sqrtComplex
      : (negB + squrt) / denom;
    const x2Calculated = sqrtComplex
      ? negB + '-' + sqrtComplex
      : (negB - squrt) / denom;
    setx1(x1Calculated);
    setx2(x2Calculated);
    console.log(`x1: ${x1Calculated}  x2:${x2Calculated}`);
    // console.log(2 + 2);
    // console.log(sqrtComplex);
    // console.log(squrt);
    // console.log(sqrtComplex);
    // console.log(bSquare - fourAC);
    // console.log(denom);
  }
  function selectHandler(e) {
    console.log(e.target.value);
    let type1 = typeof values1;
    let type2 = typeof values2;
    let type3 = typeof values3;

    if (e.target.value === 'a') {
      if (type1 === 'string') {
        setValues1(values1);
      } else if (type1 === 'number') setValues1(-1 * values1);
    }
    if (e.target.value === 'b') {
      if (type2 === 'string') {
        setValues2(values2);
      } else if (type2 === 'number') setValues2(-1 * values2);
    }
    if (e.target.value === 'c') {
      if (type3 === 'string') {
        setValues3(values3);
      } else if (type3 === 'number') setValues3(-1 * values3);
    }
  }
  // const { isLoading, setIsLoading, allValuesInputed, setAllValuesInputed } =
  //   useContext(StoreContext);
  return (
    <div className="app">
      <ToastManager />

      <h1>Vite Mathematics App Demo</h1>
      <h3>Preferences</h3>
      <button
        className="pref-btn"
        onClick={() => {
          setPreferences('equation');
        }}>
        Linear Equation
      </button>
      <button
        className="pref-btn"
        onClick={() => {
          setPreferences('quadratic');
        }}>
        Quadratic Equation
      </button>
      {preferences === 'quadratic' ? (
        <div className="quadratic-preference">
          {/* <p>{}</p> */}
          {typeof values1 === 'number' &&
          typeof values2 === 'number' &&
          typeof values3 === 'number' ? (
            <>
              <p>Demo eqaution: {removeCoefficient(demo)}</p>
              <p>
                Demo Values for a, b, c : a={values1}, b={values2}, c={values3},
              </p>
            </>
          ) : (
            <></>
          )}
          <div className="calculator">
            <div className="input-display">
              <div className="tabs">
                <p
                  onClick={() => {
                    // setValues(0);
                    setValues1('-');
                    setInput1(true);
                    setInput2(false);
                    setInput3(false);
                  }}>
                  {values1}
                </p>
                <span
                  className={input1 ? 'active' : ''}
                  onClick={() => {
                    if (!input1) {
                      setInput1(true);
                      setInput2(false);
                      setInput3(false);
                    } else if (input1) {
                      setInput1(false);
                    }
                    // console.log(input1);
                  }}>
                  a
                </span>
              </div>
              <div className="tabs">
                <p
                  onClick={() => {
                    // setValues(0);
                    setValues2('-');
                    setInput1(false);
                    setInput2(true);
                    setInput3(false);
                  }}>
                  {values2}
                </p>
                <span
                  className={input2 ? 'active' : ''}
                  onClick={() => {
                    if (!input2) {
                      setInput1(false);
                      setInput2(true);
                      setInput3(false);
                    } else if (input2) {
                      setInput2(false);
                    }
                  }}>
                  b
                </span>
              </div>
              <div className="tabs">
                <p
                  onClick={() => {
                    // setValues(0);
                    setInput3(true);
                    setInput1(false);
                    setInput2(false);
                    setValues3('-');
                  }}>
                  {values3}
                </p>
                <span
                  className={input3 ? 'active' : ''}
                  onClick={() => {
                    if (!input3) {
                      setInput1(false);
                      setInput2(false);
                      setInput3(true);
                    } else if (input3) {
                      setInput3(false);
                    }
                  }}>
                  c
                </span>
              </div>
            </div>
            <p className="equals">=</p>
            <section>
              X<sub>1</sub> = {x1} X<sub>2</sub> = {x2}
            </section>
          </div>
          <div className="input-container">
            <select onChange={selectHandler}>
              <option
                selected
                disabled
                value="minus">
                minus
              </option>
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
            </select>
            <button
              type="button"
              onClick={() => {
                if (input1) {
                  values1.toString().slice(0, -1).length === 0
                    ? setValues1('-')
                    : setValues1(parseInt(values1.toString().slice(0, -1)));
                }
                if (input2) {
                  values2.toString().slice(0, -1).length === 0
                    ? setValues2('-')
                    : setValues2(parseInt(values2.toString().slice(0, -1)));
                }
                if (input3) {
                  values3.toString().slice(0, -1).length === 0
                    ? setValues3('-')
                    : setValues3(parseInt(values3.toString().slice(0, -1)));
                }
              }}>
              <FontAwesomeIcon icon={faDeleteLeft} />
            </button>
            <button
              type="button"
              onClick={() => {
                // setValues(1);
                inputHandler(1);
              }}>
              1
            </button>
            <button
              type="button"
              onClick={() => {
                // setValues(2);
                inputHandler(2);
              }}>
              2
            </button>
            <button
              type="button"
              onClick={() => {
                // setValues(3);
                inputHandler(3);
              }}>
              3
            </button>
            <button
              type="button"
              onClick={() => {
                // setValues(4);
                inputHandler(4);
              }}>
              4
            </button>
            <button
              type="button"
              onClick={() => {
                // setValues(5);
                inputHandler(5);
              }}>
              5
            </button>
            <button
              type="button"
              onClick={() => {
                // setValues(6);
                inputHandler(6);
              }}>
              6
            </button>
            <button
              type="button"
              onClick={() => {
                // setValues(7);
                inputHandler(7);
              }}>
              7
            </button>
            <button
              type="button"
              onClick={() => {
                // setValues(8);
                inputHandler(8);
              }}>
              8
            </button>
            <button
              type="button"
              onClick={() => {
                // setValues(9);
                inputHandler(9);
              }}>
              9
            </button>
            <button
              type="button"
              onClick={() => {
                // setValues(0);
                inputHandler(0);
              }}>
              0
            </button>
            <button
              type="button"
              onClick={() => {
                setValues1('-');
                setValues2('-');
                setValues3('-');
              }}>
              Clear All
            </button>

            <button
              type="button"
              className="calculate-btn"
              onClick={calculate}>
              Calculate
            </button>
          </div>
        </div>
      ) : (
        <LinearEquation />
      )}
      <div></div>
    </div>
  );
};

export default App;
