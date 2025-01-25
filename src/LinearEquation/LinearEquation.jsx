import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import './LinearEquation.css';
import nlp from 'compromise';
import { Language, NlpManager } from 'node-nlp';
import textInstancesArray from './test';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { StoreContext } from '../context/StoreContext';
const LinearEquation = () => {
  // useState
  const [preferences, setPreferences] = useState('values');
  const [methodPreferences, setMethodPreferences] = useState('');
  const [subTab, setSubTab] = useState(false);
  // const [cardIndex, setCardIndex] = useState(null);
  // const math = create(all);
  const [solution, setSolution] = useState(() => {
    const savedSolutions = localStorage.getItem('todos');
    return savedSolutions ? JSON.parse(savedSolutions) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(solution));
  }, [solution]);
  // const solution = [];

  const { removeCoefficient, hasTwoDecimalPlace, addToast } =
    useContext(StoreContext);
  const [x1, setx1] = useState('');
  const [x2, setx2] = useState('');
  const [y1, sety1] = useState('');
  const [y2, sety2] = useState('');
  const [const1, setConst1] = useState('');
  const [const2, setConst2] = useState('');
  const [question, setQuestion] = useState('');
  const [elimTab, setElimTab] = useState(false);
  // const [cardAmination, setCardAmination] = useState('');
  const demo1 = `${x1}x ${y1 >= 0 ? '+' + y1 : y1}y = ${const1} `;
  const demo2 = `${x2}x ${y2 >= 0 ? '+' + y2 : y2}y = ${const2}`;

  function onSubChangeHandler(e) {
    if (e.target.checked) {
      setElimTab(true);
      // console.log(index);
    } else setElimTab(false);
  }
  function onElimChangeHandler(e) {
    if (e.target.checked) {
      setSubTab(true);
      // console.log(index);
    } else setSubTab(false);
  }
  function isDecimal(num) {
    return num % 1 !== 0;
  }
  // function generateEquation() {
  //   let que = 'equation is 2x + 3y = 12';
  //   const manager = new NlpManager({languages:['en']})
  //   manager.addDocument('en', '2x + 3y = 5', 'equation')

  //   const extractCoeff=async () => {
  //     await manager.train()

  //     const response = await manager.process('en',`${que}`)
  //     const variables=response
  //   }
  // }
  function calculateEquation() {
    if (
      x1.length === 0 ||
      y1.length === 0 ||
      const1.length === 0 ||
      x2.length === 0 ||
      y2.length === 0 ||
      const2.length === 0
    ) {
      addToast(
        'Cannot solve equation! Please input values and select a method',
        'error'
      );
      return;
    }

    if (!subTab && !elimTab) {
      return addToast('Please select a method', 'info');
    }
    if (preferences === 'values') {
      if (subTab) {
        console.log('Substitution');
        setMethodPreferences('Substitution Method');
      }
      if (elimTab) {
        addToast('Calculating...', 'success');
        setMethodPreferences('Elimation Method');
        if (y1 === y2 || x1 === x2) {
          const index = Math.floor(Math.random() * textInstancesArray.length);
          if (x1 - x2 === 0) {
            //constants
            const leftHandVar1 = x1 - x2;
            const leftHandVar2 = y1 - y2;
            const rightHandVar1 = const1 - const2;

            // step one identifying variables
            const demoY1 = `${leftHandVar1}x ${
              leftHandVar2 >= 0 ? '+ ' + leftHandVar2 : leftHandVar2
            }y = ${rightHandVar1}`;
            const procedureSolveFirstVa1 = `${textInstancesArray[index].text1} ${textInstancesArray[index].text2} `;
            const calcFirstVar1 = `${removeCoefficient(demoY1)}`;
            // console.log(calcFirstVar1);
            const interFirstVar = `${
              leftHandVar2 === 1 || leftHandVar2 === -1 ? '' : leftHandVar2
            }y = ${rightHandVar1}`;

            // step two simplification
            const procedureSolveFirstVa2 = `${textInstancesArray[index].text3}`;
            const calcFirstVar2 = `${
              leftHandVar2 === 1 || leftHandVar2 === -1 ? '' : leftHandVar2
            }y/${leftHandVar2} = ${rightHandVar1}/${leftHandVar2}`;

            // Step 3 evaluation
            const procedureSolveFirstVa3 = `${textInstancesArray[index].text4}`;
            let firstVarValue = rightHandVar1 / leftHandVar2;
            const calcFirstVar3 = `y = ${firstVarValue}`;

            const roundedfirstVarValue = Math.round(firstVarValue * 100) / 100;

            const calcFirstVar3alt =
              isDecimal(firstVarValue) && hasTwoDecimalPlace(firstVarValue)
                ? `Approximately: x = ${roundedfirstVarValue}`
                : ``;
            isDecimal(firstVarValue) && hasTwoDecimalPlace(firstVarValue)
              ? (firstVarValue = roundedfirstVarValue)
              : firstVarValue;

            // console.log(calcFirstVar3);

            // Step 4 : Substitution of y in any equation to resolve for x
            const demo = `${x1}x ${y1 >= 0 ? '+ ' + y1 : y1}y = ${const1}`;
            const procedureSolveSecondVar1 = `${
              textInstancesArray[index].text5
            } ${removeCoefficient(demo)} `;
            const calcDemoX1 = `${x1}x ${
              y1 >= 0 ? '+ ' + y1 : y1
            }(${firstVarValue}) = ${const1}`;
            const calcSecondVar1 = `${removeCoefficient(calcDemoX1)}`;

            const procedureSolveSecondVar2 = `${textInstancesArray[index].text6}`;
            const constantLeftHandSide1 =
              Math.round(parseInt(y1) * firstVarValue * 100) / 100;
            const calcDemoX2 = `${x1}x ${
              constantLeftHandSide1 >= 0
                ? '+ ' + constantLeftHandSide1
                : constantLeftHandSide1
            } = ${const1}`;
            const calcSecondVar2 = ` ${removeCoefficient(calcDemoX2)}`;

            const procedureSolveSecondVar3 = `${textInstancesArray[index].text7} const(${constantLeftHandSide1})`;
            const calcDemoX3 = `${x1}x ${
              constantLeftHandSide1 >= 0
                ? '+ ' + constantLeftHandSide1
                : constantLeftHandSide1
            } ${
              -1 * constantLeftHandSide1 >= 0
                ? '+ ' + -1 * constantLeftHandSide1
                : -1 * constantLeftHandSide1
            } = ${const1} ${
              -1 * constantLeftHandSide1 >= 0
                ? '+ ' + -1 * constantLeftHandSide1
                : -1 * constantLeftHandSide1
            }`;
            const calcSecondVar3 = ` ${removeCoefficient(calcDemoX3)}`;
            const rightHandVar2 =
              Math.round(
                (parseInt(const1) + -1 * parseInt(y1) * firstVarValue) * 100
              ) / 100;
            const calcDemoX4 = `${x1}x = ${rightHandVar2}`;
            const calcSecondVar4 = ` ${removeCoefficient(calcDemoX4)}`;

            const procedureSolveSecondVar5 = `${textInstancesArray[index].text8}`;
            const demo3 = `${x1}x/${x1} = ${rightHandVar2}/${x1}`;
            const calcSecondVar5 = `${removeCoefficient(demo3)}`;
            const secondVarValue = rightHandVar2 / x1;

            const procedureSolveSecondVar6 = `${textInstancesArray[index].text9}`;
            const calcSecondVar6 = `x = ${secondVarValue}`;
            const roundedsecondVarValue = Math.ceil(secondVarValue * 100) / 100;

            const calcSecondVar6alt =
              isDecimal(secondVarValue) && hasTwoDecimalPlace(secondVarValue)
                ? `Approximately: x = ${roundedsecondVarValue}`
                : '';

            const allValues = `${textInstancesArray[index].text10}`;
            const calcSecondVar7 = `x : ${roundedsecondVarValue}, y : ${firstVarValue}`;
            const now = new Date();
            const finalResults = {
              id: `${solution.length + 1}`,
              procedureSolveFirstVa1,
              calcFirstVar1,
              interFirstVar,
              procedureSolveFirstVa2,
              calcFirstVar2,
              procedureSolveFirstVa3,
              calcFirstVar3,
              calcFirstVar3alt,
              calcSecondVar6alt,
              procedureSolveSecondVar1,
              calcSecondVar1,
              procedureSolveSecondVar2,
              calcSecondVar2,
              procedureSolveSecondVar3,
              calcSecondVar3,
              procedureSolveSecondVar5,
              calcSecondVar5,
              procedureSolveSecondVar6,
              calcSecondVar6,
              allValues,
              calcSecondVar7,
              calcSecondVar4,
              isNew: true,
              date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
                2,
                '0'
              )}-${String(now.getDate()).padStart(2, '0')} ${String(
                now.getHours()
              ).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
            };

            // setSolution((prev) => [...prev, { finalResults }]);
            setSolution((prev) => {
              const updatedSolutions = prev.map((soln) => ({
                ...soln,
                isNew: false,
              }));
              return [finalResults, ...updatedSolutions];
            });
          } else if (y1 - y2 === 0) {
            const leftHandVar1 = x1 - x2;
            const leftHandVar2 = y1 - y2;
            const rightHandVar1 = const1 - const2;

            // step one identifying variables
            const demoY1 = `${leftHandVar1}x ${
              leftHandVar2 >= 0 ? '+ ' + leftHandVar2 : leftHandVar2
            }y = ${rightHandVar1}`;
            const procedureSolveFirstVa1 = `${textInstancesArray[index].text1} ${textInstancesArray[index].text2}`;
            const calcFirstVar1 = `${removeCoefficient(demoY1)}`;
            // console.log(calcFirstVar1);
            const interFirstVar = `${
              leftHandVar1 === 1 || leftHandVar1 === -1 ? '' : leftHandVar1
            }x = ${rightHandVar1}`;

            // step two simplification
            const procedureSolveFirstVa2 = `${textInstancesArray[index].text3}`;
            const calcFirstVar2 = `${
              leftHandVar1 === 1 || leftHandVar1 === -1 ? '' : leftHandVar1
            }x/${leftHandVar1} = ${rightHandVar1}/${leftHandVar1}`;

            // Step 3 evaluation
            const procedureSolveFirstVa3 = `${textInstancesArray[index].text4}`;
            let firstVarValue = rightHandVar1 / leftHandVar1;
            const calcFirstVar3 = `x = ${firstVarValue}`;

            const roundedFirstVarValue = Math.round(firstVarValue * 100) / 100;

            const calcFirstVar3alt =
              isDecimal(firstVarValue) && hasTwoDecimalPlace(firstVarValue)
                ? `Approximately: x = ${roundedFirstVarValue}`
                : ``;
            isDecimal(firstVarValue) && hasTwoDecimalPlace(firstVarValue)
              ? (firstVarValue = roundedFirstVarValue)
              : firstVarValue;

            // Step 4 : Substitution of y in any equation to resolve for x

            const procedureSolveSecondVar1 = `${
              textInstancesArray[index].text5
            } ${removeCoefficient(demo1)} `;
            const calcDemoX1 = `${x1}(${firstVarValue}) ${
              y1 >= 0 ? '+ ' + y1 : y1
            }y = ${const1}`;
            const calcSecondVar1 = `${removeCoefficient(calcDemoX1)}`;

            const procedureSolveSecondVar2 = `${textInstancesArray[index].text6}`;
            const constantLeftHandSide =
              Math.round(parseInt(x1) * firstVarValue * 100) / 100;
            const calcDemoX2 = `${y1}y ${
              constantLeftHandSide >= 0
                ? '+ ' + constantLeftHandSide
                : constantLeftHandSide
            } = ${const1}`;
            const calcSecondVar2 = ` ${removeCoefficient(calcDemoX2)}`;

            const procedureSolveSecondVar3 = `${textInstancesArray[index].text7} const(${constantLeftHandSide})`;
            const calcDemoX3 = `${y1}y ${
              constantLeftHandSide >= 0
                ? '+ ' + constantLeftHandSide
                : constantLeftHandSide
            } ${
              -1 * constantLeftHandSide >= 0
                ? '+ ' + -1 * constantLeftHandSide
                : -1 * constantLeftHandSide
            } = ${const1} ${
              -1 * constantLeftHandSide >= 0
                ? '+ ' + -1 * constantLeftHandSide
                : -1 * constantLeftHandSide
            }`;
            const calcSecondVar3 = ` ${removeCoefficient(calcDemoX3)}`;

            const rightHandVar2 =
              Math.round(
                (parseInt(const1) + -1 * parseInt(x1) * firstVarValue) * 100
              ) / 100;
            const calcDemoX4 = `${y1}y = ${rightHandVar2}`;
            const calcSecondVar4 = ` ${removeCoefficient(calcDemoX4)}`;

            const procedureSolveSecondVar5 = `${textInstancesArray[index].text8}`;
            const calcSecondVar5 = `${y1}y/${y1} = ${rightHandVar2}/${y1}`;
            const secondVarValue = rightHandVar2 / y1;
            const procedureSolveSecondVar6 = `${textInstancesArray[index].text9}`;
            const calcSecondVar6 = `y = ${secondVarValue}`;
            const roundedsecondVarValue =
              Math.round(secondVarValue * 100) / 100;

            const calcSecondVar6alt =
              isDecimal(secondVarValue) && hasTwoDecimalPlace(secondVarValue)
                ? `Approximately: y = ${roundedsecondVarValue}`
                : '';

            const allValues = `${textInstancesArray[index].text10}`;
            const calcSecondVar7 = `x : ${firstVarValue}, y : ${roundedsecondVarValue}`;
            // console.log(calcSecondVar1);
            // const step4 = {  };
            // solution.push(step4);
            const now = new Date();
            const finalResults = {
              id: `${solution.length + 1}`,
              procedureSolveFirstVa1,
              calcFirstVar1,
              interFirstVar,
              procedureSolveFirstVa2,
              calcFirstVar2,
              procedureSolveFirstVa3,
              calcFirstVar3,
              calcFirstVar3alt,
              calcSecondVar6alt,
              procedureSolveSecondVar1,
              calcSecondVar1,
              procedureSolveSecondVar2,
              calcSecondVar2,
              procedureSolveSecondVar3,
              calcSecondVar3,
              procedureSolveSecondVar5,
              calcSecondVar5,
              procedureSolveSecondVar6,
              calcSecondVar6,
              allValues,
              calcSecondVar7,
              calcSecondVar4,
              isNew: true,
              date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
                2,
                '0'
              )}-${String(now.getDate()).padStart(2, '0')} ${String(
                now.getHours()
              ).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
            };

            // const wrappedResults = {

            //   finalResults,
            // };
            setSolution((prev) => {
              const updatedSolutions = prev.map((soln) => ({
                ...soln,
                isNew: false,
              }));
              return [finalResults, ...updatedSolutions];
            });
            // finalResults.map((item)=>{item.})
          }
        } else if (y1 !== y2 || x1 !== x2) {
          const index = Math.floor(Math.random() * textInstancesArray.length);
          const eqnVarArray = [
            { eqnVar1: x1 / x2, eqnVar2: x2 / x1, eqnVar3: x2 * x1 },
            { eqnVar1: y1 / y2, eqnVar2: y2 / y1, eqnVar3: y2 * y1 },
          ];
          const indexOfEqnVarArray = Math.floor(
            Math.random() * eqnVarArray.length
          );
          let a1 = x1;
          let b1 = y1;
          let c1 = const1;
          let a2 = x2;
          let b2 = y2;
          let c2 = const2;
          let lcmEqn1High = isDecimal(eqnVarArray[indexOfEqnVarArray].eqnVar1);
          let lcmEqn2High = isDecimal(eqnVarArray[indexOfEqnVarArray].eqnVar2);
          let lcm;
          if (!lcmEqn2High) {
            lcm = eqnVarArray[indexOfEqnVarArray].eqnVar2;
            a1 = lcm * parseInt(x1);
            b1 = lcm * parseInt(y1);
            c1 = lcm * parseInt(const1);
          } else if (!lcmEqn1High) {
            lcm = eqnVarArray[indexOfEqnVarArray].eqnVar1;
            a2 = lcm * parseInt(x2);
            b2 = lcm * parseInt(y2);
            c2 = lcm * parseInt(const2);
          } else if (lcmEqn1High && lcmEqn2High) {
            lcm = eqnVarArray[indexOfEqnVarArray].eqnVar3;
            a1 = (lcm / parseInt(x1)) * parseInt(x1);
            b1 = (lcm / parseInt(x1)) * parseInt(y1);
            c1 = (lcm / parseInt(x1)) * parseInt(const1);
            a2 = (lcm / parseInt(x2)) * parseInt(x2);
            b2 = (lcm / parseInt(x2)) * parseInt(y2);
            c2 = (lcm / parseInt(x2)) * parseInt(const2);
          }
          if (a1 - a2 === 0) {
            const leftHandVar1 = a1 - a2;
            const leftHandVar2 = b1 - b2;
            const rightHandVar1 = c1 - c2;

            const demob1 = `${leftHandVar1}x ${
              leftHandVar2 >= 0 ? '+ ' + leftHandVar2 : leftHandVar2
            }y = ${rightHandVar1}`;
            const procedureSolveFirstVa1 = `${textInstancesArray[index].text1} ${textInstancesArray[index].text2}`;
            const calcFirstVar1 = `${removeCoefficient(demob1)}`;
            console.log(calcFirstVar1);

            const interFirstVar = `${
              leftHandVar2 === 1 || leftHandVar2 === -1 ? '' : leftHandVar2
            }y = ${rightHandVar1}`;

            const procedureSolveFirstVa2 = `${textInstancesArray[index].text3}`;
            const calcFirstVar2 = `${
              leftHandVar2 === 1 || leftHandVar2 === -1 ? '' : leftHandVar2
            }y/${leftHandVar2} = ${rightHandVar1}/${leftHandVar2}`;
            const procedureSolveFirstVa3 = `${textInstancesArray[index].text4}`;
            let firstVarValue = rightHandVar1 / leftHandVar2;
            const calcFirstVar3 = `y = ${firstVarValue}`;

            const roundedfirstVarValue = Math.round(firstVarValue * 100) / 100;

            const calcFirstVar3alt =
              isDecimal(firstVarValue) && hasTwoDecimalPlace(firstVarValue)
                ? `Approximately: y = ${roundedfirstVarValue}`
                : ``;
            isDecimal(firstVarValue) && hasTwoDecimalPlace(firstVarValue)
              ? (firstVarValue = roundedfirstVarValue)
              : firstVarValue;

            const demo = `${a1}x ${b1 >= 0 ? '+ ' + b1 : b1}y = ${c1}`;
            const procedureSolveSecondVar1 = `${
              textInstancesArray[index].text5
            } const(${removeCoefficient(demo)}) `;
            const calcDemoa1 = `${a1}x ${
              b1 >= 0 ? '+ ' + b1 : b1
            }(${firstVarValue}) = ${c1}`;
            const calcSecondVar1 = `${removeCoefficient(calcDemoa1)}`;

            const procedureSolveSecondVar2 = `${textInstancesArray[index].text6}`;
            const calcDemoa2 = `${a1}x ${
              b1 * firstVarValue >= 0
                ? '+ ' + b1 * firstVarValue
                : b1 * firstVarValue
            } = ${c1}`;
            const calcSecondVar2 = ` ${removeCoefficient(calcDemoa2)}`;

            const procedureSolveSecondVar3 = `${
              textInstancesArray[index].text7
            } ${b1 * firstVarValue}`;
            const calcDemoX3 = `${a1}x ${
              b1 * firstVarValue >= 0
                ? '+ ' + b1 * firstVarValue
                : b1 * firstVarValue
            } ${
              -1 * b1 * firstVarValue >= 0
                ? '+ ' + -1 * b1 * firstVarValue
                : -1 * b1 * firstVarValue
            } = ${c1} ${
              -1 * b1 * firstVarValue >= 0
                ? '+ ' + -1 * b1 * firstVarValue
                : -1 * b1 * firstVarValue
            }`;
            const calcSecondVar3 = ` ${removeCoefficient(calcDemoX3)}`;
            const rightHandVar2 =
              Math.round(
                (parseInt(c1) + -1 * parseInt(b1) * firstVarValue) * 100
              ) / 100;
            const calcDemoX4 = `${a1}x = ${rightHandVar2}`;
            const calcSecondVar4 = ` ${removeCoefficient(calcDemoX4)}`;

            const procedureSolveSecondVar5 = `${textInstancesArray[index].text8}`;
            const demo3 = `${a1}x/${a1} = ${rightHandVar2}/${a1}`;
            const calcSecondVar5 = `${removeCoefficient(demo3)}`;
            let secondVarValue = rightHandVar2 / a1;

            const procedureSolveSecondVar6 = `${textInstancesArray[index].text9}`;
            const calcSecondVar6 = `x = ${secondVarValue}`;
            const roundedsecondVarValue = Math.ceil(secondVarValue * 100) / 100;

            const calcSecondVar6alt =
              isDecimal(secondVarValue) && hasTwoDecimalPlace(secondVarValue)
                ? `Approximately: x = ${roundedsecondVarValue}`
                : '';
            isDecimal(secondVarValue) && hasTwoDecimalPlace(secondVarValue)
              ? (secondVarValue = roundedsecondVarValue)
              : secondVarValue;

            const allValues = `${textInstancesArray[index].text10}`;
            const calcSecondVar7 = `x : ${roundedsecondVarValue}, y : ${firstVarValue}`;
            // console.log(calcSecondVar1);
            // const step4 = {  };
            // solution.push(step4);
            const now = new Date();
            const finalResults = {
              id: `${solution.length + 1}`,
              procedureSolveFirstVa1,
              calcFirstVar1,
              interFirstVar,
              procedureSolveFirstVa2,
              calcFirstVar2,
              procedureSolveFirstVa3,
              calcFirstVar3,
              calcFirstVar3alt,
              calcSecondVar6alt,
              procedureSolveSecondVar1,
              calcSecondVar1,
              procedureSolveSecondVar2,
              calcSecondVar2,
              procedureSolveSecondVar3,
              calcSecondVar3,
              procedureSolveSecondVar5,
              calcSecondVar5,
              procedureSolveSecondVar6,
              calcSecondVar6,
              allValues,
              calcSecondVar7,
              calcSecondVar4,
              isNew: true,
              date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
                2,
                '0'
              )}-${String(now.getDate()).padStart(2, '0')} ${String(
                now.getHours()
              ).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
            };
            setSolution((prev) => {
              const updatedSolutions = prev.map((soln) => ({
                ...soln,
                isNew: false,
              }));
              return [finalResults, ...updatedSolutions];
            });
          } else if (b1 - b2 === 0) {
            //constants
            const leftHandVar1 = a1 - a2;
            const leftHandVar2 = b1 - b2;
            const rightHandVar1 = c1 - c2;

            // step one identifying variables
            const demob1 = `${leftHandVar1}x ${
              leftHandVar2 >= 0 ? '+ ' + leftHandVar2 : leftHandVar2
            }y = ${rightHandVar1}`;
            const procedureSolveFirstVa1 = `${textInstancesArray[index].text1} ${textInstancesArray[index].text2}`;
            const calcFirstVar1 = `${removeCoefficient(demob1)}`;
            // console.log(calcFirstVar1);
            const interFirstVar = `${
              leftHandVar1 === 1 || leftHandVar1 === -1 ? '' : leftHandVar1
            }x = ${rightHandVar1}`;

            const procedureSolveFirstVa2 = `${textInstancesArray[index].text3}`;
            const calcFirstVar2 = `${
              leftHandVar1 === 1 || leftHandVar1 === -1 ? '' : leftHandVar1
            }x/${leftHandVar1} = ${rightHandVar1}/${leftHandVar1}`;

            const procedureSolveFirstVa3 = `${textInstancesArray[index].text4}`;
            let firstVarValue = rightHandVar1 / leftHandVar1;
            const calcFirstVar3 = `x = ${firstVarValue}`;
            const roundedFirstVarValue = Math.round(firstVarValue * 100) / 100;

            const calcFirstVar3alt =
              isDecimal(firstVarValue) && hasTwoDecimalPlace(firstVarValue)
                ? `Approximately: x = ${roundedFirstVarValue}`
                : ``;
            isDecimal(firstVarValue) && hasTwoDecimalPlace(firstVarValue)
              ? (firstVarValue = roundedFirstVarValue)
              : firstVarValue;

            const procedureSolveSecondVar1 = `${
              textInstancesArray[index].text5
            } ${removeCoefficient(demo1)} `;
            const calcDemoa1 = `${a1}(${firstVarValue}) ${
              b1 >= 0 ? '+ ' + b1 : b1
            }y = ${c1}`;
            const calcSecondVar1 = `${removeCoefficient(calcDemoa1)}`;

            const procedureSolveSecondVar2 = `${textInstancesArray[index].text6}`;
            const calcDemoa2 = `${b1}y ${
              a1 * firstVarValue >= 0
                ? '+ ' + a1 * firstVarValue
                : a1 * firstVarValue
            } = ${c1}`;
            const calcSecondVar2 = ` ${removeCoefficient(calcDemoa2)}`;

            const procedureSolveSecondVar3 = `${
              textInstancesArray[index].text7
            } ${a1 * firstVarValue}`;
            const calcDemoX3 = `${b1}y ${
              a1 * firstVarValue >= 0
                ? '+ ' + a1 * firstVarValue
                : a1 * firstVarValue
            } ${
              -1 * a1 * firstVarValue >= 0
                ? '+ ' + -1 * a1 * firstVarValue
                : -1 * a1 * firstVarValue
            } = ${c1} ${
              -1 * a1 * firstVarValue >= 0
                ? '+ ' + -1 * a1 * firstVarValue
                : -1 * a1 * firstVarValue
            }`;
            const calcSecondVar3 = ` ${removeCoefficient(calcDemoX3)}`;

            const rightHandVar2 =
              Math.round(
                (parseInt(c1) + -1 * parseInt(a1) * firstVarValue) * 100
              ) / 100;
            const calcDemoX4 = `${b1}y = ${rightHandVar2}`;
            const calcSecondVar4 = ` ${removeCoefficient(calcDemoX4)}`;

            const procedureSolveSecondVar5 = `${textInstancesArray[index].text8}`;
            const calcSecondVar5 = `${b1}y/${b1} = ${rightHandVar2}/${b1}`;
            const secondVarValue = rightHandVar2 / b1;
            const procedureSolveSecondVar6 = `${textInstancesArray[index].text9}`;
            const calcSecondVar6 = `y = ${secondVarValue}`;
            const roundedsecondVarValue =
              Math.round(secondVarValue * 100) / 100;

            const calcSecondVar6alt =
              isDecimal(secondVarValue) && hasTwoDecimalPlace(secondVarValue)
                ? `Approximately: y = ${roundedsecondVarValue}`
                : '';

            const allValues = `${textInstancesArray[index].text10}`;
            const calcSecondVar7 = `x : ${firstVarValue}, y : ${roundedsecondVarValue}`;
            const now = new Date();
            const finalResults = {
              id: `${solution.length + 1}`,
              procedureSolveFirstVa1,
              calcFirstVar1,
              interFirstVar,
              procedureSolveFirstVa2,
              calcFirstVar2,
              procedureSolveFirstVa3,
              calcFirstVar3,
              calcFirstVar3alt,
              calcSecondVar6alt,
              procedureSolveSecondVar1,
              calcSecondVar1,
              procedureSolveSecondVar2,
              calcSecondVar2,
              procedureSolveSecondVar3,
              calcSecondVar3,
              procedureSolveSecondVar5,
              calcSecondVar5,
              procedureSolveSecondVar6,
              calcSecondVar6,
              allValues,
              calcSecondVar7,
              calcSecondVar4,
              isNew: true,
              date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
                2,
                '0'
              )}-${String(now.getDate()).padStart(2, '0')} ${String(
                now.getHours()
              ).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
            };
            setSolution((prev) => {
              const updatedSolutions = prev.map((soln) => ({
                ...soln,
                isNew: false,
              }));
              return [finalResults, ...updatedSolutions];
            });
          }
        }
      }
    }

    if (preferences === 'text') {
      if (elimTab) {
        // const que2 = 'x - y = 1';
        // const coefficient1 = generateEquation();
        // console.log(coefficient1);
      }
    }
  }

  // useEffect(() => {

  // }, []);
  // console.log(coefficient1);

  return (
    <div className="equation-preference">
      <div className="option">
        <button
          onClick={() => {
            setPreferences('text');
          }}>
          Plain Text
        </button>
        <button
          onClick={() => {
            setPreferences('values');
          }}>
          Enter Values
        </button>
      </div>
      <p>{removeCoefficient(demo1)}</p>
      <p>{removeCoefficient(demo2)}</p>
      {preferences === 'values' ? (
        <div className="values-inputs">
          <div className="inputs">
            <input
              type="number"
              value={x1}
              onChange={(e) => {
                setx1(e.target.value);
              }}
              // placeholder="eg. 2x + y = z"
            />{' '}
            x<sub>1</sub>
            {''} +{' '}
            <input
              value={y1}
              onChange={(e) => {
                sety1(e.target.value);
              }}
              type="number"
              // placeholder="eg. 2x + y = z"
            />{' '}
            y<sub>1</sub> ={' '}
            <input
              type="number"
              value={const1}
              onChange={(e) => {
                setConst1(e.target.value);
              }}
              // placeholder="eg. 2x + y = z"
            />
          </div>
          <div className="inputs">
            <input
              type="number"
              value={x2}
              onChange={(e) => {
                setx2(e.target.value);
              }}
              // placeholder="eg. 2x + y = z"
            />{' '}
            x<sub>2</sub>
            {''} +{' '}
            <input
              type="number"
              value={y2}
              onChange={(e) => {
                sety2(e.target.value);
              }}
              // placeholder="eg. 2x + y = z"
            />{' '}
            y<sub>2</sub> ={' '}
            <input
              type="number"
              value={const2}
              onChange={(e) => {
                setConst2(e.target.value);
              }}
              // placeholder="eg. 2x + y = z"
            />
          </div>
        </div>
      ) : (
        <div className="text-input">
          <input
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              console.log(question);
            }}
            type="text"
          />
        </div>
      )}
      <hr />

      <div>
        <div className="calculate__clear-btn">
          <button
            onClick={() => {
              setSolution([]);
            }}>
            Clear All
          </button>
          {/* <p>{generateEquation}</p> */}
          {preferences === 'text' && (
            <button onClick={generateEquation}>Generate Equation</button>
          )}
          <button onClick={calculateEquation}>Calculate</button>
        </div>
        <hr />
        <TransitionGroup>
          {solution.map((steps) => {
            return (
              <CSSTransition
                key={steps.id}
                timeout={300}
                classNames="card">
                <div
                  // key={index}
                  className="card">
                  {steps.isNew && <div className="card-indicator">New</div>}
                  <div className="card-top">
                    <p>{steps.id}.</p>
                    <p className="method">{methodPreferences}</p>
                  </div>
                  <div className="card-middle">
                    <div className="card-left">
                      <p>{steps.procedureSolveFirstVa1}</p>
                      <p>{steps.calcFirstVar1}</p>
                      <p>{steps.interFirstVar}</p>
                      <p>{steps.procedureSolveFirstVa2}</p>
                      <p>{steps.calcFirstVar2}</p>
                      <p>{steps.procedureSolveFirstVa3}</p>
                      <p>{steps.calcFirstVar3}</p>
                      <p>{steps.calcFirstVar3alt}</p>
                    </div>
                    <div className="card-right">
                      <p>{steps.procedureSolveSecondVar1}</p>
                      <p>{steps.calcSecondVar1}</p>
                      <p>{steps.procedureSolveSecondVar2}</p>
                      <p>{steps.calcSecondVar2}</p>
                      <p>{steps.procedureSolveSecondVar3}</p>
                      <p>{steps.calcSecondVar3}</p>
                      <p>{steps.calcSecondVar4}</p>
                      <p>{steps.procedureSolveSecondVar5}</p>
                      <p>{steps.calcSecondVar5}</p>
                      <p>{steps.procedureSolveSecondVar6}</p>
                      <p>{steps.calcSecondVar6}</p>
                      <p>{steps.calcSecondVar6alt}</p>
                    </div>
                  </div>
                  <div className="middle-bottom">
                    <p>{steps.allValues}</p>
                    <p className="all-values">{steps.calcSecondVar7}</p>
                  </div>
                  <div className="middle-bottom-last">
                    <p>{steps.date}</p>
                    <p
                      className="card-close"
                      onClick={() => {
                        // const newResults = [...solution];
                        // newResults.splice(index, 1);
                        setSolution((prev) =>
                          prev.filter((item) => item.id !== steps.id)
                        );
                        // setSolution(newResults);
                      }}>
                      <FontAwesomeIcon icon={faClose} />
                    </p>
                  </div>
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        {/*<p>{index}</p>*/}
      </div>
      <hr />
      <input
        type="checkbox"
        id="sub"
        disabled={subTab}
        onChange={onSubChangeHandler}
      />
      <label htmlFor="sub">Use Elimation Method</label>
      <input
        type="checkbox"
        disabled={elimTab}
        onChange={onElimChangeHandler}
        // disabled={}
        id="elim"
      />
      <label htmlFor="elim">Use Substitution Method</label>
      <button onClick={calculateEquation}>Solve Equation</button>
    </div>
  );
};

export default LinearEquation;
