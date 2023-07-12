import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([])
  const [cost,setCost] = useState(1); // 코인 금액
  const [need, setNeed] = useState(0); // 가지고 있는 현재 달러

  const onChange = (event) => { //셀렉트 박스 선택 시 코인 금액을 가져오고 현재 달러는 1로 변경
    setCost(event.target.value);
    setNeed(1);
  }
  const handleInput = (event) => { // input 창에 보유 달러 변경 시 반영
    setNeed(event.target.value);
  } 

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response)=> response.json())
    .then((json)=> {
      setCoins(json);
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <h1>The Coins{loading ? null: `(${coins.length}개)`}</h1>
      {loading ? <strong>로딩중...</strong>:<select id="selectBox" onChange={onChange}>
      <option>코인을 선택해보세요</option>
        {coins.map((coin, index) =>
          <option 
            key={index} 
            value={coin.quotes.USD.price} 
            id={coin.symbol}
            symbol = {coin.symbol} >
            {coin.name} ({coin.symbol}) :💲{coin.quotes.USD.price}USD
          </option>
        )}
         </select>}
      <input type="number"value={need} onChange={handleInput} />달러
      <h2> {need === 0 ? null: `당신이 살 수 있는 코인은 ${need/cost} 개 입니다.`}</h2>
      {/* <ul>
        {coins.map((coin, index)=> <li>{ coin.name } ({coin.symbol}):{coin.quotes.USD.price}💲(USD)</li>)}
      </ul> */}
    </div>
  )
};

export default App;
