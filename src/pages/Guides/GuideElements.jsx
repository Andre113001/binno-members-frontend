import React, { useState, useEffect } from 'react'

import { Sortable } from '../../components/DND/Sortable';

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
  } from "@dnd-kit/core";

  import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

import './Guides.css';

const GuideElements = (props) => {
    const { page } = props;
    const [pageDetail, setPageDetail] = useState();
    const [elements, setElements] = useState();
    console.log(elements);

    useEffect(() =>  {
        try {
            const loadPageData = async () => {
                const response = await fetch(`/api/program/page/${page}`)
                const data = await response.json()
                setElements(data.elements);
                setPageDetail(data.fetchPageResult[0]);
            }

            loadPageData();
        } catch (error) {   
            console.log('Error Fetching Data: ', error.message);
        }
    }, [page])

    // console.log(elements);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const saveFn = async () => {
        try {
          if (!elementsData) {
            alert('No elements data to save');
            return;
          }
    
          const response = await fetch(`/api/program/save-elements/${elementId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newFile: elementsData }),
          });
      
          if (response.ok) {
            alert('Elements saved successfully');
          } else {
            alert('Failed to save elements');
          }
        } catch (error) {
          alert('Error saving elements:', error);
        }
      };

    return (
        <div>
            <div className="page-title-lg">
                <div className="title">
                    <h1>{pageDetail?.program_pages_title}</h1>
                </div>
            </div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}   
            >   
                {elements ? (
                <SortableContext
                    items={elements?.map((element) => element.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {elements?.map((element) => (
                        <Sortable key={element.id} id={element.id} elements={element} />
                    ))}
                </SortableContext>
                ) : (
                    <p>Loading...</p>
                )}
            </DndContext>
        </div>
    );

    
    function handleDragEnd(event) {
        const { active, over } = event;
    
        if (active.id !== over.id) {
            setElements((items) => {
                const oldIndex = items.findIndex((element) => element.id === active.id);
                const newIndex = items.findIndex((element) => element.id === over.id);
    
                const updatedItems = arrayMove(items, oldIndex, newIndex);
    
                // Return the updated order
                return updatedItems;
            });
        }
    }
    
}

export default GuideElements
