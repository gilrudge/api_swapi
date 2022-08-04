
const  apiJedi = require('../services/api.js');

let status = 200;

const rotaJediCtrl = async (req, res) => {
  const param = req.query.param;
  const {id} = req.params;

  try {
    status = 200;
    const jedi = await apiJedi.get(`/${param}/${id}`);
  
    const arraysOfValues = Object.values(jedi.data).filter((item) => {
        if(Array.isArray(item)) return item      
    });    
    const simpleArrayURLs = arraysOfValues.reduce((acc, item) => 
      acc.concat(item) ,[]); 
      
    const infoExtractionCollection = simpleArrayURLs.map((item) =>
      item.substr(21).split('/'));
      
    const objectEndPoint = infoExtractionCollection.reduce((acc, item) =>
      acc.concat({category:item[1], id:item[2]}) ,[]);
     
    const getEndPointInfo = await Promise.all(objectEndPoint.map(async item => {
      const result = await apiJedi.get(`/${item.category}/${item.id}`);       
        return  {
                  category: item.category,
                  id: item.id,
                  name: result.data.name ? result.data.name : result.data.title
                }      
    }));

    const films = getEndPointInfo.filter(item => {
      if(item.category === 'films') return item      
    });
    const people = getEndPointInfo.filter(item => {
      if(item.category === 'people') return item      
    });
    const planets = getEndPointInfo.filter(item => {
      if(item.category === 'planets') return item      
    });
    const starships = getEndPointInfo.filter(item => {
      if(item.category === 'starships') return item      
    });
    const vehicles = getEndPointInfo.filter(item => {
      if(item.category === 'vehicles') return item      
    });
    const species = getEndPointInfo.filter(item => {
      if(item.category === 'species') return item      
    });

    const filmsName = films.map(item => item.name);
    const peopleName = people.map(item => item.name);
    const planetsName = planets.map(item => item.name);
    const starshipsName = starships.map(item => item.name);
    const vehiclesName = vehicles.map(item => item.name);
    const speciesName = species.map(item => item.name);    

    const jediArray = [jedi.data];
    
    const addInfos = jediArray.map(item => {

      if(item.films) item.films = filmsName
      
      if(item.people) item.people = peopleName
      
      if(item.residents) item.residents = peopleName
      
      if(item.characters) item.characters = peopleName
            
      if(item.starships) item.starships = starshipsName
      
      if(item.vehicles) item.vehicles = vehiclesName
      
      if(item.planets) item.planets = planetsName
      
      if(item.species) item.species = speciesName      
      
    });     
   
    res.status(status).send(jediArray);
    
  } catch (error) {
    status = 404;
    res.status(status).send({
      message: "Erro de requisição!",
      error
    });    
  };
};

module.exports = rotaJediCtrl
