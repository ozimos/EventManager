const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = 400) => defaultResponse({
  error: message,
  status: statusCode,
}, statusCode);

/**
 *
 *
 * @class CenterController
 */
class CenterController {
  /**
   * Creates an instance of Center.
   * @param {any} Centers
   * @memberof Center
   */
  constructor(Centers) {
    this.Centers = Centers;
  }
  // CREATE
  /**
   *
   * @param {any} req
   * @returns {instance} Centers
   * @memberof Center
   */
  createCenter(req) {
    return this.Centers
      .create({
        ...req.body
      })
      .then(center => defaultResponse(center, 201))
      .catch(error => errorResponse(error.message));
  }
  // READ MANY
  /**
   *
   * @returns {instance} Centers
   * @memberof CenterController
   */
  getAllCenters() {
    return this.Centers
      .all()
      .then((centers) => {
        if (centers.length > 0) {
          return defaultResponse(centers);
        }
        return errorResponse('no centers available', 404);
      })
      .catch(error => errorResponse(error.message));
  }

  // READ ONE
  /**
   *
   *
   * @param {any} params
   * @returns {instance} Centers
   * @memberof CenterController
   */
  getCenterById(params) {
    return this.Centers.findOne({
      where: params,
    })
      .then((center) => {
        if (!center) {
          return errorResponse('Center not found', 404);
        }
        return defaultResponse(center);
      })
      .catch(error => errorResponse(error.message));
  }
  /**
   *
   *
   * @param {any} data
   * @param {any} params
   * @returns {instance} Centers
   * @memberof CenterController
   */
  updateCenter(data, params) {
    return this.Centers.update(data, {
      where: params,
    })
      .then(center => defaultResponse(center))
      .catch(error => errorResponse(error.message, 422));
  }
  /**
   *
   *
   * @param {any} params
   * @returns {instance} Centers
   * @memberof CenterController
   */
  deleteCenter(params) {
    return this.Centers
      .destroy({
        where: params,
      })
      .then(result => defaultResponse(result, 204))
      .catch(error => errorResponse(error.message, 422));
  }
}

export default CenterController;
