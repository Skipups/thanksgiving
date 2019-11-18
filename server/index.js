const { app } = require("./app");
const PORT = 3000;
const { db, Person, Dish } = require("../db/index.js");

async function syncAndSeedDatabase() {
  try {
    await db.sync({ force: true });
    const [svetlana, alyssa, kevin, anfisa, richard] = await Promise.all([
      Person.create({ name: "Svetlana" }),
      Person.create({ name: "Alyssa" }),
      Person.create({ name: "Kevin", attending: false }),
      Person.create({ name: "Anfisa" }),
      Person.create({ name: "Richard", attending: false })
    ]);
    const [
      turkey,
      ham,
      potatoes,
      pie,
      wine,
      icecream,
      chips,
      whiskey
    ] = await Promise.all([
      Dish.create({
        name: "turkey",
        description: "meat",
        personId: svetlana.id
      }),
      Dish.create({
        name: "ham",
        description: "vegan meat",
        personId: svetlana.id
      }),
      Dish.create({
        name: "potatoes",
        description: "yummy",
        personId: anfisa.id
      }),
      Dish.create({
        name: "pie",
        description: "need icre-cream",
        personId: kevin.id
      }),
      Dish.create({ name: "wine", description: "red", personId: alyssa.id }),
      Dish.create({
        name: "icecream",
        description: "dairy",
        personId: richard.id
      }),
      Dish.create({
        name: "chips",
        description: "if we need more food",
        personId: anfisa.id
      }),
      Dish.create({
        name: "whiskey",
        description: "bring ice",
        personId: kevin.id
      })
    ]);
    const people = await Person.findAll();
    console.log(people.length);
    const dishes = await Dish.findAll();
    console.log(dishes.length);
    //  Create some rows in your Person and Dish tables here
    //  to interact with your API using the `npm run start:watch`
    //  or `npm run start` commands.
  } catch (e) {
    console.log(e);
  }

  console.log("done seeding and associating!");
}

syncAndSeedDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});
