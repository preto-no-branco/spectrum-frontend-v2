import { useSharedState } from '@renderer/hooks/useSharedState'
import { Link } from 'react-router-dom'

function Home(): React.JSX.Element {
  const [text, setText] = useSharedState('text', 'Hello World')
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <Link to="/analysis">Go to Analysis</Link>
      </nav>
      <div>
        <p>Shared State Text: {text}</p>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
        />
      </div>
    </div>
  )
}

export default Home
