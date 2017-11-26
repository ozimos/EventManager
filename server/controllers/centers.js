import centers from '../dummy/centers';

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
    const {
      body
    } = req;
    if ((!body.name) || (!body.cost) || (!body.capacity) || (!body.image) || (!body.location) || (!body.amenities) || (!body.eventType)) {
      return res.json({
        message: centers,
        error: true
      });
    }
    const newId = centers.length + 1;
    const name = body.name;
    const cost = body.cost;
    const capacity = body.capacity;
    const image = body.image;
    const location = body.location;
    const amenities = body.amenities;
    const eventType = body.eventType;

    centers.push({
      id: newId,
      name,
      cost,
      capacity,
      image,
      location,
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
    for (let i = 0; i < centers.length; i++) {
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

