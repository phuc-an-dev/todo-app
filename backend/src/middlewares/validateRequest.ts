import type { NextFunction, Request, Response } from "express";
import { type ObjectSchema, type ValidationResult } from "Joi";

type ValidationLocation = "body" | "query" | "params";

const validateRequest = (
  schema: ObjectSchema,
  location: ValidationLocation = "body"
) => {
  // Return middleware function
  return (req: Request, res: Response, next: NextFunction) => {
    // Extract data to validate
    const data = req[location];
    // Perform validation
    const { error, value }: ValidationResult = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });
    // Handle validation result
    if (error) {
      // Format Joi errors
      const errors = error.details.map((detail) => ({
        key: detail.context?.key,
        field: detail.path.join("."),
        message: detail.message.replace(/"/g, "").replace(" is ", " "),
        type: detail.type,
      }));
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }
    // Replace req data with validated and sanitized data
    req[location] = value;
    // Proceed to next middleware
    next();
  };
};

export default validateRequest;
