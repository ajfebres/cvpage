var express = require('express');
var router = express.Router();
const Project = require('../models/projects');
const Image = require('../models/images');
const {isAuth} = require('../helpers/auth');
const fs = require('fs-extra');


/* GET projects listing. */
router.get('/', async (req, res, next)=> {
  try{
    const projects = await Project.find();
    res.render('projects', {head: 'Portafolio',
                          projects});
  }catch(e){
    console.log(e);
  };
});

router.get('/view/:id', async (req, res, next)=>{
  try{
    const {_id, title, description} = await Project.findById(req.params.id);
    const images = await Image.find({projectId: _id});
    res.render('projectview', {head: title, _id, title, description, images});
  }catch(e){
    console.log(e)
  }; 
});

router.delete('/image/:id', async (req,res, next) =>{
  const image = await Image.findByIdAndDelete(req.params.id);
  await image.cloudinaryDestroy(image.public_id);
  res.redirect('/projects/edit/'+image.projectId._id);
});

router.get('/new', isAuth, (req, res)=>{
  res.render('projectform', {head: 'New Project'});
  }).post('/new', isAuth, async (req, res)=>{
    const {title, description} = req.body;
    const project = new Project({title, description});
    await project.save();
    req.files.forEach(async e => {
      // result = await cloudinary.v2.uploader.upload(e.path);
      // const image = new Image({imageURI: result.secure_url, projectId: project._id, public_id: result.public_id});
      const image = new Image({projectId: project._id});
      const {secure_url, public_id} = await image.cloudinarySave(e.path);
      image.imageURI = secure_url;
      image.public_id = public_id;
      await image.save();
      await fs.unlink(e.path);
    });
    res.redirect('/projects');
});

router.get('/edit/:id', isAuth, async (req, res, next)=>{
  try{
    const {_id, title, description} = await Project.findById(req.params.id);
    const images = await Image.find({projectId: _id});
    res.render('projectedit', {head: 'Edit '+title, _id, title, description, images});
  }catch(e){
    console.log(e)
  }; 
}).put('/edit/:id', isAuth, async (req, res, next)=>{
  const {title, description} = req.body;
  await Project.findByIdAndUpdate(req.params.id, {title, description});
  req.files.forEach(async e => {
    const image = new Image({projectId: req.params.id});
    const {secure_url, public_id} = await image.cloudinarySave(e.path);
    image.imageURI = secure_url;
    image.public_id = public_id;
    await image.save();
    await fs.unlink(e.path);
  });
  res.redirect('/projects/edit/'+req.params.id);
}).delete('/delete/:id', isAuth, async (req,res, next) =>{
  const images = await Image.find({projectId: req.params.id})
  images.forEach(async e => {
    await e.cloudinaryDestroy(e.public_id);
  });
  await Image.deleteMany({projectId: req.params.id});
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/projects');
});

module.exports = router;
