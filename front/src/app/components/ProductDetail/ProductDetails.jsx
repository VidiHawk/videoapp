import React from 'react'
import ProductInfo from './../Product/Info';
import FSCIcon from './../../../../public/images/fsc.svg'
import RecycleIcon from './../../../../public/images/recyclable.svg'
import CrueltyIcon from './../../../../public/images/cruelty.svg'
import AuthContext from '../../helpers/authContext'

const ProductDetails = ({ product }) => {
  const context = React.useContext(AuthContext)
  const { theme } = context
  return (
    <div className={`product-details-container  p-ingredients product-details-container-${theme}`}>
      <div className="product-details-subcontainer">
        <ProductInfo product={product} theme={theme === 'black' ? 'white' : 'black'} />
        <div className="ingredients-container">
          <div className="ingredients-title">Ingredients</div>
          <div className="ingredients-text">
            Water (Aqua), C12-15 Alkyl Benzoate,Stearic Acid, Propylene Glycol, Glyceryl Stearate, PEG-100 Stearate,
            Simmondsia Chinensis (Jojoba) Seed Oil, Chamomilla Recutita (Matricaria) Flower Extract, Salvia Officinalis
            (Sage) Leaf Extract, Rosemarinus Officinalis (Rosemary) Leaf Extract, Crataegus Monogyna Fruit Extract,
            Retinyl Palmitate,Tocopheryl Acetate, Algae Extract, Salvia Hispanica Seed Extract, Hydrolyzed Elastin,
            Steareth-20, Palmitoyl Tetrapeptide-7, Herbal Placental Extract (BioPlacenta), Butyrospermum Parkii (Shea)
            Butter, Hippophae Rhamnoides Oil (Seabuckthorn Oil), Glyceryl Polymethacrylate, Palmitoyl Oligopeptide,
            Glycerin, Beeswax, Carbomer, Triethanolamine, Tetrasodium EDTA, Phenoxyethanol, Ethylhexylglycerin, Organic
            Flavor (Vanilla Planifolia Fruit Extract), Caramel, Brown 1. <br />
            <br />
            MADE IN USA
            <br />
            <br />
            Formulated, produced and distributed by EMK Beverly Hills, CA 90211
          </div>
        </div>
        <div className="product-feature-container">
          <div className="product-feature-subcontainer">
            <div className="feature-item-container">
              <FSCIcon />
              <div className="feature-description">Packaging paper made from FSC approved sustainable forests</div>
            </div>
            <div className="feature-item-container">
              <RecycleIcon />
              <div className="feature-description">100% recyclable</div>
            </div>
            <div className="feature-item-container">
              <CrueltyIcon />
              <div className="feature-description">Cruelty free</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
