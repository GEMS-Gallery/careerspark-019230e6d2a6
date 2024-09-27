import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const jobList = document.getElementById('job-list');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const jobForm = document.getElementById('job-form');

  // Function to display jobs
  const displayJobs = (jobs) => {
    jobList.innerHTML = '';
    jobs.forEach(job => {
      const jobElement = document.createElement('div');
      jobElement.className = 'job-item';
      jobElement.innerHTML = `
        <h3>${job.title}</h3>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Description:</strong> ${job.description}</p>
        <p><strong>Requirements:</strong> ${job.requirements.join(', ')}</p>
      `;
      jobList.appendChild(jobElement);
    });
  };

  // Load all jobs on page load
  const loadJobs = async () => {
    const jobs = await backend.getAllJobs();
    displayJobs(jobs);
  };

  loadJobs();

  // Search functionality
  searchButton.addEventListener('click', async () => {
    const keyword = searchInput.value.trim();
    if (keyword) {
      const searchResults = await backend.searchJobs(keyword);
      displayJobs(searchResults);
    } else {
      loadJobs();
    }
  });

  // Add new job functionality
  jobForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('job-title').value;
    const company = document.getElementById('job-company').value;
    const description = document.getElementById('job-description').value;
    const requirements = document.getElementById('job-requirements').value.split(',').map(req => req.trim());

    await backend.addJob(title, company, description, requirements);
    jobForm.reset();
    loadJobs();
  });
});
