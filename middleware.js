let contador = 0;
function contt(req, res, next) {
  contador++;

  console.log(`Número de requisições: ${contador}`);

  return next();
}
function checkProjectExists (req, res, next){
  const project = projects.find(p => p.id == id);
  if (!project){
    return res.status(400).json({error: 'projeto nao existe'})
  }
  return next()
}


module.exports = {
  contt,
  checkProjectExists  
};