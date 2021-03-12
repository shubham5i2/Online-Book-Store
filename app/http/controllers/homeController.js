const Menu = require("../../models/menu");
function homeController() {
  return {
    async index(req, res) {
      const books = await Menu.find();
      return res.render("home", { books: books });
      // Menu.find().then((books) => {
      //   console.log(books);
      //   res.render("home", { books: books });
      // });
    },
  };
}

module.exports = homeController;
