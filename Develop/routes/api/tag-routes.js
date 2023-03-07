const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product},]
    });
    console.log(tags);
    res.status(200).json(tags);
  }
  catch { (err) => {
    console.log(err)
    res.status(500);
    }
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, { include: [{ model: Product }]});
    res.status(200).json(tag);
  }
  catch { (err) => {
    console.log(err)
    res.status(500);
    }
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  }
  catch { (err) => {
    console.log(err)
    res.status(500);
    }
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json(deleteTag);
  }
  catch { (err) => {
    console.log(err)
    res.status(500);
    }
  }
});

module.exports = router;
