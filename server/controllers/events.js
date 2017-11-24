import events from '../dummy/events';

export default class eventController {
  /**
   *
   *
   * Get all events
   * @param {obj} req
   * @param {obj} res
   * @returns {any} all events
   * @memberof eventController
   */
  static getAllEvents(req, res) {
    return res.json({
      events,
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
   * @memberof eventController
   */
  static getSingleEvent(req, res) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].id === parseInt(req.params.id, 10)) {
        return res.json({
          message: events[i],
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
   * @returns {any} success, all events
   * @memberof eventController
   */
  static postCenter(req, res) {
    if ((!req.body.name) || (!req.body.location) || (!req.body.facilities)) {
      return res.json({
        message: events,
        error: true
      });
    }
    const newId = events.length + 1;
    const name = req.body.name;
    const location = req.body.location;
    const facilities = req.body.facilities;
    const description = req.body.description;

    events.push({
      id: newId,
      name,
      location,
      facilities,
      description
    });
    return res.json({
      message: 'success',
      error: false,
      events
    });
  }

  /**
   *
   *
   *  Update a center
   * @param {obj} req
   * @param {obj} res
   * @returns {any} sucess, all events
   * @memberof eventController
   */
  static updateCenter(req, res) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].id === parseInt(req.params.id, 10)) {
        events[i].name = req.body.name || events[i].name;
        events[i].location = req.body.location || events[i].location;
        events[i].facilities = req.body.facilities || events[i].facilities;
        events[i].description = req.body.description || events[i].description;

        return res.json({
          message: 'Success',
          error: false,
          events
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
   * Delete an Event
   * @param {obj} req
   * @param {obj} res
   * @returns {any} success
   * @memberof eventController
   */
  static deleteCenter(req, res) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].id === parseInt(req.params.id, 10)) {
        events.splice(i, 1);
        return res.json({
          message: 'Center Deleted',
          error: false
        });
      }
    }
    return res.status(404).json({
      message: 'Center not Found',
      error: true
    });
  }
}
