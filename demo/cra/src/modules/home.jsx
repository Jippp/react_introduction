import { useNavigate } from "react-router-dom"

import { pathConfigs } from '../routers'

const Home = ({ children }) => {
  const navigate = useNavigate()

  return (
    <>
      <div>
        {
          pathConfigs.map(({ path, title }) => {
            return (
              <button key={path} onClick={() => {
                navigate(path)
              }}>{title}</button>
            )
          })
        }
      </div>
      <br />
      <br />
      {children}
    </>
  )
}

export default Home