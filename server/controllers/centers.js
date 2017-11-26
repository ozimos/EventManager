import {
  centers
} from '../models/data';

export default class centerController {
  /**
   *
   *
   * Get All Centers
   * @param {obj} req
   * @param {obj} res
   * @returns {any} all centers
   * @memberof centerController
   */
  static getAllCenters(req, res) {
    return res.json({
      centers,
      error: false
    });
  }

  /**
   *
   *
   *  Get a single center
   * @param {obj} req
   * @param {obj} res
   * @returns {any} A single center
   * @memberof centerController
   */
  static getSingleCenter(req, res) {
    for (let i = 0; i < centers.length; i++) {
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
  }

  /**
   *
   *
   * Creates a new center
   * @param {obj} req
   * @param {obj} res
   * @returns {any} success, all centers
   * @memberof centerController
   */
  static postCenter(req, res) {
    const formFields = ['name', 'cost', 'capacity', 'image', 'country', 'state', 'lga', 'amenities', 'eventType'];


    if (!formFields.every(element => Object.keys(req.body).includes(element))) {
      return res.json({
        message: centers,
        error: true,
        required: Object.keys(req.body)
      });
    }
    const newId = centers.length + 1;
    const {
      name,
      image,
      country,
      state,
      lga,
      amenities,
      eventType
    } = req.body;
    const cost = parseInt(req.body.cost, 10);
    const capacity = parseInt(req.body.capacity, 10);

    centers.push({
      id: newId,
      name,
      cost,
      capacity,
      image,
      location: {
        country,
        state,
        lga
      },
      amenities,
      eventType
    });
    return res.json({
      message: 'success',
      error: false,
      centers
    });
  }

  /**
   *
   *
   *  Update a center
   * @param {obj} req
   * @param {obj} res
   * @returns {any} sucess, all centers
   * @memberof centerController
   */
  static updateCenter(req, res) {
    for (let i = 0; i < centers.length; i + 1) {
      if (centers[i].id === parseInt(req.params.id, 10)) {
        centers[i].name = req.body.name || centers[i].name;
        centers[i].location = req.body.location || centers[i].location;
        centers[i].facilities = req.body.facilities || centers[i].facilities;
        centers[i].description = req.body.description || centers[i].description;

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
}
