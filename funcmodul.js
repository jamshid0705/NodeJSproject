const func=function(html,obj){
  let out=html.replace("{fruitimg}",obj.image)
  out=out.replace("{fruitName}",obj.productName)
  out=out.replace("{id}",obj.id)

  out=out.replace("name",obj.productName);
  out=out.replace("from",obj.from);
  out=out.replace("nutrients",obj.nutrients);
  out=out.replace("quentity",obj.quentity)
  out=out.replace("price",obj.price);
  out=out.replace("organic" ,obj.organic ? "ture":"");
  out=out.replace("description",obj.description)
  return out;
}

module.exports=func;