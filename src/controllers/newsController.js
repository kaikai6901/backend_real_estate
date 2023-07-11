const New = require('../models/newModel')

const newsController = {
    getNearestDocuments: async (req, res) => {
      const longitude = req.query.longitude;
      const latitude = req.query.latitude;
      // Convert longitude and latitude to numbers
      const geocode = [parseFloat(longitude), parseFloat(latitude)];

      const pipelines = []

      const radius_filter = {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: geocode
          },
          "spherical":true,
          "distanceField":"distance",
        }
      }

      if (req.query.radius) {
        radius_filter['$geoNear'].maxDistance = parseInt(req.query.radius)
      } else {
        radius_filter['$geoNear'].maxDistance = 1000
      }

      pipelines.push(radius_filter)

      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

      const dateFilter = {
        $match: {
          published_at: { $gt: oneMonthAgo }
        }
      }
      pipelines.push(dateFilter)

      var is_square_filter = false
      const squareFilter = {
        $match: {
          square: {}
        }
      }
      if (req.query.min_square) {
        squareFilter['$match']['square']['$gt'] = parseInt(req.query.min_square)
        is_square_filter = true
      }
      if (req.query.max_square) {
        squareFilter['$match']['square']['$lt'] = parseInt(req.query.max_square)
        is_square_filter = true
      }

      if (is_square_filter) pipelines.push(squareFilter)

      var is_price_filter = false
      const priceFilter = {
        $match: {
          total_price: {}
        }
      }
      if (req.query.min_price) {
        priceFilter['$match']['total_price']['$gt'] = parseInt(req.query.min_price)
        is_price_filter = true
      }

      if (req.query.max_price) {
        priceFilter['$match']['total_price']['$lt'] = parseInt(req.query.max_price)
        is_price_filter = true
      }

      if(is_price_filter) pipelines.push(priceFilter)

      var is_sort = false
      sort_stage = {
        '$sort': {}

      }

      if (req.query.distance) {
        sort_stage['$sort'] = {
          'distance': parseInt(req.query.distance)
        }
        is_sort = true
      }
      if (req.query.total_price) {
        sort_stage['$sort'] = {
          'total_price': parseInt(req.query.total_price)
        }
        is_sort = true
      }
      if (req.query.square) {
        sort_stage['$sort'] = {
          'square': parseInt(req.query.square)
        }
        is_sort = true
      }

      if(is_sort) pipelines.push(sort_stage)
      
      pipelines.push({
        $limit: 20
      })

      try {
        console.log(pipelines)
        const results = await New.aggregate(pipelines)
        console.log(results)
        res.json(results)
      } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})
      }
    },
  };
  
module.exports = newsController;
  