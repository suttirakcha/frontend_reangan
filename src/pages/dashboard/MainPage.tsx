import { useEffect, useState } from "react"

function MainPage() {
  const [lessons, setLessons] = useState([])

  useEffect(() => {
    
  }, [])

  return (
    <div>
      <h1 className="title">Welcome to ReanGan</h1>
      <p>What would you like to learn today?</p>
    </div>
  )
}

export default MainPage