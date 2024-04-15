import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  draggableId: string;
  draggableIndex: number;
  children: React.ReactElement;
}

const DraggableItem = ({ draggableId, draggableIndex, children }: Props) => {
  return (
    <Draggable draggableId={draggableId} index={draggableIndex}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {React.cloneElement(children)}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;