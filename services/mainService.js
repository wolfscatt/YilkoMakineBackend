var router = require('../routes/routes')

router.get("/", (req, res) => {
    res.status(200).json({ server: "up" });
  });

module.exports = router