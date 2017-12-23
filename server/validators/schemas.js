import {
  Joi
} from 'celebrate';

const arraySchema = Joi.array().items(Joi.string().required()).unique();

const baseEventSchema = Joi.object({
  body: Joi.object({
    name: Joi.string(),
    type: Joi.alternatives().try(arraySchema, Joi.string()),
    centerId: Joi.string().regex(/^[0-9a-fA-F]$/),
    duration: Joi.number().integer(),
    startDate: Joi.date(),
    estimatedAttendance: Joi.number().integer()
  })
});
const baseCenterSchema = Joi.object({
  body: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    cost: Joi.number().integer(),
    capacity: Joi.number().integer(),
    country: Joi.string(),
    state: Joi.string(),
    lga: Joi.string(),
    amenities: Joi.alternatives().try(arraySchema, Joi.string()),
    eventTypes: Joi.alternatives().try(arraySchema, Joi.string()),

  })
});

const paramSchema = {
  params: Joi.object({
    param: Joi.string().regex(/^[0-9a-fA-F]$/)
  })
};

export default {
  updateEventSchema: baseEventSchema.keys(paramSchema),
  postEventSchema: baseEventSchema.options({
    presence: 'required'
  }),
  updateCenterSchema: baseCenterSchema.keys(paramSchema),
  postCenterSchema: baseCenterSchema.options({
    presence: 'required'
  }),
  paramSchema
};
