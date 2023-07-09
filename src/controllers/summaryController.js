const New = require('../models/newModel');

const BaseProject = require('../models/baseProjectModel')
const summaryController = {
  getPriceByDistrict: async (req, res) => {
    try {
      const pipeline = [
        {
          $group: {
            _id: '$district',
            averagePrice: { $avg: '$price_per_m2' },
          },
        },
      ];

      const result = await New.aggregate(pipeline);
    
      const dataByDistrict = {
        district: [],
        price_per_m2: [],
      };

      result.forEach((item) => {
        dataByDistrict.district.push(item._id);
        dataByDistrict.price_per_m2.push(item.averagePrice);
      });
      console.log(dataByDistrict)
      res.json(dataByDistrict);
    } catch (error) {
      console.error('Error fetching price by district:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  getPriceAvgMonth: async(req, res) => {
      console.log("alo")

      try {
        // Get the current month's average price
        const currentMonth = new Date();
        const currentResults = await New.aggregate([
          {
            $match: {
              price_per_m2: { $exists: true },
              published_at: {
                $gte: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1),
                $lt: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
              }
            }
          },
          {
            $group: {
              _id: null,
              average_price_per_m2: { $avg: '$price_per_m2' }
            }
          }
        ]);

        console.log(currentResults)
        const currentAveragePrice = currentResults[0].average_price_per_m2;
    
        // Get the average price of the previous month
        const previousMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
        const previousResults = await New.aggregate([
          {
            $match: {
              price_per_m2: { $exists: true },
              published_at: {
                $gte: new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1),
                $lt: new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 1)
              }
            }
          },
          {
            $group: {
              _id: null,
              average_price_per_m2: { $avg: '$price_per_m2' }
            }
          }
        ]);
        const previousAveragePrice = previousResults[0].average_price_per_m2;
    
        // Get the average price of two months before
        const twoMonthsBefore = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 2);
        const twoMonthsResults = await New.aggregate([
          {
            $match: {
              price_per_m2: { $exists: true },
              published_at: {
                $gte: new Date(twoMonthsBefore.getFullYear(), twoMonthsBefore.getMonth(), 1),
                $lt: new Date(twoMonthsBefore.getFullYear(), twoMonthsBefore.getMonth() + 1, 1)
              }
            }
          },
          {
            $group: {
              _id: null,
              average_price_per_m2: { $avg: '$price_per_m2' }
            }
          }
        ]);
        const twoMonthsAveragePrice = twoMonthsResults[0].average_price_per_m2;
    
        // Calculate the percentage change
        const priceChange = currentAveragePrice - previousAveragePrice;
        const percentageChange = (priceChange / previousAveragePrice) * 100;

        const priceChangeTwoMonth = currentAveragePrice - twoMonthsAveragePrice;
        const percentageChangeTwoMonth = (priceChangeTwoMonth / twoMonthsAveragePrice) * 100;
        console.log(currentAveragePrice)
        res.json(
          {
            'current': currentAveragePrice,
            'changeOneMonthBefore': percentageChange,
            'changeTwoMonth': percentageChangeTwoMonth
          }
        )

      } catch (error) {
      console.error('Error fetching price by month:', error);
        res.status(500).json({ error: 'An error occurred' });
      }  
  },

  getNumberNewsByDistrict: async(req, res) => {
    try {
      const oneMonthAgo = new Date()
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

      const countByDistrict = await New.aggregate([
        {
          $match: {
            published_at: { $gt: oneMonthAgo }
          }
        },
        {
          $group: {
            _id: '$district',
            count: { $sum: 1 }
          }
        }
      ])

      res.json(countByDistrict)
    } catch (err) {
      console.error(err);
      res.status(500).json({'error': 'Internal server error'})
    }
  },

  getPricePerDistrict: async (req, res) => {
    try {

      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const result = await New.aggregate(
        [
          {
            $match: {
              published_at: { $gte: oneMonthAgo },
            },
          },
          {
            $group: {
              _id: '$district',
              average_price_per_m2: { $avg: '$price_per_m2' },
              count: { $sum: 1 },
            },
          },
        ]
      )
      res.json(result)

    } catch (error) {
      console.error(error)
      res.status(500).json({error: 'An error occurred'})
    }
  },

  getListProject: async (req, res) => {
    try {
      const results = await BaseProject.find(
        {}, 
        { _id: 0, name: 1, avg_price: 1, avg_square: 1, n_news: 1, project_id: 1 }
      ).sort({n_news: -1})
      .limit(10)
      
      res.json(results)
    } catch (error) {
      res.status(500).json({error: 'An error occurred'})
    }
  },

  getListNews: async (req, res) => {
    try {
      const results = await New.find(
        {}, 
        { _id: 0, title: 1, total_price: 1, price_per_m2: 1, square: 1, news_url: 1, address: 1, news_id: 1}
      ).sort({published_at: -1})
      .limit(10)
      
      res.json(results)
    } catch (error) {
      res.status(500).json({error: 'An error occurred'})
    }
  }


};

  
module.exports = summaryController;
  