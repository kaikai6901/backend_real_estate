const BaseProject = require('../models/baseProjectModel')

const projectController = {
    getAllProjects: async (req, res) => {
      // Logic to fetch and return all project names
      try {
        
        const projects = await BaseProject.find({ n_news: { $gt: 10 } }, 'name project_id');
        res.json(projects)
      } catch (error) {
        console.error('Error fetching projects: ', error);
      res.status(500).json({ error: 'An error occurred' });
      }

    }
  };
  
module.exports = projectController;
  