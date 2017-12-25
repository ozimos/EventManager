import {
  centers
} from '../models/data.mjs';

export default {
  /**
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
   *  Get a single center
   * @param {obj} req
   * @param {obj} res
   * @returns {any} A single center
   * @memberof centerController
   */
  getSingleCenter(req, res) {
    for (let i = 0; i < centers.length; i += 1) {
      if (centers[i].id === req.params.id) {
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
   * Creates a new center
   * @param {obj} req
   * @param {obj} res
   * @returns {any} success, all centers
   * @memberof centerController
   */
  postCenter(req, res) {
    const newId = centers.length + 1;
    centers.push({
      id: newId,
      ...req.body
    });
    return res.json({
      message: 'success',
      error: false,
      centers
    });
  },

  /**
   *
   *  Update a center
   * @param {obj} req
   * @param {obj} res
   * @returns {any} sucess, all centers
   * @memberof centerController
   */
  updateCenter(req, res) {
    for (let i = 0; i < centers.length; i += 1) {
      if (centers[i].id === req.params.id) {
        // Destructuring assignment to extract req.body fields
        const {
          country,
          state,
          lga,
          ...rest
        } = req.body;
        // group location fields into single object
        const location = {
          country,
          state,
          lga
        };

        Object.keys(location).forEach((item) => {
          if (location[item]) {
            centers[i].location[item] = location[item];
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
