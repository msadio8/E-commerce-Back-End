const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product}],
    });
    if (!tagData){
      console.log("No Tags found");
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id',async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include:[{ model: Product}],
    });
    if(!tagData){
      res.status(404).json({ message: 'Cannot find the tag with id!'});
      return;
    }
    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);

  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(req.body, {
      where:{ id: req.params.id},
    });
    if (!updatedTag[0]) {
      res.status(404).json({message:'The tag could not be found'});
      return ;
    };
    res.status(201).json(`Updated ${updatedTag} tags`);

  } catch (err) {
    console.log('error in updating tag');
    res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const deletedTag = await Tag.destroy ({where : {id:req.params.id}});
    if (!deletedTag){
      res.status(404).json({'message':'Couldnt find that tag'})
    }
    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
