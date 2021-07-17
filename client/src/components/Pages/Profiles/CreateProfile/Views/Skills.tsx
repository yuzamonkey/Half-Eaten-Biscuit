import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_CATEGORIES } from "../../../../../graphql/queries"

import './Skills.css'
import { Button } from "../../../../../utils/UtilityComponents/UtilityComponents"

interface Category {
  id: string,
  name: String,
  parent: Category
}

const Skills = () => {
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [currentPath, setCurrentPath] = useState([undefined])
  const { loading, data } = useQuery(ALL_CATEGORIES, { onCompleted: () => setAllCategories(data.allCategories) })

  if (loading) return <div>Loading...</div>
  console.log(allCategories)

  const handlePathClick = (clickedName) => {
    let isParent = false
    for (let obj of allCategories) {
      if (obj.parent?.name === clickedName) {
        isParent = true
      }
    }
    isParent && setCurrentPath(currentPath.concat(clickedName))
  }

  const handlePathChangeToPrevious = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.splice(0, currentPath.length - 1))
    }
  }

  return (
    <div>
      <h2>Select your skills</h2>
      <h3>{currentPath.map(name => <span key={name}>{name} → </span>)}</h3>
      {allCategories.map(obj => {
        return (
          currentPath[currentPath.length - 1] === obj.parent?.name && <div className="skill-container" key={obj.id} onClick={() => handlePathClick(obj.name)}>{obj.name}</div>
        )
      })}
      <Button handleClick={() => handlePathChangeToPrevious()} text={`←`} />
    </div>
  )
}

// const Skills = () => {
//   const [allCategories, setAllCategories] = useState<Category[]>([])
//   const [currentPath, setCurrentPath] = useState<String[]>([''])
//   const [currentPathToString, setCurrentPathToString] = useState<String>('')
//   const { loading, data } = useQuery(ALL_CATEGORIES, { onCompleted: () => setAllCategories(data.allCategories) })

//   if (loading) return <div>Loading...</div>
//   console.log(allCategories)

//   const setPathValues = (newPath) => {
//     const newPathString = newPath.reduce((prevVal, curVal) => `${prevVal}${curVal}`, ``)
//     setCurrentPathToString(newPathString)
//     setCurrentPath(newPath)
//   }

//   const handlePathClick = (clickedName) => {
//     const newPath = currentPath.concat(`/${clickedName}`)
//     setPathValues(newPath)
//   }

//   const handlePathChangeToPrevious = () => {
//     if (currentPath.length > 1) {
//       const newPath = currentPath.splice(0, currentPath.length - 1)
//       setPathValues(newPath)
//     }
//   }

//   return (
//     <div>
//       <h3>Skills mon</h3>
//       {allCategories.map(obj => {
//         return (
//           obj.path === currentPathToString && <div className="skill-container" key={obj.id} onClick={() => handlePathClick(obj.name)}>{obj.name}</div>
//         )
//       })}
//       <Button handleClick={() => handlePathChangeToPrevious()} text={`<- ${currentPath[currentPath.length - 1].substring(1)}`} />
//     </div>
//   )
// }

export default Skills