import React from "react";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  children: React.ReactElement;
  droppableId: string;
}

const DroppableColumn = ({ droppableId, children }: Props) => {
  return (
    <Droppable droppableId={droppableId}>
      {provided => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {React.cloneElement(children)}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DroppableColumn;