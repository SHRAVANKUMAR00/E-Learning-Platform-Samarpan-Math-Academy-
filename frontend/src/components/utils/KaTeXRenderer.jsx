import React from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

const KaTeXRenderer = ({ text }) => {
  if (!text) return null;
  return (
    <span className="latex-container">
      {/* delimiters allow auto-detection of $$...$$ blocks or $...$ inline math */}
      <Latex>{String(text)}</Latex>
    </span>
  );
};

export default KaTeXRenderer;