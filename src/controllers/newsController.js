const New = require('../models/newModel')

const newsController = {
    getNearestDocuments: async (req, res) => {
      const { longitude, latitude } = req.query;
      // Convert longitude and latitude to numbers
      const geocode = [parseFloat(longitude), parseFloat(latitude)];
      console.log(geocode)
      console.log(req.query)
      
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

      try {
        const results = await New.aggregate([
          {
            $geoNear: {
              near: {
                type: 'Point',
                coordinates: geocode
              },
              "spherical":true,
              "distanceField":"DistanceKilometers",
              "distanceMultiplier":0.001
            }
          },
        //   {
        //     loc:{
        //         $near:{
        //             $geometry:{
        //               type:"Point",
        //               coordinates: geocode
        //           },
        //        }
        //     },
        //     published_at: { $gt: oneMonthAgo }
        // }
        //  },
          {
            $match: {
              published_at: { $gt: oneMonthAgo }
            }
          },
          {
            $limit: 20
          }
        ])
        console.log(results)
        res.json(results)
      } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})
      }
    },
  };
  
module.exports = newsController;
  