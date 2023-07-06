const New = require('../models/newModel');

const summaryController = {
  getPriceByDate: async (req, res) => {
    try {
      // Calculate the date range for the past 2 months
      const currentDate = new Date();
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(currentDate.getMonth() - 12);

      // Aggregate pipeline to calculate average price_per_m2 by date
      const pipeline = [
        {
          $match: {
            published_at: { $gte: twoMonthsAgo, $lte: currentDate },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m', date: '$published_at' },
            },
            averagePrice: { $avg: '$price_per_m2' },
          },
        },
        { $sort: { _id: 1 } }, // Sort by date in ascending order
      ];

      // Execute the aggregation query
      const result = await New.aggregate(pipeline);
      
      res.json(result);
    } catch (error) {
      console.error('Error fetching price by date:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
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

      res.json(dataByDistrict);
    } catch (error) {
      console.error('Error fetching price by district:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
  };
  
module.exports = summaryController;
  