import { ReactNode } from 'react';
import { DragDropContext, DragDropContextProps, Draggable, DraggableProvidedDragHandleProps, Droppable } from 'react-beautiful-dnd';
import { View, ViewProps } from 'wiloke-react-core';

interface DataDefault {
  id: string;
}

interface RenderItemParam<T extends DataDefault> {
  item: T;
  index: number;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  isDragging: boolean;
}

export interface SortableProps<T extends DataDefault> extends Omit<DragDropContextProps, 'children'> {
  data: T[];
  renderItem: ({ item, index, dragHandleProps }: RenderItemParam<T>) => ReactNode;
  keyExtractor?: (item: T) => string;
  itemCss?: ViewProps['css'];
}

const Sortable = <T extends { id: string }>({ data, renderItem, keyExtractor = item => item.id, itemCss, ...rest }: SortableProps<T>) => {
  return (
    <DragDropContext {...rest}>
      <Droppable droppableId="droppable">
        {provided => (
          <View {...provided.droppableProps} ref={provided.innerRef}>
            {data.map((item, index) => (
              <Draggable key={keyExtractor(item)} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <View ref={provided.innerRef} {...provided.draggableProps} style={provided.draggableProps.style} css={itemCss}>
                    {renderItem({ item, index, dragHandleProps: provided.dragHandleProps, isDragging: snapshot.isDragging })}
                  </View>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </View>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Sortable;
