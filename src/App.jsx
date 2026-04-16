import { useEffect, useState } from 'react'

function App() {
  const [homepage, setHomepage] = useState(null)

  useEffect(() => {
    fetch('https://admin.robosouthla.com/api/homepage')
      .then(res => res.json())
      .then(data => setHomepage(data.data))
  }, [])

  if (!homepage) return <div>Loading...</div>

  return (
    <div>
      <h1>{homepage.heroTitle}</h1>
      <h2>{homepage.heroSubtitle}</h2>
      <p>{homepage.bio}</p>
    </div>
  )
}

export default App