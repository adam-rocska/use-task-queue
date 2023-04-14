import {FunctionComponent, useState} from 'react';
import {useReproContext} from './ReproContext';

const Reproduce: FunctionComponent = () => {
  const context = useReproContext();
  const [input, setInput] = useState(10);
  const reproduce = () => {
    context.task1.push(input);
    setInput(v => v + 1);
  };
  return (
    <>
      <button onClick={reproduce}>Reproduce Bug</button>
      <output data-testid="output">
        <ul>
          {context.task3.output.map((output, index) => (
            <li key={index}>
              For an input of {output.input}, the outputs are:
              <ul>
                {output.output.map((output, index) => (
                  <li key={index}>{output}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </output>
    </>
  );
};

export default Reproduce;
