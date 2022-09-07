import { FaPlus } from 'react-icons/fa'
import { useRef } from 'react'

const AddItem = ({newItem, setnewItem, handleSubmit}) => {
    const inputRef = useRef();

    return (
            <form className = "addForm" onSubmit={(handleSubmit)}>
                <label htmlFor="addItem">Add Item</label>
                <input
                    autoFocus 
                    ref={inputRef}
                    id="addItem"
                    type="text"
                    placeholder="Add Item"
                    required
                    value={newItem}
                    onChange={(e) => setnewItem(e.target.value)} //on change set the value from setNewItem
                />
                <button 
                    type="submit"
                    aria-label="Add Item"
                    onClick={()=> inputRef.current.focus()}
                >
                    <FaPlus />
                </button>
            </form>
    )
}

export default AddItem