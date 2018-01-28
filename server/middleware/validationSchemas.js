import Joi from 'joi';
//  for fields that return arrays
const arraySchema = Joi.array().items(Joi.string().required()).unique();

const updateEvent = Joi.object({
  name: Joi.string(),
  type: Joi.alternatives().try(arraySchema, Joi.string()),
  centerId: Joi.string().guid({
    version: [
      'uuidv4'
    ]
  }),
  numOfDays: Joi.number().integer().greater(0),
  startDate: Joi.date().iso().min('now'),
  estimatedAttendance: Joi.number().integer()
});
const updateCenter = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  cost: Joi.number().integer(),
  capacity: Joi.number().integer(),
  country: Joi.string(),
  state: Joi.string(),
  lga: Joi.string(),
  amenities: Joi.alternatives().try(arraySchema, Joi.string()),
  eventType: Joi.alternatives().try(arraySchema, Joi.string()),
});
const postUsers = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  isAdmin: Joi.boolean(),
}).options({
  presence: 'required'
});
const param = Joi.object({
  id: Joi.string().guid({
    version: [
      'uuidv4'
    ]
  })
});

export default {
  updateEvent,
  postEvent: updateEvent.options({
    presence: 'required'
  }),
  updateCenter,
  postCenter: updateCenter.options({
    presence: 'required'
  }),
  postUsers,
  param
};