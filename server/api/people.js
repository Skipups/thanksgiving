const router = require("express").Router();
const { Person, Dish } = require("../../db");

// make sure to use router.get, router.post etc..., instead of app.get, app.post, or etc... in this file.
// see https://expressjs.com/en/api.html#routers

router.get("/", (req, res, next) => {
  if (req.query.is_attending === "true") {
    Person.findAll({ where: { isAttending: true } })
      .then(people => res.status(200).send(people))
      .catch(error => next(error));
  } else if (req.query.is_attending === "false") {
    Person.findAll({ where: { isAttending: false } })
      .then(people => res.status(200).send(people))
      .catch(error => next(error));
  } else if (req.query.include_dishes === "true") {
    Person.findAll({ include: [Dish] })
      .then(people => res.status(200).send(people))
      .catch(error => next(error));
  } else {
    Person.findAll({})
      .then(people => res.status(200).send(people))
      .catch(error => next(error));
  }
});
//post creates a new person
router.post("/", (req, res, next) => {
  Person.create(req.body).then(person => {
    res.status(200).send(person);
  });
});
//put updates existing person
router.put("/:id", (req, res, next) => {
  //instance update
  Person.findOne({ where: { id: req.params.id } })
    .then(person => person.update(req.body))
    .then(updatedPerson => res.status(200).send(updatedPerson))
    .catch(error => next(error));
});

router.delete("/:id", (req, res, next) => {
  Person.destroy(req.body)
    .then(() => Person.findAll({}))
    .then(people => res.status(200).send(people))
    .catch(error => next(error));
});

module.exports = router;
