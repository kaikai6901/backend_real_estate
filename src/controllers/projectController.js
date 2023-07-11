const BaseProject = require('../models/baseProjectModel')
const New = require('../models/newModel')
const projectController = {
    getAllProjects: async (req, res) => {
      // Logic to fetch and return all project names
      try {
        
        const projects = await BaseProject.find({ n_news: { $gt: 10 } }, 'name project_id loc');
        res.json(projects)
      } catch (error) {
        console.error('Error fetching projects: ', error);
        res.status(500).json({ error: 'An error occurred' });
      }

    },

    getNewsByProject: async (req, res) => {
      try {
        const project_id = parseInt(req.params.project_id);
        console.log(project_id)
        const project = await BaseProject.findOne({project_id: project_id});
        console.log(project)
        const name = project.name
        const news = await New.find({'base_project.name': name})
        res.json(news)
      } catch (err) {
        console.error('Error fetching projects: ', err);
        res.status(500).json({ error: 'An error occurred' });
      }
    }
};
  
module.exports = projectController;
  