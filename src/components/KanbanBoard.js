// src/components/KanbanBoard.js
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Design homepage layout' },
    'task-2': { id: 'task-2', content: 'Write blog post on React' },
    'task-3': { id: 'task-3', content: 'Fix login page bugs' },
    'task-4': { id: 'task-4', content: 'Update user profile page' },
    'task-5': { id: 'task-5', content: 'Conduct user testing' },
    'task-6': { id: 'task-6', content: 'Optimize website for SEO' },
    'task-7': { id: 'task-7', content: 'Implement authentication' },
    'task-8': { id: 'task-8', content: 'Set up database schema' },
    'task-9': { id: 'task-9', content: 'Create landing page' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-6', 'task-7'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-8', 'task-9'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const KanbanBoard = () => {
  const [state, setState] = useState(initialData);
  const [formData, setFormData] = useState({ content: '' });

  const handleChange = (e) => {
    setFormData({ content: e.target.value });
  };

  const handleAddTask = () => {
    const newTaskId = `task-${Object.keys(state.tasks).length + 1}`;
    const newTask = { id: newTaskId, content: formData.content };
    const newTasks = {
      ...state.tasks,
      [newTaskId]: newTask,
    };

    const newColumn = {
      ...state.columns['column-1'],
      taskIds: [...state.columns['column-1'].taskIds, newTaskId],
    };

    const newState = {
      ...state,
      tasks: newTasks,
      columns: {
        ...state.columns,
        'column-1': newColumn,
      },
    };

    setState(newState);
    setFormData({ content: '' });
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);
  };

  return (
    <div>
      <Box mb={2} display="flex" alignItems="center" justifyContent="center">
        <TextField
          name="content"
          label="New Task"
          value={formData.content}
          onChange={handleChange}
          sx={{ mr: 2 }}
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box display="flex" justifyContent="center">
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

            return (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided, snapshot) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{
                      backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                      padding: 2,
                      width: 300,
                      minHeight: 500,
                      margin: 2,
                      borderRadius: 2,
                    }}
                  >
                    <h3 style={{ textAlign: 'center', color: '#3f51b5' }}>{column.title}</h3>
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              userSelect: 'none',
                              padding: 2,
                              margin: '0 0 8px 0',
                              minHeight: '50px',
                              backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                              color: 'white',
                              borderRadius: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              ...provided.draggableProps.style,
                            }}
                          >
                            {task.content}
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            );
          })}
        </Box>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
