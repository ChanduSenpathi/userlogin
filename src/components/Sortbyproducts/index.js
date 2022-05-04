import './index.css'
import {FaFilter} from 'react-icons/fa'
const SortbyProducts=props=>{
    const{sortbyoptions,onchangevalues,sort,searching}=props
    const valuechanger=event=>{
        onchangevalues(event.target.value)
    }
    const changeInput=event=>{
        searching(event.target.value)
    }
    return(
        <div className='sortby-container'>
            <div className='search-input-container'>
                <input type={'search'} className="search-input" placeholder='Search products' onChange={changeInput}/>
                <h1>Allproducts</h1>
            </div>
            <div className='select-container'>
                <FaFilter />
                <h3 className='sortby-head'>Sort by</h3>
                <select className='select' onChange={valuechanger} value={sort}>
                {sortbyoptions.map(each=>(
                    <option key={each.Id} value={each.Id}>
                        {each.desc}
                    </option>
                ))}
            </select>
            </div>
        </div>
    )
}
export default SortbyProducts