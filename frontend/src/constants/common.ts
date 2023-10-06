import { TResponseStatus } from "../types/common";

export const EMAIL_LABEL = "Email";
export const NAME_LABEL = "Name";
export const PHONE_NUMBER_LABEL = "Phone Number";

export const RESPONSE_MESSAGES: Record<TResponseStatus, string> = {
  success: "Your request has been processed successfully!",
  error: "An error occurred while processing your request.",
  info: "Your request has been submitted and is currently being processed.",
  warning:
    "This operation will permanently delete your data. Are you sure you want to proceed?",
};

export const NO_USERS_LABEL = "There are currently no users available.";
export const USER_MANAGER_LABEL = "User Manager";
export const CREATE_USER_LABEL = "Create a user";
export const NO_CHANGES_LABEL = "No changes have been made";
