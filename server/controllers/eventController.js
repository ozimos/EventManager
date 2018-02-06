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
   * @param {any} res
   * @returns {obj} HTTP Response
   * @memberof Controller
   */
  createRow(req, res) {
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
    this.checkAvailability(dates, centerId, null)
      .then((result) => {
        if (result) {
          res.status(400).send(`Center is already booked from ${result.dates[0].getUTCMonth()} ${result.dates[0].getUTCDate()}  to ${result.dates[1].getUTCMonth()} ${result.dates[1].getUTCDate()} . Please select a different range of day(s)`);
        } else {
          super.createRow(req, res);
        }
      })
      .catch((error) => {
        res.status(402).json({
          message: error.name,
          error: error.message
        });
      });
  }

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {obj} HTTP Response
   * @memberof Controller
   */
  updateRow(req, res) {
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
      super.updateRow(req, res);
    } else {
      // get availability data from db for non updating metrics

      this.Model
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
                res.status(400).send(`Center is already booked from ${result.dates[0].getUTCMonth()} ${result.dates[0].getUTCDate()}  to ${result.dates[1].getUTCMonth()} ${result.dates[1].getUTCDate()} . Please select a different range of day(s)`);
              } else {
                super.updateRow(req, res);
              }
            });
        })
        .catch((error) => {
          res.status(402).json({
            message: error.name,
            error: error.message
          });
        });
    }
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