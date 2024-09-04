import React, { useState, FormEvent } from 'react';
import { GROUP } from 'src/server/schema';

const GroupForm: React.FC = () => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); 

    try {
      // Send a POST request to the server to create a new group
      const response = await fetch('/create-group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          group_name: groupName,
          description: description,
        }),
      });

      // Check if the response was successful
      if (response.ok) {
        const result = await response.json();
        setMessage(`Group created successfully! Group ID: ${result.GROUP.group_id}`);
        // Clear form inputs after successful submission
        setGroupName('');
        setDescription('');
      } else {
        setMessage('Failed to create group.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('An error occurred while creating the group.');
    }
  };

  return (
    <div>
      <h2>Create a New Group</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="groupName">Group Name:</label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create Group</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default GroupForm;
