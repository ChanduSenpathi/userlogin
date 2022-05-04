import './index.css'

const Filtering =props=>{
    const{categoriessec,getfilteredvalue,starssec,getstarRatings}=props
    const filtervalues=event=>{
        getfilteredvalue(event.target.value)
    }
    let getallStars=()=>{
    }
    return(
        <div>
            <div className='desktop-tab-filter'>
                <h3>Category</h3>
                <ul className='category-ul-section'>
                    {categoriessec.map(items=>(
                        <li onClick={filtervalues} className='category-li-section' value={items.Id} key={items.Id}>{items.name}</li>
                    ))}
                </ul>
                <h3>Ratings</h3>
                <ul className='category-ul-section'>
                    {starssec.map(each=>(
                        getallStars=()=>getstarRatings(each.Id),
                        <li onClick={getallStars} className='category-li-section' value={each.Id}  key={each.Id}>
                            <img src={each.imgUrl} alt="stas_section" className="stars-images"/>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='responsive-filter'>
                <div className='mobileview-filtering'>
                    <div className='select-caterogy'>
                        <h3>Category</h3>
                        <select className='select' onChange={filtervalues}>
                            {categoriessec.map(items=>(
                                <option value={items.Id} key={items.Id}>{items.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='select-category'>
                        <h3>Ratings</h3>
                        <ul className='category-ul-section'>
                            {starssec.map(each=>(
                                getallStars=()=>getstarRatings(each.Id),
                                <li onClick={getallStars} className='category-li-section' value={each.Id}  key={each.Id}>
                                    <img src={each.imgUrl} alt="stas_section" className="stars-images"/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default Filtering