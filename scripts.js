// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const courseId = document.getElementById('courseId').value;
        const taskName = document.getElementById('taskName').value;
        const dueDate = document.getElementById('dueDate').value;
        const additionalDetails = document.getElementById('additionalDetails').value;

        const taskData = {
            courseId,
            taskName,
            dueDate,
            additionalDetails
        };

        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Clear form fields
            taskForm.reset();
            // Refresh task list
            fetchTasks(courseId);
        })
        .catch(error => console.error('Error:', error));
    });

    function fetchTasks(courseId) {
        fetch(`/api/courses/${courseId}/tasks`)
        .then(response => response.json())
        .then(tasks => {
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.innerHTML = `
                    <strong>Task Name:</strong> ${task.taskName}<br>
                    <strong>Due Date:</strong> ${task.dueDate}<br>
                    <strong>Additional Details:</strong> ${task.additionalDetails}<br><br>
                `;
                taskList.appendChild(taskItem);
            });
        })
        .catch(error => console.error('Error:', error));
    }
});
