const express = require('express');
const helmet = require('helmet');

const projectsRoutes = require('../data/projects/projectsRoutes');
const actionsRoutes = require('../data/actions/actionsRoutes');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/actions', actionsRoutes);
server.use('/api/projects', projectsRoutes);

server.get('/', async (req, res) => {
  res.send('\n\t========== Server Running ==========\n');
});

module.exports = server;
