const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // included its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!singleCategoryData) {
      res.status(404).json({ message: "No such category found!" });
      return;
    }
    res.status(200).json(singleCategoryData);
  } catch (err) {
    console.log(`Error in /api/categories/:id GET route`, err);
    res.status(500).json(err);
  }

});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);

  }

});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {where: { id: req.params.id }});
    if(!updateCategory[0]) {
      res.status(404).json({ message: " id not found!" });
      return ;
    }
    res.status(200).json(updateCategory);
      
  } catch (err) {
    res.status(500).json(err);
  }

});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    });

    if (!deletedCategory) {
      res.status(404).json({ message: "This category does not exist!" });
      return;
    }
    res.status(200).json("The category has been successfully removed!");
  } catch (err) {
    res.status(500).json(err);
    
  }

});

module.exports = router;
