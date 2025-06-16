const UserController = {
   register: (async = (req, res) => {
      const { email, password, name } = req.body;
   }),
   login: (async = (req, res) => {
      res.send("login");
   }),
   getById: (async = (req, res) => {
      res.send("getbyid");
   }),
   update: (async = (req, res) => {
      res.send("update");
   }),
   current: (async = (req, res) => {
      res.send("current");
   }),
};

module.exports = UserController;
