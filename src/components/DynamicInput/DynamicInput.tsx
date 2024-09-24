import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Pill } from "../Pill/Pill.tsx";
import { Label } from "../Label/Label.tsx";

const initialPillList = [
    'HTML', 'CSS', 'PHP', 'NODEJS', 'JQUERY', 'React', 'Vue', 'Angular', 'TypeScript'
];

export const DynamicInput = () => {
    const [focus, setFocus] = useState(0);
    const [pillsArray, setPillsArray] = useState(['HTML', 'CSS']);
    const [selectedPill, setSelectedPill] = useState('');
    const [cursorIndexPosition, setCursorIndexPosition] = useState(0);
    const [cursorPosOnDrag, setCursorPosOnDrag] = useState('');
    const [itemDropped, setItemDropped] = useState('');
    const [availablePills, setAvailablePills] = useState(initialPillList);

    // Handle item drop and reset
    useEffect(() => {
        if (itemDropped && cursorPosOnDrag) {
            const index = pillsArray.indexOf(cursorPosOnDrag);
            const newArray = [...pillsArray];
            newArray.splice(index + 1, 0, itemDropped);
            setPillsArray(newArray);
            resetDragAndDrop();
        }
    }, [cursorPosOnDrag, itemDropped]);

    // Filter out pills that are already in `pillsArray`
    useEffect(() => {
        const filteredPills = initialPillList.filter(pill => !pillsArray.includes(pill));
        setAvailablePills(filteredPills);
    }, [pillsArray]);

    // Insert selected pill at the cursor position
    useEffect(() => {
        if (selectedPill) {
            const newArray = [...pillsArray];
            newArray.splice(cursorIndexPosition + 1, 0, selectedPill);
            setPillsArray(newArray);
            setSelectedPill('');
        }
    }, [selectedPill, cursorIndexPosition, pillsArray]);

    const resetDragAndDrop = () => {
        setCursorPosOnDrag('');
        setItemDropped('');
    };

    const deletePill = useCallback((pill: string, index: number = 0) => {
        const newPills = pillsArray.filter(item => item !== pill);
        setPillsArray(newPills);
        setFocus(index);
    }, [pillsArray]);

    const handleCursorPosition = useCallback((pill: string) => {
        const index = pillsArray.indexOf(pill);
        setCursorIndexPosition(index);
    }, [pillsArray]);

    const handleDrop = useCallback((ev: React.DragEvent) => {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        const extractedPill = data.split('id__')[1];
        setItemDropped(extractedPill);
    }, []);

    const allowDrop = (ev: React.DragEvent) => {
        ev.preventDefault();
    };

    const resetAvailablePills = () => {
        setAvailablePills(initialPillList);
    };


    const renderPills = useMemo(() => (
        pillsArray.map((pill, index) => (
            <Pill
                key={`pill__${pill}`}
                focus={focus === index + 1}
                deleteTab={() => deletePill(pill, index)}
                getCursorPosition={() => handleCursorPosition(pill)}
                setCursorPosOnDrag={setCursorPosOnDrag}
                title={pill}
                deletePill={(pill)=>{deletePill(pill)}}
            />
        ))
    ), [pillsArray, focus, deletePill, handleCursorPosition]);

    const renderAvailablePills = useMemo(() => (
        availablePills.map(pill => (
            <Label
                id={`id__${pill}`}
                key={`label__${pill}`}
                onSelect={() => setSelectedPill(pill)}
                title={pill}
            />
        ))
    ), [availablePills]);

    return (
        <>
            <button
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 ease-in-out"
                onClick={resetAvailablePills}
            >
                Reset Pills List
            </button>

            <div className="h-96">
                <div className="flex-col w-fit mb-20">
                    {renderAvailablePills}
                </div>
            </div>
            <div className='border-2 p-5'>
            <div
                onDrop={handleDrop}
                onDragOver={allowDrop}
                className="flex h-10 mt-3.5"
            >
                {renderPills}
            </div>

            </div>
        </>
    );
};
