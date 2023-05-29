import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

// import './styles.css';
const Equation = ({ attributes, element, children }) => {
  const { inline, math } = element;
  return (
    <span
      data-slate-type="equation"
      contentEditable={false}
      style={{ userSelect: 'none' }}>
      <span
        {...attributes}
        {...element.attr}
        className={inline ? 'equation-inline' : ''}
        contentEditable={false}>
        {inline ? (
          <InlineMath math={math}>{math}</InlineMath>
        ) : (
          <BlockMath math={math}>{math}</BlockMath>
        )}
      </span>
      {children}
    </span>
  );
};

export default Equation;
