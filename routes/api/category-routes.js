const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// finds all categories & include its associated Products
router.get('/', async (req, res) => {
  try {
    const catData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'category_id','product_name', 'price', 'stock'],
        },
      ],
    });
    res.status(200).json(catData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// finds one category by its `id` value & include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!catData) {
      res.status(404).json({ message: 'Wrong id. No category found.' });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// creates a new category
router.post('/', (req, res) => {
  Category.create(req.body)
    .then((newCat) => {
      res.json(newCat);
      console.log(newCat);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});


 // updates a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateCat = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    if (!updateCat[0]) {
      res.status(404).json({ message: 'Wrong id. Cannot update category.' });
      return;
    }
    res.status(200).json(updateCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

 // deletes a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((deletedCat) => {
    if (!deletedCat){
      res.status(404).json({message: 'Wrong id. Cannot delete category.'});
      return;
    }
    res.status(200).json(deletedCat);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
