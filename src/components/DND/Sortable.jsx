import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import YoutubeEmbed from '../YoutubeEmbed/YoutubeEmbed'

import { DragIndicator } from '@mui/icons-material';

export function Sortable(props) {
  const { elements } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id});

  const fixedSizedStyle = {
    width: '100%', // Set the width to your desired value
    height: 'auto', // Set the height to your desired value
  };

  const dragIndicatorStyle = {
    position: 'absolute',
    top: 10,
    left: '-25px', // Adjust the left position as needed
    cursor: 'grab',
    zIndex: 1
  };


  const style = {
    ...fixedSizedStyle,
    transform: CSS.Translate.toString(transform),
    transition
  };

  return (
    <div className="list-row" ref={setNodeRef} style={style}>
      <div className="drag-indicator" {...attributes} {...listeners}>
        <div style={dragIndicatorStyle}>
          <DragIndicator />
        </div>
      </div>
      <div className="content-container">
        {elements.type === 'YoutubeEmbed' ? (
          <YoutubeEmbed videoLink={elements.attributes} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: `<${elements.type} ${elements.attributes}>${elements.content}</${elements.type}>` }} />
        )}
      </div>
    </div>
  );
  
}
