import Joi from "Joi";
import { TASK_STATUS_ARRAY } from "./task.constant.js";

const titleValidation = Joi.string().min(3).max(100).messages({
  "string.base": `"title" should be a type of 'text'`,
  "string.empty": `"title" cannot be an empty field`,
  "string.min": `"title" should have a minimum length of {#limit}`,
  "string.max": `"title" should have a maximum length of {#limit}`,
  "any.required": `"title" is a required field`,
});

const createTaskSchema = Joi.object({
  title: titleValidation.required(),
});

const updateTaskSchema = Joi.object({
  title: titleValidation.optional(),
  status: Joi.string()
    .valid(...TASK_STATUS_ARRAY)
    .optional()
    .messages({
      "string.base": `"status" should be a type of 'text'`,
      "any.only": `"status" must be one of [${TASK_STATUS_ARRAY.join(", ")}]`,
    }),
})
  .min(1)
  .messages({
    "object.min": `At least one field (title, status) must be provided for update`,
  });

const taskId = Joi.string().hex().length(24).messages({
  "string.base": `"id" should be a type of 'text'`,
  "string.hex": `"id" must only contain hexadecimal characters`,
  "string.length": `"id" must be {#limit} characters long`,
});

const taskIdSchema = Joi.object({
  id: taskId.required(),
});

export { createTaskSchema, taskIdSchema, updateTaskSchema };
