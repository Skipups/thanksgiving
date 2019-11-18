const router = require("express").Router();
const { Dish, Person } = require("../../db");

// make sure to use router.get, router.post etc..., instead of app.get, app.post, or etc... in this file.
// see https://expressjs.com/en/api.html#router

router.get("/", (req, res, next) => {
  Dish.findAll()
    .then(dishes => res.status(200).send(dishes))
    .catch(error => next(error));
});

router.get("/:id", (req, res, next) => {
  Dish.findOne({ where: id })
    .then(dishes => res.status(200).send(dishes))
    .catch(error => next(error));
});
//creates a new dish
router.post("/", (req, res, next) => {
  console.log("create a new dish request", req.body);
  Dish.create(req.body)
    .then(dish => res.status(200).send(dish))
    .catch(error => next(error));
});
//updates a dish
router.put("/:id", (req, res, next) => {
  //instance update
  Dish.findOne({ where: { id: req.params.id } })
    .then(dish => dish.update(req.body))
    .then(updatedDish => res.status(200).send(updatedDish))
    .catch(next);
  // bulk update
  //Dish.update(req.body, { where: { id: req.params.id } })
  //   .then(dish => res.send(dish))
  //   .catch(error => next(error));
});
//delete a dish
router.delete("/:id", (req, res, next) => {
  Dish.destroy(req.body)
    .then(() => Dish.findAll().then(dishes => res.send(dishes)))
    .catch(error => next(error));
});

module.exports = router;
