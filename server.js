import express from 'express';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB successfully.');
    await seedInitialData();
    await seedInitialServices();
    // Update all existing project colors to #ff3a00 to align with the design theme
    await Project.updateMany({}, { color: '#ff3a00' });
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schema
const projectSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  image: { type: String, required: true }, // Cloudinary URL or local path
  color: { type: String, default: '#ff3e00' },
  year: { type: String, required: true },
  role: { type: String, required: true },
  technology: { type: String, required: true },
  description: { type: String, default: '' },
  link: { type: String, default: '#' }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

const serviceRequestSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  clientPhone: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['Pendente', 'Lido', 'Respondido'], default: 'Pendente' }
}, { timestamps: true });

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

// Initial Data Seeding
async function seedInitialData() {
  try {
    const count = await Project.countDocuments();
    if (count === 0) {
      console.log('Seeding initial project data...');
      const initialProjects = [
        { id: 0, name: 'Moving Portraits', slug: 'moving-portraits', image: '/images/moving-portraits.png', color: '#ff3a00', year: '2026', role: 'Creative Director & WebGL', technology: 'Three.js, GLSL, GSAP', description: 'Um projeto experimental de WebGL que explora a interatividade com retratos tridimensionais físicos, integrando shaders personalizados e ScrollTrigger.', link: '#' },
        { id: 1, name: 'Issey Miyake SS25', slug: 'issey-miyake-ss25', image: '/images/issey-miyake.png', color: '#ff3a00', year: '2025', role: 'Interactive Engineer', technology: 'WebGL, Vanilla JS, CSS3D', description: 'Desenvolvimento de uma vitrine digital 3D imersiva para a coleção de primavera/verão 2025 da Issey Miyake, com transições físicas interativas.', link: '#' },
        { id: 2, name: 'Studies in Motion', slug: 'studies-in-motion', image: '/images/studies-in-motion.png', color: '#ff3a00', year: '2025', role: 'Motion Lead', technology: 'GSAP ScrollTrigger, Lenis', description: 'Uma exploração detalhada sobre os princípios de animação web contemporâneos utilizando rolagem suave Lenis e timelines avançadas do GSAP.', link: '#' },
        { id: 3, name: 'Ruby Campbell', slug: 'ruby-campbell', image: '/images/ruby-campbell.png', color: '#ff3a00', year: '2024', role: 'Fullstack Developer', technology: 'SvelteKit, Node.js, GSAP', description: 'Plataforma de portfólio de alta fidelidade desenvolvida para a modelo britânica Ruby Campbell, focando em performance impecável e design editorial.', link: '#' },
        { id: 4, name: 'Shaped by Earth', slug: 'shaped-by-earth', image: '/images/shaped-by-earth.png', color: '#ff3a00', year: '2024', role: '3D Developer', technology: 'Three.js, Blender, GSAP', description: 'Uma jornada visual e interativa em 3D sobre a erosão natural da terra, combinando modelos otimizados no Blender e interações em tempo real com Three.js.', link: '#' },
        { id: 5, name: 'Echoes in Light', slug: 'echoes-in-light', image: '/images/echoes-in-light.png', color: '#ff3a00', year: '2023', role: 'Creative Technologist', technology: 'Canvas2D, Custom WebAudio', link: '#' }
      ];
      await Project.insertMany(initialProjects);
      console.log('Initial projects seeded successfully.');
    }
  } catch (err) {
    console.error('Error seeding data:', err);
  }
}

// Initial Services Seeding
async function seedInitialServices() {
  try {
    // Delete existing services to reset to the new requested list
    await Service.deleteMany({});
    console.log('Cleared previous services from database.');

    const initialServices = [
      { title: 'Desenvolvimento Web', description: 'Criação de websites modernos e otimizados', order: 0 },
      { title: 'Emails Corporativos', description: 'Configuração e gestão de emails empresariais', order: 1 },
      { title: 'Criativos de Oferta', description: 'Design e copy de alta conversão para campanhas', order: 2 },
      { title: 'Tráfego Pago', description: 'Gestão de anúncios no Meta Ads, Google Ads, etc.', order: 3 },
      { title: 'Gestão de Conteúdos', description: 'Planeamento, criação e publicação de conteúdos', order: 4 },
      { title: 'SaaS (Software as a Service)', description: 'Desenvolvimento e hospedagem de aplicações na nuvem', order: 5 },
      { title: 'Registo de Domínio', description: 'Registo e manutenção de domínios nacionais e internacionais', order: 6 },
      { title: 'Suporte Técnico em TI', description: 'Assistência e manutenção de infraestrutura tecnológica', order: 7 }
    ];
    await Service.insertMany(initialServices);
    console.log('New services seeded successfully.');
  } catch (err) {
    console.error('Error seeding services data:', err);
  }
}

// Multer in-memory storage configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'No token provided. Access denied.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token.' });
    req.user = user;
    next();
  });
};

// API ROUTES

// Login Route
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  const envUsername = process.env.ADMIN_USERNAME || 'admin';
  const envPassword = process.env.ADMIN_PASSWORD || 'vibestudio2026';

  if (username === envUsername && password === envPassword) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token, message: 'Authentication successful.' });
  }

  return res.status(401).json({ message: 'Invalid username or password.' });
});

// Verify Session
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, username: req.user.username });
});

// SERVICES ROUTES

// Fetch all services
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching services.', error: err.message });
  }
});

// Create service
app.post('/api/services', authenticateToken, async (req, res) => {
  try {
    const { title, description, order } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required.' });
    }

    const newService = new Service({
      title,
      description: description || '',
      order: order || 0
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ message: 'Error creating service.', error: err.message });
  }
});

// Update service
app.put('/api/services/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description, order } = req.body;
    const service = await Service.findById(req.params.id);

    if (!service) return res.status(404).json({ message: 'Service not found.' });

    service.title = title || service.title;
    service.description = description !== undefined ? description : service.description;
    service.order = order !== undefined ? order : service.order;

    await service.save();
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: 'Error updating service.', error: err.message });
  }
});

// Delete service
app.delete('/api/services/:id', authenticateToken, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found.' });

    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting service.', error: err.message });
  }
});

// REQUESTS ROUTES

// Create a new request (Public)
app.post('/api/requests', async (req, res) => {
  try {
    const { clientName, clientEmail, clientPhone, service, message } = req.body;
    if (!clientName || !clientEmail || !clientPhone || !service || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newRequest = new ServiceRequest({
      clientName,
      clientEmail,
      clientPhone,
      service,
      message
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ message: 'Error submitting request.', error: err.message });
  }
});

// Fetch all requests (Authenticated)
app.get('/api/requests', authenticateToken, async (req, res) => {
  try {
    const requests = await ServiceRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching requests.', error: err.message });
  }
});

// Update request status (Authenticated)
app.put('/api/requests/:id', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !['Pendente', 'Lido', 'Respondido'].includes(status)) {
      return res.status(400).json({ message: 'Valid status is required.' });
    }

    const request = await ServiceRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found.' });

    request.status = status;
    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: 'Error updating request.', error: err.message });
  }
});

// Delete request (Authenticated)
app.delete('/api/requests/:id', authenticateToken, async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found.' });

    await ServiceRequest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Request deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting request.', error: err.message });
  }
});

// Fetch all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ id: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects.', error: err.message });
  }
});

// Create project
app.post('/api/projects', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { name, slug, color, year, role, technology, description, link } = req.body;
    
    if (!name || !slug || !year || !role || !technology) {
      return res.status(400).json({ message: 'All fields (except link/color) are required.' });
    }

    let imageUrl = '';
    
    if (req.file) {
      // Upload buffer to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'vibe_portfolio', resource_type: 'image' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = uploadResult.secure_url;
    } else {
      return res.status(400).json({ message: 'An image file is required.' });
    }

    // Determine new project ID
    const lastProject = await Project.findOne().sort({ id: -1 });
    const newId = lastProject ? lastProject.id + 1 : 0;

    const newProject = new Project({
      id: newId,
      name,
      slug,
      image: imageUrl,
      color: color || '#ff3e00',
      year,
      role,
      technology,
      description: description || '',
      link: link || '#'
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: 'Error creating project.', error: err.message });
  }
});

// Update project
app.put('/api/projects/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { name, slug, color, year, role, technology, description, link } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: 'Project not found.' });

    let imageUrl = project.image;

    if (req.file) {
      // Delete old image from Cloudinary if it is a Cloudinary URL
      if (project.image.includes('res.cloudinary.com')) {
        try {
          const publicId = 'vibe_portfolio/' + project.image.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.warn('Could not delete old image from Cloudinary:', err.message);
        }
      }

      // Upload new image buffer to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'vibe_portfolio', resource_type: 'image' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = uploadResult.secure_url;
    }

    project.name = name || project.name;
    project.slug = slug || project.slug;
    project.image = imageUrl;
    project.color = color || project.color;
    project.year = year || project.year;
    project.role = role || project.role;
    project.technology = technology || project.technology;
    project.description = description !== undefined ? description : project.description;
    project.link = link || project.link;

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error updating project.', error: err.message });
  }
});

// Delete project
app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found.' });

    // Delete image from Cloudinary if hosted there
    if (project.image.includes('res.cloudinary.com')) {
      try {
        const publicId = 'vibe_portfolio/' + project.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.warn('Could not delete image from Cloudinary:', err.message);
      }
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project.', error: err.message });
  }
});

// Serve static frontend files in production
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route to serve the React/Vite index.html for unknown client routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start Server
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
