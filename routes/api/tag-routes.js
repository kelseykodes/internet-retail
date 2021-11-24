const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

 // find all tags
 // be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'category_id','product_name', 'price', 'stock'],
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'Wrong id. Tag cannot be found.' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for creating a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((newTag) => {
      res.json(newTag);
      console.log(newTag);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    if (!updateTag) {
      res.status(404).json({ message: 'Wrong id. Tag cannot update.' });
      return;
    }
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err);
  }
});


// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((deletedTag) => {
    if (!deletedTag){
      res.status(404).json({message: 'Wrong id. Cannot delete.'});
      return;
    }
    res.status(200).json(deletedTag);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
