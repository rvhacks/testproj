const router = require("express").Router();

router.get("/test", (req, res) => {
  res.send("user test is successful");
});

module.exports = router;
