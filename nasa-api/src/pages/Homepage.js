import {useState, useEffect} from "react"
import { Loading } from "../components"

export default function Homepage() {
    const [company, setCompany] = useState(null)

  useEffect(() => {
    const fetchCompany = async () => {
      const res = await fetch("https://api.spacexdata.com/v4/company")
      const data = await res.json()
      setCompany(data)
    }

    fetchCompany()
  }, [])
      

  return (
    <>
    {!company ? (
        <Loading />
      ) : (
        <section className="showcase">
          <div className="overlay">
            <article className="text-white">
              <h1 className="heading text-center capitalize">
                All The Nasa Data in one place
              </h1>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto mt-10 lg:gap-20 px-5">
                <article>
                  <h2 className="font-bold border-b-2 border-white text-xl mb-3 pb-2 uppercase tracking-wider">
                    About
                  </h2>
                  <ul className="text-sm opacity-75">
                    <p>
                    Welcome to the NASA API portal. The objective of this site is to make NASA data, including imagery, eminently accessible to application developers. This catalog focuses on broadly useful and user friendly APIs and does not hold every NASA API.
                    </p>
                  </ul>
                </article>

                <article>
                  <h2 className="font-bold border-b-2 border-white text-xl mb-3 pb-2 uppercase tracking-wider">
                    Headquarters
                  </h2>
                  <ul className="text-sm opacity-75">
                    <p> 300 Hidden Figures Way SW, Washington, D.C.</p>
                  </ul>
                </article>

                <article>
                  <h2 className="font-bold border-b-2 border-white text-xl mb-3 pb-2 uppercase tracking-wider">
                    Useful Links
                  </h2>
                  <ul className="text-sm opacity-75">
                    <li className="mb-1">
                      <a href="https://www.nasa.gov/">Website</a>
                    </li>
                    <li className="mb-1">
                      <a href="https://web.facebook.com/NASA/?_rdc=1&_rdr">Facebook</a>
                    </li>
                    <li className="mb-1">
                      <a href="https://twitter.com/NASA?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">Twitter</a>
                    </li>
                    <li className="mb-1">
                      <a href="https://www.instagram.com/NASA/">Instagram</a>
                    </li>
                  </ul>
                </article>
              </div>

              <p className="max-w-3xl mx-auto text-center mt-10" style={{ lineHeight: 1.4 }}>
                NASA, the National Aeronautics and Space Administration, pioneers space exploration endeavors. Established in 1958, NASA leads cutting-edge missions to advance our understanding of the universe and Earth.
              </p>

            </article>
          </div>
        </section>
      )}        
    </> 
  )
}