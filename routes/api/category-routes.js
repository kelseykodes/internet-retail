const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// finds all categories & include its associated Products
router.get('/', async (req, res) => {
  try {
    const catData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(catData);
  } catch (err) {
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

router.post('/', async (req, res) => {
  try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
    console.log(catData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

 // updates a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateCat = await Category.update(req.body,{
      where: {
        id: req.params.id
      }
    });
    if (!updateCat) {
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
      book_id: req.params.book_id,
    },
  })
  .then((deleteCat) => {
    if (!deleteCat){
      res.status(404).json({message: 'Wrong id. Cannot delete category.'});
      return;
    }
    res.status(200).json(deleteCat);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
