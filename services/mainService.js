var router = require('../routes/routes')

router.get("/", (req, res) => {
    res.status(200).json({ server: "up" });
  });


const main = {router}
module.exports = main