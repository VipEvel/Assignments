import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?page=1&result=1&seed=abc');
        const jsonData = await response.json();
        console.log(jsonData)
        setCardsData(jsonData?.results || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className='h-[100vh] flex justify-center items-center'>
        {loading ? (
          <div className="bg-transparent w-64 h-80">
            <div className="card relative w-full h-full flex justify-center items-center transform transition-transform duration-500">
              <p className="text-coral text-2xl font-bold text-center">Loading...</p>
            </div>
          </div>
        ) : cardsData.length ? (
          cardsData.map((card, index) => <div key={index} class="group/item bg-transparent w-[25rem] h-64 hover:cursor-pointer">
            <div class="card relative w-full h-full flex justify-center items-center transform transition-transform duration-500">
              <div className="sm:flex sm:items-center px-6 py-4">
                <img className='block mx-auto sm:mx-0 sm:flex-shrink-0 h-35 rounded-full sm:h-28 sm:w-28' src={card?.picture?.large} />
                <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                  <p className="text-xl leading-tight text-coral capitalize">{`${card?.name?.title} ${card?.name?.first} ${card?.name?.last}`}</p>
                  <p className="text-sm leading-tight text-zinc-600 capitalize">{card?.gender}</p>
                  <p className="text-sm leading-tight text-zinc-600 capitalize">{card.phone}</p>
                </div>
                <span class="invisible group-hover/item:visible absolute bottom-2 right-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" width="24" height="23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>

                </span>
              </div>
            </div>
          </div>)
        ) : (
          <div className="bg-transparent w-64 h-80">
            <div className="card relative w-full h-full flex justify-center items-center transform transition-transform duration-500">
              <p className="text-coral text-2xl font-bold text-center">Empty</p>
              <p className="text-center">Details are not present.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
