import React, { useEffect, useRef } from 'react';
import katex from 'katex'; // Ensure 'katex' npm package is installed: npm install katex

const KaTeXRenderer = ({ latex }) => {
  const mathRef = useRef(null);

  useEffect(() => {
    if (mathRef.current && latex) {
      try {
        // Clear previous content before rendering new formula
        mathRef.current.innerHTML = ''; 
        katex.render(latex, mathRef.current, {
          throwOnError: false, // Don't throw errors for invalid LaTeX, just render it as text
          displayMode: true, // Use display mode for larger, centered formulas
        });
      } catch (error) {
        console.error("KaTeX rendering error:", error);
        mathRef.current.textContent = `Error rendering formula: ${latex}`; // Fallback to plain text on error
      }
    }
  }, [latex]); // Re-render when the latex prop changes

  // Added min-h-[2rem] to ensure some height even if formula is small
  return <span ref={mathRef} className="block overflow-x-auto p-2 bg-gray-50 rounded-md text-gray-800 min-h-[2rem]"></span>;
};

export default KaTeXRenderer;
