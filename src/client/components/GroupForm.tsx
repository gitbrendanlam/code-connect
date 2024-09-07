import React, { useState, FormEvent } from 'react';
import axios from 'axios'; // To handle HTTP requests

const GroupForm: React.FC = () => {
  //State to manage form inputs
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [invites, setInvites] = useState<string[]>(['']);

  const handleClick = async () => {
    try {
      // Using fetch to call the backend
      const res = await fetch('/api/test', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log(JSON.stringify(data)); // Storing the response
    } catch (error) {
      console.error('Error calling the backend:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
  

    try {
      // Post data to the backend
      const response = await axios.post('/api/group-form', {
        group_name: groupName,
        group_description: groupDescription,
        invites,
      });

      // Handle successful submission
      console.log('Group created:', response.data);
      alert('Group created successfully!');
    } catch (error) {
      // Handle errors
      console.error('Error creating group:', error);
      alert('Failed to create group.');
    }
  };

  // Handle adding a new invite field
  const handleAddInvite = () => {
    setInvites([...invites, '']);
  };

  // Handle change in invite field
  const handleInviteChange = (index: number, value: string) => {
    const newInvites = [...invites];
    newInvites[index] = value;
    setInvites(newInvites);
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="groupName">Group Name:</label>
        <input
          type="text"
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          maxLength={255}
          required
        />
      </div>
      <div>
        <label htmlFor="groupDescription">Group Description:</label>
        <input
          type="text"
          id="groupDescription"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
          maxLength={255}
        />
      </div>
      <div>
        <label>Invite Users:</label>
        {invites.map((invite, index) => (
          <input
            key={index}
            type="text"
            value={invite}
            onChange={(e) => handleInviteChange(index, e.target.value)}
          />
        ))}
        <button type="button" onClick={handleSubmit}>
          Add Another Invite
        </button>
      </div>
      <button type="submit">Create Group</button>
    </form>

  
    <button type="button" onClick={() => handleClick() }>
          Add Another Invite
        </button>
   </div>
  );
};



export default GroupForm;
