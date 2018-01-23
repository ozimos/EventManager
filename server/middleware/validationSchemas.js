import Joi from 'joi';
//  for fields that return arrays
const arraySchema = Joi.array().items(Joi.string().required()).unique();

const updateEvent = Joi.object({
  name: Joi.string(),
  type: Joi.alternatives().try(arraySchema, Joi.string()),
  centerId: Joi.number().integer(),
  duration: Joi.number().integer(),
  startDate: Joi.date().iso(),
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
  id: Joi.number().integer().required()
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
