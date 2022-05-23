import './category.style.scss'
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect, Fragment } from 'react';
import { CategoriesContext } from '../../context/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts(categoriesMap[category])

    }, [category, categoriesMap])
    return (
        <Fragment>
            <div className='categories-title'><h2>{category.toUpperCase()}</h2></div>
            <div className='category-container'>

                {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
        </Fragment>

    );
}

export default Category;