import ItemList from './ItemList';

const Content = ({ items, handleCheck, handleDelete}) => {
   
    return (
        //fragment element to hold the JSX
        <>
            {items.length ? (
                <ItemList 
                    items = {items}
                    handleCheck = {handleCheck} 
                    handleDelete = {handleDelete}
                />
            )  : (
                <p style = {{marginTop: '2rem'}}>Your list is empty.</p>
            )}
        </>
    )
}

export default Content