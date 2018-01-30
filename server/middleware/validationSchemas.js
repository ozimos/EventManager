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
  numOfDays: Joi.number().integer().min(1).max(4),
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
const login = Joi.object({
  userName: Joi.string().email().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
}).xor('userName', 'email:');
const postUsers = Joi.object({
  userName: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.ref('confirmPassword'),
  confirmPassword: Joi.string().strip().required(),
  isAdmin: Joi.boolean(),
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
  login,
  param
};