const ObjectId = require("mongodb").ObjectId;

const reviews = [
  {
    comment:
      "Review lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis nulla id sollicitudin congue. Sed ornare commodo lectus, a semper sem sagittis id. Mauris sed congue ipsum.",
    rating: 5,
    user: { _id: ObjectId(), name: "John Doe" },
  },
  {
    comment:
      "Review lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis nulla id sollicitudin congue. Sed ornare commodo lectus, a semper sem sagittis id. Mauris sed congue ipsum.",
    rating: 1,
    user: { _id: ObjectId(), name: "John Doe" },
  },
  {
    comment:
      "Review lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis nulla id sollicitudin congue. Sed ornare commodo lectus, a semper sem sagittis id. Mauris sed congue ipsum.",
    rating: 2,
    user: { _id: ObjectId(), name: "John Doe" },
  },
  {
    comment:
      "Review lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis nulla id sollicitudin congue. Sed ornare commodo lectus, a semper sem sagittis id. Mauris sed congue ipsum.",
    rating: 3,
    user: { _id: ObjectId(), name: "John Doe" },
  },
  {
    comment:
      "Review lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis nulla id sollicitudin congue. Sed ornare commodo lectus, a semper sem sagittis id. Mauris sed congue ipsum.",
    rating: 4,
    user: { _id: ObjectId(), name: "John Doe" },
  },
];

module.exports = reviews;