import * as React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = <T extends any>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export function ReorderableListWithNewButton({
  items,
  buttonLabel,
  onCreate,
  onReorder,
  heading,
} : {
  items: {
    id: string,
    content: JSX.Element,
  }[],
  buttonLabel: string,
  onCreate: () => void,
  onReorder: (ids: string[]) => void,
  heading?: JSX.Element,
}) {
  const onDragEnd = (event) => {
    if (!event.destination) {
      return;
    }

    const itemIDs = items.map(item => item.id);
    const newItemIDs = reorder(itemIDs, event.source.index, event.destination.index);

    onReorder(newItemIDs);
  };

  return (
    <div className='c-list-with-new-button c-list-with-new-button--reorderable'>
      {heading ?
        <div className='c-list-with-new-button__heading'>{heading}</div>
        : null}
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <Droppable droppableId='list-droppable'>
          {(provided, snapshot) => (
            <ul className='c-list-with-new-button__list'
                {...provided.droppableProps}
                ref={provided.innerRef}>
              {items.map((item, i) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={i}>
                    {(provided, snapshot) => (
                      <li
                        key={i}
                        className='c-list-with-new-button__list-item'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={provided.draggableProps.style}
                      >
                        {item.content}
                      </li>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button
        className='c-list-with-new-button__button'
        onClick={() => onCreate()}
      >
        {buttonLabel}
      </button>
    </div>
  )
}