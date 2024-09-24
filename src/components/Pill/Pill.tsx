import React, { useEffect, useRef, useState } from 'react';

export const Pill = ({
                         title,
                         deleteTab = (title) => {},
                         focus = false,
                         getCursorPosition,
                         setCursorPosOnDrag,
                         deletePill,
                     }) => {
    const inputRef = useRef(null); // Reference to the hidden input field for focus control
    const spanRef = useRef(null); // Ref for the hidden span to calculate width
    const [inputValue, setInputValue] = useState(''); // State to track input value

    // Focus on the hidden input when the pill gets focus
    useEffect(() => {
        if (focus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [focus]);

    // Adjust the input width based on the hidden span's width
    useEffect(() => {
        if (spanRef.current && inputRef.current) {
            inputRef.current.style.width = `${spanRef.current.offsetWidth + 5}px`;
        }
    }, [inputValue]);

    // Handle backspace key event to delete the pill if there's no text to the left
    const handleKeyDown = (event) => {
        const caretPosition = event.target.selectionStart;

        if (event.key === 'Backspace') {
            if (caretPosition === 0) {
                deleteTab(title);
            } else {
                console.log('There is text to the left of the cursor.');
            }
        }
    };

    // Render the delete button for the pill
    const renderDeleteButton = () => (
        <div
            onClick={() => deletePill(title)} // Handle delete button click
            contentEditable={false}
            className="rounded-full h-full p-1.5 border-2 bg-black text-center pt-2.5 mr-1 cursor-pointer"
        >
            <div className="text-sky-50 text-xs/[1px]">X</div>
        </div>
    );

    return (
        <>
            {/* Pill display (non-editable) */}
            <div contentEditable={false} className="max-h-full p-2 flex bg-gray-300 rounded-full">
                <div className="pr-2 pl-2">{title}</div>
                {renderDeleteButton()}
            </div>

            {/* Hidden span for calculating input width */}
            <span ref={spanRef} className="invisible absolute whitespace-pre" aria-hidden="true">
        {inputValue || ' '}
      </span>

            {/* Hidden input for handling key events */}
            <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} // Update the input value
                onKeyDown={handleKeyDown} // Handle backspace press and caret position
                onMouseEnter={() => setCursorPosOnDrag(title)} // Set cursor position on drag
                onClick={() => getCursorPosition(title)} // Set cursor position on click
                className="border-none outline-none caret-red-500" // Tailwind styling
                style={{ minWidth: '30px' }} // Ensures a minimum width of 5px
            />
        </>
    );
};
