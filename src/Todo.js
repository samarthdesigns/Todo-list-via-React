import './Todo.css';
import React, { useState } from 'react';
import { DragDropContext , Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

let List = {
    Fields: [
        {
            id:uuidv4(),
            title:"Design",
        },
        {
            id:uuidv4(),
            title:"Development",
        },
        {
            id:uuidv4(),
            title:"Marketing",
        },
        {
            id:uuidv4(),
            title:"Human Resources",
        },
        {
            id:uuidv4(),
            title:"Dev Ops",
        },
    ], 
    Projects: [
        {
            id:uuidv4(),
            title:"Website",
        },
        {
            id:uuidv4(),
            title:"Application",
        },
        {
            id:uuidv4(),
            title:"Team Events",
        },
        {
            id:uuidv4(),
            title:"Internal Systems",
        },
        {
            id:uuidv4(),
            title:"Parties",
        },
    ],
}

function Todo() {

    const [reactList, updateList] = useState(List);
    
    function listUpdation (result){

        if(result.source.droppableId === result.destination.droppableId){
            
            let columnName = result.source.droppableId;
            let itemIndex = result.source.index;
            let newIndex = result.destination.index;

            const values = Array.from(List[columnName]);
            const [newValues] = values.splice(itemIndex, 1);
            values.splice(newIndex, 0, newValues);

            List[columnName] = values;

            updateList(List);

        }
        else{
            let columnName = result.source.droppableId;
            let newColumnName = result.destination.droppableId;
            let itemIndex = result.source.index;
            let newIndex = result.destination.index;

            const sourceValues = Array.from(List[columnName]);
            const destinationValues = Array.from(List[newColumnName]);

            const valueTransfered = sourceValues[itemIndex]

            sourceValues.splice(itemIndex, 1);
            destinationValues.splice(newIndex, 0, valueTransfered);

            List[columnName] = sourceValues;
            List[newColumnName] = destinationValues;

            updateList(List);

        }

    }

    return (

        <DragDropContext onDragEnd={listUpdation}>

            <div class="todo-area">

                <h1>TODO LIST</h1>

                <div class="lists-area">

                    {Object.keys(reactList).map((listName, i) => (

                        <Droppable droppableId={listName} index={i+1}>

                            {(provided) => (
                                <div
                                class ="list-box"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                >
                                <h1>{listName}</h1>

                                {List[listName].map((item,k) => (
                                    <Draggable draggableId={"draggable-"+ item.id} index={k} key={item.id}>
                                        {(provided) => (
                                            <div
                                            class ="list-option"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            >
                                            <p>{item.title}</p>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}

                                {provided.placeholder}

                                </div>
                            )}

                        </Droppable>

                    ))}

                </div>


            </div>

        </DragDropContext>

    );
  }
  
export default Todo;