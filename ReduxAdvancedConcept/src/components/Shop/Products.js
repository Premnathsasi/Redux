import ProductItem from './ProductItem';
import classes from './Products.module.css';


const dummyProduct = [
  {id:'a1', price: 5, title: 'My first Book', description: 'This is a first Book - amazing!'},
  {id:'a2', price: 6, title: 'My first Car', description: 'This is my first car'},
  {id:'a3', price: 8, title: 'My first Bike', description: 'This is my first Bike'},
  {id:'a4', price: 7, title: 'My first House', description: 'This is a first House - amazing!'}
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul> {dummyProduct.map((item) => {
        return (
          <ProductItem
          title={item.title}
          price={item.price}
          description={item.description}
          key={item.id}
          id={item.id}
        />
        )
      })}
        
      </ul>
    </section>
  );
};

export default Products;
