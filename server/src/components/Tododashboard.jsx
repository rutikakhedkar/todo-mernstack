import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tododashboard = () => {
  const [showModel, setShowModel] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [labels, setLabels] = useState('');
  const [taskData, setTasksData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const addTask = () => {
    setShowModel(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/addtasks', { taskName, labels });
      console.log('Task added:', response.data);
      setShowModel(false);
      // Optionally fetch tasks again to update the task list
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error.response ? error.response.data : error.message);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/gettask');
      setTasksData(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); // Only run once when the component mounts

  useEffect(() => {
    const filteredData = taskData.filter(data => data.priority === labels); // Add return statement
    setFilteredData(filteredData);
  }, [labels]);

  return (
    <>
      <div className="max-w-xl mx-auto mt-10">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">TODO LIST</h1>
        <div className="flex justify-between items-center mb-6">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700"
            onClick={addTask}>
            Add Task
          </button>
          <select 
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg"
            value={labels} // Make sure to manage the select value
            onChange={(e) => setLabels(e.target.value)}
          >
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </div>
        <div className="space-y-4">
          <div className='bg-gray-100'>
            <ul className='bg-gray-200 p-1'>
              {(filteredData.length > 0 ? filteredData : taskData).map((task) => (
                <li key={task._id} className='m-2 bg-white p-2'>
                  {task.taskName} - {task.priority}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {showModel && (
          <form onSubmit={handleSubmit}>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Add Task</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskName">
                    Task Name
                  </label>
                  <input
                    type="text"
                    id="taskName"
                    placeholder="Enter task name"
                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    onChange={(e) => setTaskName(e.target.value)}
                    value={taskName}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
                    Priority
                  </label>
                  <select
                    id="priority"
                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={labels}
                    onChange={(e) => setLabels(e.target.value)}
                  >
                    <option value="">Select priority</option>
                    <option value="Completed">Completed</option>
                    <option value="Incomplete">Incomplete</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                    onClick={() => setShowModel(false)}
                  >
                    Cancel
                  </button>
                  <button type='submit'
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Tododashboard;
