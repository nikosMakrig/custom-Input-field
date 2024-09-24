
import React from "react";



function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
export const Label = ({title, onSelect}) =><>
    <div
        id={`id__${title}`}
        draggable="true" onDragStart={(event) => drag(event)}
        onClick={ ()=> onSelect(title)}
         className="bg-gray-400 text-white font-semibold py-2 px-4 rounded-full transition
    duration-300 ease-in-out hover:bg-gray-500 hover:shadow-lg hover:scale-105 cursor-pointer m-2">
        {title}
    </div>
    </>