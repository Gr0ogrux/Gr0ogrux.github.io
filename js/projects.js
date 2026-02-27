const username = 'Gr0ogrux';
const url = `https://api.github.com/users/${username}/repos`;

fetch(url)
  .then(response => response.json()) 
  .then(data => {

    const starredProjects = data.filter(repo => repo.stargazers_count > 0);


    if (starredProjects.length === 0) {
        displayProjects(data); 
    } else {
        displayProjects(starredProjects);
    }
  })
  .catch(error => console.error('Error fetching data:', error));

function displayProjects(projects) {
    const container = document.getElementById('project-list');
    container.innerHTML = ''; 

    projects.forEach(repo => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        projectCard.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description provided.'}</p>
            <div class="project-meta">
                <span>⭐ ${repo.stargazers_count}</span>
                ${repo.language ? `<span> ● ${repo.language}</span>` : ''}
            </div>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;

        container.appendChild(projectCard);
    });
}