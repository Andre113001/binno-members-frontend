import React, { useEffect, useState, useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import YoutubeEmbed from '../YoutubeEmbed/YoutubeEmbed'
import styles from './Sortable.module.css';

import { DragIndicator } from '@mui/icons-material';

export function Sortable(props) {
  const { elements, editMode, editingId, setEditingElementId, setElements, allElements } = props; 
  const [ content, setContent ] = useState(elements.content);
  const contentRef = useRef()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id});

  const saveElement = () => {
    setEditingElementId(null);
    const foundElement = allElements.find((ele) => ele.id === elements.id);

    const index = allElements.indexOf(foundElement);

    let targetElement = [...allElements]
    targetElement[index].content = contentRef.current.innerHTML; // Update the content using innerHTML

    setElements(targetElement);
};


  // useEffect(() => {
  //   // Resize the textarea to fit the content
  //   if (contentRef.current) {
  //     contentRef.current.style.height = 'auto';
  //     contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
  //     contentRef.current.style.width = `${contentRef.current.scrollWidth}px`;
  //   }
  // }, [content]);

  const fixedSizedStyle = {
    width: '100%', // Set the width to your desired value
    height: 'auto', // Set the height to your desired value
  };

  const dragIndicatorStyle = {
    position: 'absolute',
    top: 10,
    left: '-20px', // Adjust the left position as needed
    cursor: 'grab',
    zIndex: 1
  };


  const style = {
    ...fixedSizedStyle,
    transform: CSS.Translate.toString(transform),
    transition
  };

  // const handleSaveElement = () => {
  //   setContent(contentRef.current.value)
  //   setEditingElementId(null);
  //   const foundElement = allElements.find((ele) => ele.id === elements.id);

  //   const index = allElements.indexOf(foundElement);

  //   let targetElement = [...allElements]
  //   targetElement[index].content = contentRef.current.value

  //   console.log(targetElement)

  //   setElements(targetElement);
  // };

  const handleDiscard = () => {
    setEditingElementId(null);
  };

  return (
    <div className="list-row" ref={setNodeRef} style={style}>
      <div className="drag-indicator" {...attributes} {...listeners}>
        <div style={dragIndicatorStyle}>
          <DragIndicator />
        </div>
      </div>
      <div className="content-container">
          <div contentEditable={true} onInput={saveElement} ref={contentRef} dangerouslySetInnerHTML={{ __html: `<${elements.type} ${elements.attributes}>${content}</${elements.type}>` }} />
      </div>
    </div>
  );
  
}
