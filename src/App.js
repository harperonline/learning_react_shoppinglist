import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest.js';
import { FaVestPatches } from 'react-icons/fa';

function App() {

  const API_URL = "http://localhost:3500/items";


  //Use const because you must only change this value via the setName setter
  
  //Define state variables
  const [items, setItems] = useState([]);
  const [newItem, setnewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setfetchError] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => { //only works when the thingg you are watching changes

    const fetchItems = async () => { //retrurns an async function but needs executing.
      try{
          const response = await fetch(API_URL);
          if(!response.ok) throw Error('Did not recieve the expected data');
          const listItems = await response.json();
          setItems(listItems);
          setfetchError(null);
      }catch(err){
          setfetchError(err.message);
      } finally {
          setisLoading(false);
      }
    }
    
    setTimeout(() => {
      
      (async () => await fetchItems()) ();
    
    }, 2000)

  },[]); //And empty array only runs at LOAD time


  const addItem = async (item) => {
    //if the lenth of the items array is not 0, return items.id + 1, but if 0, return 1
    const id = items.length ? items[items.length -1].id + 1 : 1;
    const myNewItem = { id, checked: false, item }; //create new item
    const listItems = [...items, myNewItem]; //Populate the newItems using a spread operator (adds old array to new array)
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(myNewItem)//Add in the new item only
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setfetchError(result);
  }

  //FUNCTION 
  const handleCheck = async (id) => {
      const listItems = items.map((item) => item.id === id ? {...item, 
      checked: !item.checked } : item);
      setItems(listItems);

      //Look for just the item that you wish to check the checkbox for
      const myItem = listItems.filter((item) => item.id === id);
      const updateOptions = {
        method: 'PATCH',
        headers : {
          'Content-type':'application/json'
        },
        body: JSON.stringify({checked: myItem[0].checked}) //update the checked item only as the array has on that value in it
      };
      const reqUrl = `${API_URL}/${id}`;
      const result = await apiRequest(reqUrl, updateOptions);
      if(result) setfetchError(result);
  }

  //FUNCTION
  const handleDelete = async (id) => {
      const listItems = items.filter((item) => item.id !== id);
      setItems(listItems);
      const deleteOptions = {
        method: 'DELETE'
      };
      const reqUrl = `${API_URL}/${id}`;
      const result = await apiRequest(reqUrl, deleteOptions);
      if(result) setfetchError(result);
  }

  //Function
  const handleSubmit = (e) => {
    e.preventDefault();//stop auto page reload
    if(!newItem) return; //clear the value 
    addItem(newItem);
    setnewItem('');
  }

  return (  //return JSX (JavaScript XML)
    <div className="App">
      <Header title="Grocery List" />
      <AddItem 
        newItem = {newItem}
        setnewItem={setnewItem}
        handleSubmit={handleSubmit}  
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      /> 
      <main>
        {isLoading && <p>Loading items...</p>}
        {fetchError && <p style={{ color: "red"}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading &&
          <Content 
            items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
            handleCheck = {handleCheck}
            handleDelete = {handleDelete}
          />
      }
      </main>
      <Footer length = { items.length }/>
    </div>
  );
}

export default App; //Alows the component to be imported
