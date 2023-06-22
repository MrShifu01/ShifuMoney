import '../App.css'
import { format } from 'date-fns'

const Transaction = ({transaction}) => {
  return (
    <>
        <div className="transaction">
            <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
            </div>

            <div className="right">
                <div className={`price ${transaction.price < 0 ? "red" : "green"}`}>{transaction.price}</div>
                <div className="datetime">{format(new Date(transaction.datetime), "MMMM d, yyyy, H:mma")}</div>
            </div>
        </div>
    </>
  )
}

export default Transaction