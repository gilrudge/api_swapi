
const  apiJedi = require('../services/api.js');

let status = 200;

const rotaJediCtrl = async (req, res) => {
  const param = req.query.param;
  const {id} = req.params;
  // const {param , id} = req.query
  console.log(id);
  console.log(param);

  try {
    status = 200;
    const jedi = await apiJedi.get(`/${param}/${id}`);
    res.status(status).send(jedi.data);

    const jediData = jedi.data

   //Future function
    const arraysOfValues = Object.values(jedi.data).filter((item) => {
        if(Array.isArray(item)) return item      
      });
    const simpleArrayURLs = arraysOfValues.reduce((acc, item) => 
      acc.concat(item) ,[]); 
      
    const infoExtractionCollection = simpleArrayURLs.map((item) =>
      item.substr(21).split('/'));
      
    const objectEndPoint = infoExtractionCollection.reduce((acc, item) =>
      acc.concat({category:item[1], id:item[2]}) ,[]);
   //End Of future function

    // const accessFirstEndPoint = await Promise.all(objectEndPoint.map(async item => {
    //   const result = await apiJedi.get(`/${item.category}/${item.id}`);       
    //     return result.data.name ? result.data.name : result.data.title      
    //   }));  
    
    const accessFirstEndPoint = await Promise.all(objectEndPoint.map(async item => {
      const result = await apiJedi.get(`/${item.category}/${item.id}`);       
        return  {
                  category: item.category,
                  id: item.id,
                  name: result.data.name ? result.data.name : result.data.title
                }      
    }));    
  

    console.log(accessFirstEndPoint);

    // const updateObject = await Promise.all(objectEndPoint.reduce(async (acc, item) => {
    //   const result = await apiJedi.get(`/${item.category}/${item.id}`);
    //    return {
    //                       category:item.category,
    //                       id: item.id,
    //                       name:result.data.name ? result.data.name : result.data.title
    //                     };
    //     // return result.data.name ? result.data.name : result.data.title
      
    //   }));
    // console.log(updateObject);
    
    // console.log(objectEndPoint);///////

    // const dataType = "vehicles"
    // const filterByEndPoint = objectEndPoint.filter((item) =>
    // //  item.category == dataType
    //   item.category
    //  );
    
    //  console.log(filterByEndPoint)

    // const stringEndPoint = filterByEndPoint.reduce((acc, item) =>      
    // const stringEndPoint = objectEndPoint.reduce((acc, item) =>      -------------------------
    //          acc.concat("/")
    //             .concat(item.category)
    //             .concat('/')
    //             .concat(item.id)
    //             .concat(" ")
    // ,"");
    // const makeEndPoint = stringEndPoint.split(" ");

    // // console.log(makeEndPoint);  /////////   

    // const objectEndPointIncluded = makeEndPoint.reduce((acc, item)=>      
    //   acc.concat({endPoint:item}),[]);

    // // console.log(objectEndPointIncluded);  

    // const excludesEmptyItems = objectEndPointIncluded.filter( item => {
    //   if (!item.endPoint == '')
    //   return item
    // });

    // console.log(excludesEmptyItems)////-----------------------------------------------------------

    // const accessFirstEndPoint = await Promise.all(excludesEmptyItems.map(async item => {
    //   const result = await apiJedi.get(item.endPoint);
    //     return result
    // }));

    // console.log(accessFirstEndPoint)

    // const accessFinalData = await Promise.all(accessFirstEndPoint.map(async item => {
    //   return await item.data.name ? item.data.name : item.data.title           
               
    // }));
   
    // console.log(accessFinalData);
    // console.log(objectEndPoint);
    // console.log(objectEndPoint.category);

    // const fillData = accessFinalData.map(item => item);


    // console.log(fillData);

    
 

    
  } catch (error) {
    status = 404;
    res.status(status).send({
      message: "Erro de requisição!",
      error
    });    
  };
};



module.exports = rotaJediCtrl
