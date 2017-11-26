import events from '../models/data';

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
   *  Get a single event
   * @param {obj} req
   * @param {obj} res
   * @returns {any} A single event
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
      message: 'Event not Found',
      error: true
    });
  }

  /**
   *
   *
   * Creates a new event
   * @param {obj} req
   * @param {obj} res
   * @returns {any} success, all events
   * @memberof eventController
   */
  static postEvent(req, res) {
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
   *  Update a Event
   * @param {obj} req
   * @param {obj} res
   * @returns {any} sucess, all events
   * @memberof eventController
   */
  static updateEvent(req, res) {
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
      message: 'Event not Found',
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
  static deleteEvent(req, res) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].id === parseInt(req.params.id, 10)) {
        events.splice(i, 1);
        return res.json({
          message: 'Event Deleted',
          error: false
        });
      }
    }
    return res.status(404).json({
      message: 'Event not Found',
      error: true
    });
  }
}
