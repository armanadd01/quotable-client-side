"use client";


import Image from "next/image";
import { useState, useEffect } from 'react'

export default function Home() {

  const [quote, setQuote] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false);
 /*
  useEffect(() => {
    fetch('http://localhost:4000/quotes/random')
      .then((res) => res.json())
      .then((data) => {
        setQuote(data[0])
        // setLoading(false)

        console.log("hello line19 home", data);
        
      })
  }, [])
*/
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:4000/quotes/random');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (data.length > 0) {
            setQuote(data[0]);
          } else {
            setError(true);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(true);
        }
      };

      fetchData();
    }, []);




  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center">
      <h1>hello</h1>
      {/* <h2 className="text-2xl italic "> {quote.content}</h2> */}
      <br />
      {/* <h3 className="text-sm font-bold italic text-blue-900/75 ">"{quote.author}"</h3> */}

      {quote ? (
        <>
          <p className="text-2xl italic ">{quote.content}</p>
          <p className="text-sm font-bold italic text-blue-900/75 ">— {quote.author}</p>
        </>
      ) : (
        <>
          {error
            ? <div className="text-2xl italic ">
              
              <p className="text-2xl italic ">Unable to fetch quote at this moment. Please try again later.</p>
              <p className="text-sm font-bold italic text-blue-900/75 ">— Arman Habib</p>
              </div>
            : 'Loading...'
            
            }
        </>
      )}



      </div>
      
    </main>
  );
}
