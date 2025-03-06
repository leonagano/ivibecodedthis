async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const data = await response.json();
        const projectsGrid = document.getElementById('projectsGrid');
        
        // Sort projects to show featured ones first
        const sortedProjects = data.projects.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
        });
        
        sortedProjects.forEach(project => {
            const card = document.createElement('div');
            card.className = `project-card ${project.featured ? 'featured' : ''}`;
            
            // Extract domain for favicon
            const domain = new URL(project.url).hostname;
            
            card.innerHTML = `
                <div class="project-info">
                    <div class="project-header">
                        <img src="https://www.google.com/s2/favicons?domain=${domain}&sz=32" 
                             alt="${project.name} favicon" 
                             class="project-favicon">
                        <h3>${project.name}</h3>
                    </div>
                    <p class="project-description">${project.description}</p>
                    <div class="project-meta">
                        <span class="project-category">${project.category}</span>
                        <span class="project-tool">${project.toolsUsed}</span>
                    </div>
                    <div class="project-links">
                        <a href="https://twitter.com/${project.twitter.replace('@', '')}" target="_blank" class="project-link twitter">by @${project.twitter.replace('@', '')}</a>
                    </div>
                    <br/>
                    <div class="project-links">
                        <a href="${project.url}" target="_blank" class="project-link"><b>Visit Site</b></a>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadProjects); 