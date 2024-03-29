// Import the useState hook
import React, { useState, useEffect, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Sortable } from '../../components/DND/Sortable';
import AddElement from './GuideComponents/AddElement';
import useAccessToken from '../../hooks/useAccessToken';
import useHttp from '../../hooks/http-hook';
import useCustomModal from '../../hooks/useCustomModal';

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
    Button,
    Snackbar,
    Alert
} from '@mui/material';

import axios from 'axios';

const GuideElements = (props) => {
    const { page, updateSaveStatus } = props;
    const { handleClose, handleOpen, CustomModal } = useCustomModal();
    const [pageDetail, setPageDetail] = useState();
    const [elements, setElements] = useState([]);
    const [elementOption, setElementOption] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [editingElementId, setEditingElementId] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(""); // Track edited title
    const [editingTitle, setEditingTitle] = useState(false); // Track whether title is being edited
    const accessToken = useAccessToken();
    const [closeModal, setCloseModal] = useState(false);
    const { sendRequest, isLoading } = useHttp();

    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for managing Snackbar open/close
    const [snackbarMessage, setSnackbarMessage] = useState(''); // State for managing Snackbar message
    const [snackbarStatus, setSnackbarStatus] = useState('error');
    const [passContent, setPassContent] = useState('');
    const [selectedId, setSelectedID] = useState();
 
    useEffect(() => {
        try {
            const loadPageData = async () => {
                const res = await sendRequest({
                    url: `${import.meta.env.VITE_BACKEND_DOMAIN}/programs/page/${page}`,
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                setPageDetail(res);
                setElements(res.elements);
                setEditedTitle(res.program_pages_title); // Set initial title value
            }
            loadPageData();
        } catch (error) {
            console.log('Error Fetching Data: ', error.message);
        }
    }, [page])
    
    const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
      };

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

    const handleDeletePage = async (id) => {
        const res = await sendRequest({
            url: `${import.meta.env.VITE_BACKEND_DOMAIN}/programs/delete/page/${id}`
        });
        if (res.message === 'Page deleted successfully') {
            // Show Snackbar for failed deletion
            setSnackbarStatus('sucess');
            setSnackbarMessage('Page Deleted Sucessfully');
            setSnackbarOpen(true);
            handleClose();
            window.location.reload();
        } else {
            // Show Snackbar for failed deletion
            setSnackbarStatus('error');
            setSnackbarMessage('Failed to delete page');
            setSnackbarOpen(true);
        }
    }

    const handleSave = async () => {
        try {
            if (!elements) {
                // Show Snackbar for empty elements data
                setSnackbarMessage('No elements data to save');
                setSnackbarOpen(true);
                return;
            }

            const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/programs/page/save/${page}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newFile: elements }),
            });

            if (response.ok) {
                // Show Snackbar for successful save
                setSnackbarStatus('success');
                setSnackbarMessage('Page saved successfully');
                setSnackbarOpen(true);
                notifySaveStatus(true);
            } else {
                // Show Snackbar for failed save
                setSnackbarStatus('error');
                setSnackbarMessage('Failed to save page');
                setSnackbarOpen(true);
                // console.error('Save failed:', response.status, response.statusText);
                notifySaveStatus(false);
            }
        } catch (error) {
            // Show Snackbar for error saving elements
            setSnackbarStatus('error');
            setSnackbarMessage('Failed to save page');
            setSnackbarOpen(true);
            notifySaveStatus(false);
        }
    };

    const handleCoverPhotoFileChange = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file_path', 'guide-page-pics');
            formData.append('image', file);
    
            const imageRes = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/images/upload`, {
                method: 'POST',
                body: formData,
            });
    
            if (imageRes.ok) {
                const data = await imageRes.json();
                console.log('File uploaded successfully:', data.filePath);
                const newElement = {
                    id: uuidv4(),
                    type: "img",
                    attributes: `src=\"${import.meta.env.VITE_BACKEND_DOMAIN}/images?filePath=guide-page-pics/${data.filePath}\" class=\"element_img\"  style=\"max-width: '400px'\"`,
                    content: ''
                };
                setElements((prevElements) => [newElement, ...prevElements]);
                // Handle success here
            } else {
                console.error('Failed to upload file:', imageRes.status, imageRes.statusText);
                // Handle error here
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle error here
        }
    }
    

    const handleAddYoutubeEmbed = async (code) => {
        try {
            if (!code) {
                alert('Invalid YouTube video code');
                return;
            }

            const embedCode = `<iframe class="element_iframe" title="YouTube Video" width="1300" height="720" src="https://www.youtube.com/embed/${code}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            const newElement = {
                code: code,
                id: uuidv4(),
                type: "iframe",
                attributes: embedCode,
                content: ''
            };

            console.log(newElement);
            // setElements((prevElements) => [newElement, ...prevElements]);
            // updateSaveStatus(false);
        } catch (error) {
            console.error('Error adding YouTube embed:', error);
            alert('Error adding YouTube embed: See console for details');
        }
    };

    const handleAddElement = async (option) => {
        const newElement = {
            id: uuidv4(),
            type: option.type,
            attributes: option.attributes,
            content: option.content
        };

        // Check if elements is empty
        if (elements.length === 0) {
            setElements([newElement]); // If elements is empty, set it to an array containing only the new element
        } else {
            setElements((prevElements) => [newElement, ...prevElements]); // If elements is not empty, prepend the new element
        }

        updateSaveStatus(false);
    };

    const handleDeleteElement = async (id) => {
            setElements((prevElements) => prevElements.filter((element) => element.id !== id));
            updateSaveStatus(false);
            const data = elements.filter((element) => element.id === id);
    
            if (data[0].type === 'img') {
                const filePath = data[0].attributes.split('filePath=')[1].split('"')[0];
                
                const deleteImageRes = await axios.get(`${import.meta.env.VITE_BACKEND_DOMAIN}/images/delete?filePath=${filePath}`);    
            } 
    };

    const handleEditElement = (id) => {
        setEditMode(true);
        setEditingElementId(id);
    };

    const handleTitleChange = (event) => {
        setEditedTitle(event.target.value);
    }

    const handleToggleEditTitle = () => {
        setEditingTitle(!editingTitle); // Toggle editing mode for title
    }

    const handleSaveTitle = async () => {
        setPageDetail(prevState => ({
            ...prevState,
            program_pages_title: editedTitle
        }));

        const res = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/programs/change_title`, {
            pageProgramId: pageDetail.program_pages_id,
            newPageTitle: editedTitle
        })

        if (res.data === true) {
            window.location.reload();
        }

        // setEditingTitle(!editingTitle);
    }

    const handleDiscardTitle = () => {
        setEditedTitle(pageDetail.program_pages_title); // Reset editedTitle to original title
        setEditingTitle(!editingTitle);
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
            >
            <Alert
                severity={snackbarStatus}
            >
                {snackbarMessage}
            </Alert>
            </Snackbar>

            <CustomModal
                handleOpen={handleOpen}
                handleClose={handleClose}
                content = {
                    <Fragment>
                        <center>
                            <div className="modal-content">
                                <h1>Delete This Page?</h1>
                                <h3>Are you sure to delete this Page?</h3>
                                <div className="modal-button">
                                    <Button
                                    sx={{
                                        height: "80px",
                                        background: "#FF7A00",
                                        border: "1px solid #FF7A00",
                                        width: "280px",
                                        borderRadius: "10px",
                                        "&:hover": {
                                        background: "#FF7A00",
                                        },
                                        color: "#fff",
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                    }}
                                    onClick={() => {
                                        handleDeletePage(selectedId);
                                    }}
                                    disabled={isLoading}
                                    >
                                        Confirm
                                    </Button>
                                    <Button
                                    sx={{
                                        height: "80px",
                                        border: "1px solid #000",
                                        width: "280px",
                                        borderRadius: "10px",
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        color: "#000",
                                    }}
                                    onClick={handleClose}
                                    disabled={isLoading}
                                    >
                                    Cancel
                                    </Button>
                                </div>
                            </div>
                        </center>
                    </Fragment>
                }
            />
            {pageDetail && ( // Check if pageDetail exists
                <div className="page-title-lg">
                    <div className="title">
                        {editingTitle ? ( // Use editingTitle state to conditionally render input or h1
                            <div>
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={handleTitleChange}
                                />
                                <Button onClick={handleSaveTitle}>Save</Button>
                                <Button onClick={handleDiscardTitle}>Discard</Button>
                            </div>
                        ) : (
                            <>
                                <h1 contentEditable={true}>{pageDetail.program_pages_title}</h1>
                                <Button onClick={handleToggleEditTitle}>Edit</Button>
                            </>
                        )} {/* Toggle editing mode button */}
                    </div>
                    <Stack spacing={2} direction="row">
                        <div>
                            <Button
                                onClick={() => {
                                    // handleDeletePage(pageDetail.program_pages_id);
                                    setSelectedID(pageDetail.program_pages_id);
                                    handleOpen();
                                }}
                            >
                                <DeleteOutline />
                            </Button>
                        </div>
                        <div className="page-save-btn">
                            <Button
                                startIcon={<Save />}
                                variant='outlined'
                                onClick={() => handleSave(pageDetail.program_pages_id)}
                            >
                                Save
                            </Button>
                        </div>
                        <div className="page-add-btn">
                            <AddElement onSelectOption={handleAddElement} onHandleImage={handleCoverPhotoFileChange} onYoutubeEmbed={handleAddYoutubeEmbed} />
                        </div>
                    </Stack>
                </div>
            )}
            <DndContext
                sensors={sensors}
                onDragStart={() => setIsDragging(true)}
                collisionDetection={closestCenter}
                onDragEnd={(event) => {
                    setIsDragging(false);
                    handleDragEnd(event);
                }}
            >
                {elements && elements.length > 0 ? (
                    <SortableContext
                        items={elements?.map((element) => element.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {elements?.map((element) => (
                            <div className='sortable' key={element.id}>
                                <Sortable
                                    id={element.id}
                                    editingId={editingElementId}
                                    elements={element}
                                    editMode={handleEditElement} // Pass the editing function
                                    setEditingElementId={setEditingElementId}
                                    setElements={setElements}
                                    allElements={elements}
                                />
                                {/* <div className={`edit-button${isDragging ? ' hidden' : ''}`} onClick={() => handleEditElement(element.id)}>
                                    <EditOutlined />
                                </div> */}
                                <div className={`delete-button${isDragging ? ' hidden' : ''}`} onClick={() => handleDeleteElement(element.id)}>
                                    <DeleteOutline />
                                </div>
                            </div>
                        ))}
                    </SortableContext>
                ) : (
                    <p>No elements yet</p>
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

export default GuideElements;
