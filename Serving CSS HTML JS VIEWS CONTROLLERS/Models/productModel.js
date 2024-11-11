const db=require('../utilPath/database');
//cartModel.js is seems to have been exported here in the academind
module.exports=class Product{
    constructor(item){//The resultant json objects will hold the same keys name as defined in the constructor
      this.id=item.id;
      this.title=item.title;
      this.imageUrl=item['image-url'];/*Brackets are required for hyphenated names and it is called Dynamic Key Access*/
      this.price=item.price;
      this.description=item.description;
    }
    save(){
      return db.execute('INSERT INTO products(title,imageurl,price,description) VALUES(?,?,?,?)',
        [this.title,this.imageUrl,this.price,this.description]
      );
    }
    static fetchAll(){
      return db.execute('SELECT * FROM products');
    }
    static findById(id){
      return db.execute('SELECT * FROM products WHERE products.id=?',[id]);
    }
    static deleteProductById(id){
      return db.execute('Delete FROM products WHERE products.id=?',[id]);
    }
}
