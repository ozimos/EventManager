import {
  events
} from '../models/data';

export default {
  /**
   *
   *
   * Get all events
   * @param {obj} req
   * @param {obj} res
   * @returns {any} all events
   * @memberof eventController
   */
  getAllEvents(req, res) {
    return res.json({
      events,
      error: false
    });
  },

  /**
   *
   *
   *  Get a single event
   * @param {obj} req
   * @param {obj} res
   * @returns {any} A single event
   * @memberof eventController
   */
  getSingleEvent(req, res) {
    for (let i = 0; i < events.length; i += 1) {
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
  },

  /**
   *
   *
   * Creates a new event
   * @param {obj} req
   * @param {obj} res
   * @returns {any} success, all events
   * @memberof eventController
   */
  postEvent(req, res) {
    const formFields = ['name', 'type', 'centerId', 'duration', 'startDate', 'estimatedAttendance'];

    if (!formFields.every(element => Object.keys(req.body).includes(element))) {
      // return error if req body does not carry every field in formFields
      return res.json({

        message: events,
        error: true,
        required: formFields
      });
    }
    let newId = events.length + 1;
    if (events[events.length - 1].id === newId) {
      newId += 1;
    }
    const {
      name,
      type,
    } = req.body;

    const startDate = new Date(req.body.startDate);
    const duration = parseInt(req.body.duration, 10);
    const centerId = parseInt(req.body.centerId, 10);
    const estimatedAttendance = parseInt(req.body.estimatedAttendance, 10);

    events.push({
      id: newId,
      name,
      type,
      centerId,
      duration,
      startDate,
      estimatedAttendance
    });
    return res.json({
      message: 'success',
      error: false,
      events
    });
  },

  /**
   *
   *
   *  Update an Event
   * @param {obj} req
   * @param {obj} res
   * @returns {any} sucess, all events
   * @memberof eventController
   */
  updateEvent(req, res) {
    for (let i = 0; i < events.length; i += 1) {
      if (events[i].id === parseInt(req.params.id, 10)) {
        // Destructuring assignment to extract req.body fields
        const {
          centerId,
          duration,
          startDate,
          estimatedAttendance,
          ...rest
        } = req.body;

        const numItems = {
          centerId,
          duration,
          estimatedAttendance
        };

        Object.keys(numItems).forEach((item) => {
          if (numItems[item]) {
            events[i][item] = parseInt(numItems[item], 10);
          }
        });
        Object.keys(rest).forEach((element) => {
          events[i][element] = rest[element];
        });

        if (startDate) {
          events[i].startDate = new Date(startDate);
        }


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
  },

  /**
   *
   *
   * Delete an Event
   * @param {obj} req
   * @param {obj} res
   * @returns {any} success
   * @memberof eventController
   */
  deleteEvent(req, res) {
    for (let i = 0; i < events.length; i += 1) {
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
};
