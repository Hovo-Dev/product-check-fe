import type { DropResult } from "react-beautiful-dnd";
import type { IProductsResponse } from "@/api/fetchProducts.ts";
import { useState } from "react";

const useDrag = <T extends object>(initialColumn: T) => {
  const [columns, setColumns] = useState<T>(initialColumn);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (destination === undefined || destination === null) {
      return null;
    }

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return null;
    }

    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (start === end) {
      const newList = start.list.filter(
        (_: IProductsResponse, idx: number) => idx !== source.index,
      );

      newList.splice(destination.index, 0, start.list[source.index]);

      const newCol = {
        id: start.id,
        list: newList,
      };

      setColumns(state => ({ ...state, [newCol.id]: newCol }));

      return null;
    } else {
      const newStartList = start.list.filter(
        (_: IProductsResponse, idx: number) => idx !== source.index,
      );

      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      const newEndList = end.list;

      newEndList.splice(destination.index, 0, start.list[source.index]);

      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      setColumns(state => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));

      return null;
    }
  };

  return {
    onDragEnd,
    columns,
    setColumns
  }
};

export default useDrag;