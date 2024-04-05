import AppError from "./appError";

export const unauthorizedAccess = () => {
  throw new AppError("Unauthorized Access", {
    message:
      "You do not have the necessary permissions to access this resource.",
  });
};
