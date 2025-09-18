import toast, { ToastType } from "react-hot-toast";

export const notify = (text: string, type: ToastType) =>
  (toast as any)[type](text, {
    style: {
      maxWidth: "fit-content",
    },
  });

export const isPresence = (value: string, errorMessage: string) => {
  if (!value || !value?.trim()) {
    return errorMessage;
  }
  return "";
};

export const isValidEmail = (value: string, errorMessage = "Invalid email") => {
  if (!value) return errorMessage;
  if (
    !!value &&
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
  ) {
    return errorMessage;
  }

  return null;
};
