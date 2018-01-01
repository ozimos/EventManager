import events from '../models/events.js';

export default {
  /**
   *
   * Get all events
   * @param {obj} req
   * @param {obj} res
   * @returns {any} all events
   * @memberof eventController
   */
  getAllEvents(req, res) {
    return res.json({
      message: 'Success',
      events,
      error: false
    });
  },

  /**
   *
   *  Get a single event
   * @param {obj} req
   * @param {obj} res
   * @returns {any} A single event
   * @memberof eventController
   */
  getSingleEvent(req, res) {
    for (let i = 0; i < events.length; i += 1) {
      if (events[i].id === req.params.id) {
        return res.json({
          message: 'Success',
          event: events[i],
          error: false
        });
      }
    }
    return res.status(404).json({
      message: 'Event not Found',
      error: true
    });
  },

  /**
   *
   * Creates a new event
   * @param {obj} req
   * @param {obj} res
   * @returns {any} success, all events
   * @memberof eventController
   */
  postEvent(req, res) {
    let newId = events.length + 1;
    if (events[events.length - 1].id === newId) {
      newId += 1;
    }
    events.push({
      id: newId,
      ...req.body
    });
    return res.json({
      message: 'Success',
      event: events[events.length - 1],
      error: false,
    });
  },

  /**
   *
   *  Update an Event
   * @param {obj} req
   * @param {obj} res
   * @returns {any} success,  event
   * @memberof eventController
   */
  updateEvent(req, res) {
    for (let i = 0; i < events.length; i += 1) {
      if (events[i].id === req.params.id) {
        Object.keys(req.body).forEach((element) => {
          events[i][element] = req.body[element];
        });

        return res.json({
          message: 'Success',
          event: events[i],
          error: false,
        });
      }
    }
    return res.status(404).json({
      message: 'Event not Found',
      error: true
    });
  },

  /**
   *
   * Delete an Event
   * @param {obj} req
   * @param {obj} res
   * @returns {any} success
   * @memberof eventController
   */
  deleteEvent(req, res) {
    for (let i = 0; i < events.length; i += 1) {
      if (events[i].id === req.params.id) {
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
};
