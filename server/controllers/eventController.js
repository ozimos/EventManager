import Sequelize from 'sequelize';
import Controller from './controller';

const {
  Op
} = Sequelize;
/**
 *
 *
 * @class EventController
 */
class EventController extends Controller {
  /**
   *
   *
   * @param {any} req
   * @returns {obj} HTTP Response
   * @memberof Controller
   */
  createRow(req) {
    // extract availability metrics
    const {
      numOfDays,
      startDate,
      centerId
    } = req.body;
    const finishDate = new Date(startDate);
    finishDate.setUTCDate(finishDate.getUTCDate() + numOfDays);
    const dates = [startDate, finishDate];
    req.body.dates = dates;
    return this.checkAvailability(dates, centerId, null)
      .then((result) => {
        if (result) {
          return EventController.errorResponse(`Center is already booked from ${result.dates[0].getUTCMonth()} ${result.dates[0].getUTCDate()}  to ${result.dates[1].getUTCMonth()} ${result.dates[1].getUTCDate()} . Please select a different range of day(s)`);
        }

        return super.createRow(req);
      })
      .catch(error => EventController.errorResponse(error.message, 402));
  }

  /**
   *
   *
   * @param {any} req
   * @returns {obj} HTTP Response
   * @memberof Controller
   */
  updateRow(req) {
    const {
      id
    } = req.params;
    // extract availability metrics
    let {
      numOfDays,
      startDate,
      centerId
    } = req.body;
    // if no updates to availability fields then update db
    if (!(numOfDays || startDate || centerId)) {
      return super.updateRow(req);
    }
    // get availability data from db for non updating metrics

    return this.Model
      .findById(id).then((event) => {
        numOfDays = numOfDays || event.numOfDays;
        startDate = startDate || event.startDate;
        centerId = centerId || event.centerId;
        const finishDate = new Date(startDate);
        finishDate.setUTCDate(finishDate.getUTCDate() + numOfDays);
        const dates = [startDate, finishDate];
        req.body.dates = dates;
        this.checkAvailability(dates, centerId, id)
          .then((result) => {
            if (result) {
              return EventController.errorResponse(`Center is already booked from ${result.dates[0].getUTCMonth()} ${result.dates[0].getUTCDate()}  to ${result.dates[1].getUTCMonth()} ${result.dates[1].getUTCDate()} . Please select a different range of day(s)`);
            }
            return super.updateRow(req);
          });
      })
      .catch(error => EventController.errorResponse(error.message, 402));
  }
  /**
   *
   *
   * @param {any} dates
   * @param {any} centerId
   * @param {any} id
   * @returns {obj} Promise Event resolves to event instance or null
   * @memberof Controller
   */
  checkAvailability(
    dates,
    centerId,
    id
  ) {
    return this.Model
      .findOne({
        where: {
          centerId,
          dates: {
            [Op.overlap]: dates
          },
          id: {
            [Op.not]: id
          }
        }
      });
  }
}
export default EventController;