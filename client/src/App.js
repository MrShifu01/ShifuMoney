import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'
import Transaction from './components/Transaction';

function App() {
  const [name, setName] = useState('')
  const [datetime, setDatetime] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const getTransactions = async () => {
      const response = await axios.get('http://localhost:8000/api/transactions')
      const data = response.data
      setTransactions(data)
    }
    getTransactions()
  }, [name])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const transactionData = {
      name,
      description,
      datetime,
      price
    }
    
    try{
      await axios.post('http://localhost:8000/api/transaction', transactionData)

      setName('')
      setDatetime('')
      setDescription('')
      setPrice('')

    } catch (e) {
      console.log(e)
    }
  }

  const balance = transactions.reduce((acc, transaction) => acc + transaction.price, 0).toFixed(2)
  const balanceStr = balance.toString()
  
  const mainBalance = balanceStr.split('.')[0]
  const centsBalance = balanceStr.split('.')[1]

  const setPriceValue = (value) => {
    // Check if the input is only a dot and update the state accordingly
    if (value === '.') {
      setPrice(value);
      return;
    }
  
    // Remove any commas from the input value
    const sanitizedValue = value.replace(/,/g, '');
  
    // Update the state with the sanitized numeric value
    setPrice(sanitizedValue);
  };


  return (
    <main>
      <h1>R{mainBalance}<span>.{centsBalance}</span></h1>
      <form onSubmit={handleSubmit}>
        <div className='basic'>
          
          <input 
            type='text' 
            placeholder={'price'}
            value={price}
            onChange={e => setPriceValue(e.target.value)}
          />
          
          <input 
          type='text' 
          placeholder={'name'}
          value={name}
          onChange={e => setName(e.target.value)}
          />
          
          <input 
          type='datetime-local'
          value={datetime}
          onChange={e => setDatetime(e.target.value)}
          />
        </div>
        
        <div className='description'>
          <input 
          type='text' 
          placeholder={'description'}
          value={description}
          onChange={e => setDescription(e.target.value)}
          />
        </div>
        
        <button type='submit'>Add new transaction</button>
      
      </form>

      <div className='transactions'>
        {transactions.length > 0 && transactions.map((transaction) => (
          <div key={transaction._id}>
            <Transaction transaction={transaction}/>
          </div>
        ))}

      </div>
    </main>
  );
}

export default App;
