import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Sortable } from '../../components/DND/Sortable';
import AddElement from './GuideComponents/AddElement';
import useAccessToken from '../../hooks/useAccessToken';

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
import {
    Save,
    DeleteOutline,
    EditOutlined
} from '@mui/icons-material'

import { 
    Stack, 
    Button 
} from '@mui/material';


const GuideElements = (props) => {
    const { page, updateSaveStatus } = props;
    const [pageDetail, setPageDetail] = useState();
    const [elements, setElements] = useState();
    const [elementOption, setElementOption] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [editingElementId, setEditingElementId] = useState(null);
    const accessToken = useAccessToken();

    useEffect(() =>  {
        try {
            const loadPageData = async () => {
                const response = await fetch(`/api/program/page/${page}`,{
                    headers: {
                      Authorization: `Bearer ${accessToken}`
                    }
                });
                const data = await response.json()
                // console.log({"Elements": data[0], "PageData": data[1]});
                setElements(data[0]);
                setPageDetail(data[1][0]);
            }

            loadPageData();
        } catch (error) {   
            console.log('Error Fetching Data: ', error.message);
        }
    }, [page])

    const notifySaveStatus = (status) => {
        updateSaveStatus(status);
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleSave = async () => {
        console.log("Save", page);
        try {
            if (!elements) {
                alert('No elements data to save');
                return;
            }
    
            const response = await fetch(`/api/program/page/save/${page}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newFile: elements }),
            });
    
            if (response.ok) {
                alert('Elements saved successfully');
                notifySaveStatus(true);
            } else {
                alert('Failed to save elements');
                console.error('Save failed:', response.status, response.statusText);
                notifySaveStatus(false);
            }
        } catch (error) {
            console.error('Error saving elements:', error);
            alert('Error saving elements: See console for details');
            notifySaveStatus(false);
        }
    };

    const handleAddElement = async (option) => {
        const newElement = {
            id: uuidv4(), 
            type: option.type,
            attribute: option.attribute,
            content: option.content
        };

        console.log(newElement.attribute);
        setElements((prevElements) => [newElement, ...prevElements]);
        updateSaveStatus(false);
    };

    const handleDeleteElement = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this element?");
        
        if (confirmed) {
          setElements((prevElements) => prevElements.filter((element) => element.id !== id));
          updateSaveStatus(false);
        }
      };
          


    const handleEditElement = (id) => {
        alert("Edit:" + id);
      };
    
    return (
        <div>
            <div className="page-title-lg">
                <div className="title">
                    <h1>{pageDetail?.program_pages_title}</h1>
                </div>
                <Stack spacing={2} direction="row">
                    <div className="page-save-btn">
                        <Button 
                            startIcon={<Save />} 
                            variant='outlined'
                            onClick={() => handleSave(pageDetail.program_pages_id)}
                        >
                            Save
                        </Button>
                    </div>
                    <div className="page-add-btn"> {/* THIS SHOULD BE A DROP-DOWN */}
                        {/* <button>Add Element</button> */}
                        <AddElement onSelectOption={handleAddElement}/>
                    </div>
                </Stack>
            </div>
            <DndContext
                sensors={sensors}
                onDragStart={() => setIsDragging(true)}
                collisionDetection={closestCenter}
                onDragEnd={(event) => {
                    setIsDragging(false);
                    handleDragEnd(event);
                }} 
            >   
                {elements ? (
                <SortableContext
                    items={elements?.map((element) => element.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {elements?.map((element) => (
                        <div className='sortable' key={element.id}>
                            <Sortable id={element.id} elements={element} />
                            <div className={`edit-button${isDragging ? ' hidden' : ''}`} onClick={() => handleEditElement(element.id)}>
                                <EditOutlined />
                            </div>
                            <div className={`delete-button${isDragging ? ' hidden' : ''}`} onClick={() => handleDeleteElement(element.id)}>
                                <DeleteOutline />
                            </div>
                        </div>
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
                updateSaveStatus(false)
                // Return the updated order
                return updatedItems;
            });
        }
    }
    
}

export default GuideElements
