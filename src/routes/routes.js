const express = require('express');
const apiJedi = require('../services/api.js');
const rotaJediCtrl = require('../controllers/controller');
const rotaPeopleCtrl = require('../controllers/controller');
const router = express.Router();


let status = 200;

router.get("/", (req, res) => {
  res.status(status).send({
    message: "Olá Jedi, que a força esteja com você!",
    status
  });
});

router.get("/rotajedi/id", rotaJediCtrl);

router.get("/:id", rotaPeopleCtrl);

// router.get("/rotajedi/:id", async (req, res) => {
//   const param = req.query.param;
//   const id = req.params.id;
//   console.log(id);
//   console.log(param);

//   try {
//     status:200;
//     const jedi = await apiJedi.get(`/${param}/${id}`);
//     res.status(status).send(jedi.data);    
    
    
//   } catch (error) {
//     status = 404;
//     res.status(status).send({
//       message: "Erro de requisição!",
//       error
//     })
    
//   }

// });


module.exports = router