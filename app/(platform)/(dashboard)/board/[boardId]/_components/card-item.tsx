"use client";

import { useCardModal } from "@/hooks/use-card-modal";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";

interface CardItemProps {
  data: Card;
  index: number;
}

const CardItem = ({ data, index }: CardItemProps) => {
  const onOpen = useCardModal((state) => state.onOpen);
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => onOpen(data.id)}
          className="trancate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
