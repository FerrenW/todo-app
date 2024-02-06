export const createTaskValidationSchema = {
  title: {
    notEmpty: {
      errorMessage: "Tile Cannot be empty",
    },
  },
  content: {
    notEmpty: {
      errorMessage: "Content Cannot be empty",
    },
  },
  status: {
    notEmpty: {
      errorMessage: "Status Cannot be empty",
    },
  },
};
