import React from 'react'

class Search extends React.Component{
    render(){
        const {searchName,searchProp} = this.props
        console.log(searchProp)
        return (
            <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" onChange={searchName} type="text" placeholder="Search" />
            <select className="form-control mr-sm-2" onClick={searchProp}>
                <option selected>Name</option>
                <option>Phone</option>
                <option>Email</option>

            </select>
        </form>
        )
    }
}      
export default Search