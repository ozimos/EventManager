import {
  centers
} from '../models/data';

export default {
  /**
   *
   *
   * Get All Centers
   * @param {obj} req
   * @param {obj} res
   * @returns {any} all centers
   * @memberof centerController
   */
  getAllCenters(req, res) {
    return res.json({
      centers,
      error: false
    });
  },

  /**
   *
   *
   *  Get a single center
   * @param {obj} req
   * @param {obj} res
   * @returns {any} A single center
   * @memberof centerController
   */
  getSingleCenter(req, res) {
    for (let i = 0; i < centers.length; i += 1) {
      if (centers[i].id === parseInt(req.params.id, 10)) {
        return res.json({
          message: centers[i],
          error: false
        });
      }
    }
    return res.status(404).json({
      message: 'Center not Found',
      error: true
    });
  },

  /**
   *
   *
   * Creates a new center
   * @param {obj} req
   * @param {obj} res
   * @returns {any} success, all centers
   * @memberof centerController
   */
  postCenter(req, res) {
    const formFields = ['name', 'description', 'cost', 'capacity', 'country', 'state', 'lga', 'amenities', 'eventTypes'];


    if (!formFields.every(element => Object.keys(req.body).includes(element))) {
      // return error if req body does not carry every field in formFields
      return res.json({

        message: centers,
        error: true,
        required: formFields
      });
    }
    const newId = centers.length + 1;
    const {
      name,
      description,
      country,
      state,
      lga,
      amenities,
      eventTypes
    } = req.body;
    const cost = parseInt(req.body.cost, 10);
    const capacity = parseInt(req.body.capacity, 10);

    centers.push({
      id: newId,
      name,
      cost,
      description,
      capacity,
      location: {
        country,
        state,
        lga
      },
      amenities,
      eventTypes
    });
    return res.json({
      message: 'success',
      error: false,
      centers
    });
  },

  /**
   *
   *
   *  Update a center
   * @param {obj} req
   * @param {obj} res
   * @returns {any} sucess, all centers
   * @memberof centerController
   */
  updateCenter(req, res) {
    for (let i = 0; i < centers.length; i += 1) {
      if (centers[i].id === parseInt(req.params.id, 10)) {
        // Destructuring assignment to extract req.body fields
        const {
          country,
          state,
          lga,
          cost,
          capacity,
          ...rest
        } = req.body;
        // group location fields into single object
        const location = {
          country,
          state,
          lga
        };

        const numItems = {
          cost,
          capacity
        };

        Object.keys(location).forEach((item) => {
          if (location[item]) {
            centers[i].location[item] = location[item];
          }
        });

        Object.keys(numItems).forEach((item) => {
          if (numItems[item]) {
            centers[i][item] = parseInt(numItems[item], 10);
          }
        });

        Object.keys(rest).forEach((element) => {
          centers[i][element] = rest[element];
        });

        return res.json({
          message: 'Success',
          error: false,
          centers
        });
      }
    }

    return res.status(404).json({
      message: 'Center not Found',
      error: true
    });
  }
};
