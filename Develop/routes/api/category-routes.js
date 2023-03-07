const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll(
        {
         include: [{ model: Product }],
        }
      );
    res.status(200).json(categories);
    console.log(categories);
  }
  catch { (err) => {
      console.log(err)
      res.status(500);
    }
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, { include: [{ model: Product }]});
    res.status(200).json(category);
  }
  catch { (err) => {
    console.log(err)
    res.status(500);
    }
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  }
  catch { (err) => {
    console.log(err)
    res.status(500);
    }
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json(deleteCategory);
  }
  catch { (err) => {
    console.log(err)
    res.status(500);
    }
  }
});

module.exports = router;
